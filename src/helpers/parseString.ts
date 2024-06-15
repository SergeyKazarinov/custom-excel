const parseString = (value: string = ''): string => {
  if (value.startsWith('=')) {
    try {
      // eslint-disable-next-line
      return eval(value.slice(1));
    } catch (e) {
      return value;
    }
  }

  return value;
};

export default parseString;
