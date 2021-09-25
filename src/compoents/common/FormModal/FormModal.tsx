import React from 'react';
import style from './FormModal.module.scss'
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

export interface IFormModalProps  {
    title: string
    name: string

    onChangeTitle: (value: string ) => void
    modalClosed: () => void
    callback: () => void
}

export const FormModal: React.FC <IFormModalProps> = (props) => {

    const onChange = (event: any) => {
        props.onChangeTitle(event.target.value);
    };

    const cancelHandler = () => {
        props.onChangeTitle("");
        props.modalClosed();
    };

    const create = () => {
        if (props.title.trim() !== '') {
            props.callback();
            props.onChangeTitle("");
            props.modalClosed();
        } else {
            props.callback();
        }
    };


    return (
        <div className={style.box}>
                <h3>{props.name}</h3>
                <input className={style.input}
                       value={props.title}
                       onChange={onChange}
                placeholder={'Please enter title new list'}
                />
            <div className={style.bottom}>
                <Button onClick={cancelHandler} title={'❌'}/>
                <Button onClick={create} title={'Create'}/>
            </div>
        </div>
    )
}
