import React from 'react';
import * as s from './heading.module.less';

const Heading = ({ children }) => (
  <>
    <div className={s.wrapper}>
      <div as="h1" className={s.inner}>
        {children}
      </div>
    </div>
  </>
);

export default Heading;
