import "./obj.scss";
const Objectification = (props) => {
  return (
    <div className="container">
      <div className="txt anim-text-flow">
        {props.text.split("").map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Objectification;
