import React, {ChangeEvent, useState} from 'react';
import style from './AddCard.module.scss'
import {Button} from "../common/Button/Button";
import {Input} from "../common/Input/Input";

type AddCardT = {
    title: string
    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    droppableIDColumn?: string
    addNewItem?: (droppableIDColumn: string, title: string) => void
    addNewColumn?: () => void
    clearForm?: () => void
}


export const AddCard: React.FC<AddCardT> = (props) => {
    const [open, setOpen] = useState<boolean>(false)

    function handleClick() {
        setOpen(!open)
    }

    function addNewItem () {
        if (props.addNewItem && props.title.trim() !== '') {
            props.addNewItem!(props.droppableIDColumn!, props.title);
            setOpen(false)
        } else if (props.addNewColumn && props.title.trim() !== '') {
            props.addNewColumn();
            setOpen(false)
        } else {
            alert('🤡 Please enter some text')
        }

    }

    function closeEditMode () {
        setOpen(false)
        props.clearForm!();
    }

    const InputHandle = <div className={style.inputBox}>
        <Input
            type="text"
            value={props.title}
            onChange={props.onChangeTitle}
        />
        <div style={{margin: '0 10px'}}>
            <Button title={'Add Card'}
                    onClick={addNewItem}
            />
            <button style={{ fontSize: "22px", color: '#FFFFFF',
                backgroundColor: 'pink',
                outline: "none",
                borderRadius: "4px",
                border: '1px solid'
            }} onClick={closeEditMode}>{"❌"}</button>
        </div>
    </div>

    return (
        <>
            {!open ? <span onClick={handleClick} className={style.title}>{'➕ Add other card'}</span> : InputHandle}
        </>
    )
}