function Deposit() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [newBalance, setNewBalance] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  function handleDeposit(amount) {
    fetch(`/account/update/${loggedInUser.email}/${amount}/deposit`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          const expectedNB = data.balance + Number(amount);
          const user = JSON.parse(localStorage.getItem("user"));
          user.balance = expectedNB;
          localStorage.setItem("user", JSON.stringify(user));
          // setUser(updatedUser);
          setShow(false);
        } catch (err) {
          setStatus("Deposit failed");
          console.error("Error:", err);
        }
      })
      .catch((error) => {
        setStatus("Deposit failed");
        console.error("Fetch Error:", error); // Log fetch errors
      });
  }

  return (
    <Card
      bgcolor="info"
      header="Deposit"
      status={status}
      body={
        show ? (
          <DepositForm user={loggedInUser} handleDeposit={handleDeposit} />
        ) : (
          <DepositMsg
            user={loggedInUser}
            setShow={setShow}
            setStatus={setStatus}
            newBalance={newBalance}
          />
        )
      }
    />
  );
}

function DepositMsg(props) {
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  React.useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []); // empty dependency array to run only once on mount

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  const current_bal = formatCurrency(user.balance);

  return (
    <>
      <h5>
        Successful deposit, {user.name}! Your new balance is {current_bal}
      </h5>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => {
          props.setShow(true);
          props.setStatus("");
        }}
      >
        Deposit again
      </button>
      <div>
        <br></br>{" "}
      </div>
    </>
  );
}

function DepositForm(props) {
  const [amount, setAmount] = React.useState("");
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [depositError, setDepositError] = React.useState(null);
  const [isNegative, setIsNegative] = React.useState(true);

  React.useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []); // empty dependency array to run only once on mount

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  const current_bal = formatCurrency(user.balance);

  function handle() {
    props.handleDeposit(amount);
  }

  const handleAmountChange = (e) => {
    const inputValue = e.currentTarget.value;
    const isNegativeValue = Number(inputValue) < 0;
    setAmount(inputValue);
    setIsNegative(isNegativeValue);
    setDepositError(
      isNegativeValue ? "Deposits must be a positive amount" : null
    );
  };

  return (
    <>
      <h5>
        Keep adding to your balance, {user.name}! You currently have{" "}
        {current_bal} in the bank.
      </h5>
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount as numeric values only"
        value={amount}
        onChange={handleAmountChange}
      />
      {depositError && (
        <span style={{ color: "#FFFFFF", background: "#FF0000" }}>
          {depositError}
        </span>
      )}
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={!amount || isNegative}
      >
        Deposit
      </button>
      <div class="customer-service-footer">
        <p>
          Questions or concerns? We're just a phone call away at (470) 305-2269.{" "}
        </p>
      </div>
    </>
  );
}
