const express = require('express')
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Hello, From Express server.")
})

const books = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },
    { id: 3, title: '1984', author: 'George Orwell', year: 1949 },
];

app.post("/books", (req, res) => {
    const newBook = req.body

    if (!newBook.title || !newBook.author || !newBook.year) {
        res.status(400).json({ error: "Title, author and year are required." })
    } else {
        books.push(newBook)
        res.status(201).json({ message: "Book added successfully.", book: newBook })
    }
})

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id

    const index = books.findIndex(book => book.id == bookId)

    if(index === -1){
        res.status(404).json({error: "Book Not Found."})
    }else{
        books.splice(index, 1)
        res.status(200).json({message: "Book Deleted Successfully"})
    }
})

app.get("/books", (req, res) => {
    res.send(books)
})

const todos = [
    { id: 1, title: "Water the plants", day: "Saturday" },
    { id: 2, title: 'Go for a walk', day: 'Sunday' }
]

app.post("/todos", (req, res) => {
    const newTodo = req.body

    if (!newTodo.title || !newTodo.day) {
        res.status(400).json({ error: "Title and day are required." })
    } else {
        todos.push(newTodo)
        res.status(201).json({ message: "Todo added successfully.", todos: newTodo })
    }
})

app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id

    const index = todos.findIndex(todo =>  todo.id == todoId)

    if(index === -1){
        res.status(404).json({error: "Todo does not exist."})
    }else{
        todos.splice(index, 1)
        res.status(200).json({message: "Todo Deleted Successfully"})
    }
})

app.get("/todos", (req, res) => {
    res.send(todos)
})

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})