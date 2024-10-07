import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DeviceInfo } from "./components/DeviceInfo";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastContainer position="bottom-left" autoClose={2000} closeOnClick />
      <DeviceInfo />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
