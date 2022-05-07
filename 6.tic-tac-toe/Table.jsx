import React from 'react';
import Tr from './Tr';

const Table = ({ tableData, dispatch }) => {
    return (
        <table>
            {Array(tableData.length).fill().map((v, i) => <Tr key={`tr-${i}`} dispatch={dispatch}
                                                              rowData={tableData[i]} rowIndex={i}/>)}
        </table>
    )
}

export default Table;