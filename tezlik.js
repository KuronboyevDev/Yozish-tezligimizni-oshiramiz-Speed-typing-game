const word = document.getElementById('word');
const text = document.getElementById('text');
const ballEl = document.getElementById('ball');
const vaqtEl = document.getElementById('vaqt');
const tugashQism = document.getElementById('tugash-qismi');
const parametrlarBtn = document.getElementById('parametrlar-btn');
const parametrlar = document.getElementById('parametrlar');
const parametrlarForm = document.getElementById('parametrlar-form');
const qiyinligiSelect = document.getElementById('qiyinligi');


const words = [
    'Dasturlash Olami',
    'loyiha',
    'dastur',
    'html',
    'bootstrap',
    'javascript',
    'node.js',
    'python',
    'programming',
    'satr',
    'hujjat',

];


let randomWord;


let ball = 0;


let vaqt = 10;


let qiyinligi =
    localStorage.getItem('qiyinligi') !== null ?
    localStorage.getItem('qiyinligi') :
    'medium';


qiyinligiSelect.value =
    localStorage.getItem('qiyinligi') !== null ?
    localStorage.getItem('qiyinligi') :
    'medium';


text.focus();


const vaqtInterval = setInterval(updatevaqt, 1000);


function getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}


function addWordToDOM() {
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}


function updateball() {
    ball++;
    ballEl.innerHTML = ball;
}


function updatevaqt() {
    vaqt--;
    vaqtEl.innerHTML = vaqt + 's';

    if (vaqt === 0) {
        clearInterval(vaqtInterval);

        gameOver();
    }
}


function gameOver() {
    tugashQism.innerHTML = `
    <h1>Vaqtingiz tugadi</h1>
    <p>Sizning yakuniy ballingiz ${ball}</p>
    <button onclick="location.reload()">Boshidan</button>
  `;

    tugashQism.style.display = 'flex';
}

addWordToDOM();

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateball();


        e.target.value = '';

        if (qiyinligi === 'qiyin') {
            vaqt += 2;
        } else if (qiyinligi === 'normal') {
            vaqt += 3;
        } else {
            vaqt += 5;
        }

        updatevaqt();
    }
});


parametrlarBtn.addEventListener('click', () => parametrlar.classList.toggle('hide'));


parametrlarForm.addEventListener('change', e => {
    qiyinligi = e.target.value;
    localStorage.setItem('qiyinligi', qiyinligi);
});