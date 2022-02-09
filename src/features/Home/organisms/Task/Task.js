import React from 'react';

const Task = ({ task }) => {
  const { content } = task;
  return (
    <div>
      <p>task - {content}</p>
    </div>
  );
}

export default Task;
