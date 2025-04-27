// File: app.js

const express = require("express"); // Import Express
const methodOverride = require("method-override"); // To support PUT & DELETE via forms
require("dotenv").config(); // Load environment variables

const app = express(); // Initialize app

// ----- View Engine & Middleware -----
app.set("view engine", "ejs"); // Use EJS for templating
app.use(express.static("public")); // Serve static files
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride("_method")); // Override methods in query string

// ----- Routes -----
const cardRoutes = require("./routes/cardRoutes");
app.use("/cards", cardRoutes); // Mount card routes
app.get("/", (req, res) => res.redirect("/cards")); // Redirect root

// ----- 404 Handler -----
app.use((req, res) => {
  res.status(404).render("notfoundpage"); // Render 404 page
});

// ----- Start Server -----
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);