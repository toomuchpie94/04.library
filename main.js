//Library constructor
function library(owner) {
    this.owner = owner;
    this.books = [];
}
//Attaches locations to books in library for easy reference
library.prototype.assignBookLocation = function() {
    for(i in myLibrary.books){
        myLibrary.books[i].libraryOrder = i;
    }
}

//book constructor
function book(title, author) {
    this.title = title;
    this.author = author;
    this.libraryOrder = 0; //determines location in library for easy removal
    this.read = false;
}
//toggles book read status
book.prototype.markAsRead = function() {
    this.read = !this.read;
}
//removes book from library
book.prototype.removeBookFromLibrary = function() {
    myLibrary.books.splice(this.libraryOrder,1);
    myLibrary.assignBookLocation();
}

//function to add new book
function addBookToLibrary(book) {
    let librarySize = myLibrary.books.length;
    myLibrary.books.push(book);
    book.libraryOrder = librarySize;
}

/* LIBRARY UI */


//library DOM
function createLibraryDOM(library){
    let libraryDOM = document.createElement('div');
    libraryDOM.className = "library"

    let libraryOwnerDOM = document.createElement('h1');
    libraryOwnerDOM.className = "libraryowner";
    libraryOwnerDOM.textContent = library.owner;
    let addBookButton = document.createElement('button');
    addBookButton.id = "addbookbutton";
    addBookButton.textContent = "+";
    addBookButton.addEventListener('click', function(){
        newBookForm()
    })
    let bookShelfDOM = document.createElement('div');
    bookShelfDOM.className = "bookshelf";

    libraryDOM.append(libraryOwnerDOM, addBookButton, bookShelfDOM);
}

//creates a book DOM
function createBookDOM(book){
    let bookDOM = document.createElement('div');
    bookDOM.className = "book";

    let titleDOM = document.createElement('h1');
    titleDOM.className = "title";
    titleDOM.textContent = book.title;
    let authorDOM = document.createElement('h2');
    authorDOM.className = "author";
    authorDOM.textContent = book.author;
    let readDOM = document.createElement('input');
    readDOM.type = "checkbox";
    readDOM.className = "readstatus";
    readDOM.checked = book.read;
    readDOM.addEventListener('change', function() {
        book.read = readDOM.checked;
    });
    //remove book button

    bookDOM.append(titleDOM, authorDOM, readDOM);

    return bookDOM;
}



