function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = read;
}

Book.prototype.info = function() {
    return `${this.title} by ${this.author}, ${this.pages} pages, ` + 
        hasRead ? 'read' : 'not read yet';
}

function addBookToLibrary (title, author, page, hasRead) {
    let book = new Book(title, author, page, hasRead);
    myLibrary.push(book);
}

function displayBooks() {
    let catalog = document.getElementById('catalog');
    
    // delete what's currently being displayed
    while (catalog.firstChild) {    
        catalog.removeChild(catalog.firstChild);
    }

    let header = catalog.insertRow(-1);
    let hTitle = header.insertCell(0);
    let hAuthor = header.insertCell(1);
    let hPages = header.insertCell(2);
    let hRead = header.insertCell(3);
    let hDelete = header.insertCell(4);
    let hModify = header.insertCell(5);
    hTitle.innerHTML = 'Title';
    hAuthor.innerHTML = 'Author';
    hPages.innerHTML = 'Pages';
    hRead.innertHTML = 'Read?';
    hDelete.innerHTML = '';
    hModify.innerHTML = '';

    for(let i=0; i<myLibrary.length; i++) {
        let book = myLibrary[i];
        let row = catalog.insertRow(-1);
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        let hasRead = row.insertCell(3);
        title.innerHTML = book.title;
        author.innerHTML = book.author;
        pages.innerHTML = book.pages;
        hasRead.innerHTML = book.hasRead ? 'read' : 'not read yet';

        let deleteBook = document.createElement('input');
        deleteBook.type = 'button';
        deleteBook.value = 'delete';
        deleteBook.dataset.index = i;
        deleteBook.addEventListener('click', function(e) {
            let indexToDelete = parseInt(this.dataset.index);
            myLibrary.splice(indexToDelete, 1);
            displayBooks();
        });
        row.appendChild(deleteBook);

        let changeRead = document.createElement('input');
        changeRead.type = 'button';
        changeRead.value = 'toggle read';
        changeRead.dataset.index = i;
        changeRead.addEventListener('click', function(e) {
            myLibrary[i].hasRead = !(myLibrary[i].hasRead);
            displayBooks();
        });
        row.appendChild(changeRead);
    }
}

function turnFormOn() {
    document.getElementById('overlay').style.display = 'block';
}
  
function turnFormOff() {
    document.getElementById('overlay').style.display = 'none';
} 


let myLibrary = [];

addBookToLibrary('crime and punishment', 'fyodor dostoevsky', 455, false);
addBookToLibrary('anna karenina', 'leo tolstoy', 341, false);
addBookToLibrary('infinite jest', 'david foster wallace', 827, true);

let addBookButton = document.getElementById('add-book');

addBookButton.addEventListener('click', function (e) {
    turnFormOn();    
})

document.addEventListener('submit', function(e) {
    e.preventDefault();

    // is there a way to only allow submit from click of submit button
    // versus also pressing enter in form input field?
    const titleElement = document.getElementById('title');
    let title = titleElement.value;
    if(!title) {
        alert('title is empty');
        return;
    }
    const authorElement = document.getElementById('author');
    let author = authorElement.value;
    if(!author) {
        alert('author is empty');
        return;
    }
    const pagesElement = document.getElementById('pages');
    let pages = parseInt(pagesElement.value);
    if(!pages || pages <= 0) {
        alert('error parsing page number: ' + pages);
        return;
    }
    const hasReadElement = document.getElementById('hasRead');
    let hasRead = hasReadElement.checked;
    addBookToLibrary(title, author, pages, hasRead);
    turnFormOff();
    displayBooks();
});

displayBooks();