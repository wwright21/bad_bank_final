function NavBar() {
  const [activeItem, setActiveItem] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const [loggedInUser, setLoggedInUser] = React.useState(null);

  // grab user's name
  React.useEffect(() => {
    // fetch logged-in user data from local storage
    const user = JSON.parse(localStorage.getItem("user"));
    setLoggedInUser(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user"); // Remove the user data from local storage
    window.location.href = "#";
    window.location.reload();
  };

  return (
    <nav
      class="navbar navbar-expand-lg"
      style={{
        marginBottom: "2rem",
        borderBottom: "3px solid #8db35f", // Main border color
        borderBottomStyle: "solid", // Ensure solid border style
        borderBottomWidth: "4px", // Width of the main border
        borderBottomColor: "#8db35f", // Main border color
        borderImage: "linear-gradient(to right, #8db35f, #ff4500, #4169e1)", // Gradient for triple lines
        borderImageSlice: "1", // Control slicing of border image
      }}
    >
      <a class="navbar-brand" href="#" onClick={() => setActiveItem("")}>
        <img
          src="moneyBag_light.png"
          style={{ marginRight: "0.4em", width: "35px", height: "35px" }}
        ></img>
        Bank of the Dark Web
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="bi bi-list"></i>
        </span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          {!loggedInUser ? (
            <>
              <li
                class={`nav-item ${
                  activeItem === "Testimonials" ? "active" : ""
                }`}
                onClick={() => setActiveItem("Testimonials")}
              >
                <a class="nav-link" href="#/Testimonials/">
                  Testimonials
                </a>
              </li>
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
                  Log In
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
          {loggedInUser?.email ? (
            <li class="navbar-nav ml-auto">
              <a
                class="nav-link dropdown-toggle"
                style={{ color: "#808080", marginLeft: "20px" }}
                href="#/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {loggedInUser.name && (
                  <span>Welcome, {loggedInUser.name}!</span>
                )}
              </a>
              <div
                class="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
                style={{ backgroundColor: "transparent" }}
                onClick={handleLogout}
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
