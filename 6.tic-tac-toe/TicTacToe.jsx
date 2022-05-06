import React, {useCallback, useReducer, useState} from 'react';
import Table from "./Table";

const SET_WINNER = 'SET_WINNER';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']]
}

const reducer = (state, action) => {
    switch(action.type){
        case SET_WINNER:
            return {
                ...state,
                winner: action.winner
            }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

/*    const [winner, setWinner] = useState('');
    const [turn, setTurn] = useState('O');
    const [tableData, setTableData] = useState([['', '', ''], ['', '', ''], ['', '', '']]);*/

    const handleClick = useCallback(() => {
        dispatch({
            type: SET_WINNER,
            winner: 'X'
        })
    });

    return (
        <>
            <Table tableData={state.tableData} onClick={handleClick}/>
            {state.winner && <div>{state.winner}님의 승리!</div>}
        </>
    )
}

export default TicTacToe;