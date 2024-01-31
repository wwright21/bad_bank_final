function Withdraw() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const loggedInUser = JSON.parse(localStorage.getItem("user"));

  function handleWithdraw(amount) {
    fetch(`/account/update/${loggedInUser.email}/-${amount}`)
      .then((response) => response.text())
      .then((text) => {
        try {
          console.log("Response text:", text);
          const data = JSON.parse(text);
          console.log("JSON:", data);
          if (data.value && data.value.name && data.value.balance) {
            setStatus(
              `${data.value.name}, your new balance is ${data.value.balance} dollars.`
            );
            setShow(false);
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
      bgcolor="success"
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
          />
        )
      }
    />
  );
}

function WithdrawMsg(props) {
  return (
    <>
      <h5>Success.</h5>
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

  function handle() {
    props.handleWithdraw(amount);
  }

  return (
    <>
      Welcome back, {props.user.name}!
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
      <button type="submit" className="btn btn-light" onClick={handle}>
        Withdraw
      </button>
    </>
  );
}
