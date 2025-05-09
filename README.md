# PixelPedia (Flashcard App)

**PixelPedia** is a cute, pixel-art-themed flashcard web application for creating, reviewing, and managing study cards—think Quizlet, but in retro pastel pixel style.

---
## Table of Contents
1. [Features](#features)
2. [Technology Stack](#technology-stack)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Database Setup](#database-setup)
6. [Running the App](#running-the-app)
7. [File Structure](#file-structure)
8. [Usage](#usage)
9. [Error Handling & 404](#error-handling--404)

---
## Features
- **Create** new flashcards (front/back text)
- **View** all cards in a deck
- **Edit** and **Delete** existing cards
- **Study Mode**: click-to-flip interface with progress counter
- Responsive layout using **Flexbox** & **CSS Grid**
- **PixelPedia** aesthetic with custom CSS theme

---
## Technology Stack
- **Server**: Node.js, Express.js
- **Templating**: EJS (Embedded JavaScript)
- **Database**: PostgreSQL (via `pg`)
- **Styling**: Vanilla CSS, Flexbox & Grid, pixel-font
- **Version Control**: Git

---
## Prerequisites
- [Node.js](https://nodejs.org/) v16+
- [npm](https://www.npmjs.com/) (bundled with Node)
- [PostgreSQL](https://www.postgresql.org/) v13+

---
## Installation
1. **Clone** the repo:
   ```bash
   git clone https://github.com/aoideee/flashcard-app.git
   cd flashcard-app
   ```
2. **Install** dependencies:
   ```bash
   npm install
   ```
3. **Configure** environment variables:
   - Copy `.env.example` to `.env`
   - Fill in PostgreSQL credentials:
     ```ini
     DB_HOST=localhost
     DB_PORT=5432
     DB_USER=flashcards
     DB_PASSWORD=yourpassword
     DB_NAME=flashcards
     PORT=3000
     ```

---
## Database Setup
1. **Create** the database & user (run as `postgres` superuser):
   ```bash
   sudo -u postgres psql -f db-setup.sql
   ```
   This script will:
   - Create `flashcards` database
   - Create `flashcards` role/user
   - Grant privileges
   - Create the `cards` table

2. **Verify** connection:
   ```bash
   psql -d flashcards -U flashcards
   SELECT * FROM cards;
   ```

---
## Running the App
- **Start** the server:
  ```bash
  npm start
  ```
- Visit [http://localhost:3000](http://localhost:3000/) in your browser.
- **Dev mode** (with live reload):
  ```bash
  npm run dev
  ```

---
## File Structure
```
flashcard-app/
├── app.js                 # Entry point
├── .env                   # Environment variables
├── .gitignore
├── db-setup.sql           # SQL script to create DB & table
├── package.json
├── config/
│   └── db.js              # PostgreSQL pool & query helper
├── models/
│   └── cardModel.js       # CRUD queries
├── controllers/
│   └── cardController.js  # Route handlers
├── routes/
│   └── cardRoutes.js      # Express routes
├── views/                 # EJS templates
│   ├── notfoundpage.ejs   # 404 page
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   └── cards/
│       ├── index.ejs      # Deck view
│       ├── form.ejs       # Create/Edit form
│       └── study.ejs      # Study interface
└── public/
    ├── css/style.css
    └── js/study.js
```

---
## Usage
1. **Deck**: Browse all cards.
2. **New Card**: Add front/back text.
3. **Study**: Flip through cards, track progress (e.g. 4/20).
4. **Edit/Delete**: Manage cards either from deck or study screen.
5. **404**: Typos in URL render a friendly "Page Not Found".

---
## Error Handling & 404
- All database queries wrapped in `try/catch` with console logging.
- Express middleware catches undefined routes and serves `notfoundpage.ejs`.
