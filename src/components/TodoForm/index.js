import { memo } from 'react';

function TodoForm({ input, inputChangeHandler, addTodoHandler }) {
  return (
    <form className='todos__form' onSubmit={addTodoHandler}>
      <input
        type='text'
        value={input}
        onChange={inputChangeHandler}
        className='todos__input'
      />

      <button className='todos__add' type='submit'>
        Add
      </button>
    </form>
  );
}

export default memo(TodoForm);
