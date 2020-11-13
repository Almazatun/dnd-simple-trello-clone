import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import style from './Button.module.scss'

interface IButtonProps extends  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string
}

export const Button: React.FC<IButtonProps> = ({title ,...props}) => {
    return <button {...props} className={style.btn}>{title}</button>
}