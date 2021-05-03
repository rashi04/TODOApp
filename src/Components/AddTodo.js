import React from 'react';

const AddTodo = (props) => {
  const [priority, setPriority] = React.useState(0);
  const [title, setTile] = React.useState('');
  const changePriority = (event) => {
    setPriority(event.target.value);
  };
  const changeTitle = (event) => {
    setTile(event.target.value);
  };
  const addItem = (event) => {
    if (priority && title) {
      event.preventDefault();
      props.addData(priority, title);
    }
  };
  return (
    <header>
      <h2> My To Do List</h2>
      <form className="input-title">
        <input type="number" placeholder="Priority" min="1" max={props.limit} onChange={changePriority} required />
        <input type="text" placeholder="Title..." onChange={changeTitle} required />
        <button onClick={addItem} class="add-btn">
          Add
        </button>
      </form>
    </header>
  );
};

export default AddTodo;
