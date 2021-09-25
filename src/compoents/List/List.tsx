import React, {ChangeEvent, useState} from 'react';
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";

import style from './List.module.scss'
import {Editable} from "../common/Editable/Editable";
import {Tasks} from "../Tasks/Tasks";
import {FormAddNewTask} from "../FormAddNewTask/FormAddNewTask";
import {Lists} from "../../reducer/types";

interface Props {
  listTitle: string
  lists: Lists

  deleteColumn: (ColumnID: string) => void,
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
  addItem: (ColumnID: string, title: string) => void
  deleteItem: (ColumnID: string, itemID: string) => void
  onDragEnd: (result: DropResult) => void
  clearForm: () => void
  renameList: (idList: string, title: string) => void

}

export const List: React.FC<Props> = (props) => {

  const [taskTitle, setTaskTitle] = useState<string>('');

  const onChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  }

  const clearTaskTitle= () => {
    setTaskTitle('')
  }

  const DroppableTSX = <>
    {Object.entries(props.lists).map(([id, list]) => {
      return (
        <Droppable droppableId={id} key={id}>
          {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
            console.log('provided', provided.droppableProps["data-rbd-droppable-id"]) //Get Id of Column
            console.log('snapshot', snapshot)
            return (
              <div className={style.content}>
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    backgroundColor: snapshot.isDraggingOver ? '#3ecf71' : "#8d8d87",
                  }}
                  className={style.droppable}
                >
                  <>
                    <div style={{
                      margin: '10px', position: "relative", textAlign: 'end',
                      display: "flex", flexDirection: 'row', justifyContent: 'space-between'
                    }}>
                      <Editable
                        name={list.title}
                        droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                        title={props.listTitle}
                        onChangeTitle={props.onChangeTitle}
                        renameTitle={props.renameList}
                        setTitle={props.clearForm}
                      />
                      <button
                        style={{height: '25px'}}
                        onClick={() => props.deleteColumn(provided.droppableProps["data-rbd-droppable-id"])}
                      >{'❌'}</button>
                    </div>
                    <Tasks list={list} columnID={provided.droppableProps["data-rbd-droppable-id"]}
                           deleteItem={props.deleteItem}
                    />
                    {provided.placeholder}
                    <FormAddNewTask
                      droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                      taskTitle={taskTitle}
                      onChangeTaskTitle={onChangeTaskTitle}
                      addNewTask={props.addItem}
                      clearForm={clearTaskTitle}
                    />
                  </>
                </div>
              </div>
            )
          }}
        </Droppable>
      )
    })}
  </>

  return (
    <DragDropContext onDragEnd={(result) => props.onDragEnd(result)}>
      {DroppableTSX}
    </DragDropContext>
  )
}
