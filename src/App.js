import React, { useEffect, useState } from 'react';

import AddTodo from './Components/AddTodo';
import './App.css';
import TodoItem from './Components/TodoItem';

const LIMIT_MAX_TO_DO = 15;

function App() {
  const [toDoList, setToDoList] = useState([]);

  useEffect(() => {
    let availableToDoList = localStorage.getItem('todoList');
    if (availableToDoList) {
      let availableToDoObj = JSON.parse(availableToDoList);
      if (availableToDoObj.length > 0) {
        setToDoList(availableToDoObj);
      }
    }
  }, []);

  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const addData = (priority, title) => {
    let item = {};
    item.id = getRndInteger(1, 20);
    item.title = title;
    item.priority = priority;
    if (toDoList.length >= LIMIT_MAX_TO_DO) {
      alert(` Maximum items in your to do can be: ${LIMIT_MAX_TO_DO}`);
    } else {
      setToDoList([...toDoList, item]);
      localStorage.setItem('todoList', JSON.stringify(toDoList));
    }
  };
  const removeItem = (id) => {
    const items = toDoList.filter((item) => item.id !== id);
    setToDoList([...items]);
    localStorage.setItem('todoList', JSON.stringify([...items]));
  };
  const editItem = (id, priority, title) => {
    let items = [...toDoList];
    for (var i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        items[i].priority = priority;
        items[i].title = title;
        break;
      }
    }
    setToDoList([...items]);
    localStorage.setItem('todoList', JSON.stringify([...items]));
  };

  return (
    <div className="container">
      <AddTodo limit={LIMIT_MAX_TO_DO} addData={addData} />
      <div className="">
        <ul>
          {toDoList.map((item) => {
            return (
              <TodoItem limit={LIMIT_MAX_TO_DO} key={item.id} editItem={editItem} removeItem={removeItem} item={item} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
