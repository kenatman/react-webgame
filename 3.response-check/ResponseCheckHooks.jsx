import React, {useRef, useState} from 'react';

const ResponseCheckHooks = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요.');
    const [result, setResult] = useState([]);

    const timeoutId = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const handleClickScreen = () => {
        if(state === 'waiting') {
            setState('ready');
            setMessage(('초록색으로 바뀌면 클릭하세요'));
            timeoutId.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random()*1000 + 2000)) // 2~3초 후 실행
        } else if(state === 'ready') {
            clearTimeout(timeoutId.current);
            setState('waiting');
            setMessage('너무 성급하셨군요. 초록색으로 바뀌면 클릭하세요.');
        } else if (state === 'now') {
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prev) => {
                return [...prev, endTime.current - startTime.current]
            })
        }
    }

    const handleReset = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균시간 : {result.reduce((a,c) => a + c) / result.length} ms</div>
                <button onClick={handleReset}>리셋</button>
            </>
    }

    return (
        <>
            <div
                id={'screen'}
                className={state}
                onClick={handleClickScreen}
            >
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default ResponseCheckHooks;

