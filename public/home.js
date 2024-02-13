function Home() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    // fetch logged-in user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, []);

  return (
    <>
      <div
        className="centered-div"
        style={{
          opacity: 0.6, // Partial transparency
          border: "none", // No border
          backgroundColor: "rgb(141, 179, 95)", // Background color
          maxWidth: "fit-content", // Adjust width as needed
          maxHeight: "fit-content", // Adjust height as needed
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "7px",
          paddingTop: "40px",
          paddingBottom: "35px",
          paddingLeft: "20px",
          paddingRight: "20px",
        }}
      >
        {loggedInUser ? (
          <>
            <h3>
              Welcome to the (unofficial) <br />
              Bank of the Dark Web, {loggedInUser.name}!
            </h3>
            <br />

            <p style={{ fontSize: "21px" }}>
              All your anyonymous money laundering done right. Your vault, your
              rules, no questions.
              <br />
              <br />
              Get started today with your first deposit!
            </p>
          </>
        ) : (
          <>
            <div>
              <h3>
                Welcome to the (unofficial) <br />
                Bank of the Dark Web, stranger!
              </h3>
              <br />
              <p style={{ fontSize: "21px" }}>
                Hide your precious gems and ill-gotten funds within our walls.
                Always anonymous, trusted by the best.
              </p>
              <p style={{ fontSize: "21px" }}>
                Browse our curated testimonials, create an account, or log in to
                get started.
              </p>
              <br />
              <p style={{ fontSize: "18px" }}>
                <em>
                  Note: This parody app is for demonstration purposes only.
                  Please do not use a real email address or password. And
                  certainly, please do not launder or steal any real money.
                </em>
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
