function Login() {
  const [show, setShow] = React.useState(true);
  const [status, setStatus] = React.useState("");
  const [user, setUser] = React.useState(null);

  return (
    <Card
      bgcolor="info"
      header="Login"
      status={status}
      body={
        <LoginForm setShow={setShow} setStatus={setStatus} setUser={setUser} />
      }
    />
  );
}

function LoginForm(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handle() {
    fetch(`/account/login/${email}/${password}`)
      .then((response) => response.text())
      .then((text) => {
        // if either Login failure messages are returned, exit the function
        if (text.includes("Login failed")) {
          props.setStatus(text);
          return;
        }

        try {
          const data = JSON.parse(text);
          // Store user data in localStorage
          localStorage.setItem("user", JSON.stringify(data));
          console.log("Balance:", data.balance);
          console.log("User:", data.name);
          props.setStatus("");
          props.setShow(false);
          props.setUser(data);
          console.log("JSON:", data);
        } catch (err) {
          props.setStatus(text);
          console.log("err:", text);
        }
        window.location = "/";
      });
  }

  return (
    <>
      Email
      <br />
      <input
        type="input"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
      />
      <br />
      Password
      <br />
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
      />
      <br />
      <button
        type="submit"
        className="btn btn-light"
        onClick={handle}
        disabled={!email || !password}
      >
        Login
      </button>
    </>
  );
}
