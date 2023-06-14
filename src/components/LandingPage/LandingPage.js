import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "../Login/Login";
import UserTable from "../UserTable/UserTable";
import FallBack from "../../common/CommonComponents/Fallback";
import { store } from "../../Redux/store";

const LandingPage = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/usertable" element={<UserTable />} />
          <Route path="*" element={<FallBack />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default LandingPage;
