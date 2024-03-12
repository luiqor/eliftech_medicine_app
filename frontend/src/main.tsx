import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.tsx'
import './index.css'
import { StoreProvider } from './Store.tsx'
import Storepage from './pages/Storepage.tsx'
import Cartpage from './pages/Cartpage.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Storepage />} />
      <Route path="cart" element={<Cartpage />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  </>,
)
