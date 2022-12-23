export interface IReduxProp {
  /**
   * Automagically added to the props of a component when omitting "mapDispatchToProps" on the component.
   * 
   * @param actionResult The action result for calling a redux action.
   * @returns 
   */
  dispatch: (actionResult: any) => void
}