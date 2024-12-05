import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRoutes } from "./routes";
import { FilesProvider } from "./contexts/FilesContext";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        pauseOnHover={false}
      />
      <AuthProvider>
        <FilesProvider>
          <AppRoutes />
        </FilesProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
