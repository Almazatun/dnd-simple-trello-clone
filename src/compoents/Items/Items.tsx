import React from 'react';
import {Draggable} from "react-beautiful-dnd";
import {IItem} from "../../state/reducers/itemReducer";

interface IItems {
    items: IItem
    columnID: string
    deleteItem: (ColumnID: string, itemID: string) => void
}


export const Items: React.FC <IItems> = (props) => {

    const ItemsTSX = props.items.items.map((item, index) => {
        //Column ID need to delete each of the item from Column

        return (
            <Draggable draggableId={item.id} index={index} key={item.id}
            >
                {(provided, snapshot) => {

                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                                paddingTop: '10px',
                                backgroundColor: snapshot.isDragging ? '#db6299' : '#cbd881',
                                margin: '10px',
                                height: '60px',
                                borderRadius: '4px',
                                ...provided.draggableProps.style
                            }}
                        >
                            <div className={'item_parent'}>
                                <span>{item.name}</span>
                                <button
                                    onClick={() => props.deleteItem(props.columnID, item.id)}
                                    className={'item_delete_child'}>
                                    {'❌'}
                                </button>
                            </div>
                        </div>
                    )
                }}
            </Draggable>
        )
    })

    return <>{ItemsTSX}</>
}