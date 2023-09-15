const modalsElement = document.getElementById('modals');

let modalOpeningClassName = '';

const openModal = (modalClass) => {
  const modalElement = document.querySelector('.' + modalClass);
  modalOpeningClassName = modalClass;

  modalsElement.classList.toggle('modal-close');
  modalElement.classList.toggle('modal-close');
};

const closeModal = () => {
  const modalElement = document.querySelector('.' + modalOpeningClassName);
  if (!modalElement) return;

  modalsElement.classList.toggle('modal-close');
  modalElement.classList.toggle('modal-close');
};
