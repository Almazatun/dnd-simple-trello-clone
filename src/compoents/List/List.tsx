import React, {ChangeEvent} from 'react';
import {DragDropContext, Droppable, DroppableProvided, DroppableStateSnapshot, DropResult} from "react-beautiful-dnd";
import {Editable} from "../common/Editable/Editable";
import {IInitialItemState} from "../../state/reducers/itemReducer";
import {Items} from "../Items/Items";
import style from './List.module.scss'
import {AddCard} from "../common/AddCard/AddCard";

interface IList {
    items: IInitialItemState
    deleteColumn: (ColumnID: string) => void,
    title: string,
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    addItem: (ColumnID: string, title: string) => void
    deleteItem: (ColumnID: string, itemID: string) => void
    onDragEnd: (result: DropResult) => void
    clearForm:() => void
    renameList: (idList: string, title: string) => void

}

export const List: React.FC<IList> = (props) => {

    let DroppableTSX = <>
        {Object.entries(props.items).map(([id, i]) => {
            return (
                <Droppable droppableId={id} key={id}>
                    {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                        console.log('provided', provided.droppableProps["data-rbd-droppable-id"]) //Get Id of Column
                        console.log('snapshot', snapshot)
                        return (
                            <div className={style.content}>
                                <div className={style.content_child_title}>
                                    <h3 style={{margin: '20px'}}>{i.list}</h3>
                                    <button
                                        onClick={() => props.deleteColumn(provided.droppableProps["data-rbd-droppable-id"])}>{'❌'}</button>
                                </div>

                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    style={{
                                        backgroundColor: snapshot.isDraggingOver ? '#3ecf71' : "#8d8d87",
                                    }}
                                    className={style.droppable}
                                >
                                    <>
                                        <div style={{margin: '10px', position: "relative", textAlign: 'end',
                                        display: "flex", flexDirection: 'row', justifyContent: 'space-between'
                                        }}>
                                            <Editable
                                                name={i.list}
                                                droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                                                title={props.title}
                                                onChangeTitle={props.onChangeTitle}
                                                renameTitle={props.renameList}
                                                setTitle={props.clearForm}
                                            />
                                            <button>{'Edit'}</button>
                                        </div>
                                        <Items items={i} columnID={provided.droppableProps["data-rbd-droppable-id"]}
                                               deleteItem={props.deleteItem}
                                        />
                                        {provided.placeholder}
                                        <AddCard
                                            droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                                            title={props.title}
                                            onChangeTitle={props.onChangeTitle}
                                            addNewItem={props.addItem}
                                            clearForm={props.clearForm}
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
