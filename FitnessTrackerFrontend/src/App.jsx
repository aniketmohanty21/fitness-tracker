import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Dashboard";
import WorkoutsPage from "./pages/WorkoutsPage";
import AddWorkoutForm from "./pages/AddWorkoutForm";
import UpdateWorkoutForm from "./pages/UpdateWorkoutForm";
import ProgressPage from "./pages/ProgressPage";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/workouts" element={<WorkoutsPage />} />
        <Route path="/workouts/add" element={<AddWorkoutForm />} />
        <Route path="/workouts/update/:id" element={<UpdateWorkoutForm />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
