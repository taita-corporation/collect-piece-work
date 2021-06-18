import * as React from 'react';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import {
  wrap, increment, decrement, input,
} from './numeric-input.module.css';

export function NumericInput({
  onIncrement,
  onDecrement,
  className,
  disabled,
  ...props
}) {
  return (
    <div className={wrap}>
      <input
        disabled={disabled}
        type="numeric"
        className={[input, className].join(' ')}
        {...props}
      />
      <button
        disabled={disabled}
        className={`${increment} focus:outline-none`}
        aria-label="Increment"
        onClick={onIncrement}
        type="button"
      >
        <span>+</span>
        <MdArrowDropUp />
      </button>
      <button
        disabled={disabled}
        className={`${decrement} focus:outline-none`}
        aria-label="Decrement"
        onClick={onDecrement}
        type="button"
      >
        <span>-</span>
        <MdArrowDropDown />
      </button>
    </div>
  );
}
