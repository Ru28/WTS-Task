import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovies';
import UpdateMovie from './components/UpdateMovie';
function App() {

  const  appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MovieList/>
    },
    {
      path:"/create",
      element: <CreateMovie/>
    },
    {
      path:"/update",
      element: <UpdateMovie/>
    },
])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
