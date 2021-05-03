import React, { useState } from 'react';

const TodoItem = (props) => {
  const [displayTitle, setDisplayTitle] = useState(props.item.title);
  const [displayPriority, setDisplayPriority] = useState(props.item.priority);
  const [editMode, setEditMode] = useState(false);

  const removeItem = (ev) => {
    props.removeItem(props.item.id);
  };
  const editModeOn = (ev) => {
    setEditMode(true);
  };
  const editItem = (ev) => {
    if (displayPriority && displayTitle) {
      ev.preventDefault();
      setEditMode(false);
      props.editItem(props.item.id, displayPriority, displayTitle);
    }
  };
  return (
    <li onDoubleClick={editModeOn} className={editMode ? 'editMode' : ''} onBlur={editItem}>
      <label> {displayPriority + '  ' + displayTitle}</label>
      <form style={{ display: 'inline' }}>
        <input
          type="number"
          value={displayPriority}
          min={1}
          max={props.limit}
          onChange={(e) => setDisplayPriority(e.target.value)}
          required
        />
        <input type="text" value={displayTitle} onChange={(e) => setDisplayTitle(e.target.value)} required />
        <button className="delBtn" onClick={removeItem}>
          <i className="fa fa-trash"></i>
        </button>
      </form>
    </li>
  );
};

export default TodoItem;
