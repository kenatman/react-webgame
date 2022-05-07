import React from 'react';
import Td from './Td';

const Tr = ({ rowData, rowIndex, dispatch }) => {
    return (
        <tr>
            {Array(rowData.length).fill().map((v, i) => <Td key={`td-${i}`} dispatch={dispatch}
                                                             cellData={rowData[i]} rowIndex={rowIndex}
                                                             cellIndex={i}/>)}
        </tr>
    )
}

export default Tr;