import Header from "./common/Header";

const PageNotFound = () => {
  /**
   * Copy the header layout from the App file to make sure that the nav layout
   * stays the same for the user.
   */
  return (
    <>
      <div id="app" className="container-fluid">
        <Header />
        <h1>Oops! Page not found.</h1>
      </div>
    </>
  );
};

export default PageNotFound;
