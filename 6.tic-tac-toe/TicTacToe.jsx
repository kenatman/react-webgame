import React, {useCallback, useReducer, useState} from 'react';
import Table from "./Table";

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';

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
        case CLICK_CELL: {
            const tableData = [...state.tableData];
            tableData[action.rowIndex] = [...tableData[action.rowIndex]];
            tableData[action.rowIndex][action.cellIndex] = state.turn;
            return {
                ...state,
                tableData
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
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


    return (
        // TODO : dispatch 넘겨주기, 액션 만들기
        <>
            <Table tableData={state.tableData} dispatch={dispatch} />
            {state.winner && <div>{state.winner}님의 승리!</div>}
        </>
    )
}

export default TicTacToe;