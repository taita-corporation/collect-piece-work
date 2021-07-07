import React from 'react';
import cn from 'classnames';
import * as s from './heading.module.less';

const Heading = ({ children, bgColor, className }) => (
  <>
    <div className={cn(s.wrapper, className, { [s.margin]: bgColor === 'white' })}>
      <div as="h1" className={cn(s.inner, { [s.green]: bgColor === 'green', [s.white]: bgColor === 'white' })}>
        {children}
      </div>
    </div>
  </>
);

export default Heading;
