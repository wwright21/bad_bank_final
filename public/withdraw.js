function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [newBalance, setNewBalance] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  function handleWithdraw(amount) {
    fetch(`/account/update/${loggedInUser.email}/-${amount}/withdraw`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          const expectedNB = data.balance - Number(amount);
          const user = JSON.parse(localStorage.getItem("user"));
          user.balance = expectedNB;
          localStorage.setItem("user", JSON.stringify(user));
          setShow(false);
        } catch (err) {
          setStatus("Withdraw failed (parsing error)");
          console.error("Parsing error:", err);
        }
      })
      .catch((error) => {
        setStatus("Withdraw failed (fetch error)");
        console.error("Fetch Error:", error);
      });
  }

  return (
    // original card
    <Card
      bgcolor="info"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm user={loggedInUser} handleWithdraw={handleWithdraw} />
        ) : (
          <WithdrawMsg
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

function WithdrawMsg(props) {
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
        Successful withdraw, {user.name}! Your new balance is {current_bal}.
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
        Withdraw again
      </button>
    </>
  );
}

function WithdrawForm(props) {
  const [amount, setAmount] = React.useState("");
  const [amountError, setAmountError] = React.useState();
  const [isAmountValid, setIsAmountValid] = React.useState(true);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );

  // new way - retrieve from Local storage
  React.useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem("user"));
    setUser(userFromLocalStorage);
  }, []);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  const current_bal = formatCurrency(user.balance);

  function handle() {
    props.handleWithdraw(amount);
  }

  return (
    <>
      <h5>
        Withdraw some money, {user.name}! Keep in mind you only have{" "}
        {current_bal} to work with.
      </h5>
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount as numeric values only"
        value={amount}
        onChange={(e) => {
          setAmount(e.currentTarget.value);
        }}
        onBlur={() => {
          if (amount > user.balance) {
            setAmountError("Insufficient funds for withdrawal.");
            setIsAmountValid(false);
          } else if (amount < 0) {
            setAmountError("Withdraws must be a positive amount");
            setIsAmountValid(false);
          } else {
            setAmountError("");
            setIsAmountValid(true);
          }
        }}
      />
      <span style={{ color: "#FFFFFF", background: "#FF0000" }}>
        {amountError}
      </span>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.handleWithdraw(amount)}
        disabled={!amount || !isAmountValid}
      >
        Withdraw
      </button>
      <div class="customer-service-footer">
        <p>
          Questions or concerns? We're just a phone call away at (470) 305-2269.{" "}
        </p>
      </div>
    </>
  );
}
