import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import Ball from './Ball';

function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v, i) => (i + 1));
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length - 1];
    const winNumbers = shuffle.slice(0, 6).sort((p, c) => (p - c));
    return [...winNumbers, bonusNumber];
}

const LottoHooks = () => {
    const memoWinNumbers = useMemo(() => getWinNumbers(), []);
    const [winNumbers, setWinNumbers] = useState(memoWinNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeoutIds = useRef([]);

    const runTimeout = () => {
        for (let i = 0; i < winNumbers.length - 1; i++) {
            timeoutIds.current[i] = setTimeout(() => {
                setWinBalls((prev) => (
                    [...prev, winNumbers[i]]
                ))
            }, (i + 1) * 1000)
        }
        timeoutIds.current[6] = setTimeout(() => {
            setBonus(winNumbers[6]);
            setRedo(true);
        }, 7000)
    }

    const onClickRedo = useCallback(() => {
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);

        timeoutIds.current = [];
    }, [winNumbers])

    // 패턴 : componentDidUpdate()만! componentDidMount X
/*    const mounted = useRef(false);
    useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
        } else {
            // ajax
        }
    }, [바뀌는 값])*/

    useEffect(() => {
        runTimeout();
        return () => {
            timeoutIds.current.forEach(v => clearTimeout(v));
        }
    }, [timeoutIds.current])

    return (
        <>
            <div>당첨숫자</div>
            <div id="결과창">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스!</div>
            {bonus && <Ball number={bonus} />}
            {redo && <button onClick={onClickRedo}>한 번 더 !</button>}
        </>
    )
}

export default LottoHooks;
