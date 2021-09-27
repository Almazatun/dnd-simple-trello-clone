import React, {ButtonHTMLAttributes, DetailedHTMLProps} from "react";

import style from './Button.module.scss'

interface Props extends  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    title: string
}

export const Button: React.FC<Props> = ({title ,...props}) => {
    return <button {...props} className={style.btn}>{title}</button>
}
