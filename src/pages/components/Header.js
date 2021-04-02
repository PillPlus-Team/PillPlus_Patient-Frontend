const Header = ({title, className}) => {
    return (
        
        <h1 className={`${className} text-4xl sm:text-5xl font-bold text-blue-500`}>{title}</h1>
        
    )
}

export default Header
