import { backend } from 'declarations/backend';

let currentPuzzle;
let currentPuzzleIndex = 0;

async function fetchRandomPuzzle() {
  try {
    const puzzle = await backend.getRandomPuzzle();
    if (puzzle) {
      currentPuzzle = puzzle;
      renderPuzzle();
    } else {
      console.error('No puzzle available');
    }
  } catch (error) {
    console.error('Error fetching puzzle:', error);
  }
}

function renderPuzzle() {
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  
  currentPuzzle.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const input = document.createElement('input');
      input.type = 'text';
      input.maxLength = 1;
      input.dataset.row = rowIndex;
      input.dataset.col = colIndex;
      
      if (cell === null) {
        input.disabled = true;
        input.classList.add('blocked');
      }
      
      grid.appendChild(input);
    });
  });

  renderClues('across-clues', currentPuzzle.acrossClues);
  renderClues('down-clues', currentPuzzle.downClues);
}

function renderClues(elementId, clues) {
  const cluesList = document.getElementById(elementId);
  cluesList.innerHTML = '';
  clues.forEach(([number, clue]) => {
    const li = document.createElement('li');
    li.textContent = `${number}. ${clue}`;
    cluesList.appendChild(li);
  });
}

async function checkAnswers() {
  const inputs = document.querySelectorAll('#grid input:not(.blocked)');
  let allCorrect = true;

  for (const input of inputs) {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const answer = input.value.toUpperCase();

    if (answer) {
      const isCorrect = await backend.verifyAnswer(currentPuzzleIndex, row, col, answer.charCodeAt(0));
      input.classList.toggle('correct', isCorrect);
      input.classList.toggle('incorrect', !isCorrect);
      if (!isCorrect) allCorrect = false;
    } else {
      input.classList.remove('correct', 'incorrect');
      allCorrect = false;
    }
  }

  if (allCorrect) {
    alert('Congratulations! You solved the puzzle!');
  }
}

document.getElementById('check-answers').addEventListener('click', checkAnswers);
document.getElementById('new-puzzle').addEventListener('click', fetchRandomPuzzle);

// Initial puzzle fetch
fetchRandomPuzzle();
