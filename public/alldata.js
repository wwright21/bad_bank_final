// function AllData(){
//     const [data, setData] = React.useState('');

//     React.useEffect(() => {

//         // fetch all accounts from API
//         fetch('/account/all')
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data);
//                 setData(JSON.stringify(data));
//             });

//     }, []);

//     return (<>
//         <h5>All Data in Store:</h5>
//         {data}
//     </>);
// }

// All data cards to be shown
function UserCard({ user }) {
  return (
    <div className="card bg-primary text-white">
      <h5 className="card-header">{user.name}</h5>
      <div className="card-body">
        <p className="card-text" bgcolor="primary">
          <strong>Email:</strong> {user.email}
        </p>
        <p className="card-text">
          <strong>Password:</strong> {user.password}
        </p>
        <p className="card-text">
          <strong>Account Balance:</strong>
          {" $"}
          {parseFloat(user.balance).toLocaleString("en-US", {
            minimumFractionDigits: 2, // Ensure 2 decimal places
            maximumFractionDigits: 2, // Prevent more than 2 decimal places
          })}
        </p>
        <p className="card-text">
          <strong>Account Number:</strong> {user.accountNumber}
        </p>
      </div>
    </div>
  );
}

function TransactionCard({ transaction }) {
  const cardBackgroundColor =
    transaction.type === "Deposit" ? "success" : "warning";
  return (
    <div className={`card bg-${cardBackgroundColor} text-white`}>
      <h5 className="card-header">{transaction.type}</h5>
      <div className="card-body">
        <p className="card-text" bgcolor="primary">
          <strong>Email:</strong> {transaction.email}
        </p>
        <p className="card-text">
          <strong>Transaction Amount:</strong>
          {" $"}
          {parseFloat(transaction.amount).toLocaleString("en-US")}
        </p>
        <p className="card-text">
          <strong>Timestamp:</strong> {transaction.timestamp}
        </p>
      </div>
    </div>
  );
}

// function to force the balance to be an integer and not a string
function validateUser(user) {
  return {
    name: user.name,
    email: user.email,
    password: user.password,
    balance: Number(user.balance),
    // accountNumber: user.accountNumber,
    // accountType: user.accountType,
  };
}

function AllData() {
  const [data, setData] = React.useState("");
  React.useEffect(() => {
    // fetch all accounts from API
    fetch("/account/all")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(JSON.stringify(data));
      });
  }, []);

  return (
    <>
      {/* <h5>All Users in App</h5>
        <div className="row">
          {serializedUsers.map((user, index) => (
            <div className="col-md-4 mb-3" key={index}>
              <UserCard user={user} />
            </div>
          ))}
        </div>
  
        {ctx.transactions.length > 0 && (
          <>
            <h5>Transaction History</h5>
            <div className="row">
              {ctx.transactions.map((transaction, index) => (
                <div className="col-md-4 mb-3" key={transaction.timestamp}>
                  <TransactionCard transaction={transaction} />
                </div>
              ))}
            </div>
          </>
        )} */}
      <h5>All Data in MongoDB:</h5>
      {data}
    </>
  );
}
