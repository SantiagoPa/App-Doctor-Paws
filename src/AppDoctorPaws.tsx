import { RouterProvider } from 'react-router';
import { appRouter } from './router/app.router';

export function App() {
  return <RouterProvider router={appRouter} />
}

export default App
