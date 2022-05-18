import React from 'react';
import {BrowserRouter, Route, Link, Switch} from 'react-router-dom'
import GameMatcher from "./GameMatcher";

const ReactRouter = () => {
    return (
        <BrowserRouter>
            <nav>
                <Link to="/game/lotto-generator?page=2">로또추첨기</Link> &nbsp;
                <Link to="/game/number-baseball">숫자야구</Link> &nbsp;
                <Link to="/game/rsp">가위바위보</Link> &nbsp;
                <Link to="/game/index">게임매처</Link>
            </nav>
            <Switch>
            <Route exact path="/" render={(props) => <GameMatcher {...props} />} />
            <Route path="/game/:name" render={(props) => <GameMatcher {...props} />} /> {/*동적(다이나믹) 라우팅*/} {/*Route에서 component로 prop을 전달할 때는 render 사용*/}
            </Switch>
        </BrowserRouter>
    )
};

export default ReactRouter;