import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Avatar from "../components/Users/Avatar";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setUserId, setToken, setPicture } from "../Store/userSlice";
import { registerUser } from "../Services/api";
import { RootState } from "../Store/store";

interface RegisterResponse {
  email: string;
  token: string;
  picture: string;
  _id: string;
}

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [pictureUrl, setPictureUrl] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const token = useSelector((state: RootState) => state.user.token);

  useEffect(() => {
    if (user && token) {
      navigate("/");
    }
  }, [user, token, navigate]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response: RegisterResponse = await registerUser({
        first_name: firstname,
        last_name: lastname,
        email,
        password,
        pictureUrl,
      });
      dispatch(setUser(response.email));
      dispatch(setToken(response.token));
      dispatch(setPicture(response.picture));
      dispatch(setUserId(response._id));
      navigate("/");
    } catch (error) {
      console.log("Error registering:", error);
    }
  };
  return (
    <Wrapper>
      <GlassMorphism className="col-10 col-md-8 col-lg-6 p-3">
        <h1 className="display-6">Create an account.</h1>
        <p className="text-sm fw-bolder">Get things done.</p>
        <form className="py-3" onSubmit={handleSubmit}>
          {pictureUrl && <Avatar url={pictureUrl} user={firstname} />}
          <div className="row mb-3">
            <label htmlFor="inputPictureUrl" className="form-label">
              Picture URL
            </label>
            <input
              type="text"
              className="form-control"
              value={pictureUrl}
              onChange={(e) => setPictureUrl(e.target.value)}
              id="inputPictureUrl"
            />
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="inputFirstname" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                id="inputFirstname"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="inputLastname" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                id="inputLastname"
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="inputEmail"
            />
          </div>
          <div className="row mb-3">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="inputPassword"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          <p className="text-sm mt-2 mb-0">
            Already have an account?{" "}
            <strong
              className="text-decoration-underline"
              onClick={() => navigate("/login")}
            >
              Sign In
            </strong>
          </p>
        </form>
      </GlassMorphism>
    </Wrapper>
  );
};

export default Register;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
`;

const GlassMorphism = styled.div`
  background: rgba(155, 155, 155, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 10px;
`;
