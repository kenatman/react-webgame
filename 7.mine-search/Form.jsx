import React, {memo, useCallback, useContext, useState} from 'react';
import {START_GAME, TableContext} from "./MineSearch";

const Form = memo( () => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);
    const { dispatch } = useContext(TableContext);

    const onChangeRow = (e) => {
        setRow(e.target.value);
    };

    const onChangeCell = (e) => {
        setCell(e.target.value);
    };

    const onChangeMine = (e) => {
        setMine(e.target.value);
    };

    const onClickBtn = useCallback(() => {
        dispatch({
            type: START_GAME,
            row,
            cell,
            mine
        })
    }, [row, cell, mine]);

    return (
        <>
            <input value={row} onChange={onChangeRow} placeholder={'세로'} type={'number'} />
            <input value={cell} onChange={onChangeCell} placeholder={'가로'} type={'number'} />
            <input value={mine} onChange={onChangeMine} placeholder={'지뢰'} type={'number'} />
            <button onClick={onClickBtn}>시작!</button>
        </>
    )
});

export default Form;