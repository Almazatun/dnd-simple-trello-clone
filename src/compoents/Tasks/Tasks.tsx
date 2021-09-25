import React, {useState} from 'react';
import {Draggable} from "react-beautiful-dnd";

import {List} from "../../reducer/types";
import {TaskContent} from "../TaskContent/TaskContent";
import {Modal} from "../Modal/Modal";
import {FormModal} from "../common/FormModal/FormModal";

interface Props {
  list: List
  columnID: string

  deleteItem: (ColumnID: string, itemID: string) => void
}

export const Tasks: React.FC<Props> = (props) => {

  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [taskTitle, setTaskTitle] = useState<string>('');

  function handleShow() {
    setShowTaskForm(!showTaskForm)
  }

  function showTaskFormContent(title: string) {
    setTaskTitle(title)
    setShowTaskForm(true)
  }

  const TasksTSX = props.list.tasks.map((task, index) => {

    return (
      <Draggable draggableId={task.id} index={index} key={task.id}
      >
        {(provided, snapshot) => {

          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                paddingTop: '10px',
                backgroundColor: snapshot.isDragging ? '#db6299' : '#cbd881',
                margin: '10px',
                height: '60px',
                borderRadius: '4px',
                ...provided.draggableProps.style
              }}
              onDoubleClick={() => showTaskFormContent(task.name)}
            >
              <div className={'item_parent'}>
                <span style={{margin: '0 10px 0 10px'}}>{task.name}</span>
                <button
                  onClick={() => props.deleteItem(props.columnID, task.id)}
                  className={'item_delete_child'}>
                  {'❌'}
                </button>
              </div>
              <Modal
                show={showTaskForm}
                modalClosed={handleShow}
                onChangeTitle={() => {
                }}
              >
                <TaskContent taskTitle={taskTitle}/>
              </Modal>
            </div>
          )
        }}
      </Draggable>
    )
  })

  return <>{TasksTSX}</>
}
