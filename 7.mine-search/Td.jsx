import React, {memo, useCallback, useContext, useMemo} from 'react';
import {CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL, TableContext} from "./MineSearch";


const getTdStyle = (code) => {
    switch (code) {
        case CODE.MINE:
        case CODE.NORMAL:
            return {
                background: '#444'
            };
        case CODE.CLICKED_MINE:
        case CODE.OPENED:
            return {
                background: 'white'
            };
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return {
                background: 'yellow'
            }
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return {
                background: 'red'
            }
        default:
            return {
                background: 'white'
            }
    }
};

const getTdText = (code) => {
    console.log('get_td_text');
    switch (code) {
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'X';
        case CODE.CLICKED_MINE:
            return '펑!';
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
            return '?';
        case CODE.FLAG:
        case CODE.FLAG_MINE:
            return '!';
        default:
            return code || '';
    }
}

const Td = memo(({ rowIndex, cellIndex }) => {
    const { tableData, dispatch, halted } = useContext(TableContext);

    const onClickTd = useCallback(() => {
        if (halted) return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.OPENED:
            case CODE.FLAG:
            case CODE.FLAG_MINE:
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                return;
            case CODE.NORMAL:
                dispatch({
                    type: OPEN_CELL, row: rowIndex, cell: cellIndex
                });
                return;
            case CODE.MINE:
                dispatch({
                    type: CLICK_MINE, row: rowIndex, cell: cellIndex
                });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) return;
        switch (tableData[rowIndex][cellIndex]) {
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({
                    type: FLAG_CELL,
                    row: rowIndex,
                    cell: cellIndex
                });
                return;
            case CODE.FLAG:
            case CODE.FLAG_MINE:
                dispatch({
                    type: QUESTION_CELL,
                    row: rowIndex,
                    cell: cellIndex
                });
                return;
            case CODE.QUESTION:
            case CODE.QUESTION_MINE:
                dispatch({
                    type: NORMALIZE_CELL,
                    row: rowIndex,
                    cell: cellIndex
                });
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted]);
    console.log('td_rendered');
    return (
        <RealTd onClickTd={onClickTd} onRightClickTd={onRightClickTd} data={tableData[rowIndex][cellIndex]} />
    )
});

const RealTd = memo(({ onClickTd, onRightClickTd, data }) => {
    console.log('real_td_rendered');
    return (
        <td style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
            {getTdText(data)}
        </td>
    )
});

export default Td;
