import React from "react";
import axios from "axios";
import "../scss/component/Login/Login.scss";
import { useNavigate } from "react-router-dom";
export const Res = () => {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [isAdmin] = React.useState(false);
  const navigate = useNavigate();

  const handleRes = async () => {
    let item = { userName, password,confirmPassword,isAdmin,phone,address,fullName };
    await axios
      .post("https://localhost:7292/api/Account/Register", item).then((res) => console.log(res))
      
    navigate("/login");
  };
  return (
    <div>
      <h2> Dang ki</h2>
      <div className="user-box">
          <input
            type="text"
            onChange={(e) => setUserName(e.target.value)}
            required
          />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>mat khau </label>
          <div className="user-box">
          <input
            type="text"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <label>ghi lai mat khau</label>
        </div>
        </div>
        <div className="user-box">
          <input
            type='number'
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label>sdt m la gi</label>
          <div className="user-box">
          <input
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <label>dia chi nha</label>
        </div>
        <div className="user-box">
          <input
            type="text"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <label>ho va ten</label>
        </div>
        <button onClick={() => handleRes()}>Res</button>
        </div>
    </div>
  );
};

