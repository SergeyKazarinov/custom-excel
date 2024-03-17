import './index.scss';

const someFunc = async (arg: number) => {
  console.log(arg);
  return Promise.resolve('work2');
};

someFunc(2).then(console.log);
