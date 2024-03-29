import React, {ChangeEvent} from 'react';
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";

import style from './List.module.scss'
import {Editable} from "../common/Editable/Editable";
import {FormAddNewTask} from "../FormAddNewTask/FormAddNewTask";
import {Lists} from "../../reducer/types";
import {TasksContainer} from "../Tasks/TasksContainer";

interface Props {
  listTitle: string
  taskTitle: string
  lists: Lists

  deleteList: (ColumnID: string) => void,
  onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onChangeTaskTitle: (event: ChangeEvent<HTMLInputElement>) => void
  addTask: (ColumnID: string, title: string) => void
  deleteTask: (ColumnID: string, itemID: string) => void
  onDragEnd: (result: DropResult) => void
  clearForm: () => void
  clearTaskTitle: () => void
  renameList: (idList: string, title: string) => void
}

export const List: React.FC<Props> = (props) => {

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
                        onClick={() => props.deleteList(provided.droppableProps["data-rbd-droppable-id"])}
                      >{'❌'}</button>
                    </div>
                    <TasksContainer list={list}
                                    columnID={provided.droppableProps["data-rbd-droppable-id"]}
                                    deleteTask={props.deleteTask}

                    />
                    {provided.placeholder}
                    <FormAddNewTask
                      droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                      taskTitle={props.taskTitle}
                      onChangeTaskTitle={props.onChangeTaskTitle}
                      addNewTask={props.addTask}
                      clearForm={props.clearTaskTitle}
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
