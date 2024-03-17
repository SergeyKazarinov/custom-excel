const someFunc = async (arg: number) => {
  console.log('asdf');
  return Promise.resolve('work2');
};

someFunc(2).then(console.log);
