import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
// import './App.css'
import AuthProvider from "./auth/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
