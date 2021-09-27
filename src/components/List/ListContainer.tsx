import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../store/store";
import {Destination, Lists, SourceFrom} from "../../reducer/types";
import {TaskACS} from "../../reducer/task.reducer";
import {DropResult} from "react-beautiful-dnd";
import {List} from "./List";

interface Props {
  listTitle: string

  setNewTitleList: (listTitle: string) => void
  onChangeListTitle: (event: ChangeEvent<HTMLInputElement>) => void
  clearForm: () => void
}

export const ListContainer: React.FC<Props> = (props: Props) => {
  const [taskTitle, setTaskTitle] = useState<string>('');

  const onChangeTaskTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(event.target.value)
  }

  const clearTaskTitle= () => {
    setTaskTitle('')
  }

  const lists = useSelector<AppStateType, Lists>(state => state.Tasks);
  const dispatch = useDispatch();

  //Task
  function dndTaskBetweenList(source: SourceFrom, destination: Destination) {
    dispatch(TaskACS.dndTaskBetweenList(source, destination))
  }

  function dndTaskLocalList(source: SourceFrom, destination: Destination) {
    dispatch(TaskACS.dndTaskInList(source, destination))
  }

  function addTask(listId: string, title: string) {
    dispatch(TaskACS.addTask(listId, title))
    // setListTitle('')
    props.setNewTitleList('')
  }

  function deleteTask(ListId: string, itemID: string) {
    dispatch(TaskACS.deleteTask(ListId, itemID))
  }

  function onDragEnd(result: DropResult) {
    // console.log("Result", result)
    if (!result.destination) {
      return;
    }
    //Source meaning "from"
    //Destination meaning "to"
    const {source, destination} = result;

    if (source.droppableId !== destination!.droppableId) {
      dndTaskBetweenList(source, destination)
    } else {
      dndTaskLocalList(source, destination)
    }
  }

  function deleteList(idList: string) {
    dispatch(TaskACS.deleteList(idList))
  }

  function renameList(idList: string, title: string) {
    dispatch(TaskACS.renameList(idList, title))
  }

  return <List
    listTitle={props.listTitle}
    taskTitle={taskTitle}
    lists={lists}
    deleteList={deleteList}
    onChangeTitle={props.onChangeListTitle}
    addTask={addTask}
    deleteTask={deleteTask}
    onDragEnd={onDragEnd}
    clearForm={props.clearForm}
    renameList={renameList}
    clearTaskTitle={clearTaskTitle}
    onChangeTaskTitle={onChangeTaskTitle}
  />
}
