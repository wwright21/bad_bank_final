function NavBar() {
  const [activeItem, setActiveItem] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // grab user's name
  React.useEffect(() => {
    // fetch only the logged-in user's data from the API
    if (loggedInUser) {
      fetch(`/account/find/${loggedInUser.email}`)
        .then((response) => response.json())
        .then((data) => {
          setUserData(data[0]);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  return (
    <nav
      class="navbar navbar-expand-lg"
      style={{ marginBottom: "2rem", borderBottom: "2px solid white" }}
    >
      <a class="navbar-brand" href="#" onClick={() => setActiveItem("")}>
        Home
      </a>
      <button
        class="navbar-toggler ml-auto custom-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          {!loggedInUser ? (
            <>
              <li
                class={`nav-item ${
                  activeItem === "CreateAccount" ? "active" : ""
                }`}
                onClick={() => setActiveItem("CreateAccount")}
              >
                <a class="nav-link" href="#/CreateAccount/">
                  Create Account
                </a>
              </li>
              <li
                class={`nav-item ${activeItem === "login" ? "active" : ""}`}
                onClick={() => setActiveItem("login")}
              >
                <a class="nav-link" href="#/login/">
                  Login
                </a>
              </li>
            </>
          ) : null}
          {loggedInUser ? (
            <>
              <li
                class={`nav-item ${activeItem === "deposit" ? "active" : ""}`}
                onClick={() => setActiveItem("deposit")}
              >
                <a class="nav-link" href="#/deposit/">
                  Deposit
                </a>
              </li>
              <li
                class={`nav-item ${activeItem === "withdraw" ? "active" : ""}`}
                onClick={() => setActiveItem("withdraw")}
              >
                <a class="nav-link" href="#/withdraw/">
                  Withdraw
                </a>
              </li>
              <li
                class={`nav-item ${activeItem === "alldata" ? "active" : ""}`}
                onClick={() => setActiveItem("alldata")}
              >
                <a class="nav-link" href="#/alldata/">
                  All Data
                </a>
              </li>
            </>
          ) : null}
        </ul>
        <ul class="navbar-nav ml-auto">
          {loggedInUser?.email ? (
            <li class="navbar-text d-flex">
              <a
                class="nav-link dropdown-toggle"
                href="#/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {userData.name && <span>Welcome, {userData.name}!</span>}
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
                style={{ backgroundColor: "transparent" }}
                onClick={() => {
                  localStorage.setItem("user", null);
                  window.location = "/";
                }}
              >
                <a
                  class="dropdown-item dropdown-item-hover"
                  href="#"
                  style={{ color: "white" }}
                >
                  Log Out
                </a>
              </div>
            </li>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
