import React, { memo } from "react";

import classNames from "../../utils/classNames";

import css from "./Button.module.scss";

const Button = ({
  children,
  className,
  disabled = false,
  onClick,
  variant = "default",
}) => {
  const classes = [css.Button, className];

  if (variant === "primary") {
    classes.push(css.primary);
  }

  return (
    <button
      className={classNames(...classes)}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export { Button };

export default memo(Button);
