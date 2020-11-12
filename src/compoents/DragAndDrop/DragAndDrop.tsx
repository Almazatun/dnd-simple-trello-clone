import React, {ChangeEvent, CSSProperties} from 'react';
import {List} from "../List/List";
import {IInitialItemState} from "../../state/reducers/itemReducer";
import {DropResult} from "react-beautiful-dnd";
import {Editable} from "../Editable/Editable";
import style from './DragAndDrop.module.scss'

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

    let btnStyleAddNewColumn: CSSProperties = {
        height: '40px',
        fontFamily: "sans-serif",
        backgroundColor: '#db71d2',
        outline: "none",
        border: '0px solid'
    }

    return (
        <div className={style.dnd_content}>
            <div>
                <Editable
                    name={'Add new column 🤡'}
                    title={props.title}
                    onChangeTitle={props.onChangeTitle}
                />
                <button>{'edit'}</button>
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
        </div>
    )
}