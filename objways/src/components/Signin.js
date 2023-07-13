import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signin = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/signin', {
      method: "POST",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
      credentials: 'include', // Include cookies in the request
    });
    const data = await res.json();
    console.log(`data fetched in the signin Component: ${JSON.stringify(data)}`);
    if (res.status === 400 || !data) {
      window.alert("Invalid Signin");
    }
    else {
      window.alert("Successfull Signin");
      navigate('/Home');
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
          <h3 className="mb-4">Signin</h3>
        </div>
        <div className="card-body">
          <form className="form">
            <div className="form-group">
              <label htmlFor="">Email</label>
              <input
                name="email"
                type="text"
                className="form-control rounded-0"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">Password</label>
              <input
                name="password"
                type="password"
                className="form-control rounded-0"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary float-end my-3"
              onClick={loginUser}
              >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>

  )
}

export default Signin
