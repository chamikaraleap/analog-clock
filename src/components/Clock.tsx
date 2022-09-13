import React, { useState, useEffect, FunctionComponent } from "react";
import styled from "styled-components";
import "./Clock.scss";

const Container = styled.div<{ radius: number }>`
    position: relative;
    // min-height: 500px;
    border-radius: 20px;
    border-top-left-radius: ${(props) => props.radius}px;
    border-top-right-radius: ${(props) => props.radius}px;
    box-shadow: 25px 25px 75px rgba(0, 0, 0, 25), inset 5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 20px rgba(0, 0, 0, 0.2), inset -5px -5px 15px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const AnalogClock = styled.div<{ radius: number }>`
    position: relative;
    width: ${(props) => props.radius * 2}px;
    height: ${(props) => props.radius * 2}px;
    background: #2f363e;
    border-radius: 50%;
    box-shadow: 10px 50px 70px rgba(0, 0, 0, 25), inset 5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 10px rgba(0, 0, 0, 0.2), inset -5px -5px 15px rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        background: #2f363e;
        border: 3px solid #fff;
        border-radius: 50%;
        z-index: 999;
    }
`;

const NumberSpan = styled.span<{ index: number }>`
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
    border: 2px solid rgba(0, 0, 0, 0.5);
    border-radius: 40px;
    box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5), inset 5px 5px 20px rgba(355, 255, 255, 0.2), inset -5px -5px 15px rgba(0, 0, 0, 0.73);
    padding: 17px;
    margin-bottom: 30px;
    > div {
        display: flex;
        flex-direction: row;
        font-size: 1.5rem;
        font-weight: 600;
    }
    > div:nth-child(1) {
        color: ${(props) => props.hhColor};
        width: 40px;
    }
    > div:nth-child(2) {
        color: ${(props) => props.hhColor};
    }
    > div:nth-child(3) {
        color: ${(props) => props.mmColor};
        width: 40px;
    }
    > div:nth-child(4) {
        color: ${(props) => props.mmColor};
    }
    > div:nth-child(5) {
        color: ${(props) => props.ssColor};
        font-size: 1.5rem;
        width: 40px;
    }
    > div:nth-child(6) {
        justify-content: center;
        align-items: center;
        color: #fff;
    }
`;

type ClockProps = {
    clockRadius?: number;
    secHandColor?: "string";
    minHandColor?: "string";
    hrHandColor?: "string";
    showDigitalClock?: boolean;
};

const Clock: FunctionComponent<ClockProps> = ({ clockRadius = 300, secHandColor = "#04fc43", minHandColor = "#fee800", hrHandColor = "#ff2972", showDigitalClock = true }) => {
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
            <Container radius={clockRadius}>
                <AnalogClock radius={clockRadius}>
                    <Circle radius={(clockRadius / 3) * 2} rotation={ss * 6} color={secHandColor}>
                        <Hand color={secHandColor} width={2}></Hand>
                    </Circle>
                    <Circle radius={(clockRadius / 15) * 8} rotation={mm * 6} color={minHandColor}>
                        <Hand color={minHandColor} width={4}></Hand>
                    </Circle>
                    <Circle radius={(clockRadius / 15) * 6} rotation={hh * 30 + mm / 12} color={hrHandColor}>
                        <Hand color={hrHandColor} width={6}></Hand>
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
                </AnalogClock>
                {showDigitalClock && <DigitalClockStyled className="" hh={hh} mm={mm} ss={ss} ampm={ampm} hhColor={hrHandColor} mmColor={minHandColor} ssColor={secHandColor}></DigitalClockStyled>}
            </Container>
        </div>
    );
};

export default Clock;
