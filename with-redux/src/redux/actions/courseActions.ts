import { IAction } from '../../models/base-action';
import { ICourse } from '../../models/course';
import { ActionType } from '../action-type';

export function createCourse(course: ICourse) {
  return { type: ActionType.CreateCourse, data: course } as IAction<ICourse>;
}
