function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [newBalance, setNewBalance] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  function handleWithdraw(amount) {
    fetch(`/account/update/${loggedInUser.email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          console.log("Response text:", text);
          const data = JSON.parse(text);
          console.log("JSON:", data);
          if (data.value && data.value.name && data.value.balance) {
            const newBalance = formatCurrency(data.value.balance);
            setShow(false);
            setNewBalance(newBalance);
          } else {
            setStatus("Deposit failed (invalid response)");
            console.error("Invalid response:", data);
          }
        } catch (err) {
          setStatus("Deposit failed (parsing error)");
          console.error("Parsing error:", err);
        }
      })
      .catch((error) => {
        setStatus("Deposit failed (fetch error)");
        console.error("Fetch Error:", error);
      });
  }
  return (
    // original card
    <Card
      bgcolor="warning"
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
  return (
    <>
      <h5>Success! Your new balance is {props.newBalance}.</h5>
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
  const [user, setUser] = React.useState(props.user); // Initial state from props
  const [isAmountValid, setIsAmountValid] = React.useState(true);

  function formatCurrency(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  }

  React.useEffect(() => {
    fetch(`/account/find/${props.user.email}`)
      .then((response) => response.json())
      .then((data) => {
        setUser(data[0]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // empty dependency array to run only once on mount

  const current_bal = formatCurrency(user.balance);

  return (
    <>
      Withdraw some money, {props.user.name}! Keep in mind you only have{" "}
      {current_bal} to work with.
      <br />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => {
          setAmount(e.currentTarget.value);
        }}
        onBlur={() => {
          if (amount > user.balance) {
            setAmountError("Insufficient funds for withdrawal.");
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
    </>
  );
}
