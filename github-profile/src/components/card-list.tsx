import React from "react";
import { ICardInfo } from '../models/card-info';
import { PropData } from '../models/prop-data';
import { Card } from "./card";

export class CardList extends React.Component<PropData<Array<ICardInfo>>> {
  render(): React.ReactNode {
    /*
      The map function below allows us to loop through each item in the test data array and generate a card for it.
    */
    return (
      <>
        {this.props.data.map((profile) => (
          // Need to specify a key for dynamic list of elements like this.
          // If you don't, React will determine that the position of the element is the key which may not be appropriate.
          // Just specify a property on the profile which will be unique for the data element
          // Generally this is the ID or GUID field.
          <Card key={profile.id} data={profile} />
        ))}
      </>
    );
  }
}
