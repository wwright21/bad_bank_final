function Deposit() {
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

  function handleDeposit(amount) {
    fetch(`/account/update/${loggedInUser.email}/${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          const data = JSON.parse(text);
          if (data.value && data.value.name && data.value.balance) {
            const newBalance = formatCurrency(data.value.balance);
            // Update balance in Local storage
            const updatedUser = {
              ...loggedInUser,
              balance: data.value.balance,
            };
            localStorage.setItem("user", JSON.stringify(updatedUser));
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
  return (
    <>
      <h5>Party time! You have a new balance of {props.newBalance}.</h5>
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
  const [user, setUser] = React.useState(props.user);

  // new way - retrieve from Local storage
  React.useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
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
    props.handleDeposit(amount);
  }

  return (
    <>
      Keep adding to your balance, {user.name}! You currently have {current_bal}{" "}
      in the bank.
      <br />
      <br />
      Amount
      <br />
      <input
        type="number"
        className="form-control"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={!amount}
      >
        Deposit
      </button>
    </>
  );
}
