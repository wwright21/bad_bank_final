function Home() {
  return (
    <Card
      txtcolor="black"
      header="Home Page"
      title="Welcome to the bank!"
      text="Make deposits and withdraws."
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}
