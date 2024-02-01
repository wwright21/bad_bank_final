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
      txtcolor="black"
      header="Withdraw"
      status={status}
      body={
        show ? (
          <WithdrawForm
            user={loggedInUser}
            handleWithdraw={handleWithdraw}
            // newBalance={newBalance}
          />
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

  return (
    <>
      Withdraw some money, {props.user.name}! Keep in mind you only have{" "}
      {props.newBalance} to work with.
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
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={() => props.handleWithdraw(amount)}
        disabled={!amount}
      >
        Withdraw
      </button>
    </>
  );
}
