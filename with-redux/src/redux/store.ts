import { ICourse } from '../models/course';

/**
 * This is the main store of the application.
 */
export interface IStore {
  courses: Array<ICourse>
}