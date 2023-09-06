import { useState } from "react"
import { setDoc, doc } from "firebase/firestore";
import { db } from '../firebase';
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const AddRecipe = () => {
    const storage = getStorage();
    const navigate = useNavigate();
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [serving, setServing] = useState(1)
    const [file, setFile] = useState(null)
    // const [url, setURL] = useState("");
    const options = [
        {value: '', text: '--Choose an option--'},
        {value: 'Appetizer', text: 'Appetizer'},
        {value: 'Dessert', text: 'Dessert'},
        {value: 'Main Course', text: 'Main Course'},
        {value: 'Soft Drink', text: 'Soft Drink'},
        {value: 'Snack', text: 'Snack'},
    ];
    const [type, setType] = useState(options[0].value)
    const [ing, setIng] = useState([{ing:''}])
    const [step, setStep] = useState([{step:''}])
    const auth = getAuth();
    
    const addIng = () => {
        let newfield = { ing: '' }
        setIng([...ing, newfield])
    }

    const removeIng = (index) => {
        let data = [...ing];
        data.splice(index, 1)
        setIng(data)
    }

    const handleIngField = (index, event) => {
        console.log("run")
        let data = [...ing];
        data[index].ing = event.target.value;
        setIng(data);
    }

    const addStep = () => {
        let newfield = { step: '' }
        setStep([...step, newfield])
    }

    const removeStep = (index) => {
        let data = [...step];
        data.splice(index, 1)
        setStep(data)
    }

    const handleStepField = (index, event) => {
        let data = [...step];
        data[index].step = event.target.value;
        setStep(data);
    }

    const handleImageAsFile = (event) => {
        if (event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        const user = auth.currentUser;
        const path = `/images/${title.replaceAll(" ", "_")}`;
        const reference = ref(storage, path);
        try {
            uploadBytes(reference, file)
            .then(snapshot => {
                return getDownloadURL(snapshot.ref)
            })
            .then(downloadURL => {
                console.log('Download URL', downloadURL)
                setFile(null);
                setDoc(doc(db, "recipe", user.uid+"-"+title.replaceAll(" ", "_")), {
                    title: title,
                    image: downloadURL,
                    owner: {
                        id: user.uid,
                        name: user.displayName
                    },
                    createdAt: new Date(),
                    desc: desc,
                    serving: serving,
                    type: type,
                    ing: ing,
                    step: step,
                });
                console.log("Document written ");
                navigate("/")
            })
            
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return(
            <form onSubmit={handleSubmit} className="form w-full h-full grid grid-cols-5 gap-1">
                <div className="main md:col-start-2 md:col-end-5 col-span-5 p-6 rounded-lg flex flex-col border-solid border-2 border-gray-200">
                    <h2 className="title text-xl py-3">Add Recipe</h2>
                    <div className="title grid grid-cols-1 py-1">
                        <label for="Title">Title</label>
                        <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="title" placeholder="Enter dish name..."/>
                    </div>
                    <div className="desc grid grid-cols-1 py-1">
                        <label for="description">Description</label>
                        <textarea rows={3} name="desc" value={desc} onChange={(e) => setDesc(e.target.value)} className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="description" placeholder="Explain things about your dish..."/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                        <div className="serving grid grid-cols-1 py-1">
                            <label for="serving">Servings</label>
                            <input type="number" min={1} name="serving" value={serving} onChange={(e) => setServing(e.target.value)} className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="serving" placeholder="Number of serving with this recipe..."/>
                        </div>
                        <div className="type grid grid-cols-1 py-1">
                            <label for="Type">Dish Type</label>
                            <select type="text" name="desc" value={type} onChange={(e) => setType(e.target.value)} className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="type" placeholder="Type of dish...">
                                {options.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="serving grid grid-cols-1 py-1">
                            <label for="Title">Dish Image</label>
                            <input type="file" onChange={handleImageAsFile} className="field p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" id="pics" placeholder="Illustration of dish... "/>
                        </div>
                    </div>
                </div>
                <div className="ingridient md:col-start-2 md:col-end-5 col-span-5 p-6 rounded-lg flex flex-col border-solid border-2 border-gray-200">
                    <h2 className="title text-xl py-3">Ingredients</h2>
                    {ing.map((input, index) => (
                        <div className="ing grid grid-cols-12 gap-2 py-1" key={index}>
                            <input type="text" name={"ing"} value={input.ing} onChange={(e) => handleIngField(index, e)}  className="field col-span-11 p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" placeholder="Ingredients that needed for the dish..."/>
                            <button type="button" disabled={ing.length <= 1} onClick={() => removeIng(index)} className="button col-span-1 text-red-500 hover:text-white p-2 border-solid rounded-lg border-2 border-red-400 bg-transparent hover:bg-red-500">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addIng} className="button text-white p-2 border-solid rounded-lg border-2 border-sky-400 bg-sky-500 hover:bg-sky-600">Add Ingredient</button>
                </div>
                <div className="step md:col-start-2 md:col-end-5 col-span-5 p-6 rounded-lg flex flex-col border-solid border-2 border-gray-200">
                    <h2 className="title text-xl py-3">Steps</h2>
                    {step.map((input, index) => (
                        <div className="step grid grid-cols-12 gap-2 py-1" key={index}>
                            <input type="text" name={"step"} value={input.step} onChange={(e) => handleStepField(index, e)}  className="field col-span-11 p-2 border-solid rounded-lg border-2 border-gray-300 focus:outline-sky-500" placeholder="Step-by-steps to make the dish..."/>
                            <button type="button" disabled={ing.length <= 1} onClick={() => removeStep(index)} className="button col-span-1 text-red-500 hover:text-white p-2 border-solid rounded-lg border-2 border-red-400 bg-transparent hover:bg-red-500">X</button>
                        </div>
                    ))}
                    <button type="button" onClick={addStep} className="button text-white p-2 border-solid rounded-lg border-2 border-sky-400 bg-sky-500 hover:bg-sky-600">Add Step</button>
                </div>
                <div className="submit grid md:col-start-2 md:col-end-5 col-span-5">
                    <input type="submit" className="button text-white p-2 border-solid rounded-lg border-2 border-sky-400 bg-sky-500 hover:bg-sky-600" /> 
                </div>
            </form>
    )
}

export default AddRecipe