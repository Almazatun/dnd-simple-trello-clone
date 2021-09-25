import React, {CSSProperties} from 'react';
import style from './Background.module.scss'

interface IBackgroundProps {
    show: boolean,
    clicked: any
}

export const Background: React.FC<IBackgroundProps> = (props) => {

    const backgroundStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 100,
        left: "0",
        top: "0",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    }

    return props.show ? (
        <div style={backgroundStyle} onClick={props.clicked}> </div>
    ) : null;
}