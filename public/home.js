function Home() {
  return (
    <Card
      bgcolor="info"
      header="Bank of Will"
      title="Welcome to the bank! Create an account or log in to get started."
      body={
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "0.5em",
            overflow: "hidden",
            height: "250px",
          }}
        >
          <img src="money.gif" className="img-fluid" alt="Responsive image" />
        </div>
      }
    />
  );
}
