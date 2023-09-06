import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { getAuth, onAuthStateChanged } from "firebase/auth"

const Navbar = (props) => {
    const [isShow, setIsShow] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [username, setUsername] = useState("user")

    const auth = getAuth();
   
    const out = () => {
        props.logout()
    }
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUsername(user.displayName)
                // console.log(auth.currentUser)
                // ...
            } else {
                // User is signed out
                setUsername("user")
                // ...
            }
            });
    }, [auth])
    
    return(
        <nav className="nav fixed w-full bg-sky-500 text-white">
            <div className="container mx-auto px-4 grid grid-cols-7">
                <Link to={"/"} className="title py-4 font-bold">RecipeShare</Link>
                <button className="menu-button p-4 md:hidden col-start-7" onClick={() => setIsShow(!isShow)}>
                    button
                </button>
                <div className={`menu-items p-3 md:p-0 ${isShow ? "grid" : "hidden"} grid-cols-1 md:col-start-6 col-span-full md:bg-transparent md:grid md:grid-cols-3 gap-2`}>
                    <Link to="/" className={`menu-item p-4 ${username === "user" && "col-start-2"} hover:bg-sky-600 text-center`} aria-current="page">Home</Link>
                    {username !== "user" && <Link to="/my-recipe" className="menu-item p-4 hover:bg-sky-600 text-center" aria-current="page">My Recipe</Link>}
                    <button type="button" className="relative" onMouseLeave={() => setIsOpen(false)} >
                        <div className="menu-item p-4 hover:bg-sky-600 text-center overflow-clip" onClick={() => setIsOpen(!isOpen)}>{username}</div>
                        <ul className={`${isOpen ? "block md:absolute" : "hidden"} z-4 float-left w-full min-w-max list-none overflow-hidden border-none bg-sky-500 text-left`} onClick={() => setIsShow(!isShow)}>
                           
                            {username === "user" ?  
                            <li>
                                <Link to="/signin" className="block menu-item p-4 w-full hover:bg-sky-600 text-center" >Login</Link>
                            </li> : 
                            <>
                                <li>
                                    <Link to="/add-recipe" className="block menu-item p-4 w-full hover:bg-sky-600 text-center">Add Recipe</Link>
                                </li>
                                <li>
                                    <button className="block menu-item p-4 w-full hover:bg-sky-600 text-center" onClick={out}>Logout</button>
                                </li>
                            </>}
                            
                        </ul>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar