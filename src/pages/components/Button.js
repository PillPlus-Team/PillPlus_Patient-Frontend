import { useLocation } from "react-router-dom";


const Button = ({ title, onClick, type, className, disabled }) => {

  //----------check path------------
  const location = useLocation();
  const isLoginPath = location.pathname === "/login";
  
  return (
    <button
      className={`${className} p-2 ${isLoginPath? "bg-blue-500 rounded-lg" : "bg-blue-600 rounded-2xl"} text-white     hover:bg-blue-800 focus:outline-none outline-none duration-300`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
