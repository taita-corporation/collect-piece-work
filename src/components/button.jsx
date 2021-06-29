import React from 'react';
import { Link } from 'gatsby';

import * as s from './button.module.less';

const Button = ({ to, children }) => (
  <div className={s.btnWrapper}>
    <Link to={to} className={s.button}>
      {children}
    </Link>
  </div>
);

export default Button;
