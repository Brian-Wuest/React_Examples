import { IAction } from '../../models/base-action';
import { ICourse } from "../../models/course";
import { ActionType } from '../action-type';

export default function courseReducer(
  state: Array<ICourse> = [],
  action: IAction<ICourse>
) {
  switch (action.type) {
    case ActionType.CreateCourse: {
      return [...state, { ...action.data }];
    }
    default: {
      // Always have a default return of the passed-in state.
      // This is because ALL reducers are called when state is changed.
      return state;
    }
  }
}
