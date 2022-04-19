const React = require('react');
const { useState, useRef } = React;

const GuGuDan = () => {
    const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
    const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
    const [value, setValue] = useState("");
    const [result, setResult] = useState("");
    const inputRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (parseInt(value) === first * second) {
            setFirst(Math.ceil(Math.random() * 9));
            setSecond(Math.ceil(Math.random() * 9));
            setValue("");
            setResult("정답: " + value)

        } else {
            setValue("");
            setResult("땡");
        }
        inputRef.current.focus();
    }

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    return (
        <>
            <div>{first} 곱하기 {second}는?</div>
            <form onSubmit={handleSubmit}>
                <input
                    ref={inputRef}
                    type="number"
                    value={value}
                    onChange={handleChange}/>
                <button>입력</button>
            </form>
            <div>
                {result}
            </div>
        </>
    )
}

module.exports = GuGuDan;