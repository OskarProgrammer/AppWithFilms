//importring react router dom functions
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

//importing css
import './App.css'

//import bootstrap
import 'bootstrap/dist/css/bootstrap.css'

//import layouts
import HomeLayout from './layout/HomeLayout'

//import pages
import HomePage, { homePageLoader } from './pages/HomePage'
import FilmPage, { filmPage, filmPageAction } from './pages/FilmPage'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<HomeLayout/>}>
        <Route index element={<HomePage/>} loader={homePageLoader}/>
        <Route path="/films/:id" element={<FilmPage/>} loader={filmPage} action={filmPageAction}/>
    </Route>
  )
)

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
