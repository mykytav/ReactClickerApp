const showBgCookie = clickCounts => {
  // Is less than 5 and multiple of 25, or multiple of 25 plus, one to five
  if (
    clickCounts !== 0 &&
    clickCounts !== 1 &&
    clickCounts !== 2 &&
    clickCounts !== 3 &&
    clickCounts !== 4 &&
    (clickCounts % 25 === 0 ||
      (clickCounts - 1) % 25 === 0 ||
      (clickCounts - 2) % 25 === 0 ||
      (clickCounts - 3) % 25 === 0 ||
      (clickCounts - 4) % 25 === 0)
  ) {
    return true;
  }
  return false;
};

export default showBgCookie;
