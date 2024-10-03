import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastContainer position="bottom-left" autoClose={2000} />
      <Home />
    </QueryClientProvider>
  );
}

export default App;
