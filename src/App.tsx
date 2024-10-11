import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DeviceInfo } from "./components/DeviceInfo";
import { Home } from "./pages/Home";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        pauseOnHover={false}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/deviceInfo" element={<DeviceInfo />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
