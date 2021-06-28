import React, { memo } from "react";

import IconButton from "../IconButton";
import minus from "../../icons/minus.png";
import plus from "../../icons/plus.png";

import css from "./Counter.module.scss";

const Counter = ({ className, onIncrement, onDecrement, onChange, value }) => {
  return (
    <div className={css.Counter}>
      <IconButton onClick={onDecrement}>
        <img src={minus} alt="" />
      </IconButton>
      <input type="text" onChange={onChange} value={value} />
      <IconButton onClick={onIncrement}>
        <img src={plus} alt="" />
      </IconButton>
    </div>
  );
};

export { Counter };

export default memo(Counter);
