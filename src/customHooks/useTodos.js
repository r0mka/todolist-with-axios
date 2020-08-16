import { useState } from 'react';
import arrayMove from 'array-move';
import axios from 'axios';

export const useTodos = (initialTodos) => {
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

  return {
    list,
    create,
    update,
    destroy,
    toggleDone,
    onSortEnd,
    fetchAndUpdateList,
  };
};
