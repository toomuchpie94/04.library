//Library constructor
function library(owner) {
    this.owner = owner;
    this.books = [];
}
//Attaches locations to books in library for easy reference
library.prototype.assignBookLocation = function() {
    for(i in this.books){
        this.books[i].libraryOrder = i;
    }
}

//function to add new book
library.prototype.addBookToLibrary = function(book) {
    let librarySize = this.books.length;
    this.books.push(book);
    book.library = this;
    book.libraryOrder = librarySize;
}

//book constructor
function book(title, author) {
    this.title = title;
    this.author = author;
    this.library = '';
    this.libraryOrder = 0; //determines location in library for easy removal
    this.read = false;
}
//toggles book read status
book.prototype.markAsRead = function() {
    this.read = !this.read;
}
//removes book from library
book.prototype.removeBookFromLibrary = function() {
    this.library.books.splice(this.libraryOrder,1);
    this.library.assignBookLocation();
}



/* LIBRARY UI */

//library DOM
function createLibraryDOM(library){
    let libraryDOM = document.createElement('div');
    libraryDOM.className = "library"

    let libraryOwnerDOM = document.createElement('h1');
    libraryOwnerDOM.className = "libraryowner";
    libraryOwnerDOM.textContent = library.owner;
    let bookShelfDOM = document.createElement('div');
    bookShelfDOM.className = "bookshelf";

    //add book button will be on shelf
    let addBookButton = document.createElement('button');
    addBookButton.id = "addbookbutton";
    addBookButton.textContent = "+";
    addBookButton.addEventListener('click', function(){
        let newBook = createNewBook(library, bookShelfDOM);
        bookShelfDOM.replaceChild(newBook, addBookButton);
    });
    bookShelfDOM.appendChild(addBookButton);

    libraryDOM.append(libraryOwnerDOM, bookShelfDOM);
    
    return libraryDOM;
}

//Form for creating new book
function createNewBook(library, bookShelfDOM){
    let newBookForm = document.createElement('div');
    newBookForm.className = "book";

    let titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = "New Title"
    titleInput.className = "titleinput"
    let authorInput = document.createElement('input');
    authorInput.type = 'text';
    authorInput.placeholder = 'New Author'
    authorInput.className = "authorinput"
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit'
    submitButton.id = 'submitbutton'
    submitButton.addEventListener('click', function(){
        //creates new book given inputted title and author in place of input form
        let title = titleInput.value;
        let author = authorInput.value;
        let newBook = new book(title, author);
        library.addBookToLibrary(newBook);
        let newBookDOM = createBookDOM(newBook);
        newBookForm.parentNode.replaceChild(newBookDOM, newBookForm);

        //adds addBookButton at the end of the library
        let addBookButton = document.createElement('button');
        addBookButton.id = "addbookbutton";
        addBookButton.textContent = "+";
        addBookButton.addEventListener('click', function(){
            let newBook = createNewBook(library, bookShelfDOM);
            bookShelfDOM.replaceChild(newBook, addBookButton);
        });
        bookShelfDOM.appendChild(addBookButton);
    })

    

    newBookForm.append(titleInput,authorInput,submitButton);
    
    return newBookForm;
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
    readDOM.addEventListener('change', function(){
        book.read = readDOM.checked;
    });

    //remove book button
    let removeBookButton = document.createElement('button');
    removeBookButton.className = 'removebook'
    removeBookButton.textContent = 'x';
    removeBookButton.addEventListener('click', function(){
        book.removeBookFromLibrary();
        bookDOM.parentNode.removeChild(bookDOM);
    })

    bookDOM.append(titleDOM, authorDOM, readDOM, removeBookButton);

    return bookDOM;
}




let content = document.querySelector('#content');
let myLibrary = new library('alex');
let myLibraryDOM = createLibraryDOM(myLibrary);
content.appendChild(myLibraryDOM)

