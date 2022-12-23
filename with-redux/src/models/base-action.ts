import { ActionType } from '../redux/action-type';

export interface IAction<T> {
  type: ActionType, 
  data: T
}