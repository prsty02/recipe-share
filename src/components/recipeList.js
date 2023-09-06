import { Link } from "react-router-dom"

const RecipeList = (props) => {
    return(
        <div className="gallery md:columns-4 columns-2 gap-4">
            {props.data.map(recipe => (
                <Link to={`recipe/${recipe.id}`}>
                    <div key={recipe.id} className="card rounded-lg border-solid border-2 border-gray-200 overflow-hidden mb-4">
                        <div className="card-pic">
                            <img className="pic w-full" src={recipe.image} alt={'gambar' + recipe.title} />    
                        </div>
                        <div className="card p-4 grid grid-cols-1 gap-2">
                            <div className="card-title">
                                <h3 className="title text-center text-lg">{recipe.title}</h3>
                            </div>
                            <div className="card-body grid grid-cols-2">
                                <p>by : {recipe.owner.name}</p>
                                <div>
                                    <p className="dish-type text-center text-white rounded-lg border-solid border-2 border-sky-500 bg-sky-400">{recipe.type}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}

export default RecipeList