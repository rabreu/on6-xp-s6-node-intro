const express = require('express')
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const PORT = 3001

const listenFunction = () => console.log('Listening on port ' + PORT)

app.listen(PORT,listenFunction)

class Todo {
    constructor(title, text) {
        this.title = title
        this.text = text
    }
}

const todoList = []

function add(request, response) {
    const todoBody = request.body
    if(!(todoBody.title && todoBody.text))
        return response.status(400).send({message: 'Missing information.'})

    const todo = new Todo(todoBody.title, todoBody.text)
    todoList.push(todo)
    console.table(todo)
    return response.status(201).send({message: 'TODO created.'})
}

function list(request, response) {
    console.table(todoList)
    return response.status(200).send(todoList)
}

function update(request, response) {
    const id = request.params.id
    const todoBody = request.body

    if(id < 0 || id > todoList.length-1 || todoList.length === 0) 
        return response.status(404).send("TODO not found.")

    if(!(todoBody.title && todoBody.text))
        return response.status(400).send({message: 'Missing information.'})

    todoList[id].title = todoBody.title
    todoList[id].text = todoBody.text
    console.table(todoList[id])
    return response.status(200).send({message: 'TODO updated'})
}

app.post("/todo", add)
app.get("/todo", list)
app.put("/todo/:id", update)