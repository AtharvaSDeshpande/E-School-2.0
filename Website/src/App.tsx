import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./containers/Footer/Footer";
import Header from "./containers/Header/Header";
import ProtectedRoute from "./ProtectedRoute";
import SignIn from "./containers/Authenticate/SignIn";

const App = () => {
  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/tracker" element={<div>About</div>} />
            <Route path="/meals" element={<div>Meals</div>} />
            <Route path="/profile" element={<div>Profile</div>} />
          </Route>
          <Route path="/login" element={<SignIn />} />
          <Route path="/" element={<div>E School</div>} />
          <Route path="*" element={<div>Page Not Found</div>} />{" "}
          {/* For 404 page */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
