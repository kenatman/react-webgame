import React, {useState} from 'react';

const Form = () => {
    const [row, setRow] = useState(10);
    const [cell, setCell] = useState(10);
    const [mine, setMine] = useState(20);

    const onChangeRow = (e) => {
        setRow(e.target.value);
    };

    const onChangeCell = (e) => {
        setCell(e.target.value);
    };

    const onChangeMine = (e) => {
        setMine(e.target.value);
    };

    const onClickBtn = () => {

    };

    return (
        <>
            <input value={row} onChange={onChangeRow} placeholder={'세로'} type={'number'} />
            <input value={cell} onChange={onChangeCell} placeholder={'가로'} type={'number'} />
            <input value={mine} onChange={onChangeMine} placeholder={'지뢰'} type={'number'} />
            <button onClick={onClickBtn}>시작!</button>
        </>
    )
};

export default Form;