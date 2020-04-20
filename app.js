class Book{
    constructor(input){
        this.title = input[0];
        this.author = input[1];
        this.isbn = input[2];
    }

}

class UI{
    static gatherInput(){
        const userInput = [];
        userInput[0] = document.getElementById('title').value;
        userInput[1] = document.getElementById('author').value;
        userInput[2] = document.getElementById('isbn').value;

        return userInput;
    }

    static validateUserInput(userInput){
        let validate = false;

        userInput.forEach(e => {
            if (e == ''){
                validate = false;
            } else {
                validate = true;
            }
        });

        return validate;
    }

    static addBookToHTML(book){
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>`;

        const bookList = document.getElementById('book-list');
        bookList.appendChild(row);
    }

    static showAlert(msg, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(msg));

        const container = document.querySelector('.container');
        const form = document.getElementById('book-form');

        container.insertBefore(div, form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }


    static resetFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    static deleteBook(target){
        if (target.className === 'delete'){
            target.parentElement.parentElement.remove();
        }

    }

}

class Store{
    static getBooks(){
        let books;

        if (localStorage.getItem('books') === null){
            console.log('Another test');
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }    
        return books;
    };

    static displayBooks(){
        console.log('test');
        let books = Store.getBooks();
        books.forEach(function(book){
            console.log('test3');
            UI.addBookToHTML(book);
        })
    }

    static addBookToStorage(book){
        let books = Store.getBooks();
        books.push(book);
        console.log(books);
        localStorage.setItem('books', JSON.stringify(books));
    };

    static removeBookFromStorage(target, index){
        let books = Store.getBooks();
        books.forEach(function(book){
            if (book.isbn === target.parentElement.previousElementSibling.textContent){ 
                books.splice(index, 1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    };
    
}

window.addEventListener('DOMContentLoaded', Store.displayBooks);



document.getElementById('book-form').addEventListener('submit', function(e){
    const input = UI.gatherInput();
    if (UI.validateUserInput(input)){
        const book = new Book(input);
        UI.addBookToHTML(book);
        Store.addBookToStorage(book);
        UI.showAlert('Book added', 'success');
    } else {
        UI.showAlert('Please enter all fields','error')
    }

    UI.resetFields();

    e.preventDefault();
});


document.querySelector('#book-list').addEventListener('click', function(e){
    UI.deleteBook(e.target);
    Store.removeBookFromStorage(e.target)
    UI.showAlert('Book removed', 'success');
});

