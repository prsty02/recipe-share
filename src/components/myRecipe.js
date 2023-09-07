import { collection, getDocs, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RecipeList from "./recipeList";
import defaultIcon from "../images/logo.svg"


const MyRecipe = () => {

    const auth = getAuth();
    const [user, setUser] = useState()
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
   
    
    const getRecipe = useCallback(async () => {
        
        const ref = collection(db, "recipe")
        const docSnap = query(ref, where("owner.id", "==", auth.currentUser.uid));

        await getDocs(docSnap)
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setRecipes(newData);
                // console.log(recipes)           
            })
    },[auth]);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/auth.user
                setUser(user)
                // console.log(auth.currentUser)
                // ...
            } else {
                // User is signed out
                setUser(null)
                // ...
            }
            });
        getRecipe()
        setIsLoading(false)
    }, [auth, getRecipe])

    return(
        <div className="w-full grid grid-cols-1 gap-2 px-4">
            <div className="section-header py-4 ">
                <div className="quotes w-3/4 grid grid-cols-4 mx-auto p-4 rounded-xl border-solid border-2 border-sky-200">
                    <div className="Identity col-span-1 p-4">
                        <img className="pic mx-auto rounded-full h-44 w-44 border-solid border-2 border-sky-200" src={defaultIcon} alt={user} />
                    </div>
                    <div className="stats col-span-3">
                        <h2 className="nick text-xl border-solid border-b-2 p-2 border-sky-200">@{ user != null ? user.displayName : "User"}</h2>
                        <h2 className="nick text-lg p-2">"Cook with love"</h2>
                        <ul className="p-2 text-lg">
                            <li>Recipe shared: {recipes.length}</li>
                        </ul>
                    </div>
                </div>
                <h1 className="section-title text-xl py-4">My Recipe</h1>
            </div>
            {!isLoading && recipes.length > 0 && <RecipeList data={recipes} />}
            {!isLoading && recipes.length === 0 && <p>You haven't shared any recipes yet :(</p>}
            {isLoading && <p>Loading some recipe..</p>}    
        </div>
    )
}

export default MyRecipe