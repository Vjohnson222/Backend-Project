//So this was the work but you did it. 
//You properly sequenced the brain of the operation now go and talk to the extremities

const express = require('express');
const app = express();

const db = require('./models');

app.use(express.json());
app.use(express.static(__dirname + '/public'))

//#1 Plural 
app.get('/api/people', (req, res) => {
  console.log('GET /api/people');
  db.person.findAll().then((results) => {
    res.json(results);
  })
})

//#2 The todos table
app.get('/api/todos', (req, res) => {
  console.log('GET /api/todos');
  db.todo.findAll().then((results) => {
    res.json(results);
  })
})

// #3 The People table / The id of that person connected to the todo

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
//#3.5  we did not have this at all

app.get('/api/todos/:todo_id/people', (req, res) => {
  const todo_id = Number(req.params.todo_id);

  if (isNaN(todo_id)) {
    res.json({ error: "todo_id is not a number" });
    return;
  }

  db.todo.findByPk(todo_id, { include: db.person }).then((todo) => {
    res.json(todo);
  })
})

//#4 post to the people table
app.post("/api/people", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  if (name === "" || email === "") {
    res.json({ error: "name or body can't be empty" });
    return;
  }
//4.5 compare this to 3.5

app.get('/api/todos/:todo_id/people', (req, res) => {
  const todo_id = Number(req.params.todo_id);

  if (isNaN(todo_id)) {
    res.json({ error: "todo_id is not a number" });
    return;
  }

  db.todo.findByPk(todo_id, { include: db.person }).then((todo) => {
    res.json(todo);
  })
})

  //#5 Database of a person Create this

  db.person.create({ name: name, email: email }).then(result => {
    res.json(result);
  })
})
//#6 In the table called people, where people is attached to student post the student
//Not sure but I think the table is todo and people
//the items are person and todos
app.post(`/api/people/:person_id/todos`, (req, res) => {

  //stopped right here - You got this
  const name = req.body.name;
  // const grade = req.body.grade;
  //Check this for trouble my only difference is completed
     const completed = req.body.completed

  const person_id = Number(req.params.person_id);

  if(name === "" || completed === "") {
      res.json({error: "name or completed can not be empty"});
      return;
  }
//Chat said change db.todos.create to this db.todo.create
  db.todo.create({name: name, person_id: person_id }).then(result => {
      res.json(result);
  })
})

//#7 compare this delete to mines this is fat but the code below is jake
// Yes so from my todos database i will de able to delete a todo from it based upon the todo_id
//So this right here is questionable  why would it not be just student_id

// This is to delete the todos from a database. My question is should it be todo_id or should it be todos_id.

//chat said change this to todos_id
app.delete("/api/todos/:todo_id", (req, res) => {
  const todo_id = Number(req.params.todo_id);
  console.log(req.params)

  if(isNaN(todo_id)) {
      res.json({error: "todo_id is not a number"});
      return;
  }

  db.todo.destroy({ where: { id: todo_id} }).then((result) => {
      res.json({status: "OK"})
  }).catch((e) => {
    res.json({ error: "failed" })
  })
})
//  Person Delete 

app.delete("/api/people/:person_id", (req, res) => {
  const person_id = Number(req.params.person_id);
  console.log(req.params)

  if(isNaN(person_id)) {
      res.json({error: "person_id is not a number"});
      return;
  }

  db.person.destroy({ where: { id: person_id} }).then((result) => {
      res.json({status: "OK"})
  }).catch((e) => {
    res.json({ error: "failed" })
  })
})

// compare 

//#8 so this serves to update students and in my case todos.. perhaps an edit button

// app.patch("/api/todos/:todo_id", (req, res) => {
//   const todo_id = Number(req.params.todo_id);
//   if (isNaN(todo_id)) {
//     res.json({ error: "Invalid todo_id" });
//     return;
//   }

//   db.todos.update({name: req.body.name}, { where: {id: todo_id}})
//     .then((result) => {
//       if (result[0] === 0) {
//         res.json({error: "Todo not found"});
//       } else {
//         res.json({status: "OK"});
//       }
//     })
//     .catch((e) => {
//       res.json({error: "Error"});
//     });
// });



app.listen(3000, () => {
  console.log('app started in port 3000');
})//Done
