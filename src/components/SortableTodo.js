import React, { useState } from 'react';
import { SortableElement } from 'react-sortable-hoc';

import './Todo.css';
import {
  FaTrash,
  FaPencilAlt,
  FaArrowCircleDown,
  FaArrowCircleUp,
} from 'react-icons/fa';

const SortableTodo = SortableElement(
  ({ id, title, done, position, update, destroy, toggleDone, move }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(title);
    const [checked, setChecked] = useState(done);

    const saveTodo = (e) => {
      e.preventDefault();
      update(id, inputValue);
      setIsEditing(false);
    };

    const toggleCheckbox = () => {
      setChecked((checked) => {
        toggleDone(id);
        return !checked;
      });
    };
    let result;
    if (isEditing) {
      result = (
        <form onSubmit={saveTodo} className="Todo-edit-form">
          <input
            type="text"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <button>Save</button>
        </form>
      );
    } else {
      result = <div className="Todo-task">{title}</div>;
    }

    return (
      <li className={`Todo ${checked && 'completed'}`}>
        <div className="checkbox-container">
          <label className="checkbox-label">
            <input
              type="checkbox"
              onChange={toggleCheckbox}
              checked={checked}
            />
            <span className="checkbox-custom rectangular"></span>
          </label>
        </div>
        {result}
        <div className="Todo-buttons">
          <button onClick={() => setIsEditing(!isEditing)}>
            <FaPencilAlt />
          </button>
          <button onClick={() => destroy(id)}>
            <FaTrash />
          </button>
          <button
            disabled={position.index <= 0}
            className={`${position.index <= 0 && 'disabled'}`}
            onClick={() => move(id, 'up')}
          >
            <FaArrowCircleUp />
          </button>
          <button
            disabled={position.index >= position.last}
            className={`${position.index >= position.last && 'disabled'}`}
            onClick={() => move(id, 'down')}
          >
            <FaArrowCircleDown />
          </button>
        </div>
      </li>
    );
  }
);

export default SortableTodo;
