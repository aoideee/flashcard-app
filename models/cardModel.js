// File: models/cardModel.js

const pool = require("../config/db");

/**
 * Retrieve all flashcards from the database, ordered by ID.
 * @returns {Promise<Array<Object>>} Array of card objects
 */
const getAllCards = async () => {
  try {
    const res = await pool.query("SELECT * FROM cards ORDER BY id");
    return res.rows;
  } catch (error) {
    console.error("cardModel.getAllCards error:", error);
    throw error;
  }
};

/**
 * Retrieve a single flashcard by its ID.
 * @param {number} id - The ID of the card
 * @returns {Promise<Object|null>} The card object or null if not found
 */
const getCardById = async (id) => {
  try {
    const res = await pool.query("SELECT * FROM cards WHERE id = $1", [id]);
    return res.rows[0] || null;
  } catch (error) {
    console.error(`cardModel.getCardById(${id}) error:`, error);
    throw error;
  }
};

/**
 * Create a new flashcard.
 * @param {Object} card - The card data
 * @param {string} card.front - The front text
 * @param {string} card.back  - The back text
 * @returns {Promise<void>}
 */
const createCard = async ({ front, back }) => {
  try {
    await pool.query("INSERT INTO cards(front, back) VALUES($1, $2)", [
      front,
      back,
    ]);
  } catch (error) {
    console.error("cardModel.createCard error:", error);
    throw error;
  }
};

/**
 * Update an existing flashcard.
 * @param {number} id - The ID of the card to update
 * @param {Object} card - The updated card data
 * @param {string} card.front - The new front text
 * @param {string} card.back  - The new back text
 * @returns {Promise<void>}
 */
const updateCard = async (id, { front, back }) => {
  try {
    await pool.query("UPDATE cards SET front = $1, back = $2 WHERE id = $3", [
      front,
      back,
      id,
    ]);
  } catch (error) {
    console.error(`cardModel.updateCard(${id}) error:`, error);
    throw error;
  }
};

/**
 * Delete a flashcard by its ID.
 * @param {number} id - The ID of the card to delete
 * @returns {Promise<void>}
 */
const deleteCard = async (id) => {
  try {
    await pool.query("DELETE FROM cards WHERE id = $1", [id]);
  } catch (error) {
    console.error(`cardModel.deleteCard(${id}) error:`, error);
    throw error;
  }
};

module.exports = {
  getAllCards,
  getCardById,
  createCard,
  updateCard,
  deleteCard,
};