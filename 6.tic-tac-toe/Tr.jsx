import React from 'react';
import Td from './Td';

const Tr = ({ tableRow }) => {
    return (
        <tr>
            { Array(tableRow.length).fill().map((v, i) =>  <Td />) }
        </tr>
    )
}

export default Tr;