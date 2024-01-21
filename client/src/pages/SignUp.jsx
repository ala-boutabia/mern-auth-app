import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signiInSuccess,
  signInFailure,
  selectAllUsers,
} from "../redux/user/userSlice.js";

const SignUp = () => {
  const [formData, setformData] = useState({});
  const userDetails = useSelector(selectAllUsers);
  const { loading, error } = userDetails;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //setLoading(true);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      //setLoading(false);
      dispatch(signiInSuccess());
      if (data.success === false) {
        //setError(true);
        dispatch(signInFailure());
        return;
      }
      navigate("/sign-in");
    } catch (error) {
      //setLoading(false);
      dispatch(signInFailure(error));
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className=" bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className=" bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className=" bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className=" bg-slate-700 p-3 text-white rounded-lg uppercase hover:opacity-95">
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex gap-4 mt-5">
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
          <span className="text-blue-500">Sign in</span>
        </Link>
      </div>
      <p className="text-red-700 mt-3">{error && "Something went wrong"}</p>
    </div>
  );
};
export default SignUp;
