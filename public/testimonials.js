function Testimonials() {
  return (
    <div
      className="centered-div"
      style={{
        opacity: 0.6, // Partial transparency
        border: "none", // No border
        backgroundColor: "rgb(141, 179, 95)", // Background color
        maxWidth: "fit-content", // Adjust width as needed
        height: "fit-content", // Adjust height as needed
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        borderRadius: "7px",
        paddingTop: "25px",
        paddingLeft: "20px",
        paddingRight: "20px",
      }}
    >
      <>
        <h3>Praise for Bank of the Dark Web</h3>
        <br />
        <p style={{ fontSize: "20px" }}>
          <em>
            Wow, thanks BotDW! After my successful Ponzi scheme, I had loads of
            cash and no way to hide it all. Dave Ramsey's call-in show was no
            help. So I created a new account in seconds and now I can finally
            buy that Lürssen Al Lusail I've been dreaming of! <br />- "Timmy" in
            Tokyo
          </em>
          <br />
          <br />
          <em>
            You're a life saver, Bank of the Dark Web. I had the Feds breathing
            down my neck after a successful embezzling campaign, but now I can
            sleep in peace knowing that all my laundered money is safe within
            your hallowed vaults. You saved my finances, my career, and my
            marriage. Five stars and a triumph of the human spirit! <br />-
            "Bobby" in Buffalo
          </em>
          <br />
          <br />
          <em>
            it works good. <br />- Anonymous user in asdfasdfasdf
          </em>
        </p>
      </>
    </div>
  );
}
