import React, { Component } from 'react';

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: []
    }

    handleClickScreen = () => {

    }

    renderAverage = () => {
        const {result} = this.state;
        return result.length === 0
            ? null
            : <>
                <div>평균시간 : {result.reduce((a,c) => a + c) / result.length} ms</div>
                <button>리셋</button>
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
