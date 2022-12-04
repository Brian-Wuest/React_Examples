import React from "react";
import "./App.scss";
import { CardList } from "./components/card-list";
import { Form } from "./components/form";
import { ICardInfo } from "./models/card-info";

/*
  What components to create.
  Start with what makes sense right now, rename and delete later.

  Needed components:
  1. Card
  2. Card-List
*/

// GitHub usernames: gaearon, sophiebits, sebmarkbage, bvaughn

export class App extends React.Component<
  { title: string },
  { profiles: Array<ICardInfo> }
> {
  // Constructor
  // this
  // Must have render() function at a minimum.

  constructor(props: any) {
    super(props);

    this.state = {
      profiles: new Array<ICardInfo>(),
    };
  }

  // Should return the virtual dom representation of the component.
  render(): React.ReactNode {
    return (
      <div>
        <div className="header">{this.props.title}</div>
        <Form
          addCardCallBack={(info) => {
            this.addNewProfile(info);
          }}
        />
        <CardList data={this.getProfileData()} />
      </div>
    );
  }

  getProfileData(): Array<ICardInfo> {
    return this.state.profiles;
  }

  addNewProfile(profileData: ICardInfo) {
    if (profileData && profileData.name) {
      // MUST call the setState function in order to update state.
      // Cannot just update the "this.state" property as it won't be reflected in the UI.
      this.setState({ profiles: [...this.state.profiles, profileData] });
    }
  }
}
