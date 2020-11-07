import React, {ChangeEvent, CSSProperties, useState} from 'react';

interface IEditable {
    title: string,
    nameButton: string,
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    droppableIDColumn?: string
    addNewItem?: (droppableIDColumn: string, title: string) => void
    addNewColumn?: () => void
    styleBtn?: CSSProperties | undefined
}

export const Editable = React.memo((props: IEditable) => {

    const [open, setOpen] = useState<boolean>(false)

    function addNewItem () {
        if (props.addNewItem && props.title.trim() !== '') {
            props.addNewItem!(props.droppableIDColumn!, props.title);
            setOpen(false)
        }
        if (props.addNewColumn && props.title.trim() !== '') {
            props.addNewColumn();
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
                    style={props.styleBtn && props.styleBtn}
                    onClick={() =>setOpen(!open)}>{props.nameButton}</button>}
        </div>
    )
})