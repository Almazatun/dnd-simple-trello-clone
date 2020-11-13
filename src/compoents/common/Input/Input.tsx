import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import style from './Input.module.scss'

interface IInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input: React.FC<IInputProps> = ({...props}) => {
    return <input {...props} className={style.input} type="text" />
}