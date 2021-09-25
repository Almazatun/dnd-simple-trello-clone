import React, {ChangeEvent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {DropResult} from "react-beautiful-dnd";

import {AppStateType} from "../../store/store";
import {DragAndDrop} from "./DragAndDrop";
import {TaskACS} from "../../reducer/task.reducer";
import {Destination, Lists, SourceFrom} from "../../reducer/types";

export const DragAndDropContainer: React.FC = () => {
  const lists = useSelector<AppStateType, Lists>(state => state.Tasks)
  const dispatch = useDispatch();

  const [listTitle, setListTitle] = useState<string>('');

  function onChangeListTitle(event: ChangeEvent<HTMLInputElement>) {
    setListTitle(event.target.value)
  }

  function clearForm(title?: string) {
    title && title.trim() !== '' ? setListTitle(title) : setListTitle('')
  }

  //Task
  function dndTaskBetweenList(source: SourceFrom, destination: Destination) {
    dispatch(TaskACS.dndTaskBetweenList(source, destination))
  }

  function dndTaskLocalList(source: SourceFrom, destination: Destination) {
    dispatch(TaskACS.dndTaskInList(source, destination))
  }

  function addTask(listId: string, title: string) {
    dispatch(TaskACS.addTask(listId, title))
    setListTitle('')
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

  //List
  function addNewList() {
    if (listTitle.trim() !== '') {
      dispatch(TaskACS.addNewList(listTitle))
    } else {
      alert('Field should be required')
    }
  }

  function deleteList(idList: string) {
    dispatch(TaskACS.deleteList(idList))
  }

  function renameList(idList: string, title: string) {
    dispatch(TaskACS.renameList(idList, title))
  }

  return <DragAndDrop
    listTitle={listTitle}
    lists={lists}

    onChangeListTitle={onChangeListTitle}
    onDragEnd={onDragEnd}
    addTask={addTask}
    deleteTask={deleteTask}
    addNewList={addNewList}
    deleteList={deleteList}
    clearForm={clearForm}
    renameList={renameList}
  />
}
