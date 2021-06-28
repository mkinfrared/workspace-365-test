import React, { useCallback, useState, useEffect } from "react";

import Dialog from "./components/Dialog";
import { service } from "./service";
import { Navbar } from "./Navbar";
import { Stock } from "./Stock";
import { Footer } from "./Footer";

function App() {
  const [user, setUser] = useState(null);
  const [stock, setStock] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDialogOpen(false);
  }, []);

  const handleSubmitClick = useCallback(
    (items, total) => {
      const newUser = { ...user, balance: user.balance - total };
      const newStock = stock.map((stockItem) => {
        const purchasedAmount = items[stockItem.id] || 0;
        const newItem = {
          ...stockItem,
          quantity: stockItem.quantity - purchasedAmount,
        };

        return newItem;
      });

      setUser(newUser);
      setStock(newStock);
    },
    [stock, user]
  );

  useEffect(() => {
    service
      .getUser()
      .then((user) => {
        setUser(user);
      })
      .then(service.list)
      .then((items) => {
        setStock(items);
      });
  }, []);

  return (
    <>
      <Navbar openModal={openDialog} user={user} />
      <div className="container body-content">
        <h2>Hello, {user?.login}</h2>
        <p>Have a nice day</p>
        <Stock stock={stock} />
        <Footer />
      </div>
      {isDialogOpen && (
        <Dialog
          items={stock}
          balance={user?.balance}
          onSubmit={handleSubmitClick}
          onClose={closeDialog}
        />
      )}
    </>
  );
}

export default App;
