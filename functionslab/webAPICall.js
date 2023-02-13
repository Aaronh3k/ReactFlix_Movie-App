fetch("https://jsonplaceholder.typicode.com/todos")
  .then(response => response.json())
  .then(todos => {
    console.log(todos)
    todos.forEach( (todo, index) => {
      // Do something with a todo
    })
  })
  .catch(function(err) {
    console.log(err);
  });
