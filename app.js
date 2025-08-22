let notes = [];

const noteForm = document.getElementById('noteForm');
const noteTitle = document.getElementById('noteTitle');
const noteContent = document.getElementById('noteContent');
const searchNote = document.getElementById('searchNote');
const notesContainer = document.getElementById('notesContainer');

function loadNotes() {
  const storeNotes = JSON.parse(localStorage.getItem('notes'));
  if (storeNotes) {
    notes = storeNotes;
    renderNotes();
  }
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(filter = '') {
  notesContainer.innerHTML = '';
  notes.forEach((note, index) => {
    if (
      note.title.toLowerCase().includes(filter.toLowerCase()) ||
      note.content.toLowerCase().includes(filter.toLowerCase())
    ) {
      const noteDiv = document.createElement('div');
      noteDiv.classList.add('note');
      noteDiv.innerHTML = `
        <h3>${note.title}</h3>
        <p>${note.content}</p>
        <button onclick="deleteNote(${index})">Delete</button>
      `;
      notesContainer.appendChild(noteDiv);
    }
  });
}

function addNote(e) {
  e.preventDefault();
  if (noteTitle.value && noteContent.value) {
    notes.push({ title: noteTitle.value, content: noteContent.value });
    saveNotes();
    renderNotes();
    noteForm.reset(); 
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes();
}

searchNote.addEventListener('input', () => renderNotes(searchNote.value));
noteForm.addEventListener('submit', addNote);

loadNotes();
