import React, {ChangeEvent, CSSProperties, useState} from 'react';

import {Input} from "../Input/Input";
import style from './Editable.module.scss'

interface Props {
    title: string,
    name?: string,
    droppableIDColumn?: string

    onChangeTitle: (event: ChangeEvent<HTMLInputElement>) => void
    renameTitle?: (droppableIDColumn: string, title: string) => void
    setTitle?: (title: string) => void
}

export const Editable = React.memo((props: Props) => {

    let [editMode, setEditMode] = useState<boolean>(false)

    const onEditMode = () => {
        props.setTitle!(props.name!)
        setEditMode(true);
    };
    const offEditMode = () => {
        props.renameTitle!(props.droppableIDColumn!, props.title)
        setEditMode(false);
        props.setTitle!('')
    };



    return (
        <div style={{textAlign: "left"}}>
            {editMode ?

                <Input type="text"
                       value={props.title}
                       onChange={props.onChangeTitle}
                       onBlur={offEditMode}
                       autoFocus={true}
                />

                :
                <span className={style.listTitle} onClick={onEditMode}>{props.name}</span>
            }
        </div>
    )
})
