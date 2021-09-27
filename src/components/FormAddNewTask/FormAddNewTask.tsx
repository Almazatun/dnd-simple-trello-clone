import React, {ChangeEvent, useState} from 'react';

import style from './FormAddNewTask.module.scss'
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";

interface Props {
  taskTitle: string
  droppableIDColumn?: string

  onChangeTaskTitle: (event: ChangeEvent<HTMLInputElement>) => void
  addNewTask?: (droppableIDColumn: string, title: string) => void
  clearForm?: () => void
}


export const FormAddNewTask: React.FC<Props> = (props) => {
  const {taskTitle, droppableIDColumn, addNewTask, onChangeTaskTitle, clearForm} = props;

  const [open, setOpen] = useState<boolean>(false)

  function handleClick() {
    setOpen(!open)
  }

  function addTask() {
    if (taskTitle.trim() !== '') {
      addNewTask!(droppableIDColumn!, taskTitle);
      clearForm!();
      setOpen(false)
    } else {
      alert('🤡 Please enter some text')
    }

  }

  function closeEditMode() {
    setOpen(false)
    clearForm!();
  }

  const InputHandle = <div className={style.inputBox}>
    <Input
      type="text"
      value={taskTitle}
      onChange={onChangeTaskTitle}
    />
    <div style={{margin: '0 10px'}}>
      <Button title={'Add Card'}
              onClick={addTask}
      />
      <button style={{
        fontSize: "22px", color: '#FFFFFF',
        backgroundColor: 'pink',
        outline: "none",
        borderRadius: "4px",
        border: '1px solid'
      }} onClick={closeEditMode}>{"❌"}</button>
    </div>
  </div>

  return (
    <>
      {!open ? <span onClick={handleClick} className={style.title}>{'➕ Add other card'}</span> : InputHandle}
    </>
  )
}
