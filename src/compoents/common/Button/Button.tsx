import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import style from './Button.module.scss'

type ButtonT = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & {title: string}

export const Button: React.FC<ButtonT> = ({title ,...props}) => {
    return <button {...props} className={style.btn}>{title}</button>
}