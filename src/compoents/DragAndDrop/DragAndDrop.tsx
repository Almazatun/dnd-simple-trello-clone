import React, {ChangeEvent, CSSProperties, useState} from 'react';
import {DropResult} from "react-beautiful-dnd";

import style from './DragAndDrop.module.scss'
import {Button} from "../common/Button/Button";
import {Modal} from "../Modal/Modal";
import {FormModal} from "../common/FormModal/FormModal";
import {Lists} from "../../reducer/types";
import {List} from "../List/List";

interface Props {
  listTitle: string,
  lists: Lists,

  onChangeListTitle: (event: ChangeEvent<HTMLInputElement>) => void
  onDragEnd: (result: DropResult) => void
  addTask: (listId: string, title: string) => void
  deleteTask: (ListId: string, itemID: string) => void
  addNewList: () => void
  deleteList: (idList: string) => void
  clearForm: () => void
  renameList: (idList: string, title: string) => void
}

export const DragAndDrop: React.FC<Props> = (props) => {

  const [show, setShow] = useState<boolean>(false);

  function handleShow() {
    setShow(!show)
  }

  let btnStyleAddNewColumn: CSSProperties = {
    height: '40px',
    fontFamily: "sans-serif",
    backgroundColor: '#db71d2',
    outline: "none",
    border: '0px solid'
  }

  return (
    <div className={style.dnd_content}>
      <div className={style.add_new_list}>
        <Button onClick={handleShow} title={'Add new list ➕'}/>
      </div>

      <List lists={props.lists}
            deleteList={props.deleteList}
            listTitle={props.listTitle}
            onChangeTitle={props.onChangeListTitle}
            addTask={props.addTask}
            deleteTask={props.deleteTask}
            onDragEnd={props.onDragEnd}
            clearForm={props.clearForm}
            renameList={props.renameList}
      />
      <Modal
        show={show}
        modalClosed={handleShow}
        onChangeTitle={() => console.log('hello')}
      >
        <FormModal
          modalClosed={handleShow}
          name={"Add new list"}
          title={props.listTitle}
          onChangeTitle={props.clearForm}
          callback={props.addNewList}
        />
      </Modal>
    </div>
  )
}
