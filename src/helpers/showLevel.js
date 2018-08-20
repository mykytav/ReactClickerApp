function showLevel(counts) {
  if (counts < 10) return 1;

  let startRange = 1;
  let endRange = startRange * 10 - 1;

  for (let i = 2; i < counts; i++) {
    startRange = endRange + 1;
    endRange = startRange * 2 - 1;

    if (startRange <= counts && counts <= endRange) return i;
  }
}

export default showLevel;
