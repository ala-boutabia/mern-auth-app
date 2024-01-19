import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-4 mt-5">
        <p>Dont Have an account?</p>
        <Link to={"/sign-up"}>
          <span className="text-blue-500">Sign up</span>
        </Link>
      </div>
      <p className="text-red-700 mt-3">{error && "Something went wrong"}</p>
    </div>
  );
};
export default SignIn;
