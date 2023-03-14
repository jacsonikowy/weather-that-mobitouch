import LoginPage from "pages/LoginPage/LoginPage";
import Home from "pages/Home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Protected from "Protected";
import Favorites from "pages/Favorites/Favorites";

const checkIfAuthenticated = () => {
  const localStorageAuthentication = localStorage.getItem("user");
  if (!!localStorageAuthentication) {
    const aaa = JSON.parse(localStorageAuthentication);
    return aaa.loggedIn;
  }
};

/*

--- Routing using objects, don't work, thing to try and do ---

export const router1 = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/home",
    children: [
      {
        element: (
          <Protected isLoggedIn={() => checkIfAuthenticated()}>
            <Home />
          </Protected>
        ),
      },
    ],
  },
]);
*/

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/" element={<LoginPage />} />
      <Route
        path="home"
        element={
          <Protected isLoggedIn={() => checkIfAuthenticated()}>
            <Home />
          </Protected>
        }
      />
      <Route path="/favorites"
      element={
        <Protected isLoggedIn={() => checkIfAuthenticated()}>
          <Favorites />
        </Protected>
      }
      />
    </Route>
  )
);
