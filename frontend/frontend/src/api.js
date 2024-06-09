// api.js

export const getUserFavorites = async (username) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/users/${username}/players`);
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw new Error('Error fetching user favorites');
    }
  };
  