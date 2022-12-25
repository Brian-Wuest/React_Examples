/*!
Filename: c:\Users\Brian\Documents\GitHub\React_Examples\with-redux\src\components\courses\CoursesPage_Original copy.tsx
Path: c:\Users\Brian\Documents\GitHub\React_Examples\with-redux
Created Date: Saturday, December 24th 2022, 2:35:16 pm
Author: Brian Wuest

Copyright (c) 2022 Your Company
 */
import React from "react";
import { connect } from "react-redux";
import { ICourse } from "../../models/course";
import { IReduxProp } from "../../models/redux-prop";
import * as courseActions from "../../redux/actions/courseActions";
import { IStore } from "../../redux/store";
import CourseList from './CourseList';

interface IPageProps extends IReduxProp {
  courses: Array<ICourse>;
}

interface IPageState {
  course: ICourse;
}

class CoursesPage extends React.Component<IPageProps, IPageState> {
  componentDidMount(): void {
    if (this.props.courses.length === 0) {
      this.props.dispatch(courseActions.loadCourses()).catch((error: any) => {
        alert("Loading courses failed" + error);
      });
    }
  }

  render(): React.ReactNode {
    return (
      <>
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

function mapStateToProps(state: IStore) {
  return {
    // Be specific, request only the data your component needs.
    courses: state.courses,
  };
}

// Dont include mapDispatchToProps so it will automatically be added to the component props.
export default connect(mapStateToProps)(CoursesPage);
