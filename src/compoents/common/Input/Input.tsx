import React, {DetailedHTMLProps, InputHTMLAttributes} from 'react'
import style from './Input.module.scss'

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {}

export const Input: React.FC<Props> = ({...props}) => {
    return <input {...props} className={style.input} type="text" />
}
