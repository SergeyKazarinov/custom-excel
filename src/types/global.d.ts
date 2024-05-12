interface Window {
  [key: string]: any;
}

type TTypeTableResize = 'col' | 'row';

interface ITableResize {
  id: string;
  type: TTypeTableResize;
  value: number;
}

interface IChangeTextPayload {
  id: string;
  text: string;
}
