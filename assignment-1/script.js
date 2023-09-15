const modalsElement = document.getElementById('modals');
const addBookFormElement = document.getElementById('add-book-form');
const booksTableBodyElement = document.getElementById('books-table-body');
const deleteBookNameElement = document.getElementById('delete-book-name');
const searchInputElement = document.getElementById('search');

const DELETE_BOOKS_CONFIRMATION_CLASSNAME = 'delete-book-confirmation';

let modalOpeningClassName = '';
let selectedBookId = '';

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

const openDeleteBookModal = (id) => {
  const existingBookIndex = books.findIndex((item) => item.id === id);
  if (existingBookIndex < 0) return;

  openModal(DELETE_BOOKS_CONFIRMATION_CLASSNAME);
  selectedBookId = id;
  deleteBookNameElement.innerText = books[existingBookIndex].name;
};

const saveBooksToLocalStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};

const deleteBookById = () => {
  const existingBookIndex = books.findIndex(
    (item) => item.id === selectedBookId
  );
  if (existingBookIndex < 0) return;

  books.splice(existingBookIndex, 1);
  saveBooksToLocalStorage();
  searchBooks();
  closeModal();
};

const addBookRowHTML = (book, order) => {
  const bookRowHTML = `<tr>
  <td>${order}</td>
  <td>${book.name}</td>
  <td>${book.author}</td>
  <td>${book.topic}</td>
  <td class="book-actions" onclick=openDeleteBookModal('${book.id}')>Delete</td>
</tr>`;

  booksTableBodyElement.innerHTML =
    booksTableBodyElement.innerHTML + bookRowHTML;
};
const renderBookRows = (booksData) => {
  booksTableBodyElement.innerHTML = '';
  booksData.forEach((item, index) => {
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
    id: bookAuthorInput.value + bookNameInput.value + Math.random(),
    name: bookNameInput.value,
    author: bookAuthorInput.value,
    topic: bookTopicInput.value,
  });
});

const debounce = (func, delay = 100) => {
  let timer;

  return function (...args) {
    clearTimeout(timer);

    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const searchBooks = () => {
  const searchValue = searchInputElement.value.toLowerCase();

  const searchedBooks = books.filter(
    (book) =>
      book.name.includes(searchValue) || book.author.includes(searchValue)
  );

  renderBookRows(searchedBooks);
};

const onSearchInput = debounce(searchBooks, 500);

searchInputElement.addEventListener('input', () => {
  onSearchInput();
});

renderBookRows(books);
