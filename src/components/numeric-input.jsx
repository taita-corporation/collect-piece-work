import * as React from 'react';
import {
  wrap, input,
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
    </div>
  );
}
