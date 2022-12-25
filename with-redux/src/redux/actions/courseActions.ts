import { IAction } from '../../models/base-action';
import { ICourse } from '../../models/course';
import { ActionType } from '../action-type';
import * as courseApi from "../../api/courseApi";

export function createCourse(course: ICourse) {
  return { type: ActionType.CreateCourse, data: course } as IAction<ICourse>;
}

// Only called when api call is successful.
// Can have a sibling function for errors such as "loadCoursesError" for example.
export function loadCoursesSuccess(courses: Array<ICourse>) {
  return { type: ActionType.LoadCoursesSuccess, data: courses } as IAction<Array<ICourse>>;
}

// Thunks
export function loadCourses() {
  // Redux-thunk injects this dispatch function for us.
  // This way we don't have to do the injection on every actino.
  return function(dispatch: any) {
    return courseApi.getCourses().then(courses => {
      dispatch(loadCoursesSuccess(courses));
    })
    .catch(error => {
      throw error;
    });
  }
}