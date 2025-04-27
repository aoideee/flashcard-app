// File: routes/cardRoutes.js

const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cardController");

/** GET /cards - list all cards */
router.get("/", ctrl.list);

/** GET /cards/new - form to create card */
router.get("/new", ctrl.showForm);

/** POST /cards - create card */
router.post("/", ctrl.create);

/** GET /cards/study - study interface */
router.get("/study", ctrl.study);

/** GET /cards/:id/edit - form to edit card */
router.get("/:id/edit", ctrl.editForm);

/** PUT /cards/:id - update card */
router.put("/:id", ctrl.update);

/** DELETE /cards/:id - delete card */
router.delete("/:id", ctrl.remove);

module.exports = router;