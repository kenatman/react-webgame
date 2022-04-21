const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        word: '웹스톰',
        value: '',
        result: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if(this.state.word[this.state.word.length -1] === this.state.value[0]){
            this.setState({
                word: this.state.value,
                value: '',
                result: "딩동댕"
            });
        } else {
            this.setState({
                value: '',
                result: "떙!"
            })
        }
        this.input.focus();
    }

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    input;

    handleRef = (c) => {
        this.input = c;
    }

    render(){
        return (
            <>
                <div>제시어 : {this.state.word}</div>
                <form onSubmit={this.handleSubmit}>
                    <input ref={this.handleRef} value={this.state.value} onChange={this.handleChange} />
                    <button>입력</button>
                </form>
                <div>{this.state.result}</div>
            </>
        )
    }
}

module.exports = WordRelay;