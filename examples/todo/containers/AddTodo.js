import React, { useState, useCallback } from 'react';
import { withController } from '../../../src';

const AddTodo = ({ onAddTodo }) => {
  const [value, setValue] = useState('');
  const updateInput = useCallback(evt => setValue(evt.target.value), [
    setValue,
  ]);

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          if (!value.trim()) {
            return;
          }
          onAddTodo(value);
          setValue('');
        }}
      >
        <input value={value} onChange={updateInput} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

const mapControllerToProps = controller => ({
  onAddTodo: controller.list.add,
});

export default withController(mapControllerToProps)(AddTodo);
