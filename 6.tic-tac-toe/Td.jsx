import React from 'react';
import {CHANGE_TURN, CLICK_CELL} from "./TicTacToe";

const Td = ({ cellData, rowIndex, cellIndex, dispatch }) => {
    const handleClickCell = () => {
        if (cellData) return;
        dispatch({
            type: CLICK_CELL,
            rowIndex,
            cellIndex
        });
    }

    return (
        <td onClick={handleClickCell}>{cellData}</td>
    )
}

export default Td;