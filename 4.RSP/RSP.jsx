import React, { Component } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    가위: 1,
    바위: 0,
    보: -1
}

class RSP extends Component {
    state = {
        result: '',
        imgCoord: '0',
        score: 0,
    }

    intervalId;

    componentDidMount() {
        this.intervalId = setInterval(() => {
            const { imgCoord } = this.state; // 만약 옆의 변수를 setInterval 밖으로 뺀다면 클로저문제 발생... 비동기함수 바깥에 있는 변수를 참조하면 클로저 발생!!!
            if (imgCoord === rspCoords.바위) {
                this.setState({
                    imgCoord: rspCoords.가위
                });
                } else if (imgCoord === rspCoords.가위) {
                this.setState({
                    imgCoord: rspCoords.보
                });
            } else if (imgCoord === rspCoords.보) {
                this.setState({
                    imgCoord: rspCoords.바위
                });
            }
        }, 1000)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
    }

    componentWillUnmount() {
        clearTimeout(this.intervalId);
    }

    render(){
        const { result, score, imgCoord } = this.state;
        return(
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }

    onClickBtn = () => {

    }
}

export default RSP;