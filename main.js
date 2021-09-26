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


