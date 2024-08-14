import ExcelComponent from '../excelComponent/ExcelComponent';
import { IExcelStateComponent, State } from './ExcelStateComponent.types';

class ExcelStateComponent<S extends State> extends ExcelComponent implements IExcelStateComponent<S> {
  protected state: S;
  // eslint-disable-next-line
  constructor(...args: any[]) {
    // @ts-ignore
    super(...args);
    this.state = {} as S;
  }

  get template() {
    return JSON.stringify(this.state, null, 2);
  }

  initState(initialState: S) {
    this.state = initialState;
  }

  setState(newState: S) {
    this.state = { ...this.state, ...newState };
    this.$root.html(this.template);
  }
}

export default ExcelStateComponent;
