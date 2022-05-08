import React, {useCallback, useEffect, useReducer, useState} from 'react';
import Table from "./Table";

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

const initialState = {
    winner: '',
    turn: 'O',
    tableData: [['', '', ''], ['', '', ''], ['', '', '']],
    recentCell: [-1, -1]
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
                tableData,
                recentCell: [action.rowIndex, action.cellIndex]
            }
        }
        case CHANGE_TURN: {
            return {
                ...state,
                turn: state.turn === 'O' ? 'X' : 'O'
            }
        }
        case RESET_GAME:
            return {
                ...state,
                turn: 'O',
                tableData: [['', '', ''], ['', '', ''], ['', '', '']],
                recentCell: [-1, -1]
            }
        default:
            return state;
    }
}

const TicTacToe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { winner, turn, tableData, recentCell } = state;

    useEffect(() => { // 셀을 클릭할 때마다 승부를 판단한다.
        const [row, cell] = recentCell;
        if (row < 0) return;
        let hasWinner = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) { // 가로검사
            hasWinner = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) { // 세로검사
            hasWinner = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) { // 대각선검사
            hasWinner = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) { // 대각선검사
            hasWinner = true;
        }
        if (hasWinner) { // 승자가 있는 경우
            dispatch({
                type: SET_WINNER,
                winner: turn
            });
            dispatch({
                type: RESET_GAME
            });
        } else { // 승자가 없는 경우
            let isDraw = true;
            tableData.forEach(row => {
                row.forEach(cell => {
                    if(!cell) {
                        isDraw = false;
                    }
                })
            });
            if (isDraw) { // 무승부 시
                dispatch({
                    type: RESET_GAME
                });
            } else { // 무승부 아니고 승자가 없을 시 턴을 넘긴다.
                dispatch({
                    type: CHANGE_TURN
                })
            }

        }
    }, [recentCell])

    return (
        <>
            <Table tableData={tableData} dispatch={dispatch} />
            {winner && <div>{winner}님의 승리!</div>}
        </>
    )
}

export default TicTacToe;