import React, {ChangeEvent, CSSProperties, useState} from 'react';
import './App.scss';
import {v1} from "uuid";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
    DroppableProvided,
    DroppableStateSnapshot
} from "react-beautiful-dnd";
import {Editable} from "../compoents/Editable/Editable";


interface IColumns {
    [key: string]: IList
}

interface IList {
    title: string
    items: Array<IItem>
}

interface IItem {
    id: string,
    name: string
}

function App() {

    let keyColumn = ['_1', '_2', '_3'];

    // let Todo: string = '_1';
    // let Progress: string = '_2';
    // let Done: string = '_3';


    let item1: IItem = {
        id: v1(),
        name: "Item 1"
    }
    let item2: IItem = {
        id: v1(),
        name: "Item 2"
    }
    let item3: IItem = {
        id: v1(),
        name: "Item 3"
    }

    let Items = [item1, item2, item3]

    const [columns, setColumns] = useState<IColumns>({
        [keyColumn[0]]: {
            title: 'Todo',
            items: Items
        },
        [keyColumn[1]]: {
            title: 'In Progress',
            items: []
        },
        [keyColumn[2]]: {
            title: 'Done',
            items: []
        },
    })
    const [title, setTitle] = useState<string>('')

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    //////////////////////////////////////////////////////

    function addNewColumn() {
        let newIndex = Math.floor(Math.random() * 10000);
        keyColumn.push(`_${newIndex}`);
        let lastItemInColumn = keyColumn[keyColumn.length - 1];
        let newColumn = {title: title, items: []}
        setColumns({
            ...columns,
            [lastItemInColumn]: newColumn
        })
        setTitle('')
    }


    function addItem(ColumnID: string, title: string) {
        let newItem: IItem = {id: v1(), name: title}

        setColumns({
            ...columns,
            [ColumnID]: {
                ...columns[ColumnID],
                items: [newItem, ...columns[ColumnID].items.map(el => el)]
                ,

            }
        })
        setTitle('')
    }

    function deleteItem(ColumnID: string, itemID: string) {
        setColumns({
            ...columns,
            [ColumnID]: {
                ...columns[ColumnID],
                items: columns[ColumnID].items.filter(el => el.id !== itemID)
            }
        })
    }

    function onDragEnd(result: DropResult, columns: IColumns, setColumns: Function) {

        if (!result.destination) {
            return;
        }
        //Source meaning "from"
        //Destination meaning "to"
        const {source, destination} = result;
        if (source.droppableId !== destination?.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination?.droppableId]

            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination?.index, 0, removed)

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceColumn,
                    items: sourceItems
                },
                [destination?.droppableId]: {
                    ...destColumn,
                    items: destItems
                }
            })
        } else {
            //Else working with local list
            //////////////////////////////////////
            const column = columns[source.droppableId];
            console.log("Column", column)

            const copiedItems = [...column.items];
            console.log("CopiedItems", copiedItems)

            const [remove] = copiedItems.splice(source.index, 1);
            console.log("Remove", remove)

            /*
            const months = ['Jan', 'March', 'April', 'June'];
            months.splice(1, 0, 'Feb');
            // inserts at index 1
            console.log(months);
            // expected output: Array ["Jan", "Feb", "March", "April", "June"]

            months.splice(4, 1, 'May');
            // replaces 1 element at index 4
            console.log(months);
            // expected output: Array ["Jan", "Feb", "March", "April", "May"]
            */


            copiedItems.splice(destination.index, 0, remove)
            //Local change item position
            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }
    }

    let btnStyleAddNewColumn: CSSProperties = {
        height: '40px',
        fontFamily: "sans-serif",
        backgroundColor: '#db71d2',
        outline: "none",
        border: '0px solid'
    }


    return (
        <div className="App">
            <Editable
                nameButton={'Add new column 🤡'}
                title={title}
                onChangeTitle={onChangeTitle}
                addNewColumn={addNewColumn}
                styleBtn={btnStyleAddNewColumn}
            />
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    // console.log('Column', column)
                    return (
                        <Droppable droppableId={id} key={id}>
                            {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
                                console.log('provided', provided.droppableProps["data-rbd-droppable-id"]) //Get Id of Column
                                console.log('snapshot', snapshot)
                                return (
                                    <div className={'content'}>
                                        <h3 style={{margin: '20px'}}>{column.title}</h3>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.droppableProps}
                                            style={{
                                                backgroundColor: snapshot.isDraggingOver ? '#c185b0' : "#bd8484",
                                            }}
                                            className={'droppable'}
                                        >
                                            <>
                                                <div style={{margin: '10px', position: "relative", textAlign: 'end'}}>
                                                    <Editable
                                                        nameButton={'Add new item ✔'}
                                                        droppableIDColumn={provided.droppableProps["data-rbd-droppable-id"]}
                                                        title={title}
                                                        onChangeTitle={onChangeTitle}
                                                        addNewItem={addItem}
                                                    />
                                                </div>

                                                {column.items.map((item, index) => {
                                                    //Column ID need to delete each of the item from Column
                                                    let columnID = provided.droppableProps["data-rbd-droppable-id"]

                                                    return (
                                                        <Draggable draggableId={item.id} index={index} key={item.id}
                                                        >
                                                            {(provided, snapshot) => {
                                                                console.log("columnId", columnID)

                                                                return (
                                                                    <div
                                                                        ref={provided.innerRef}
                                                                        {...provided.draggableProps}
                                                                        {...provided.dragHandleProps}
                                                                        style={{
                                                                            paddingTop: '10px',
                                                                            backgroundColor: snapshot.isDragging ? '#5fb6bb' : '#7474cf',
                                                                            margin: '10px',
                                                                            height: '60px',
                                                                            borderRadius: '10px',
                                                                            ...provided.draggableProps.style
                                                                        }}
                                                                    >
                                                                        <div className={'item_parent'}>
                                                                            <span>{item.name}</span>
                                                                            <button
                                                                                onClick={() => deleteItem(columnID, item.id)}
                                                                                className={'item_delete_child'}>
                                                                                {'❌'}
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Draggable>
                                                    )
                                                })}
                                                {/*//////////////////////////////////////////////////*/}
                                                {provided.placeholder}
                                            </>
                                        </div>
                                    </div>
                                )
                            }}
                        </Droppable>
                    )
                })}
            </DragDropContext>
        </div>
    );
}

export default App;
