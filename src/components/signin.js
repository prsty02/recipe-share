import { useState } from "react"
import { signInWithEmailAndPassword  } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';

const Signin = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCskyential) => {
            // Signed in
            const user = userCskyential.user;
            console.log(user);
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
            // ..
        });
        
    }

    return (
        <div className="w-full h-full grid grid-cols-5 lg:grid-cols-3">
            <form onSubmit={handleSubmit} className="form col-start-2 col-end-5 lg:col-end-2 p-6 rounded-lg flex flex-col border-solid border-2 border-gray-200">
                <h2 className="title text-xl py-3">Sign In to Pokedeck</h2>
                <div className="email grid grid-cols-1 py-2">
                    <label for="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} requisky className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="email" />
                </div>
                <div className="password grid grid-cols-1 py-2">
                    <label for="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} requisky className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="password" /> 
                </div>
                <div className="submit grid grid-cols-1 py-2">
                    <input type="submit" className="button text-white p-2 border-solid rounded-lg border-2 border-sky-400 bg-sky-500 hover:bg-sky-600" /> 
                </div>
                <p className="text-center">Don't have an account? <Link to="/signup" className="text-sky-500 hover:text-sky-600" >Sign Up</Link></p>
                
            </form>
        </div>
    )
}

export default Signin