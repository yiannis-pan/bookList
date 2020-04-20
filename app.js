class Book{
    constructor(input){
        this.title = input[0];
        this.author = input[1];
        this.isbn = input[2];
    }

}

class UI{
    gatherInput(){
        const userInput = [];
        userInput[0] = document.getElementById('title').value;
        userInput[1] = document.getElementById('author').value;
        userInput[2] = document.getElementById('isbn').value;

        return userInput;
    }

    validateUserInput(userInput){
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

    addBookToHTML(book){
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</td>`;

        const bookList = document.getElementById('book-list');
        bookList.appendChild(row);
    }

    showAlert(msg, className){
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


    resetFields(){
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }



}


document.getElementById('book-form').addEventListener('submit', function(e){
    const ui = new UI;
    const input = ui.gatherInput();
    if (ui.validateUserInput(input)){
        const book = new Book(input);
        ui.addBookToHTML(book);
        ui.showAlert('Book added', 'success');
    } else {
        ui.showAlert('Please enter all fields','error')
    }

    ui.resetFields();

    e.preventDefault();
});


document.getElementById