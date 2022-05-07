import React from 'react';
import {CHANGE_TURN, CLICK_CELL} from "./TicTacToe";

const Td = ({ cellData, rowIndex, cellIndex, dispatch }) => {
    const handleClickCell = () => {
        dispatch({
            type: CLICK_CELL,
            rowIndex,
            cellIndex
        });
        dispatch({
            type: CHANGE_TURN
        })
    }

    return (
        <td onClick={handleClickCell}>{cellData}</td>
    )
}

export default Td;