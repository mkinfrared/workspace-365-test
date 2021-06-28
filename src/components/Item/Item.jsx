import React, { memo, useCallback } from "react";

import classNames from "../../utils/classNames";
import Counter from "../Counter";

import css from "./Item.module.scss";

const Item = ({ className, item, count, onChange }) => {
  const handleIncrementClick = useCallback(() => {
    if (count >= item.quantity || !item.quantity) {
      alert("no more items left in store");

      return;
    }

    const newCount = count || 0;

    onChange(item.id, newCount + 1);
  }, [count, item.id, onChange, item.quantity]);

  const handleDecrementClick = useCallback(() => {
    if (count >= 1) {
      const newCount = count || 0;

      onChange(item.id, newCount - 1);
    }
  }, [count, item.id, onChange]);

  const handleInputChange = useCallback(
    (event) => {
      const { value } = event.target;
      const regex = /\D/;

      if (regex.test(value)) {
        return;
      }

      if (+value > item.quantity) {
        alert("no more items left in store");

        return;
      }

      onChange(item.id, +value);
    },
    [item, onChange]
  );

  const inputValue = count || "";

  return (
    <div className={classNames(css.Item, className)}>
      <div className={css.image}>
        <img src={item.image} alt="item pic" />
      </div>
      <p className={css.itemName}>{item.name}</p>
      <Counter
        onDecrement={handleDecrementClick}
        onIncrement={handleIncrementClick}
        onChange={handleInputChange}
        value={inputValue}
      />
      <p className={css.price}>{item.price} gold</p>
    </div>
  );
};

export { Item };

export default memo(Item);
