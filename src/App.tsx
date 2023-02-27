import "stylesheets/_global.module.scss";
import "stylesheets/_typography.module.scss";
import { router } from "./routes";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
