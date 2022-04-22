import React, { Component } from 'react';

// 함수안에서 this 안쓰면 class 밖으로 뺴는게 낫다.
function getNumbers() {
    // 숫자 네개 겹치지 않고 4개 뽑는 함수
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random()*(9-i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseball extends Component {
    state = {
        result: '',
        value: '',
        answer: getNumbers(),
        tries: []
    }

    render(){
        return (
            <>
                <h1>{this.state.result}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.value} onChange={this.handleChange}/>
                </form>
                <div>시도: {this.state.tries.length}</div>
                <ul>
                    {this.state.tries.map((v, i) => {
                        return (
                            <li key={`${i + 1}차 시도`}>
                                <div>{v.try}</div>
                                <div>{v.result}</div>
                            </li>
                        )
                    })}
                </ul>
            </>
        )
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSubmit = (e) => {
        const { value, tries, answer } = this.state;
        e.preventDefault();
        if (value === answer.join('')) {
            // 안좋은 예 : setState를 연달아 쓰는 문제.. 비동기므로 리액트에서 모았다가 처리. alert가 먼저 실행되는 문제.
            this.setState((prev) => {
                return {
                    result: '홈런!',
                    tries: [...prev.tries, {try: value, result: '홈런!'}]
                }
            });
            alert('게임을 다시 시작합니다.')
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
        } else { // 답이 틀렸으면
            const answerArray = value.split('').map(v => parseInt(v));
            let strike = 0;
            let ball = 0;

            if(tries.length >= 9){ // 10번이상 틀렸을 때
                // 안좋은 예 : setState를 연달아 쓰는 문제.. 비동기므로 리액트에서 모았다가 처리. alert가 먼저 실행되는 문제.
                this.setState({
                    result: `10번 넘게 실패. 답은 ${answer.join(',')} 였습니다.`
                });
                alert('게임을 다시 시작합니다.');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                })
            } else { // 다시 기회를 준다.
                for (let i = 0; i < 4; i++) {
                    if(answerArray[i] === answer[i]){
                        strike++
                    } else if ( answer.includes(answerArray[i]) ) {
                        ball++
                    }
                }
                this.setState((prev) => {
                    return {
                        tries: [...prev.tries, {try: value, result: `${strike} 스트라이크, ${ball} 볼입니다.`}],
                        value: ''
                    }
                })
            }
        }
    }
}

export default NumberBaseball;