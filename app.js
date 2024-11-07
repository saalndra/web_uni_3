// app.js
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
import { database } from './firebase-config.js';

// HTML елементи
const noteInput = document.getElementById('noteInput');
const saveButton = document.getElementById('saveButton');
const notesContainer = document.getElementById('notesContainer');

// Створення посилання на колекцію нотаток у базі даних
const notesRef = ref(database, 'notes');

// Функція для збереження нотатки
saveButton.addEventListener('click', () => {
    const noteText = noteInput.value.trim();
    if (noteText) {
        push(notesRef, { text: noteText })
            .then(() => {
                noteInput.value = ''; // Очистити поле після збереження
            })
            .catch((error) => {
                console.error("Помилка при збереженні нотатки:", error);
            });
    } else {
        alert("Поле не може бути порожнім.");
    }
});

// Функція для завантаження нотаток у режимі реального часу
onValue(notesRef, (snapshot) => {
    notesContainer.innerHTML = ''; // Очищуємо контейнер перед оновленням
    const data = snapshot.val();
    if (data) {
        Object.values(data).forEach((note) => {
            const noteElement = document.createElement('div');
            noteElement.className = 'note';
            noteElement.textContent = note.text;
            notesContainer.appendChild(noteElement);
        });
    }
});
