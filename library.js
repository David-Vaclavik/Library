// All books should be in an array
const myLibrary = [];

// ================================================

// All books should be objects in an array
const myLibraryTest = [
  {id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: false},
  {id: 2, title: '1984', author: 'George Orwell', pages: 328, read: true},
  {id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', pages: 281, read: true}
];
// console.log(myLibraryTest[0].pages);

const book2 = {id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', pages: 310, read: false};
/*
for (const key in book2) {
  // console.log(key);        // Logs: "id", "title", "author"
  // console.log(book2[key]);  // Logs: 1, "The Hobbit", "Tolkien"

  if (key === "id") {
    console.log("ID is " + book2[key]);
  } else if (key === "title") {
    console.log("Title is " + book2[key]);
  } else if (key === "author") {
    console.log("Author is " + book2[key]);
  }
}
*/
//? Below for dev purposes to add button
let title = book2.title;
let author = book2.author;
let pages = book2.pages;
let read = book2.read;

// ================================================
// Book constructor
function Book(id, title, author, pages, read) {
  // console.log("Book construction started");
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

//TODO: Book library
function addBookToLibrary(id, title, author, pages, read) {
  // take params, create a book then store it in the array

  const newBook = new Book(id, title, author, pages, read);

  myLibrary.push(newBook);
  console.log(myLibrary);
}

// const dialog = document.querySelector("dialog")
const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
const submitButton = document.querySelector(".submit-button")
const form = document.querySelector('form');


openButton.addEventListener('click', () => {
  modal.showModal();
})

closeButton.addEventListener('click', () => {
  modal.close();
})

// Initial ID
let id = 1;

form.addEventListener('submit', (e) => {
  // console.log("form submitted");
  e.preventDefault(); // Prevent form from submitting normally
    
  // Get form input values
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const readInput = document.getElementById('read').checked;

  appendToMain(titleInput, authorInput, pagesInput, readInput)

  // const newBook = new Book(id, titleInput, authorInput, parseInt(pagesInput), readInput);
 
  //TODO: Testing function
  addBookToLibrary(id, titleInput, authorInput, parseInt(pagesInput), readInput);

  //** increments ID each time a book is added
  id++;

  // myLibrary.push(newBook);
  // console.log(myLibrary);

  form.reset();
  modal.close();
})

// Closes modal when clicked outside of the modal
modal.addEventListener("click", e => {
  const dialogDimensions = modal.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    modal.close()
  }
})


// Removes cards
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    // Remove the parent card from DOM
    e.target.parentElement.remove();

    //? maybe also delete the book from the array?
  }
});


// Selects Main
const selectMain = document.querySelector("main");
// const appendToMain = (value) => selectMain.textContent += value; - destroys all HTML
// const appendToMain = (value) => selectMain.innerHTML += value; - better

// listens for button click
const addBookBtn = document.querySelector(".add-book");
addBookBtn.addEventListener('click', () => appendToMain(title, author, pages, read));

const appendToMain = (title, author, pages, read) => {
    const div = document.createElement('div');
    div.className = 'card';

    const h3 = document.createElement('h3');
    h3.textContent = title;
    div.appendChild(h3);

    const pAuthor = document.createElement('p');
    pAuthor.textContent = 'Author: ' + author;
    div.appendChild(pAuthor);

    const pPages = document.createElement('p');
    pPages.textContent = 'Pages: ' + pages;
    div.appendChild(pPages);

    const pRead = document.createElement('p');
    pRead.textContent = 'Status: ' + (read ? 'Read' : 'Not read yet');
    div.appendChild(pRead);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.textContent = 'Remove';
    div.appendChild(removeBtn);

    selectMain.appendChild(div);
};



// function Slayer(name, marker) {
//   this.name = name;
  // this.marker = marker;
// }

// // You can use it by calling the function with the keyword "new"
// const player = new Player('steve', 'X');
// console.log(player.name); // 'steve'