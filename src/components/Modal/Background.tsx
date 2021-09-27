import React, {CSSProperties} from 'react';

interface Props {
    show: boolean,

    clicked: () => void
}

export const Background: React.FC<Props> = (props) => {

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
