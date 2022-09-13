import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import "./Clock.scss";

const NumberSpan = styled.span.attrs((props: { index: number }) => props)`
    position: absolute;
    inset: 20px;
    color: #fff;
    text-align: center;
    transform: rotate(calc(30deg * ${(props) => props.index}));
`;

const NumberBlock = styled.b<{ index: number }>`
    font-size: 2em;
    opacity: 0.25;
    font-weight: 600;
    display: inline-block;
    transform: rotate(calc(-30deg * ${(props) => props.index}));
`;

const Circle = styled.div<{ radius: number; rotation: number; color: string }>`
    position: absolute;
    width: ${(props) => props.radius * 2}px;
    height: ${(props) => props.radius * 2}px;
    border: 2px solid rgba(0, 0, 0, 0.25);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-item: flex-start;
    transform: rotateZ(${(props) => props.rotation}deg);
    &:before {
        content: "";
        position: absolute;
        top: -8.5px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        background: ${(props) => props.color};
        box-shadow: 0 0 20px ${(props) => props.color}, 0 0 60px ${(props) => props.color};
    }
`;

const Hand = styled.i<{ color: string; width: number }>`
    position: absolute;
    width: ${(props) => props.width}px;
    height: 50%;
    background: ${(props) => props.color};
    transform-origin: bottom;
    transform: scale(0.5);
    z-index: 10;
`;

type DigitalClockProps = {
    className: string;
    hh: number;
    mm: number;
    ss: number;
    hhColor: string;
    mmColor: string;
    ssColor: string;
    ampm: string;
};

const DigitalClock: FunctionComponent<DigitalClockProps> = (props) => {
    return (
        <div className={props.className}>
            <div>
                {props.hh.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
            </div>
            <div>:</div>
            <div>
                {props.mm.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
            </div>
            <div>:</div>
            <div>
                {props.ss.toLocaleString("en-US", {
                    minimumIntegerDigits: 2,
                    useGrouping: false,
                })}
            </div>
            <div>{props.ampm}</div>
        </div>
    );
};

const DigitalClockStyled = styled(DigitalClock)<DigitalClockProps>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding-bottom: 30px;
    font-size: 1.5rem;
    > div {
        display: flex;
        flex-direction: row;
        font-size: 1.5rem;
        font-weight: 600;
    }
    > div:nth-child(1) {
        color: ${(props) => props.hhColor};
        width:40px;
    }
    > div:nth-child(2) {
        color: ${(props) => props.hhColor};
    }
    > div:nth-child(3) {
        color: ${(props) => props.mmColor};
        width:40px;
    }
    > div:nth-child(4) {
        color: ${(props) => props.mmColor};
    }
    > div:nth-child(5) {
        color: ${(props) => props.ssColor};
        font-size: 1.5rem;
        width:40px;
    }
    > div:nth-child(6) {
        justify-content: center;
        align-items: center;
        color: #fff;
    }
`;

function Clock() {
    const [ss, setss] = useState(0);
    const [mm, setmm] = useState(0);
    const [hh, sethh] = useState(0);
    const [ampm, setampm] = useState<string>("");

    useEffect(() => {
        updateTime();
        const interval = setInterval(() => {
            updateTime();
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const updateTime = () => {
        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        sethh(h);
        setmm(m);
        setss(s);
        const _ampm = now.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }).split(" ")[1];
        setampm(_ampm);
    };

    return (
        <div className="app">
            <div className="container">
                <div className="clock">
                    <Circle radius={150} rotation={ss * 6} color="#04fc43">
                        <Hand color="#04fc43" width={2}></Hand>
                    </Circle>
                    <Circle radius={120} rotation={mm * 6} color="#fee800">
                        <Hand color="#fee800" width={4}></Hand>
                    </Circle>
                    <Circle radius={90} rotation={hh * 30 + mm / 12} color="#ff2972">
                        <Hand color="#ff2972" width={6}></Hand>
                    </Circle>
                    <NumberSpan index={1}>
                        <NumberBlock index={1}>1</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={2}>
                        <NumberBlock index={2}>2</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={3}>
                        <NumberBlock index={3}>3</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={4}>
                        <NumberBlock index={4}>4</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={5}>
                        <NumberBlock index={5}>5</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={6}>
                        <NumberBlock index={6}>6</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={7}>
                        <NumberBlock index={7}>7</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={8}>
                        <NumberBlock index={8}>8</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={9}>
                        <NumberBlock index={9}>9</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={10}>
                        <NumberBlock index={10}>10</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={11}>
                        <NumberBlock index={11}>11</NumberBlock>
                    </NumberSpan>
                    <NumberSpan index={12}>
                        <NumberBlock index={12}>12</NumberBlock>
                    </NumberSpan>
                </div>
                <DigitalClockStyled className="" hh={hh} mm={mm} ss={ss} ampm={ampm} hhColor="#04fc43" mmColor="#fee800" ssColor="#ff2972"></DigitalClockStyled>
            </div>
        </div>
    );
}

export default Clock;
