import { Route, Routes, BrowserRouter } from "react-router";
import HomeScreen from "./screens/HomeScreen";
import CreateProductScreen from "./screens/CreateProductScreen";
import EditProductScreen from "./screens/EditProductScreen";
import { UpdateFormProvider } from "./context/useUpdateFormContext";
import { APIContextProvider } from "./context/APIContext";
import { Bounce, ToastContainer } from "react-toastify";

const App = () => {
  return (
    <BrowserRouter>
      <div className="w-screen h-screen bg-background">
        <APIContextProvider>
          <UpdateFormProvider>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="/new" element={<CreateProductScreen />} />
              <Route path="/edit/:id" element={<EditProductScreen />} />
            </Routes>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              transition={Bounce}
            />
          </UpdateFormProvider>
        </APIContextProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
