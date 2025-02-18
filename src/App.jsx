import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import appRouter from "./routes/app-router";
import store from "./hooks/store";
import Header from "./components/header";

function App() {
  return (
    <Provider store={store}>
      <div>
        <Header />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;
