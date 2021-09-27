import React from 'react';

import style from './App.module.scss';
import {DragAndDropContainer} from "../components/DragAndDrop/DragAndDropContainer";


export const App: React.FC = () => {
    return (
        <div className={style.App}>
           <DragAndDropContainer />
        </div>
    );
}

