import "./obj.scss";
const Objectification = (props) => {
  return (
    <div className="container">
      <div className="txt anim-text-flow">
        {/* <span v-for="item, index in props.text" :key="index">{{ item }}</span> */}
        {props.text.split("").map((item) => (
          <span>{item}</span>
        ))}
      </div>
    </div>
  );
};

export default Objectification;
