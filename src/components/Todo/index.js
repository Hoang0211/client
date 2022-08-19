import React, { memo } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

function Todo({ todo, deleteTodoHandler }) {
  const deleteHandler = () => {
    deleteTodoHandler(todo._id);
  };

  return (
    <li className={`todo`}>
      <p className='todo__content'>{todo.content}</p>

      <div className='todo__icons'>
        <RiDeleteBinLine
          className='todo__delete icon'
          onClick={deleteHandler}
        />
      </div>
    </li>
  );
}

export default memo(Todo);
