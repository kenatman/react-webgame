import React, { Component } from 'react';

function getNumbers() {
    // 숫자 네개 겹치지 않고 4개 뽑는 함수
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

                </ul>
            </>
        )
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
    }
}

export default NumberBaseball;