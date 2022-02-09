import React from 'react';
import Task from 'features/Home/organisms/Task';
import TaskModal from 'features/Home/organisms/TaskModal';

const Project = ({ project }) => {
  const { id, title, createdAt, deadline, tasks } = project;
  return (
    <div>
      <h1>title - {title} (Project ID - {id})</h1>
      <p>createdAt - {createdAt}</p>
      <p>deadline - {deadline}</p>
      {
        (tasks?.length)
          ?
          tasks.map(task => {
            return <Task key={task.createdAt} task={task} />;
          })
          :
          "You don't have any tasks yet"
      }
      <TaskModal projectId={id}/>
    </div>
  );
}

export default Project;
