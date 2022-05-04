import React, { Component } from 'react';
import Ball from './Ball';

function getWinNumbers() {
    const candidate = Array(45).fill().map((v, i) => (i + 1));
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => (p - c));
    return [...winNumbers, bonusNumber];
}

class Lotto extends Component {
    state = {
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false
    }

    timeoutIds = [];

    componentDidMount() {
      this.runTimeout();
    }

    runTimeout() {
        const { winNumbers } = this.state;
        for (let i = 0; i < winNumbers.length - 1; i++) {
            this.timeoutIds[i] = setTimeout(() => {
                this.setState((prev) => (
                    {
                        winBalls: [...prev.winBalls, winNumbers[i]]
                    }
                ))
            }, (i + 1) * 1000)
        }
        this.timeoutIds[6] = setTimeout(() => {
            this.setState({
                bonus: winNumbers[6],
                redo: true
            })
        }, 7000)
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.winBalls.length === 0) {
            this.runTimeout();
        }
    }

    componentWillUnmount() {
        this.timeoutIds.forEach(v => clearTimeout(v));
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false
        });
        this.timeoutIds = [];
    }

    render(){
        const { winBalls, bonus, redo } = this.state;
        return (
            <>
                <div>당첨숫자</div>
                <div id="결과창">
                    {winBalls.map((v) => <Ball key={v} number={v}/>)}
                </div>
                <div>보너스!</div>
                {bonus && <Ball number={bonus} />}
                {redo && <button onClick={this.onClickRedo}>한 번 더 !</button>}
            </>
            )
    }


}

export default Lotto;