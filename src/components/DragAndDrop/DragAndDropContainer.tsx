import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";

import {DragAndDrop} from "./DragAndDrop";
import {TaskACS} from "../../reducer/task.reducer";

export const DragAndDropContainer: React.FC = () => {
  const dispatch = useDispatch();

  const [listTitle, setListTitle] = useState<string>('');

  function onChangeListTitle(event: ChangeEvent<HTMLInputElement>) {
    setListTitle(event.target.value)
  }

  function clearForm(title?: string) {
    title && title.trim() !== '' ? setListTitle(title) : setListTitle('')
  }

  function addNewList() {
    if (listTitle.trim() !== '') {
      dispatch(TaskACS.addNewList(listTitle))
    } else {
      alert('Field should be required')
    }
  }

  return <DragAndDrop
    listTitle={listTitle}
    setNewTitleList={setListTitle}
    onChangeListTitle={onChangeListTitle}
    addNewList={addNewList}
    clearForm={clearForm}
  />
}
