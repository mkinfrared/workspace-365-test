import battleAxe from "./images/battle_axe.png";
import bronzeSword from "./images/bronze_sword.png";
import longsword from "./images/longsword.png";
import woodenShield from "./images/wooden_shield.png";

let user = {
  id: 1,
  login: "user1@example.com",
  balance: 120,
};

let items = [
  {
    id: 2,
    name: "Bronze sword: low quality, low price",
    price: 8,
    quantity: 10,
    image: bronzeSword,
  },
  {
    id: 7,
    name: "Wooden shield",
    price: 15,
    quantity: 5,
    image: woodenShield,
  },
  {
    id: 101,
    name: "Battle axe",
    price: 12,
    quantity: 2,
    image: battleAxe,
  },
  {
    id: 3,
    name: "Longsword, carefully crafted to slay your enemies",
    price: 31,
    quantity: 1,
    image: longsword,
  },
];

function simulateSuccessfulRequest(result) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(result), Math.random() * 100);
  });
}

function simulateFailureRequest() {
  return new Promise((_, reject) => {
    setTimeout(() => reject(), Math.random() * 100);
  });
}

export const service = {
  getUser: () => simulateSuccessfulRequest(user),
  list: () => simulateSuccessfulRequest(items),
};
