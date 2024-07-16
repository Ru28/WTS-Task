import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MovieList from './components/MovieList';
import CreateMovie from './components/CreateMovies';
function App() {

  const  appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MovieList/>
    },
    {
      path:"/create",
      element: <CreateMovie/>
    }
])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
