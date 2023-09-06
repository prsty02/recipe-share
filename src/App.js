import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Page from './components/page';
import Home from './components/home';
import Signin from './components/signin';
import Signup from './components/signup';
import AddRecipe from './components/addRecipe';
import MyRecipe from './components/myRecipe';
import ViewRecipe from './components/viewRecipe';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Page/>}>
                <Route index element={<Home />} />
                <Route path="signup" element={<Signup />} />
                <Route path="signin" element={<Signin />} />
                <Route path="add-recipe" element={<AddRecipe />} />
                <Route path="my-recipe" element={<MyRecipe />} />
                <Route path="recipe/:data" element={<ViewRecipe />} />
                <Route path="my-recipe/recipe/:data" element={<ViewRecipe />} />
              </Route>
            </Routes>
        </BrowserRouter>
      </div>
    );
  }

export default App;
