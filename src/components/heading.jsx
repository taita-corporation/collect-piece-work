import React from 'react';
import cn from 'classnames';
import * as s from './heading.module.less';

const Heading = ({ children, bgColor }) => (
  <>
    <div className={s.wrapper}>
      <div as="h1" className={cn(s.inner, { [s.green]: bgColor === 'green', [s.white]: bgColor === 'white' })}>
        {children}
      </div>
    </div>
  </>
);

export default Heading;
