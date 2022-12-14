const express = require('express');
const app = express();

const db = require('./models');

app.use(express.json());
app.use(express.static(__dirname + '/public'))

app.get('/api/people', (req, res) => {
  console.log('GET /api/people');
  db.person.findAll().then((results) => {
    res.json(results);
  })
})

app.get('/api/todos', (req, res) => {
  console.log('GET /api/todos');
  db.todo.findAll().then((results) => {
    res.json(results);
  })
})

app.get('/api/people/:person_id/todos', (req, res) => {
  const person_id = Number(req.params.person_id);

  if (isNaN(person_id)) {
    res.json({ error: "person_id is not a number" });
    return;
  }

  db.person.findByPk(person_id, { include: db.todo }).then((person) => {
    res.json(person);
  })
})

app.post("/api/people", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (name === "" || email === "") {
    res.json({ error: "name or body can't be empty" });
    return;
  }

  db.person.create({ name: name, email: email }).then(result => {
    res.json(result);
  })
})

app.delete("/api/todos/:todo_id", (req, res) => {
  const todo_id = Number(req.params.todo_id);

  if (isNaN(todo_id)) {
    res.json({ error: "todo_id is not a number" });
    return;
  }

  db.todo.destroy({ where: { id: todo_id } }).then((result) => {
    res.json({ status: "OK" })
  }).catch((e) => {
    res.json({ error: "failed" })
  })
})

app.patch("/api/todos/:todo_id", (req, res) => {
  const todo_id = Number(req.params.todo_id);

  if (isNaN(todo_id)) {
    res.json({ error: "todo_id is not a number" });
    return;
  }
//Killed a type on 73
  db.todo.update({ name: req.body.name}, { where: { id: todo_id } }).then((result) => {
    console.log(result)
    res.json({ status: "OK" })
  })
})

app.listen(3000, () => {
  console.log('app started in port 3000');
})//Done
