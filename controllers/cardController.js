// File: controllers/cardControllers.js

const model = require("../models/cardModel");

/**
 * Render the list of all flashcards.
 */
exports.list = async (req, res, next) => {
  try {
    const cards = await model.getAllCards();
    res.render("cards/index", { cards });
  } catch (error) {
    console.error("cardController.list error:", error);
    next(error);
  }
};

/**
 * Show the form to create a new flashcard.
 */
exports.showForm = (req, res) => {
  res.render("cards/form", {
    card: {},
    action: "/cards",
    method: "POST",
  });
};

/**
 * Handle creating a new flashcard.
 */
exports.create = async (req, res, next) => {
  try {
    const { front, back } = req.body;
    if (!front || !back) {
      return res.status(400).send("Front and back fields are required.");
    }
    await model.createCard({ front, back });
    res.redirect("/cards");
  } catch (error) {
    console.error("cardController.create error:", error);
    next(error);
  }
};

/**
 * Show the edit form for an existing flashcard.
 */
exports.editForm = async (req, res, next) => {
  try {
    const id = req.params.id;
    const card = await model.getCardById(id);
    if (!card) {
      return res.status(404).send("Card not found");
    }
    res.render("cards/form", {
      card,
      action: `/cards/${id}?_method=PUT`,
      method: "POST",
    });
  } catch (error) {
    console.error("cardController.editForm error:", error);
    next(error);
  }
};

/**
 * Handle updating an existing flashcard.
 */
exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { front, back } = req.body;
    if (!front || !back) {
      return res.status(400).send("Front and back fields are required.");
    }
    await model.updateCard(id, { front, back });
    res.redirect("/cards");
  } catch (error) {
    console.error("cardController.update error:", error);
    next(error);
  }
};

/**
 * Handle deleting a flashcard.
 */
exports.remove = async (req, res, next) => {
  try {
    const id = req.params.id;
    await model.deleteCard(id);
    res.redirect("/cards");
  } catch (error) {
    console.error("cardController.remove error:", error);
    next(error);
  }
};

/**
 * Render the study interface with all flashcards.
 */
exports.study = async (req, res, next) => {
  try {
    const cards = await model.getAllCards();
    res.render("cards/study", { cards });
  } catch (error) {
    console.error("cardController.study error:", error);
    next(error);
  }
};
