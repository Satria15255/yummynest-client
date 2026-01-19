import Register from './pages/Register'
import Login from './pages/Login'
import AdminDashboard from './admin/AdminDashboard'
import Navbar from './components/Navbar'
import Hero from './pages/Hero'
import AboutUs from './pages/AboutUs'
import PopularRecipe from './pages/PopularRecipe'
import LatestRecipe from './pages/LatestRecipe'
import Testimoni from './pages/Testimoni'
import Contact from './pages/Contact'
import Promotion from './pages/Promot'
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
      <ToastContainer autoClose={3000} position='top-center' />
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
            <Hero />
            <AboutUs />
            <PopularRecipe />
            <Promotion />
            <LatestRecipe />
            <Testimoni />
            <Contact />
          </>
        }>
        </Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
