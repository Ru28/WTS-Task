import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import MovieList from './components/MovieList';
function App() {

  const  appRouter = createBrowserRouter([
    {
        path: "/",
        element: <MovieList/>
    }
])

  return (
    <div>
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default App
