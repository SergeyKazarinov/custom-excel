const debounce = <TArgs extends any[]>(fn: (...args: TArgs) => void, wait: number) => {
  let timeout: NodeJS.Timeout;

  return (...args: TArgs) => {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export default debounce;
