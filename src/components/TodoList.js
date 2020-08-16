import React, { useState } from 'react';
import './TodoList.css';
import arrayMove from 'array-move';
import axios from 'axios';
import TodoCreateForm from './TodoCreateForm';
import { SortableContainer } from 'react-sortable-hoc';
import SortableTodo from './SortableTodo';

const SortableList = SortableContainer(
  ({ list, update, destroy, toggleDone, move }) => {
    return (
      <ul>
        {list.map((todo, index) => (
          <SortableTodo
            key={todo.id}
            list={list}
            index={index}
            position={{ index: index, last: list.length - 1 }}
            id={todo.id}
            title={todo.title}
            done={todo.done}
            update={update}
            destroy={destroy}
            toggleDone={toggleDone}
            move={move}
          />
        ))}
      </ul>
    );
  }
);

export default function TodoList() {
  const [list, setList] = useState([]);

  const url = 'https://sleepy-taiga-81385.herokuapp.com/todo';

  const fetchAndUpdateList = () => {
    axios
      .get(url)
      .then((response) => {
        const newList = response.data.map(({ _id, name, done }) => ({
          id: _id,
          title: name,
          done,
        }));
        setList(newList);
      })
      .catch((error) => console.log(error));
  };

  const create = (newTitle) => {
    axios
      .post(url, {
        name: newTitle,
      })
      .then((response) => {
        console.log(response.data);
        fetchAndUpdateList();
      })
      .catch((error) => console.log(error));
  };

  const update = (id, newTitle) => {
    const updatedList = list.map((todo) =>
      todo.id === id ? { ...todo, title: newTitle } : todo
    );
    setList(updatedList);
  };

  const destroy = (id) => {
    axios
      .delete(`${url}/${id}`)
      .then((response) => {
        console.log(response.data);
        fetchAndUpdateList();
      })
      .catch((error) => console.log(error));
  };

  const toggleDone = (id) => {
    const currentDoneStatus = list.find((todo) => todo.id === id).done;
    axios
      .put(`${url}/${id}`, {
        done: !currentDoneStatus,
      })
      .then((response) => {
        console.log(response.data);
        fetchAndUpdateList();
      })
      .catch((error) => console.log(error));
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    setList((items) => arrayMove(items, oldIndex, newIndex));
  };

  const shouldCancelStart = (e) => {
    const nodeNames = ['svg', 'path', 'BUTTON', 'INPUT'];
    if (nodeNames.includes(e.target.nodeName)) return true;
  };

  React.useEffect(() => {
    console.log('IN USE EFFECT');
    fetchAndUpdateList();
  }, []);

  return (
    <div className="TodoList">
      <h1>TodoList</h1>
      <TodoCreateForm create={create} />
      <SortableList
        list={list}
        update={update}
        destroy={destroy}
        toggleDone={toggleDone}
        onSortEnd={onSortEnd}
        shouldCancelStart={shouldCancelStart}
        helperClass="text-color-during-drag"
      />
    </div>
  );
}
