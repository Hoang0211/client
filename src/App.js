import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import TodoForm from './components/TodoForm';
import Todo from './components/Todo';

function App() {
  const [input, setInput] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = () => {
    axios
      .get('http://localhost:8000/api/todo')
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  // Form functions
  const inputChangeHandler = useCallback((e) => {
    setInput(e.target.value);
  }, []);

  const addTodoHandler = useCallback(
    (e) => {
      e.preventDefault();
      axios
        .post('http://localhost:8000/api/todo', { content: input })
        .then(async (res) => {
          await getTodos();
          setInput('');
          console.log(res.data.message);
        })
        .catch((err) => {
          console.log("Error couldn't create TODO");
          console.log(err.message);
        });
    },
    [input]
  );

  const deleteTodoHandler = useCallback(
    (todoId) => {
      axios.delete(`http://localhost:8000/api/todo/${todoId}`);

      const newTodos = todos.filter((todo) => todoId !== todo._id);
      setTodos(newTodos);
    },
    [todos]
  );

  return (
    <div className='app'>
      <h1 className='title'>Todo List</h1>
      <div className='wrapper'>
        <TodoForm
          input={input}
          inputChangeHandler={inputChangeHandler}
          addTodoHandler={addTodoHandler}
        />
        <ul className='todos__list'>
          {todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              deleteTodoHandler={deleteTodoHandler}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
