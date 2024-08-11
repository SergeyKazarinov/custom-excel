import isEqual from '@src/helpers/isEqual';
import { TActions } from '@src/store/action.types';
import { IReturnCreateStore, IRootState } from '@src/store/store.types';
import { TChanges } from '@src/types/components';
import { IExcelComponent } from '../excelComponent/ExcelComponent.types';
import { IStoreSubscriber } from './StoreSubscriber.types';

class StoreSubscriber implements IStoreSubscriber {
  private store: IReturnCreateStore<IRootState, TActions>;

  private storeSub: ReturnType<typeof this.store.subscribe> | null;

  private prevState: Partial<IRootState>;

  constructor(store: IReturnCreateStore<IRootState, TActions>) {
    this.store = store;
    this.storeSub = null;
    this.prevState = {};
  }

  subscribeComponents<T extends IExcelComponent>(components: T[]) {
    this.prevState = this.store.getState();

    this.storeSub = this.store.subscribe((state) => {
      Object.keys(state).forEach((key) => {
        const keyState = key as keyof IRootState;

        if (!isEqual(this.prevState[keyState], state[keyState])) {
          components.forEach((component) => {
            if (component.isWatching(keyState)) {
              const changes: TChanges = { [keyState]: state[keyState] };
              component.changeStore(changes);
            }
          });
        }
      });

      this.prevState = this.store.getState();
    });
  }

  unsubscribeFromStore(): void {
    this.storeSub?.unsubscribe();
  }
}

export default StoreSubscriber;
