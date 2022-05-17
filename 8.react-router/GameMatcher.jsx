import React, { Component } from "react";
// 훅스를 임포트하면 훅스가 속한 node_modules/React 와 여기 node_modulesReact와 충돌 -> 클래스는 충돌x
import LottoClass from '../5.lotto/Lotto';
import NumberBaseballClass from '../2.number-baseball-class/NumberBaseball';
import RSPClass from '../4.RSP/RSP';

class GameMatcher extends Component {
    render() {
        const { match: { params: { name } } } = this.props;
        if (name === 'lotto-generator') {
            return <LottoClass />
        } else if (name === 'number-baseball') {
            return <NumberBaseballClass />
        } else if (name === 'rsp') {
            return <RSPClass />
        }
        return (
          <h1>매칭 게임이 없습니다.</h1>
        )
    }
}

export default GameMatcher;