const React = require('react');
const { useState, useRef } = React;

const WordRelay = () => {
    const [word, setWord] = useState('훅스');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if(word[word.length -1] === value[0]){
            setWord(value);
            setValue('');
            setResult('딩동댕');
        } else {
            setValue('');
            setResult('땡!');
        }
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <div>제시어 : {word}</div>
            <form onSubmit={handleSubmit}>
                <input ref={inputRef} value={value} onChange={handleChange} />
                <button>입력</button>
            </form>
            <div>{result}</div>
        </>
        )
}

module.exports = WordRelay;