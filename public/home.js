// new home component with regular <div> element
function Home() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    // fetch logged-in user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, []);

  return (
    <div
      className="centered-div"
      style={{
        opacity: 0.6, // Partial transparency
        border: "none", // No border
        backgroundColor: "rgb(141, 179, 95)", // Background color
        maxWidth: "fit-content", // Adjust width as needed
        height: "225px", // Adjust height as needed
        padding: "20px", // Add padding for content
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "7px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      {loggedInUser ? (
        <>
          <h3>Welcome to the bank, {loggedInUser.name}!</h3>
          <br />

          <p>
            All your anyonymous money laundering done right. Get started with
            your first deposit!
          </p>
        </>
      ) : (
        <>
          <h3>Welcome to the bank, stranger!</h3>
          <br />
          <br />
          <p>Create an account or log in to get started.</p>
          <p>
            Note: Despite what it looks like, the Bank of Will is not a real
            bank. If creating an account for the first time, please do not use a
            real email address or password.
          </p>
        </>
      )}
    </div>
  );
}
