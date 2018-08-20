const updatePerSecond = level => {
  if (level <= 3) return 0;

  let startRange = 1;
  let endRange = 3;

  for (let i = 1; i < level; i++) {
    startRange = endRange + 1;
    endRange = startRange + 1;

    if (startRange <= level && level <= endRange) return i;
  }
};

export default updatePerSecond;
