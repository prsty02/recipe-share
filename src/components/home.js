import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useCallback, useEffect, useState } from "react";
import RecipeList from "./recipeList";


const Home = () => {
    const [recipes, setRecipes] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getRecipe = useCallback(async () => {
        
        const ref = collection(db, "recipe")
        const docSnap = query(ref);

        await getDocs(docSnap)
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setRecipes(newData);
                // console.log(recipes)           
            })
    },[]);

    useEffect(() => {
        getRecipe()
        setIsLoading(false)
    }, [getRecipe])

    return(
        <div className="w-full grid grid-cols-1 gap-2 px-4">
            <div className="section-header py-4">
                <div class="quotes w-3/5 mx-auto p-4 rounded-xl border-solid border-2 border-sky-200">
                    <div class="text-3xl text-sky-500 text-left leading-tight h-3">“</div>
                    <p class="text-lg text-gray-600 text-center px-5">Food is symbolic of love when words are inadequate.</p>
                    <div class="text-3xl text-sky-500 text-right leading-tight h-3 -mt-3">”</div>
                    <div class="w-full pt-10">
                        <p class="text-md text-sky-500 font-bold text-center">Alan D. Wolfelt</p>
                    </div>
                </div>
                <h1 className="section-title text-xl">Recent Recipe</h1>
            </div>
            {!isLoading && recipes.length > 0 && <RecipeList data={recipes} />}
            {!isLoading && recipes.length === 0 && <p>No Recipe Available :(</p>}
            {isLoading && <p>Loading some recipe..</p>}
        </div>
    )
}

export default Home