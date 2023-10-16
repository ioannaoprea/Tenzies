import React from "react"

export default function Die(props) {
    const dieStyle = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }

    // const getDiceDots = value => {
    //     switch (value) {
    //         case 1:
    //             return "\u2022";
    //         case 2:
    //             return "\u2022 \n\n \u2022"; // Two dots
    //         case 3:
    //             return "\u2022 \n\u2022 \n\u2022"; // Three dots
    //         case 4:
    //             return "\u2022 \u2022 \n\n \u2022 \u2022"; // Four dots
    //         case 5:
    //             return "\u2022 \u2022 \n\u2022 \n\u2022 \u2022"; // Five dots
    //         case 6:
    //             return "\u2022 \u2022 \u2022 \n\u2022 \u2022 \u2022"; // Six dots
    //         default:
    //             return "";
    //     }
    // }

    return (
        <div 
            className="die-component" 
            style={dieStyle}
            onClick={props.holdDice}
        >
            <h2 className="die-num" >{props.value}</h2>
            {/* <h2 className="die-num" >{getDiceDots(props.value)}</h2> */}
        </div>
    )
}
