import React, { useState, useEffect } from 'react';
import './LatestNews.css'; // Import CSS file for styling

const LatestNews = ({user}) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNewsFromBackend = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/news');
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNewsFromBackend();
  }, []);

  // Slice the news array to show only the first 6 articles
  const newsToShow = news.slice(0, 6);

  return (
    <>
    <div className="latest-news-container">
    <h2 className = "lineup-title">Latest News</h2>
    <h3 className = "lineup-title"> {user ? `Handpicked for ${user.username}` : ''} </h3>
    <div className="news-grid">
      {newsToShow.map((article, index) => (
        <div key={index} className="news-card">
          <img src={article.img} alt={article.title} />
          <div className="news-content">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        </div>
      ))}
    </div>
    <div className = "news-footer">News from espn.com</div>
  </div>
  
  
  </>
    
  );
};

export default LatestNews;
