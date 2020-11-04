import React, {useState} from 'react';
import './App.scss';
import {v1} from "uuid";
import {DragDropContext, Droppable, Draggable, DropResult} from "react-beautiful-dnd";


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

    let Todo: string = v1();
    let Progress: string = v1();
    let Done: string = v1();
    let items1ID: string = v1()
    let items2ID: string = v1()
    let items3ID: string = v1()


    let item1: IItem = {
        id: items1ID,
        name: "TASK1"
    }
    let item2: IItem = {
        id: items2ID,
        name: "TASK2"
    }
    let item3: IItem = {
        id: items3ID,
        name: "TASK3"
    }

    let Items = [item1, item2, item3]

    const [columns, setColumns] = useState<IColumns>({
        [Todo]: {
            title: 'Todo',
            items: Items
        },
        [Progress]: {
            title: 'In Progress',
            items: []
        },
        [Done]: {
            title: 'Done',
            items: []
        },
    })
    //////////////////////////////////////////////////////

    function onDragEnd  (result: DropResult , columns: IColumns, setColumns: Function) {

        if (!result.destination) {
            return;
        }
        const {source, destination} = result;
        if (source.droppableId !== destination?.droppableId) {
            const sourceColumn = columns[source.droppableId]
            const destColumn = columns[destination?.droppableId]

            const sourceItems = [...sourceColumn.items]
            const destItems = [...destColumn.items]
            const [removed] = sourceItems.splice(source.index, 1)
            destItems.splice(destination?.index ,0, removed)

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



        //////////////////////////////////////
        const column = columns[source.droppableId];
        console.log("Column" ,column)

        const copiedItems = [...column.items];
        console.log("CopiedItems" ,copiedItems)

        const [remove] = copiedItems.splice(source.index, 1);
        console.log("Remove" ,remove)

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


    return (
        <div className="App">
            <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                   // console.log('Column', column)
                    return (
                        <Droppable droppableId={id} key={id}>
                            {(provided, snapshot) => {
                               // console.log('provided', provided)
                               // console.log('snapshot', snapshot)
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
                                        {column.items.map((item, index) => {
                                            return (
                                                <Draggable draggableId={item.id} index={index} key={item.id}>
                                                    {(provided, snapshot) => {
                                                        return (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                {...provided.dragHandleProps}
                                                                style={{
                                                                   paddingTop: '10px',
                                                                    backgroundColor: snapshot.isDragging ? '#5fb6bb' : '#7474cf',
                                                                    margin: '10px',
                                                                    height: '50px',
                                                                    borderRadius: '10px',
                                                                    ...provided.draggableProps.style
                                                                }}
                                                            >
                                                                {item.name}
                                                            </div>
                                                        )
                                                    }}
                                                </Draggable>
                                            )
                                        })}
                                        {/*//////////////////////////////////////////////////*/}
                                        {provided.placeholder}
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
