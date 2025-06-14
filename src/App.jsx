import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboard from './admin/AdminDashboard'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import RecipeList from './pages/RecipeListHome'
import RecipePages from './components/RecipePages'
import Recipe from './pages/Recipe'
import SavedRecipe from './admin/Saved'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <Routes>
        <Route path='/saved' element={<SavedRecipe />} />
        <Route path='/recipes/:id' element={<RecipePages />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/recipe' element={<Recipe />} />
        <Route path='/' element={
          <>
            <Home />
            <RecipeList />
          </>
        }>
        </Route>
      </Routes>
      <Footer />
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  )
}

export default App
