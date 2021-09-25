import React from 'react';
import style from './Modal.module.scss'
import {Background} from './Background';

interface IModalProps  { show: boolean, modalClosed: () => void, onChangeTitle: (value: string) => void }

export const Modal: React.FC<IModalProps> = (props) => {
    const closeAndClear = () => {
        props.modalClosed();
        props.onChangeTitle("");
    };
    return (
        <>
            <Background show={props.show} clicked={closeAndClear}/>
            <div
                className={style.Modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? 1 : 0
                }}
            >
                {props.children}
            </div>
        </>
    )
}