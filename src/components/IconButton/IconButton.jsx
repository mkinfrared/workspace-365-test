import React, { memo } from "react";

import classNames from "../../utils/classNames";

import css from "./IconButton.module.scss";

const IconButton = ({ children, className, onClick }) => {
  return (
    <button className={classNames(css.IconButton, className)} onClick={onClick}>
      {children}
    </button>
  );
};

export { IconButton };

export default memo(IconButton);
