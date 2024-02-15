const Route = ReactRouterDOM.Route;
const Link = ReactRouterDOM.Link;
const HashRouter = ReactRouterDOM.HashRouter;
const UserContext = React.createContext(null);

function Card(props) {
  function classes() {
    const borderColor = props.borderColor ? " border-" + props.borderColor : ""; // Adjusted this line
    const txt = props.txtcolor ? " text-" + props.txtcolor : " text-white";
    return "card mb-3" + borderColor + txt; // Adjusted this line
  }

  return (
    <div
      className={classes()}
      style={{
        maxWidth: "35rem",
        backgroundColor: "rgb(141, 179, 95)",
        borderWidth: "0px",
        opacity: 0.6,
      }}
    >
      <div
        className="card-header"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          fontSize: "24px",
          borderBottom: "0px transparent",
          color: "black",
        }}
      >
        {props.header}
      </div>
      <div className="card-body" style={{ color: "black" }}>
        {props.title && (
          <h5 className="card-title" style={{ textAlign: "center" }}>
            {props.title}
          </h5>
        )}
        {props.text && <p className="card-text">{props.text}</p>}
        {props.body}
        {props.status && <div id="createStatus">{props.status}</div>}
      </div>
    </div>
  );
}
