import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeviceInfo } from "./components/DeviceInfo";
import { Home } from "./pages/Home";
import MyForm from "./components/Form";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastContainer position="bottom-left" autoClose={2000} closeOnClick />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deviceInfo" element={<DeviceInfo />} />
          <Route path="/form" element={<MyForm />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
