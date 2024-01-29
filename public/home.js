function Home() {
  return (
    <Card
      txtcolor="black"
      header="Home"
      title="Welcome to the bank!"
      text="Where money grows on trees."
      body={<img src="bank.png" className="img-fluid" alt="Responsive image" />}
    />
  );
}
