/* eslint-disable @typescript-eslint/no-useless-constructor */
import axios from "axios";
import React from "react";
import { ICardInfo } from "../models/card-info";

export class Form extends React.Component<
  { addCardCallBack: (info: ICardInfo) => void },
  { userName: string }
> {
  //userNameInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);

    // This is an example of how to get references to the actual html input element.
    //this.userNameInput = React.createRef<HTMLInputElement>();

    this.state = { userName: "" };
  }

  render(): React.ReactNode {
    return (
      <form
        onSubmit={(event) => {
          this.addCard(event);
        }}
      >
        <input
          type="text"
          placeholder="GitHub username"
          required
          value={this.state.userName}
          // Allows for react to be aware of state change as things change on the UI.
          onChange={(event) => {
            this.setState({ userName: event.target.value });
          }}
          //ref={this.userNameInput}
        />
        <button>Add card</button>
      </form>
    );
  }

  async addCard(event: React.FormEvent<HTMLFormElement>) {
    // Prevents form from refreshing.
    event.preventDefault();
    //console.log(this.userNameInput.current?.value);

    /*
      What happens when the response fails.
      what happens when there is a network issue.
    */
    const response = await axios.get(
      `https://api.github.com/users/${this.state.userName}`
    );

    console.log("GitHub Response", response.data);

    if (response.data.name) {
      var cardInfo = {
        id: response.data.id,
        name: response.data.name,
        company: response.data.company,
        avatar_url: response.data.avatar_url,
      } as ICardInfo;

      this.props.addCardCallBack(cardInfo);
      this.setState({ userName: "" });
    }
  }
}
