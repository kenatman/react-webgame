import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, onClick }) => {
    return (
        <table onClick={onClick}>
            { Array(tableData.length).fill().map((v, i) => <Tr tableRow={tableData[i]}/>) }
        </table>
    )
}

export default Table;