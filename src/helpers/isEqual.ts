const isEqual = (prevState: any, state: any) => {
  if (typeof prevState === 'object' && typeof state === 'object') {
    return JSON.stringify(prevState) === JSON.stringify(state);
  }

  return prevState === state;
};

export default isEqual;
