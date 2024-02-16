function Home() {
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  React.useEffect(() => {
    // fetch logged-in user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, []);

  return (
    <>
      {loggedInUser ? (
        <>
          <div class="welcome-card">
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
          </div>
          <div class="customer-service-footer">
            <p>
              Questions or concerns? We're just a phone call away at (470)
              305-2269.{" "}
            </p>
          </div>
        </>
      ) : (
        <>
          <div class="welcome-card">
            <h3>
              Welcome to the (unofficial) <br />
              Bank of the Dark Web!
            </h3>
            <br />
            <p style={{ fontSize: "20px" }}>
              Hide your embezzled millions and ill-gotten gains within our
              walls. Always anonymous, trusted by the best.
            </p>
            <br />
            <p style={{ fontSize: "20px" }}>
              Browse our curated testimonials, create a new account, or log in
              to get started.
            </p>
          </div>
          <div class="disclaimer-footer">
            <p>
              <em>
                <b>Note:</b> This parody app is for demonstration purposes only.
                Please do not use a real email address or password. <br />
                And certainly, please do not launder or steal any real money.
                Ever.
              </em>
            </p>
          </div>
        </>
      )}
    </>
  );
}
