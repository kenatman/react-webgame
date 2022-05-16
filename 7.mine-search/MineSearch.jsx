import React, {useReducer, createContext, useMemo, useEffect} from 'react';
import Table from "./Table";
import Form from "./Form";

export const CODE = {
    MINE: -7, // 닫힌 칸
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6, // 열린 칸
    OPENED: 0 // 0 이상이면 다 opened
}

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const TableContext = createContext({
    tableData: [],
    dispatch: () => {},
    halted: true
})

const initialState = {
    tableData: [],
    data: {
        row: 0,
        cell: 0,
        mine: 0
    },
    timer: 0,
    result: '',
    halted: true,
    openedCount: 0
};

const plantMine = (row, cell, mine) => {
    const candidate = Array(row * cell).fill().map((v, i) => i);
    const shuffle = [];
    while (candidate.length > row * cell - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    // 지뢰찾기 빈 테이블 생성하기
    for (let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for (let j = 0; j < cell; j++) {
            rowData.push(CODE.NORMAL);
        }
    }
    // 빈 테이블에서 지뢰심기
    for (let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / cell);
        const hor = shuffle[k] % cell;
        data[ver][hor] = CODE.MINE;
    }

    return data;
}

const reducer = (state, action) => {
    switch (action.type) {
        case START_GAME:
            return {
                ...state,
                tableData: plantMine(action.row, action.cell, action.mine),
                data: {
                    row: action.row,
                    cell: action.cell,
                    mine: action.mine
                },
                halted: false,
                openedCount: 0,
                timer: 0
            };

        case OPEN_CELL: {
            const tableData = [...state.tableData];
            tableData.forEach((row, i) => { // 선택한 셀 뿐 아니라 주변 셀들도 불변성 지켜야 하므로 모두 복사
                tableData[i] = [...row];
            });
            const checked = [];
            let openedCount = 0;
            const checkAround = (row ,cell) => {
                // 상하좌우 없는 칸은 안 열기
                if (row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length ) return;
                // 열린 칸은 안 열기
                if ([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION, CODE.QUESTION_MINE].includes(tableData[row][cell])) return;
                // 한 번 연칸은 안 열기
                if (checked.includes(row + ',' + cell)) return;
                else {
                    checked.push(row + ',' + cell);
                }

                let around = [];
                if (tableData[row - 1]) {
                    around = around.concat(
                        tableData[row - 1][cell - 1],
                        tableData[row - 1][cell],
                        tableData[row - 1][cell + 1]
                    );
                }
                // [][]일 때, 첫번째 배열이 null, undefined면 에러 발생하지만 두번째배열은 에러 안남. null, undefined 안의 값을 접근 안하기 때문.
                around = around.concat(
                    tableData[row][cell - 1],
                    tableData[row][cell],
                    tableData[row][cell + 1]
                );
                if (tableData[row + 1]) {
                    around = around.concat(
                        tableData[row + 1][cell - 1],
                        tableData[row + 1][cell],
                        tableData[row + 1][cell +1],
                    )
                }
                const count = around.filter((v) => ([CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE].includes(v))).length;
                if (count === 0) { // 주변 칸 오픈
                    if (row > -1) {
                        const near = [];
                        if (row - 1 > -1) {
                            near.push([row - 1, cell - 1]);
                            near.push([row - 1, cell]);
                            near.push([row -1, cell + 1]);
                        }
                        near.push([row, cell - 1]);
                        near.push([row, cell + 1]);
                        if (row + 1 < tableData.length) {
                            near.push([row + 1, cell -1]);
                            near.push([row + 1, cell]);
                            near.push([row + 1, cell + 1]);
                        }
                        near.forEach((n) => {
                            if (tableData[n[0]][n[1]] !== CODE.OPENED) {
                                checkAround(n[0], n[1]); // 자기 자신을 호출(재귀함수) : 콜스택 초과 안되도록 후처리 잘해야함.
                            }

                        })
                    }
                }

                if (tableData[row][cell] === CODE.NORMAL) {
                    openedCount++;
                }
                tableData[row][cell] = count;
            };

            checkAround(action.row, action.cell)

            let halted = false;
            let result = '';
            if (state.data.row * state.data.cell - state.data.mine === state.openedCount + openedCount) { // 승리
                halted = true;
                result = `${state.timer}초만에 승리하였습니다.`
            }

            return {
                ...state,
                tableData,
                halted,
                result,
                openedCount: state.openedCount + openedCount
            };
        }

        case CLICK_MINE: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            tableData[action.row][action.cell] = CODE.CLICKED_MINE;
            return {
                ...state,
                tableData,
                halted: true
            };
        }

        case FLAG_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.MINE) {
                tableData[action.row][action.cell] = CODE.FLAG_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.FLAG;
            }
            return {
                ...state,
                tableData
            };
        }

        case QUESTION_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.FLAG_MINE) {
                tableData[action.row][action.cell] = CODE.QUESTION_MINE;
            } else {
                tableData[action.row][action.cell] = CODE.QUESTION;
            }
            return {
                ...state,
                tableData
            };
        }

        case NORMALIZE_CELL: {
            const tableData = [...state.tableData];
            tableData[action.row] = [...state.tableData[action.row]];
            if (tableData[action.row][action.cell] === CODE.QUESTION_MINE) {
                tableData[action.row][action.cell] = CODE.MINE;
            } else {
                tableData[action.row][action.cell] = CODE.NORMAL;
            }
            return {
                ...state,
                tableData
            };
        }

        case INCREMENT_TIMER:
            return {
                ...state,
                timer: state.timer + 1
            }

        default:
            return state;
    }
}

const MineSearch = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // contextAPI로 넘겨주는 props 렌더링 최적화를 위해 useMemo를 사용하여 캐싱.
    const value = useMemo(() => ({
        tableData: state.tableData,
        dispatch,
        halted: state.halted
    }), [state.tableData, state.halted])

    useEffect(() => {
            let intervalId;
            if (!state.halted) {
                intervalId = setInterval(() => {
                    dispatch({
                        type: INCREMENT_TIMER
                    })
                }, 1000);
            }
            return () => {
                clearTimeout(intervalId);
            }
        }
        , [state.halted])

    return (
        <TableContext.Provider value={value}>
            <Form />
            <div>{state.timer}</div>
            <Table />
            <div>{state.result}</div>
        </TableContext.Provider>

    )
};

export default MineSearch;