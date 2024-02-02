function AllData() {
  const [userData, setUserData] = React.useState({});
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

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
    <div
      class="card text-white mb-3"
      style={{
        maxWidth: "40rem",
        backgroundColor: "transparent",
        borderWidth: "6px",
        borderColor: "#14a2b8",
      }}
    >
      <div className="card-header">
        <h5
          className="card-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0.5em",
            fontWeight: "bold",
            fontSize: "24px",
            borderBottom: "1px solid",
            paddingBottom: "23px",
            // margin: 0,
          }}
        >
          {userData.name}'s Bank Data
        </h5>
      </div>
      <div className="card-body">
        <table
          className="table table-hover table-borderless"
          style={{ color: "white", textAlign: "center" }}
        >
          <tr>
            <th>User Name:</th>
            <td>{userData.name}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{userData.email}</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>{obfuscatePassword(userData.password)}</td>
          </tr>
          <tr>
            <th>Current Balance:</th>
            <td>{formatCurrency(userData.balance)}</td>
          </tr>
          <tr>
            <th>Account Type:</th>
            <td>{userData.accountType}</td>
          </tr>
          <tr>
            <th>Account Number:</th>
            <td>{userData.accountNumber}</td>
          </tr>
        </table>
        <br />
        {userData.transactionHistory &&
          userData.transactionHistory.length > 0 && (
            <h6 style={{ textAlign: "center", fontSize: "20px" }}>
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
                    ? "text-info"
                    : "text-danger"
                }`}
                style={{ backgroundColor: "transparent", textAlign: "center" }}
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
  );
}
