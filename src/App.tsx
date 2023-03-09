import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  return (
    <BrowserRouter>
      <Login setIsLogged={setIsLogged} />
      {/* <Layout>
        <Routes>
          <Route element={<Home />} path=":page" />
          
        </Routes>
      </Layout> */}
    </BrowserRouter>
  );
}

export default App;
