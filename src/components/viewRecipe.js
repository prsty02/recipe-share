import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { db } from "../firebase";

const ViewRecipe = () => {
    const navigate = useNavigate();
    let {data} = useParams()
    const [recipe, setRecipe] = useState(null)
    const [isLoading, setIsLoading] = useState(false)

    const getRecipe = useCallback(async () => {
        setIsLoading(true)
        const docRef = doc(db, "recipe", data);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setRecipe(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
}
    },[data]);

    useEffect(() => {
        getRecipe()
        setIsLoading(false)
    }, [getRecipe])


    return(
        <>
            <button className="lg:mx-8 py-2" onClick={() => navigate(-1)}>Go back</button>
            <div className="card border-2 border-gray-200 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-3 overflow-hidden mx-8">
                {isLoading && <p>Loading some recipe..</p>}
                {!isLoading && recipe === null && <p>Wait a moment</p>}
                {!isLoading && recipe !== null &&
                    <>
                        <div className="card-pic col-span-1">
                            <img className="pic h-full w-full object-cover" src={recipe.image} alt={'gambar' + recipe.title} />    
                        </div>
                        <div className="card p-4 col-span-1 grid grid-cols-1 gap-2">
                            <div className="card-title">
                                <h3 className="title text-center text-lg">{recipe.title}</h3>
                                <p className="text-center">by : {recipe.owner.name}</p>
                            </div>
                            <div className="card-body grid grid-cols-2 gap-4">
                                <div className="col-span-2">
                                    <p className="section-title text-lg font-bold">Description</p>
                                    <p>{recipe.desc}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        <p>Serving number: {recipe.serving}</p>
                                        <div>
                                            <p className="dish-type text-center text-white rounded-lg bg-sky-400">{recipe.type}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="step col-span-2 grid grid-cols-1 place-content-start">
                                    <p className="section-title text-lg font-bold">Ingredients</p>
                                    <ul className="list-disc px-5">
                                    {recipe.ing.map(ing => (
                                        <li>{ing.ing}</li>
                                    ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card p-4 col-span-1 lg:col-span-2 grid grid-cols-1 gap-2">
                            <div className="steps grid grid-cols-1">
                                <p className="section-title text-lg font-bold">Step-by-Steps</p>
                                <ul className="list-disc px-5">
                                {recipe.step.map(step => (
                                    <li>{step.step}</li>
                                ))}
                                </ul>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default ViewRecipe