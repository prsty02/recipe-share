import { useState } from "react"
import { createUserWithEmailAndPassword  } from 'firebase/auth';
import { Link, useNavigate } from "react-router-dom";
import { auth } from '../firebase';
import { getAuth, updateProfile } from "firebase/auth";

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [nickName, setNickName] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")

    const handleSubmit = async(event) => {
        event.preventDefault();

        await createUserWithEmailAndPassword(auth, email, password)
        .then((userCskyential) => {
            // Signed in
            const auth = getAuth();
            updateProfile(auth.currentUser, {
                displayName: nickName}).then(() => {
                // Profile updated!
                // ...
                }).catch((error) => {
                // An error occursky
                // ...
            });
            console.log("user added with id", userCskyential.id);
        }).then(() => {
            navigate("/")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
        
    }

    return (
        <div className="w-full h-full grid md:grid-cols-3 grid-cols-5">
            <form onSubmit={handleSubmit} className="form col-start-2 col-end-5 md:col-end-2 p-6 rounded-lg flex flex-col border-solid border-2 border-gray-200">
                <h2 className="title text-xl py-3">Sign Up</h2>
                <div className="email grid grid-cols-1 py-2">
                    <label for="email">Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="email" />
                </div>
                <div className="email grid grid-cols-1 py-2">
                    <label for="email">Nickname</label>
                    <input type="text" value={nickName} onChange={(e) => setNickName(e.target.value)} required className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="nick" />
                </div>
                <div className="password grid grid-cols-1 py-2">
                    <label for="password">Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="password" /> 
                </div>
                <div className="password grid grid-cols-1 py-2">
                    <label for="password">Confirm Password</label>
                    <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="confirmpass" /> 
                </div>
                <div className="submit grid grid-cols-1 py-2">
                    <input type="submit" className="button text-white p-2 border-solid rounded-lg border-2 border-sky-400 bg-sky-500 hover:bg-sky-600" /> 
                </div>
                <p className="text-center">Already have an account? <Link to="/signin" className="text-sky-500 hover:text-sky-600" >Log In</Link></p>
            </form>
        </div>
    )
}

export default Signup