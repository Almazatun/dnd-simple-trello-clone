import React, {ChangeEvent, CSSProperties, useState} from 'react';

import style from './DragAndDrop.module.scss'
import {Button} from "../common/Button/Button";
import {Modal} from "../Modal/Modal";
import {FormModal} from "../common/FormModal/FormModal";
import {ListContainer} from "../List/ListContainer";

interface Props {
  listTitle: string,

  onChangeListTitle: (event: ChangeEvent<HTMLInputElement>) => void
  addNewList: () => void
  clearForm: () => void
  setNewTitleList: (listTitle: string) => void
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
      <ListContainer listTitle={props.listTitle}
                     onChangeListTitle={props.onChangeListTitle}
                     clearForm={props.clearForm}
                     setNewTitleList={props.setNewTitleList}
      />
      <Modal
        show={show}
        modalClosed={handleShow}
        onChangeTitle={() => {}}
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
