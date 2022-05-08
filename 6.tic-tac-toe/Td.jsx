import React, { memo, useCallback, useEffect, useRef } from 'react';
import { CLICK_CELL } from "./TicTacToe";

const Td = memo(({ cellData, rowIndex, cellIndex, dispatch }) => {
    const handleClickCell = useCallback(() => {
        if (cellData) return;
        dispatch({
            type: CLICK_CELL,
            rowIndex,
            cellIndex
        });
    }, [cellData]);

    // 렌더링 최적화 스킬 : useEffect와 useRef를 활용하여 어떤 props 때문에 렌더링 되는지 알아보는 방법
    const ref = useRef([]);
    useEffect(() => {
        console.log(cellData === ref.current[0], rowIndex === ref.current[1], cellIndex === ref.current[2], dispatch === ref.current[3] )
        ref.current = [cellData, rowIndex, cellIndex, dispatch];
    }, [cellData, rowIndex, cellIndex, dispatch])

    return (
        <td onClick={handleClickCell}>{cellData}</td>
    )
})

export default Td;