function AllData() {
  const [userData, setUserData] = React.useState({});
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  React.useEffect(() => {
    // fetch only the logged-in user's data from the API
    fetch(`/account/find/${loggedInUser.email}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserData(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  return (
    <div
      class="card text-white bg-secondary mb-3"
      style={{ maxWidth: "42rem" }}
    >
      <div className="card-header">
        <h5
          className="card-title"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "0.8em",
          }}
        >
          User Data
        </h5>
      </div>
      <div className="card-body">
        <h6>Name: {userData.name}</h6>
        <h6>Email: {userData.email}</h6>
        <h6>Password: {userData.password}</h6>
        <h6>Current Balance: {formatCurrency(userData.balance)}</h6>
        <h6>Account Type: {userData.accountType}</h6>
        <h6>Account Number: {userData.accountNumber}</h6>
        <h6>Transaction History:</h6>
        <ul className="list-group">
          {userData.transactionHistory &&
            userData.transactionHistory.map((transaction, index) => (
              <li
                key={index}
                className={`list-group-item text-white ${
                  transaction.transactionType === "deposit"
                    ? "bg-success"
                    : "bg-warning"
                }`}
              >
                Amount:{" "}
                {formatCurrency(
                  transaction.amount >= 0
                    ? transaction.amount
                    : -transaction.amount
                )}
                , Timestamp: {transaction.timestamp}, Transaction Type:{" "}
                {transaction.transactionType}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
