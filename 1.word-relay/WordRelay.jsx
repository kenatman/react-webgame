const React = require('react');
const { Component } = React;

class WordRelay extends Component {
    state = {
        name: 'hello webpack'
    }

    render(){
        return (
            <div>{this.state.name}</div>
        )
    }
}

module.exports = WordRelay;