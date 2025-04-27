// File: public/js/study.js

// Grab DOM elements once on load
const flashcard  = document.getElementById('flashcard');
const counter    = document.querySelector('.counter');
const prevBtn    = document.getElementById('prev');
const nextBtn    = document.getElementById('next');
const editBtn    = document.getElementById('edit-btn');
const deleteBtn  = document.getElementById('delete-btn');

// Parse flashcards data passed via data-attribute
const cards = JSON.parse(flashcard.dataset.cards);
let index   = 0; // current card index

/**
 * updateCard()
 * - Renders the front/back text and counter
 * - Resets flip state to show front
 */
function updateCard() {
  flashcard.querySelector('.front').textContent = cards[index].front;
  flashcard.querySelector('.back').textContent  = cards[index].back;
  counter.textContent = `${index + 1}/${cards.length}`;
  flashcard.classList.remove('flip');
}

// Flip card on click
flashcard.addEventListener('click', () => {
  flashcard.classList.toggle('flip');
});

// Show previous card
prevBtn.addEventListener('click', () => {
  index = (index - 1 + cards.length) % cards.length;
  updateCard();
});

// Show next card
nextBtn.addEventListener('click', () => {
  index = (index + 1) % cards.length;
  updateCard();
});

// Navigate to edit page for current card
editBtn.addEventListener('click', () => {
  window.location.href = `/cards/${cards[index].id}/edit`;
});

// Confirm deletion, then remove and redirect to deck
deleteBtn.addEventListener('click', () => {
  if (!confirm('Delete this card?')) return;
  fetch(`/cards/${cards[index].id}?_method=DELETE`, { method: 'POST' })
    .then(() => window.location.href = '/cards');
});

// Initial call to render the first card
updateCard();