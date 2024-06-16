import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Statistics.css';

const Statistics = () => {
    const location = useLocation();
    const player = location.state?.player;

    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        const fetchStatistics = async () => {
            if (player && !hasFetched) {
                try {
                    console.log('Fetching statistics for:', player.name);
                    const res = await fetch(`http://127.0.0.1:5000/api/statistics?playerName=${player.name}`);
                    if (!res.ok) {
                        throw new Error('Failed to fetch statistics');
                    }
                    const data = await res.json();
                    const parsedData = JSON.parse(data.response);
                    console.log('Fetched data:', parsedData);

                    setResponse(parsedData);
                    setHasFetched(true);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchStatistics();
    }, [player, hasFetched]);

    if (loading) {
        return (
            <div className="statistics-container">
                {player.picture && <img className="player-picture" src={player.picture} alt={player.name} />}
                <h1 className="player-name">Loading...</h1>
                <div className="player-stats">
                    <div className="skeleton-card">
                        <div className="skeleton-img"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="statistics-container">Error: {error}</div>;
    }

    if (!response) {
        return <div className="statistics-container">No data available</div>;
    }

    return (
        <div className="statistics-container">
            {player.picture && <img className="player-picture" src={player.picture} alt={player.name} />}
            <h1 className="player-name">Statistics for {player.name} (all-time)</h1>
            <div className="player-stats">
                <p><strong>Position:</strong> {response.position}</p>

                {response.position.toLowerCase() === 'forward' && (
                    <div className="position-stats">
                        <p><strong>Goals:</strong> {response.goals}</p>
                        <p><strong>Assists:</strong> {response.assists}</p>
                        <p><strong>Shots per game:</strong> {response.shots_per_game}</p>
                    </div>
                )}

                {response.position.toLowerCase() === 'midfielder' && (
                    <div className="position-stats">
                        <p><strong>Goals:</strong> {response.goals}</p>
                        <p><strong>Assists:</strong> {response.assists}</p>
                        <p><strong>Passes per game:</strong> {response.passes_per_game}</p>
                    </div>
                )}

                {response.position.toLowerCase() === 'defender' && (
                    <div className="position-stats">
                        <p><strong>Tackles per game:</strong> {response.tackles_per_game}</p>
                        <p><strong>Interceptions per game:</strong> {response.interceptions_per_game}</p>
                        <p><strong>Clearances per game:</strong> {response.clearances_per_game}</p>
                    </div>
                )}

                {response.position.toLowerCase() === 'goalkeeper' && (
                    <div className="position-stats">
                        <p><strong>Saves per game:</strong> {response.saves_per_game}</p>
                        <p><strong>Clean sheets:</strong> {response.clean_sheets}</p>
                        <p><strong>Goals conceded per game:</strong> {response.goals_conceded_per_game}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Statistics;
