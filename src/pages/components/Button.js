import { useState } from 'react';
import { Link } from 'react-router-dom';

const Button = ({title, onClick, type, className}) => {

    return (
        <button
            className={`${className} p-2 bg-blue-500 text-white rounded-lg  hover:bg-blue-800 active:bg-blue-500 focus:outline-none`}
            type={type}
            onClick={onClick}
        >
            {title} 
        </button>
    )
}

export default Button
