import React, { memo, useCallback, useMemo, useEffect, useState } from "react";

import { ReactComponent as Loader } from "../../icons/bars-loader.svg";
import { createFakeFetch } from "../../utils/helpers";
import Button from "../Button";
import IconButton from "../IconButton";
import Item from "../Item";
import cross from "../../icons/cross.png";

import css from "./Dialog.module.scss";

const fakeFetch = createFakeFetch();

const Dialog = ({ className, items = [], balance = 0, onClose, onSubmit }) => {
  const [selectedItems, setSelectedItems] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback(
    (id, count) => {
      const newSelItems = { ...selectedItems, [id]: count };

      setSelectedItems(newSelItems);
    },
    [selectedItems]
  );

  const total = useMemo(
    () =>
      items.reduce((acc, { id, price }) => {
        const selectedAmount = selectedItems[id] || 0;
        const subtotal = selectedAmount * price;

        return (acc += subtotal);
      }, 0),
    [items, selectedItems]
  );

  const handleSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await fakeFetch();

      onSubmit(selectedItems, total);
      onClose();
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }, [onClose, onSubmit, selectedItems, total]);

  useEffect(() => {
    let isActive = true;

    if (isActive && total > balance) {
      alert("not enough gold to purchase selected items");
    }

    return () => {
      isActive = false;
    };
  }, [total]);

  const isSubmitDisabled = !total || total > balance || isLoading;

  return (
    <div className={css.Dialog}>
      <div className={css.container}>
        <div className={css.heading}>
          <h3>Order</h3>
          <IconButton className={css.close} onClick={onClose}>
            <img src={cross} alt="close dialog" />
          </IconButton>
        </div>
        <div className={css.itemList}>
          {items.map((item) => (
            <Item
              key={item.id}
              className={css.item}
              count={selectedItems[item.id]}
              item={item}
              onChange={handleChange}
            />
          ))}
        </div>
        <div className={css.total}>
          <p>Total</p>
          <p>{total} gold</p>
        </div>
        <div className={css.buttonGroup}>
          <Button
            className={css.button}
            variant="primary"
            disabled={isSubmitDisabled}
            onClick={handleSubmit}
          >
            {isLoading ? <Loader /> : "Buy"}
          </Button>
          <Button className={css.button} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export { Dialog };

export default memo(Dialog);
