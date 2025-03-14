import { Link } from "react-router-dom";

function LoginButton(){
    return(
        <Link to="/login" className="text-white focus:outline-none">
            Login
        </Link>
    )
}

export default LoginButton;