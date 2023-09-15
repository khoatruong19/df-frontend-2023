const modalsElement = document.getElementById('modals');
const addBookFormElement = document.getElementById('add-book-form');
const booksTableBodyElement = document.getElementById('books-table-body');
const deleteBookNameElement = document.getElementById('delete-book-name');

const DELETE_BOOKS_CONFIRMATION_CLASSNAME = 'delete-book-confirmation';

let modalOpeningClassName = '';
let selectedBookIndex = 0;

const books = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : [];

const openModal = (modalClass) => {
  const modalElement = document.querySelector('.' + modalClass);
  modalOpeningClassName = modalClass;

  modalsElement.classList.toggle('modal-close');
  modalElement.classList.toggle('modal-close');

  const formOfModal = document.querySelector('.' + modalClass + ' form');
  if (!formOfModal) return;

  const inputsOfForm = document.querySelectorAll(
    '.' + modalClass + ' form input'
  );

  if (inputsOfForm.length > 0) {
    inputsOfForm.forEach((input) => {
      input.value = '';
    });
    inputsOfForm[0].focus();
  }
};

const closeModal = () => {
  const modalElement = document.querySelector('.' + modalOpeningClassName);
  if (!modalElement) return;

  modalsElement.classList.toggle('modal-close');
  modalElement.classList.toggle('modal-close');
};

const openDeleteBookModal = (index) => {
  if (!books[selectedBookIndex]) return;
  openModal(DELETE_BOOKS_CONFIRMATION_CLASSNAME);
  selectedBookIndex = index;
  deleteBookNameElement.innerText = books[selectedBookIndex].name;
};

const saveBooksToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const deleteBookByIndex = () => {
  if (!books[selectedBookIndex]) return;
  books.splice(selectedBookIndex, 1);
  saveBooksToLocalStorage();
  renderBookRows();
  closeModal();
};

const addBookRowHTML = (book, order) => {
  const bookRowHTML = `<tr>
  <td>${order}</td>
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.topic}</td>
  <td class="book-actions" onclick='openDeleteBookModal(${
    order - 1
  })'>Delete</td>
</tr>`;

  booksTableBodyElement.innerHTML =
    booksTableBodyElement.innerHTML + bookRowHTML;
};
const renderBookRows = () => {
  booksTableBodyElement.innerHTML = '';
  books.forEach((item, index) => {
    addBookRowHTML(item, index + 1);
  });
};

const addBook = (book) => {
  const existingBook = books.find(
    (item) => JSON.stringify(book) == JSON.stringify(item)
  );
  if (existingBook) return alert('This book is existing');

  books.push(book);
  saveBooksToLocalStorage();
  addBookRowHTML(book, books.length);
  closeModal();
};

addBookFormElement.addEventListener('submit', (e) => {
  e.preventDefault();

  const bookNameInput = document.getElementById('book-name');
  const bookAuthorInput = document.getElementById('book-author');
  const bookTopicInput = document.getElementById('book-topic');

  addBook({
    name: bookNameInput.value,
    author: bookAuthorInput.value,
    topic: bookTopicInput.value,
  });
});

renderBookRows();
