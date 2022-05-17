import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom'
// 훅스를 임포트하면 훅스 React 와 여기 React와 충돌 -> 클래스는 충돌x
import LottoClass from '../5.lotto/Lotto';
import NumberBaseballClass from '../2.number-baseball-class/NumberBaseball';
import RSPClass from '../4.RSP/RSP';

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/lotto-generator">로또추첨기</Link> &nbsp;
                <Link to="/number-baseball">숫자야구</Link> &nbsp;
                <Link to="/rsp">가위바위보</Link>
            </nav>
            <Route path="/lotto-generator" component={LottoClass}/>
            <Route path="/number-baseball" component={NumberBaseballClass} />
            <Route path="/rsp" component={RSPClass} />
        </BrowserRouter>
    )
};

export default ReactRouter;