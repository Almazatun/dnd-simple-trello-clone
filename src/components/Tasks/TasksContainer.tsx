import React, {useState} from 'react';

import {Tasks} from "./Tasks";
import {List} from "../../reducer/types";

interface Props {
  list: List
  columnID: string

  deleteTask: (ColumnID: string, itemID: string) => void
}

export const TasksContainer: React.FC<Props> = (props:Props) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');

  function handleShow() {
    setShowTaskForm(!showTaskForm)
  }

  function showTaskFormContent(title: string) {
    setTaskTitle(title)
    setShowTaskForm(true)
  }

  return <Tasks list={props.list}
                columnID={props.columnID}
                taskTitle={taskTitle}
                deleteTask={props.deleteTask}
                showTaskForm={showTaskForm}
                handleShow={handleShow}
                showTaskFormContent={showTaskFormContent}
  />
}
