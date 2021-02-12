import React, {ChangeEvent, CSSProperties, useState} from 'react';
import {List} from "../List/List";
import {IInitialItemState} from "../../state/reducers/itemReducer";
import {DropResult} from "react-beautiful-dnd";
import style from './DragAndDrop.module.scss'
import {Button} from "../common/Button/Button";
import {Modal} from "../../features/Modal/Modal";
import {FormModal} from "../common/FormModal/FormModal";

interface IDragAndDrop {
    title: string,
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    items: IInitialItemState,
    onDragEnd: (result: DropResult) => void
    addItem: (listId: string, title: string) => void
    deleteItem: (ListId: string, itemID: string) => void
    addNewList:() => void
    deleteList: (idList: string) => void
    clearForm: () => void
    renameList: (idList: string, title: string) => void
}

export const DragAndDrop: React.FC<IDragAndDrop> = (props) => {

    const [show, setShow] = useState<boolean>(false)

    function handleShow  () {
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
                <Button onClick={handleShow} title={'Add new list ➕'} />
            </div>

            <List items={props.items}
                  deleteColumn={props.deleteList}
                  title={props.title}
                  onChangeTitle={props.onChangeTitle}
                  addItem={props.addItem}
                  deleteItem={props.deleteItem}
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
                title={props.title}
                onChangeTitle={props.clearForm}
                callback={props.addNewList}
                />
            </Modal>
        </div>
    )
}