import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: []
    }

    timeoutId;
    startTime;
    endTime;

    handleClickScreen = () => {
        const { state, message, result } = this.state;
        if(state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색으로 바뀌면 클릭하세요'
            });
            this.timeoutId = setTimeout(() => {
              this.setState({
                  state: 'now',
                  message: '지금 클릭'
              });
              this.startTime = new Date();
            }, Math.floor(Math.random()*1000 + 2000)) // 2~3초 후 실행
        } else if(state === 'ready') {
            clearTimeout(this.timeoutId);
            this.setState({
                state: 'waiting',
                message: '너무 성급하셨군요. 초록색으로 바뀌면 클릭하세요.'
            })
        } else if (state === 'now') {
            this.endTime = new Date();
            this.setState((prev) => ({
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prev.result, this.endTime - this.startTime]
                })
            )
        }
    }

    handleReset = () => {
        this.setState({
            result: []
        })
    }

    renderAverage = () => {
        const {result} = this.state;
        return result.length === 0
            ? null
            : <>
                <div>평균시간 : {result.reduce((a,c) => a + c) / result.length} ms</div>
                <button onClick={this.handleReset}>리셋</button>
            </>
    }

    render(){
        const { state, message, result } = this.state;
        return(
            <>
                <div
                    id={'screen'}
                    className={state}
                    onClick={this.handleClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
            </>
            )
    }
}

export default ResponseCheck;
