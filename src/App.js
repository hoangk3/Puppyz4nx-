import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Cat from "./components/cat";
import { publicRoutes } from "./router"; // ✅ named export
import Goal from "./pages/Goal/Goal";

const extraRoutes = [
  { path: "/goal", component: Goal, layout: DefaultLayout },
];

function App() {
  return (
    <>
      <Cat />
      <Router>
        <Routes>
          {publicRoutes.concat(extraRoutes).map((route, index) => {
            const Page = route.component;
            let Layout = route.layout || DefaultLayout;
            if (route.layout === null) Layout = Fragment;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </>
  );
}

export default App;
