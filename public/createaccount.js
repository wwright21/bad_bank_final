function CreateAccount() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");

  return (
    <Card
      borderColor="light"
      header="Create Account"
      status={status}
      body={<CreateForm setShow={setShow} />}
    />
  );
}

function CreateForm(props) {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState();
  const [uniqueEmail, setUniqueEmail] = React.useState(true);
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState();
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [confirmPasswordError, setConfirmPasswordError] = React.useState("");
  const [accountType, setAccountType] = React.useState("");
  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  function handle(event) {
    event.preventDefault();

    // create the account
    const url = `/account/create/${name}/${email}/${password}/${accountType}`;
    (async () => {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Account creation failed: ${res.statusText}`);
      }
      const data = await res.json();
      localStorage.setItem("user", JSON.stringify(data));
      props.setShow(false);
    })();
  }

  return (
    <>
      Name
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter name"
        value={name}
        onChange={(e) => {
          setName(e.currentTarget.value);
          setIsButtonDisabled(
            !name || !email || !password || !confirmPassword || !accountType
          );
        }}
      />
      <br />
      Email address
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => {
          setEmail(e.currentTarget.value);
          setIsButtonDisabled(
            !name || !email || !password || !confirmPassword || !accountType
          );
        }}
        onBlur={async (e) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(email)) {
            setEmailError("Invalid email address.");
          } else {
            const res = await fetch(
              `account/checkexisting?email=${e.currentTarget.value}`
            );
            console.log(res);
            if (!res.ok) {
              setEmailError("Error checking existing email");
            } else {
              const data = await res.json();
              console.log(data);
              if (data.existing) {
                setEmailError("User already exists.");
              } else if (!data.existing) {
                setEmailError("");
                setUniqueEmail(true);
              }
            }
          }
        }}
      />
      {emailError ? (
        <span style={{ color: "#FFFFFF", background: "#FF0000" }}>
          {emailError || ""}
        </span>
      ) : null}
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => {
          setPassword(e.currentTarget.value);
          setIsButtonDisabled(
            !name || !email || !password || !confirmPassword || !accountType
          );
        }}
        onBlur={() => {
          if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters long.");
          } else {
            setPasswordError("");
          }
        }}
      />
      <span style={{ color: "#FFFFFF", background: "#FF0000" }}>
        {passwordError}
      </span>
      <br />
      Confirm Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => {
          setConfirmPassword(e.currentTarget.value);
          setIsButtonDisabled(
            !name || !email || !password || !confirmPassword || !accountType
          );
        }}
        onBlur={() => {
          if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            return;
          } else {
            setConfirmPasswordError("");
            setIsButtonDisabled(!name || !email || !password || !accountType);
          }
        }}
      />
      <span style={{ color: "#FFFFFF", background: "#FF0000" }}>
        {confirmPasswordError}
      </span>
      <br />
      Account Type
      <br />
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="accountType"
          id="Checking"
          value={"Checking"}
          checked={accountType === "Checking"}
          onChange={(e) => {
            setAccountType(e.target.value);
            setIsButtonDisabled(
              !name || !email || !password || !confirmPassword
            );
          }}
        />
        <label className="form-check-label" for="Checking">
          Checking
        </label>
      </div>
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="accountType"
          id="Savings"
          value={"Savings"}
          checked={accountType === "Savings"}
          onChange={(e) => {
            setAccountType(e.target.value);
            setIsButtonDisabled(
              !name || !email || !password || !confirmPassword
            );
          }}
        />
        <label className="form-check-label" for="Savings">
          Savings
        </label>
      </div>
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={isButtonDisabled}
      >
        Create Account
      </button>
    </>
  );
}
