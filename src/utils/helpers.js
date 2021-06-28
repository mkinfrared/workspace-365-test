const delay = (millis: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(null), millis);
  });

const createFakeFetch = () => {
  let asyncCalls = 0;

  return async () => {
    await delay(1000);

    asyncCalls++;

    if (asyncCalls % 3 === 0) {
      throw new Error("fake async call error! try again");
    }
  };
};

export { createFakeFetch };
