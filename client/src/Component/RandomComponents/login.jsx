import { React, useState, useEffect, use } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import logpic from "../../Assets/login.png";
import log2 from "../../Assets/logo1.png";
import Google from "../../Assets/google.svg";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Auth/SupabaseClient";
import UniversalLoader from "../../UI/UniversalLoader";
import toast, { Toaster } from 'react-hot-toast';



const url = process.env.REACT_APP_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmployee, setIsEmployee] = useState(false);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    if (session) {
      localStorage.setItem("userType", "user");
      navigate("/dashboard");
    }
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogIn = async (e) => {
    e.preventDefault();
    const logindata = {
      email: email,
      userType: isEmployee ? "employer" : "employee",
      password: password,
    };
    if (!email || !password) {
      toast.error("Please fill all the fields", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progressClassName: "bg-white",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${url}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logindata),
      });
      const data = await response.json();
      setLoading(false);
      if (response.ok) {
        console.log("Login Successful:", data);
        if (data.userType === "employer" && isEmployee) {
          localStorage.setItem("userType", data.userType);
          toast.success("Login Successful", {
            style: {
              backgroundColor: "rgb(195, 232, 195)", // Sets background to green
              color: "black", // Sets text color to white
              fontWeight: "bold",
            },
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          try {
            const type = localStorage.getItem("userType");
            if (type === "user") {
              const result = await fetch(`${url}/employee/${email}`);
              const data = await result.json();
              localStorage.setItem("employee", JSON.stringify(data));
            } else if (type === "employer") {
              const result = await fetch(`${url}/employer/${email}`);
              const data = await result.json();
              localStorage.setItem("employer", JSON.stringify(data));
            }
          } catch (err) {
            console.log(err);
          }
          navigate("/dashboard");
        } else if (data.userType === "employee" && !isEmployee) {
          localStorage.setItem("userType", "user");
          toast.success("Login Successful", {
            style: {
              backgroundColor: "rgb(195, 232, 195)", // Sets background to green
              color: "black", // Sets text color to white
              fontWeight: "bold",
            },
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          try {
            const type = localStorage.getItem("userType");
            if (type === "user") {
              const result = await fetch(`${url}/employee/${email}`);
              const data = await result.json();
              localStorage.setItem("employee", JSON.stringify(data));
            } else if (type === "employer") {
              const result = await fetch(`${url}/employer/${email}`);
              const data = await result.json();
              localStorage.setItem("employer", JSON.stringify(data));
            }
          } catch (err) {
            console.log(err);
          }
          setLoading(false);
          navigate("/profile");
        } else {
          toast.error("Invlaid Credentials", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progressClassName: "bg-white",
          });
        }
      } else {
        toast.error("Invalid Credentials", {

          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progressClassName: "bg-white",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleRegisterClick = () => {
    navigate("/signup");
  };

  const handleGoogleAuth = async () => {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div>
      <Toaster />
      <section className="min-h-screen flex items-center justify-center bg-[#8DAFA8] bg-opacity-40">
        <div className="container max-w-4xl">
          <div className="flex flex-col lg:flex-row rounded-lg shadow-lg dark:bg-neutral-800">
            {/* Left column container */}
            <div
              className="lg:w-6/12 p-6 flex items-center justify-center"
              style={{ backgroundColor: "#fff7ef" }}
            >
              <div className="w-full">
                <div className="text-center">
                  <img className="mx-auto w-24" src={log2} alt="logo" />
                  <h6 className="mb-6 mt-4 text-xl font-semibold">Login</h6>
                </div>

                <form>
                  {/* Username input */}
                  <div className="mb-4">
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="  Enter your username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 ml-2"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="  Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full h-8 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-6 flex items-center">
                    <input
                      type="checkbox"
                      id="isEmployee"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      checked={isEmployee}
                      onChange={(e) => setIsEmployee(!isEmployee)}
                    />
                    <label
                      htmlFor="isEmployee"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      Is Employer?
                    </label>
                  </div>
                  <div className="mb-2 relative justify-center bg-white rounded-md items-center text-center text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    {loading ? (
                      <div className="z-60  w-full h-10 flex justify-center items-center cursor-not-allowed opacity-50">
                        <UniversalLoader />
                      </div>
                    ) : (
                      <button
                        className="inline-block w-full rounded-md  px-6 py-2.5 text-sm font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        onClick={handleLogIn}
                      >
                        Log in
                      </button>
                    )}
                  </div>

                  {/* 'or' text */}
                  <div className="mb-2 text-center">
                    <p className="text-sm text-gray-600">or</p>
                  </div>

                  {/* 'Sign up with Google' button */}
                  <div
                    className="mb-4 text-center relative"
                    onClick={handleGoogleAuth}
                  >
                    <button
                      className="inline-block w-full rounded-md bg-[#FFFFFF] px-6 py-2.5 text-sm font-medium text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      type="button"
                    >
                      Continue with Google
                    </button>
                    <img
                      src={Google}
                      alt="Google logo"
                      className="w-6 absolute h-6 left-20 top-2 inline-block ml-2"
                    />
                  </div>

                  {/* Forgot password */}
                  <div className="text-center">
                    <button
                      onClick={() => navigate("/forgetpass")}
                      className="text-sm text-blue-500 underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {/* Register button */}
                  <div className="mt-4 flex items-center justify-center">
                    <p className="mr-2 text-sm">Don't have an account?</p>
                    <button
                      type="button"
                      onClick={handleRegisterClick}
                      className="rounded-md border-2 border-[#000000] px-4 py-1 text-sm font-medium text-[#000000] transition hover:bg-neutral-500 hover:bg-opacity-10 hover:text-[#000000] focus:outline-none"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right column container with background, description, and no border */}
            <div
              className="flex items-center justify-center lg:w-6/12 p-0 order-2 lg:order-1"
              style={{ backgroundColor: "#fff7ef" }}
            >
              <img
                src={logpic}
                alt="Login illustration"
                className="w-full h-full object-contain rounded-l-lg lg:rounded-r-none"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
