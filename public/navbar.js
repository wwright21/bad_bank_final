function NavBar() {
  const [activeItem, setActiveItem] = React.useState("");
  const [userData, setUserData] = React.useState({});
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  // grab user's name
  React.useEffect(() => {
    // fetch only the logged-in user's data from the API
    fetch(`/account/find/${loggedInUser.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [loggedInUser]);

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#" onClick={() => setActiveItem("")}>
        Test Bank App
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
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li
            class={`nav-item ${activeItem === "CreateAccount" ? "active" : ""}`}
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
        </ul>
        <ul class="navbar-nav ml-auto">
          <li class="navbar-text d-flex">
            {userData.name && <span>Welcome, {userData.name}!</span>}
          </li>
        </ul>
      </div>
    </nav>
  );
}
