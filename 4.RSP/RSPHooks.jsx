import React, { useState, useEffect, useRef } from 'react';

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px'
};

const scores = {
    바위: 1,
    가위: 0,
    보: -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find(function(v) {
        return v[1] === imgCoord
    })[0]
}

const RSPHooks = () => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.바위);
    const [score, setScore] = useState(0);

    const intervalId = useRef();
    const clickable = useRef(true);

    useEffect(() => { // componentDidMount, componentDidUpdate 역할(1대1 대응은 아님) -> 클래스 컴포넌트 라이프사이클과 달리 함수는 매번 실행된다.
        console.log('다시실행');
        intervalId.current = setInterval(changeHand, 100);
        return () => { // componentWillUnmount 역할
            console.log('종료');
            clearTimeout(intervalId.current);
        }
    }, [imgCoord])

    const changeHand = () => {
        if (imgCoord === rspCoords.바위) {
            setImgCoord(rspCoords.가위);
        } else if (imgCoord === rspCoords.가위) {
            setImgCoord(rspCoords.보);
        } else if (imgCoord === rspCoords.보) {
            setImgCoord(rspCoords.바위);
        }
    }

    const onClickBtn = (choice) => () => {
        if (clickable.current) {
            clickable.current = false;
            clearInterval(intervalId.current);
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;

            if (diff === 0) {
                setResult('비겼습니다.');
            } else if ([1, -2].includes(diff)) {
                setResult('이겼습니다.');
                setScore((prev) => (prev + 1));
            } else {
                setResult('졌습니다.');
                setScore((prev) => (prev - 1));
            }
            setTimeout(() => {
                clickable.current = true;
                intervalId.current = setInterval(changeHand, 100);
            }, 1000)
        }
    }

    return (
        <>
            <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
            <div>
                <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button> {/*콜백이 아니라 함수호출이 들어간다? -> 고차함수다.*/}
                <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
                <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
            </div>
            <div>{result}</div>
            <div>현재 {score}점</div>
        </>
    )
}

export default RSPHooks;

