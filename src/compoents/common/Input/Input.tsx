import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import style from './Input.module.scss'

type InputT = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<InputT> = ({...props}) => {
    return <input {...props} className={style.input} type="text" />
}