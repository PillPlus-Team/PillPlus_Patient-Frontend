const Button = ({ title, onClick, type, className, disabled }) => {
  return (
    <button
      className={`${className} p-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-800 focus:outline-none outline-none duration-300`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
