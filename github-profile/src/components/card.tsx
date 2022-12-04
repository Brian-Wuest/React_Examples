import React from "react";
import { ICardInfo } from '../models/card-info';

// To have specific typed props, specify the object layout in the generic bounds.
// Here we make the component accept a data object so the consumer doesn't have to specify too many options.
// This also makes the component less brittle as the underlying object can change but the consuming component
// doesn't have to add new attributes to their render functions.
export class Card extends React.Component<{data: ICardInfo}> {
  render(): React.ReactNode {
    return (
      <div className="github-profile">
        <img src={this.props.data.avatar_url} alt="1" />
        <div className="info">
          <div className={this.getNameClass()}>{this.props.data.name}</div>
          <div className={this.getCompanyClass()}>{this.props.data.company}</div>
        </div>
      </div>
    );
  }

  getNameClass() {
    return "name";
  }

  getCompanyClass() {
    return "company";
  }
}
