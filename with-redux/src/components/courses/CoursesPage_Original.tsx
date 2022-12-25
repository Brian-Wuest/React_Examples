import React, { ChangeEvent, FormEvent } from "react";
import { connect } from "react-redux";
import { ICourse } from "../../models/course";
import { IReduxProp } from "../../models/redux-prop";
import * as courseActions from "../../redux/actions/courseActions";
import { IStore } from "../../redux/store";

interface IPageProps extends IReduxProp {
  courses: Array<ICourse>;
}

interface IPageState {
  course: ICourse;
}

class CoursesPageOriginal extends React.Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);

    // Define the initial state of this component.
    this.state = {
      course: {
        title: "",
      } as ICourse,
    } as IPageState;

    // Can do constructor level binding instead of doing this during render.
    // Doing this type of binding allows the "handleChange" function to have the same reference to "this"
    // Which has access to the state.
    // However; this way is generally not recommended as it adds a lot of extra lines to the code.
    // It instead recommended to use class-level fields that are arrow functions instead as seen below.
    //this.handleChange = this.handleChange.bind(this);
  }

  // Use an arrow function for this class-level field.
  // This way the "this" keyword is bound to the class instead of what was calling this function.
  // This is the cleanest approach to making sure "this" is bound to what is expected.
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course } as IPageState);
  };

  handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Since "mapDispatchToProps" wasn't declared, this function is automagically added as a prop on the component.
    // Needs to use dispatch otherwise nothing happens.
    this.props.dispatch(courseActions.createCourse(this.state.course));
  };

  render(): React.ReactNode {
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Courses</h2>
        <h3>Add Course</h3>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.course.title}
          placeholder="Course Title"
        />
        <input type="submit" value="Save" />
        {this.props.courses.map((course: any) => {
          return <div key={course.title}>{course.title}</div>;
        })}
      </form>
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
export default connect(mapStateToProps)(CoursesPageOriginal);
