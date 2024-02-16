function AllData() {
  const [userData, setUserData] = React.useState({});
  const UserContext = React.createContext(null);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  React.useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []); // empty dependency array to run only once on mount

  React.useEffect(() => {
    // fetch only the logged-in user's data from the API
    fetch(`/account/find/${user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // format the currency to show with a "$" sign and 2 decimal places
  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  // function to replace all but the final 4 characters of a password with the "*" character
  function obfuscatePassword(password) {
    if (!password) {
      return ""; // or handle the case when the password is undefined or null
    }
    const lastFourChars = password.slice(-4); // Get the last four characters
    const obfuscated = "*".repeat(password.length - 4) + lastFourChars;
    return obfuscated;
  }

  return (
    <>
      <div
        class="card text-white mb-3"
        style={{
          maxWidth: "50rem",
          backgroundColor: "rgb(141, 179, 95)",
          borderWidth: "0px",
          opacity: 0.6,
        }}
      >
        <div className="card-header">
          <h5
            className="card-title"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "1rem",
              fontWeight: "bold",
              fontSize: "24px",
              borderWidth: "0px",
              borderBottom: "0px transparent",
              color: "black",
            }}
          >
            {user.name}'s Bank Data
          </h5>
        </div>
        <div className="card-body">
          <table
            className="table table-hover table-borderless"
            style={{ color: "black", textAlign: "center" }}
          >
            <tr>
              <th>User Name:</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Password:</th>
              <td>{obfuscatePassword(user.password)}</td>
            </tr>
            <tr>
              <th>Current Balance:</th>
              <td>{formatCurrency(user.balance)}</td>
            </tr>
            <tr>
              <th>Account Type:</th>
              <td>{user.accountType}</td>
            </tr>
            <tr>
              <th>Account Number:</th>
              <td>{user.accountNumber}</td>
            </tr>
          </table>
          <br />
          {userData.transactionHistory &&
            userData.transactionHistory.length > 0 && (
              <h6
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Transaction History:
              </h6>
            )}
          <ul className="list-group">
            {userData.transactionHistory &&
              userData.transactionHistory.map((transaction, index) => (
                <li
                  key={index}
                  className={`list-group-item ${
                    transaction.transactionType === "deposit"
                      ? "text-dark"
                      : "text-danger"
                  }`}
                  style={{ backgroundColor: "white", textAlign: "center" }}
                >
                  Type: {transaction.transactionType} | Amount:{" "}
                  {formatCurrency(
                    transaction.amount >= 0
                      ? transaction.amount
                      : -transaction.amount
                  )}{" "}
                  | Timestamp: {transaction.timestamp}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div class="customer-service-footer">
        <p>
          Questions or concerns? We're just a phone call away at (470) 305-2269.{" "}
        </p>
      </div>
    </>
  );
}
