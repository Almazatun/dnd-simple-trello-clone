import React, {ChangeEvent, useState} from 'react';
import {DragAndDrop} from "./DragAndDrop";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {IInitialItemState, ItemACS, resutData} from "../../state/reducers/itemReducer";
import {DropResult} from "react-beautiful-dnd";

export const DragAndDropContainer: React.FC = () => {
    const [title, setTitle] = useState<string>('')

    function onChangeTitle(event: ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value)
    }

    function clearForm (title?: string) {
        title && title.trim() !== '' ? setTitle(title) : setTitle('')
    }

    ////////////////////////////////////////////////////////
    const items = useSelector<AppStateType, IInitialItemState>(state => state.Item)
    const dispatch = useDispatch();

    //Item
    function dndItemBetweenList(source: resutData, destination: resutData) {
        dispatch(ItemACS.dndItemBetweenList(source, destination))
    }

    function dndItemLocalList(source: resutData, destination: resutData) {
        dispatch(ItemACS.dndItemLocalList(source, destination))
    }

    function addItem(listId: string, title: string) {
        dispatch(ItemACS.addItem(listId, title))
        setTitle('')
    }

    function deleteItem(ListId: string, itemID: string) {
        dispatch(ItemACS.deleteItem(ListId, itemID))
    }

    function onDragEnd(result: DropResult) {
        console.log("Result", result)
        if (!result.destination) {
            return;
        }
        //Source meaning "from"
        //Destination meaning "to"
        const {source, destination} = result;
        if (source.droppableId !== destination!.droppableId) {
            dndItemBetweenList(source, destination)
        } else {
            dndItemLocalList(source, destination)
        }
    }

    //list
    function addNewList() {
        dispatch(ItemACS.addNewList(title))
    }

    function deleteList(idList: string) {
        dispatch(ItemACS.deleteList(idList))
    }

    function renameList (idList: string, title: string) {
        dispatch(ItemACS.renameList(idList, title))
    }

    return <DragAndDrop
        title={title}
        onChangeTitle={onChangeTitle}
        items={items}
        onDragEnd={onDragEnd}
        addItem={addItem}
        deleteItem={deleteItem}
        addNewList={addNewList}
        deleteList={deleteList}
        clearForm={clearForm}
        renameList={renameList}
    />
}