import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LOGIN_URL, NOT_A_MEMBER } from "../../common/Constants";
import { setLoggedInUserCreds, setlol } from "../../Redux/Actions";
import { response } from "../../common/Mockdata";
import "../../common/globalStyles.css";
import axios from "axios";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(LOGIN_URL);
      const jsonRes = response?.data;
      const userExists = jsonRes.find((userRes) => {
        return userRes.username === user && userRes.password === password;
      });
      if (userExists) {
        setSuccess(true);
        setIsLoading(false);
        setErrMsg("");
        dispatch(setLoggedInUserCreds({ username: user, password }))
        navigate("/usertable");
      } else {
        setErrMsg(NOT_A_MEMBER);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="outerMostContainer">
      <div className="displayflex justifyContentCenter alignItemCenter flexDirectionColumn container">
        <div className="errorMsg">{errMsg}</div>
        <form onSubmit={handleSubmit}>
          <div className="displayflex flexDirectionColumn marginBottom1">
            <input
              type="text"
              id="username"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              className="inputField"
              placeholder="Username"
            />
          </div>
          <div className="displayflex flexDirectionColumn marginBottom1">
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              className="inputField"
              placeholder="Password"
            />
          </div>
          <div className="displayflex justifyContentCenter alignItemCenter">
            <input type="submit" value={isLoading ? "LOADING" : "SUBMIT"} />
          </div>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default LoginPage;
