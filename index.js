const express = require('express');
const app = express();

app.use(express.json());
const PORT = 3000;

app.listen(PORT, () => { 
    console.log(`server is runnin on port ${PORT}`)
});

const tasks = [{id: 1, name: "Task 1", isDome: false}, {id: 2, name: "Task 2", isDome: false}];
let taskid = tasks.length;
//get all
//http://localhost:3000/tasks
app.get("/tasks", (request, response) =>{
    response.json(tasks);
});

//get specific
//http://localhost:3000/tasks/1
app.get("/tasks/:id", (request, response) =>{
    const id = request.params.id;
    const task = tasks.find((task) => task.id === parseInt(id))
    if(task) {
         response.json(task);
        } else {
            response.status(404).json();
        }});

//create
//http://localhost:3000/tasks
app.post("/tasks", (request, response) =>{
    taskid++;
    request.body.id = taskid;
    request.body.isDone = false;
    tasks.push(request.body);
    response.status(201).json();
});

//update
app.put("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const task = tasks.find((task) => task.id === id);
    
    if (task) {
        task.name = request.body.name !== undefined ? request.body.name : task.name;
        task.isDone = request.body.isDone !== undefined ? request.body.isDone : task.isDone;
        response.json(task);
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});

//delete
app.delete("/tasks/:id", (request, response) => {
    const id = parseInt(request.params.id);
    const index = tasks.findIndex((task) => task.id === id);
    
    if (index !== -1) {
        tasks.splice(index, 1);
        response.json({ message: "Task deleted successfully" });
    } else {
        response.status(404).json({ message: "Task not found" });
    }
});