import OpenAI from "openai";

/**
 * Retrieves the favorite players of a user.
 * @param {string} username - The username of the user whose favorite players are to be retrieved.
 * @returns {Promise<Array>} - A promise that resolves to an array of favorite player objects.
 * @throws {Error} - If there's an error fetching user favorites.
 */
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

/**
 * Removes a player from a user's favorites.
 * @param {string} username - The username of the user.
 * @param {string} player_id - The ID of the player to be removed from favorites.
 * @returns {Promise<Object>} - A promise that resolves to the response data.
 * @throws {Error} - If there's an error removing the player from favorites.
 */
export async function removeFromFavorites(username, player_id) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/api/users/${username}/favorite_players`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ player_id })
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error removing player from favorites: ${error.message}`);
  }
}

const api_key = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
    apiKey: api_key,
    dangerouslyAllowBrowser: true
});

export const getResponse = async (playerName) => {
    console.log("getResponse called");
    const response = await openai.chat.completions.create({
        messages: [
            {
                role: "user",
                content: `How many goals did {playerName} score in the last season?`,
            },
        ],
        model: "gpt-3.5-turbo",
        max_tokens: 150,
    });

    return response.choices[0].message.content;

};

export default getResponse;
