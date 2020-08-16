import React from 'react';
import './TodoList.css';
import { initialList } from '../data/initialList';
import { useTodos } from '../customHooks/useTodos';
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
  const {
    list,
    create,
    update,
    destroy,
    toggleDone,
    move,
    onSortEnd,
    fetchAndUpdateList,
  } = useTodos(initialList);

  const shouldCancelStart = (e) => {
    const nodeNames = ['svg', 'path', 'BUTTON', 'INPUT'];
    if (nodeNames.includes(e.target.nodeName)) return true;
  };

  // React.useEffect(() => {
  //   fetchAndUpdateList();
  // }, []);

  return (
    <div className="TodoList">
      <h1>TodoList</h1>
      <TodoCreateForm create={create} />
      <SortableList
        list={list}
        update={update}
        destroy={destroy}
        toggleDone={toggleDone}
        move={move}
        onSortEnd={onSortEnd}
        shouldCancelStart={shouldCancelStart}
        helperClass="text-color-during-drag"
      />
    </div>
  );
}
