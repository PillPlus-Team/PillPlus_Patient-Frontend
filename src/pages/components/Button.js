<<<<<<< HEAD
const Button = ({ title, onClick, type, className }) => {
  return (
    <button
      className={`${className} p-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-800 active:bg-blue-500 focus:outline-none`}
      type={type}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
=======
const Button = ({title, onClick, type, className, disabled}) => {

    return (
        <button
            className={`${className} p-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-800 focus:outline-none`}
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {title} 
        </button>
    )
}

export default Button
>>>>>>> a9d0ad58e572187b4bf4a49c7ed29115cc59f055
