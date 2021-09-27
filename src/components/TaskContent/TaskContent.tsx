import React from 'react';

import style from './TaskContent.module.scss'

interface Props {
  taskTitle: string
}

export const TaskContent: React.FC<Props> = (props: Props) => {
  const {taskTitle} = props;
  return (
    <div className={style.content}>
      <span style={{fontSize: '26px'}}>{taskTitle.toUpperCase()}</span>
    </div>
  )
}
