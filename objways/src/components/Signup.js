import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';


const Signup = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "", email: "", password: ""
  });

  let name, value;
  const handleInput = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  }

  const postData = async (e) => {
    e.preventDefault();
    const { name, email, password } = user;
    const res = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name, email, password
      })
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      window.alert("Email already in use");
      console.log("Invalid Registration");
    }
    else {
      window.alert("Successfull Registration");
      console.log("Successful Registration");
      if (res.status ===! 422 || data) {
        navigate("/Signin")
      }
    }
  }

  return (
    <div
      className="signup-container"
      style={{
        position: 'relative',
        backgroundImage: 'url(https://picsum.photos/2133/965)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        className="card rounded-0"
        style={{
          width: '30rem',
          backgroundColor: 'rgba(300, 255, 255, 0.7)',
        }}
      >
        <div className="card-header">
          <h3 className="mb-4">Register</h3>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <label htmlFor="">Name</label>
              <input
                name="name"
                type="text"
                className="form-control rounded-0"
                value={user.name}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                name="email"
                type="text"
                className="form-control rounded-0"
                value={user.email}
                onChange={handleInput}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                name="password"
                type="password"
                className="form-control rounded-0"
                value={user.password}
                onChange={handleInput}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary float-end my-3"
              onClick={postData}>
              Register
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Signup