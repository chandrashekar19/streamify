import PropTypes from "prop-types";

const Button = ({ name }) => {
  return (
    <div>
      <button className="px-5 py-2 m-2 bg-gray-200 rounded-lg">{name}</button>
    </div>
  );
};
Button.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Button;
