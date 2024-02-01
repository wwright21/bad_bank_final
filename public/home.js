function Home() {
  return (
    <Card
      bgcolor="info"
      header="The Bank of Will"
      title="Welcome to the bank!"
      text="Create an account or log in to get started."
      body={
        <img src="money.gif" className="img-fluid" alt="Responsive image" />
      }
    />
  );
}
