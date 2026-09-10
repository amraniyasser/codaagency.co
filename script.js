const form = document.getElementById('project-form');
const note = document.getElementById('form-note');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  note.textContent = 'Merci. Le formulaire est prêt visuellement ; on connectera l’envoi dès que tu me donnes l’adresse de réception.';
});
