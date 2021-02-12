import React from 'react';
import style from './FormModal.module.scss'
import {Button} from "../Button/Button";
import {Input} from "../Input/Input";

export interface IFormModalProps  {
    title: string
    onChangeTitle: (value: string ) => void
    modalClosed: () => void
    callback: () => void
    name: string
}

export const FormModal: React.FC <IFormModalProps> = (props) => {

    const onChange = (event: any) => {
        props.onChangeTitle(event.target.value);
    };

    const cancelHandler = () => {
        props.modalClosed();
        props.onChangeTitle("");
    };

    const createTask = () => {
        if (props.title.trim() !== '') {
            props.modalClosed();
            props.callback();
            props.onChangeTitle("");
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
                placeholder={'Please enter name of new list'}
                />
            <div className={style.bottom}>
                <Button onClick={cancelHandler} title={'❌'}/>
                <Button onClick={createTask} title={'Create'}/>
            </div>
        </div>
    )
}