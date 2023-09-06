import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./navbar"
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Page = (props) => {
    const navigate = useNavigate()

    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            // console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
    
    return (
        <div>
            <Navbar logout={handleLogout}/>
            <div className="container mx-auto p-4 pt-16">
                <Outlet />
            </div>
        </div>
    )
}

export default Page