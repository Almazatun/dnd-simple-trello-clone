import React, {ChangeEvent, useState} from 'react';

interface IEditable {
    title: string
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    droppableIDColumn: string
    addNewItem: (droppableIDColumn: string, title: string) => void
}

export const Editable = React.memo((props: IEditable) => {

    const [open, setOpen] = useState<boolean>(false)

    function addNewItem () {
        if (props.title.trim() !== '') {
            props.addNewItem(props.droppableIDColumn, props.title);
            setOpen(false)
        }
    }

    function closeEditMode () {
        setOpen(false)
    }

    return (
        <div>
            {open ?
                <>
                <input type="text"
                           value={props.title}
                           onChange={props.onChangeTitle}
                />
                <button onClick={addNewItem}>{'✔'}</button>
                <button onClick={closeEditMode}>{'❌'}</button>
                </>
                :
                <button
                    onClick={() =>setOpen(!open)}>{'Add new item ➕'}</button>}
        </div>
    )
})