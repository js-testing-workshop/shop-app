import React, { useRef, useState } from 'react';
import { RangeFilterConfig } from '../../../../types/filter.ts';

import './range-slider-style.css';

type RangeSliderProps = RangeFilterConfig['data'] & {
  formatValue?: (value: number) => number;
  onChange: (value: { from: number, to: number }) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, precision = 0, formatValue = (val) => val, onChange }) => {
  const _precision = 10 ** precision;
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [leftShift, setLeftShift] = useState<number>(0);
  const [rightShift, setRightShift] = useState<number>(0);

  const [leftPosition, setLeftPosition] = useState<number>(0);
  const [rightPosition, setRightPosition] = useState<number>(0);

  const [isLeftThumbActive, setIsLeftThumbActive] = useState(false);
  const [isRightThumbActive, setIsRightThumbActive] = useState(false);

  const [from, setFrom] = useState<number>(min);
  const [to, setTo] = useState<number>(max);

  const handleLeftThumbPointerDown: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsLeftThumbActive(true);
    setIsRightThumbActive(false);

    // @ts-expect-error -- ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { right } = event.target.getBoundingClientRect() as DOMRect;

    setLeftShift(right - event.clientX);
  };

  const handleLeftThumbPointerUp: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsLeftThumbActive(false);

    onChange({ from, to });
  };

  const handleRightThumbPointerDown: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsRightThumbActive(true);
    setIsLeftThumbActive(false);

    // @ts-expect-error -- ignore
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const { left } = event.target.getBoundingClientRect() as DOMRect;

    setRightShift(left - event.clientX);
  };

  const handleRightThumbPointerUp: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();
    setIsRightThumbActive(false);

    onChange({ from, to });
  };

  const getValue = () => {
    const rangeTotal = max - min;

    const fromValue = (leftPosition * rangeTotal) / 100;
    const toValue = (rightPosition * rangeTotal) / 100;

    const from =
      Math.round((min + fromValue) * _precision) / _precision;
    const to =
      Math.round((max - toValue) * _precision) / _precision;

    return { from, to };
  };

  const handleLeftThumbPointerMove: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();

    if (!isLeftThumbActive) return;

    const {
      left: innerLeft,
      width,
    } = wrapperRef.current!.getBoundingClientRect();


    let newLeft = (event.clientX - innerLeft + leftShift) / width;

    if (newLeft < 0) {
      newLeft = 0;
    }
    newLeft *= 100;

    if (newLeft + rightPosition > 100) {
      newLeft = 100 - rightPosition;
    }

    setLeftPosition(newLeft);
    setFrom(getValue().from);
  };


  const handleRightThumbPointerMove: React.PointerEventHandler<HTMLSpanElement> = (event) => {
    event.preventDefault();

    if (!isRightThumbActive) return;

    const {
      right: innerRight,
      width,
    } = wrapperRef.current!.getBoundingClientRect();

    let newRight = (innerRight - event.clientX - rightShift) / width;

    if (newRight < 0) {
      newRight = 0;
    }
    newRight *= 100;

    if (leftPosition + newRight > 100) {
      newRight = 100 - leftPosition;
    }
    setRightPosition(newRight);
    setTo(getValue().to);
  };

  const handlePointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
    if (isLeftThumbActive) {
      handleLeftThumbPointerMove(e);
    } else {
      handleRightThumbPointerMove(e);
    }
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    setIsRightThumbActive(false);
    setIsLeftThumbActive(false);

    onChange({ from, to });
  };

  return (
    <div className="range-slider" onPointerMove={handlePointerMove} onMouseLeave={handleMouseLeave}>
      <span>{formatValue(from)}</span>
      <div ref={wrapperRef} className="range-slider__inner">
        <span
          className="range-slider__progress"
          style={{ left: leftPosition + '%', right: rightPosition + '%' }}
        ></span>
        <span
          className={`range-slider__thumb-left ${isLeftThumbActive ? 'range-slider_dragging' : ''}`}
          style={{ left: leftPosition + '%' }}
          onPointerDown={handleLeftThumbPointerDown}
          onPointerUp={handleLeftThumbPointerUp}
        ></span>
        <span
          className={`range-slider__thumb-right ${isRightThumbActive ? 'range-slider_dragging' : ''}`}
          style={{ right: rightPosition + '%' }}
          onPointerDown={handleRightThumbPointerDown}
          onPointerUp={handleRightThumbPointerUp}
        ></span>
      </div>
      <span>{formatValue(to)}</span>
    </div>
  );
};

export default RangeSlider;