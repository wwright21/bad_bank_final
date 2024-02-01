function NavBar() {
  const [activeItem, setActiveItem] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [loggedInUser, setLoggedInUser] = React.useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // grab user's name
  React.useEffect(() => {
    // if loggedInUser doesn't exist in localStorage, set it
    if (!loggedInUser) {
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Peter",
          email: "peter@mit.edu",
          password: "123456789",
        })
      );
      setLoggedInUser({
        name: "Peter",
        email: "peter@mit.edu",
        password: "123456789",
      });
    }

    // fetch only the logged-in user's data from the API
    if (loggedInUser) {
      fetch(`/account/find/${loggedInUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          setUserData(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [loggedInUser]);

  return (
    // old stuff
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#" onClick={() => setActiveItem("")}>
        My Bank
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li
            className={`nav-item ${
              activeItem === "CreateAccount" ? "active" : ""
            }`}
            onClick={() => setActiveItem("CreateAccount")}
          >
            <a className="nav-link" href="#/CreateAccount/">
              Create Account
            </a>
          </li>
          <li
            class={`nav-item ${activeItem === "login" ? "active" : ""}`}
            onClick={() => setActiveItem("login")}
          >
            <a className="nav-link" href="#/login/">
              Login
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "deposit" ? "active" : ""}`}
            onClick={() => setActiveItem("deposit")}
          >
            <a className="nav-link" href="#/deposit/">
              Deposit
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "withdraw" ? "active" : ""}`}
            onClick={() => setActiveItem("withdraw")}
          >
            <a className="nav-link" href="#/withdraw/">
              Withdraw
            </a>
          </li>
          <li
            className={`nav-item ${activeItem === "alldata" ? "active" : ""}`}
            onClick={() => setActiveItem("alldata")}
          >
            <a className="nav-link" href="#/alldata/">
              All Data
            </a>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {loggedInUser ? (
                <span>Welcome, {loggedInUser.name}!</span>
              ) : (
                <span>Welcome, {userData.name}!</span>
              )}
            </a>
            <ul className="dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  Log Out
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
}
