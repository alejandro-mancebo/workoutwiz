import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { RootLayout } from "./pages/root-layout";
import { LandingPage } from "./pages/langing-page";
import { HomePage } from "./pages/home-page";
import { WorkoutPage } from "./pages/workout-page";
import { NotFound } from "./pages/not-found";
// import './App.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />

      {/* Protected routes */}
      <Route path="/home" element={<HomePage />} />
      <Route path="/workout" element={<WorkoutPage />} />

      {/* Not found route */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
