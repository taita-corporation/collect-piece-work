import React from 'react';
import { Link } from 'gatsby';

import * as s from './button.module.less';

const Button = ({ to, isExternal, children }) => (
  <div className={s.btnWrapper}>
    {isExternal ? (
      <a href={to} className={s.button}>
        {children}
      </a>
    ) : (
      <Link to={to} className={s.button}>
        {children}
      </Link>
    )}
  </div>
);

export default Button;
