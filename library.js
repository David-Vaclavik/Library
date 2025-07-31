class Book {
  constructor(id, title, author, pages, read) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

// All books should be objects in an array
const myLibrary = [
  new Book(1, 'The Hobbit', 'J.R.R. Tolkien', 310, false),
  new Book(2, '1984', 'George Orwell', 328, true),
  new Book(3, 'To Kill a Mockingbird', 'Harper Lee', 281, true),
  new Book(4, 'The Great Gatsby', 'F. Scott Fitzgerald', 180, false),
];

class Library {
  static addBook(id, title, author, pages, read) {
    const newBook = new Book(id, title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
  }

  static removeBook(book) {
    if (book) {
      const index = myLibrary.indexOf(book);
      myLibrary.splice(index, 1);
    }
  }
}

const openButton = document.querySelector("[data-open-modal]")
const closeButton = document.querySelector("[data-close-modal]")
const modal = document.querySelector("[data-modal]")
const form = document.querySelector('form');

openButton.addEventListener('click', () => {
  modal.showModal();
})

closeButton.addEventListener('click', () => {
  modal.close();
})

//** Initial ID - starts from 5 because we have few examples in myLibrary = []
let id = 5;

form.addEventListener('submit', (e) => {
  e.preventDefault();
    
  // Get form input values
  const titleInput = document.getElementById('title').value;
  const authorInput = document.getElementById('author').value;
  const pagesInput = document.getElementById('pages').value;
  const readInput = document.getElementById('read').checked;
  
  Library.addBook(id, titleInput, authorInput, parseInt(pagesInput), readInput);

  appendToMain(id, titleInput, authorInput, pagesInput, readInput)

  //** increments ID each time a book is added
  id++;

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
    const bookCard = e.target.parentElement;
    const bookId = parseInt(bookCard.id);
    const book = myLibrary.find(book => book.id === bookId);

    // Remove from array
    Library.removeBook(book);

    // Remove from DOM
    bookCard.remove();
  }
});

const appendToMain = (bookId, title, author, pages, read) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.id = bookId;

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
    pRead.textContent = 'Status: ' + (read ? 'Read' : 'Not Read');
    div.appendChild(pRead);

    const statusBtn = document.createElement('button');
    statusBtn.className = 'status';
    statusBtn.classList.add(read ? 'read' : 'not-read');
    statusBtn.textContent = (read ? 'Read' : 'Not Read');
    div.appendChild(statusBtn);

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove';
    removeBtn.textContent = 'Remove';
    div.appendChild(removeBtn);

    const selectMain = document.querySelector("main");
    selectMain.appendChild(div);
};

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('status')) {

    const bookCard = e.target.parentElement;
    const bookId = parseInt(bookCard.id);

    const book = myLibrary.find(book => book.id === bookId);
    if (book) {
      book.toggleReadStatus();
      
      // Button with status
      e.target.textContent = book.read ? 'Read' : 'Not Read';
      e.target.classList.replace(
        book.read ? 'not-read' : 'read',
        book.read ? 'read' : 'not-read'
      )

      //Text paragraph with status
      const statusP = bookCard.querySelector('p:nth-child(4)');
      statusP.textContent = 'Status: ' + (book.read ? 'Read' : 'Not Read');
    }
  }
});

// Loops through the myLibrary array and calls appendToMain for all books in the array 
for (const book of myLibrary) {
  appendToMain(book.id, book.title, book.author, book.pages, book.read)
}
