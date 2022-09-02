import { Link } from "react-router-dom";
import SignupForm from "../components/signupForm";
import Logo from "../components/logo";

export const SignUpPage = () => {
  return (
    <div className="min-h-screen w-screen flex">
      <div className="w-full md:w-[27rem]">
        <div className="h-full py-10 px-5">
          <div>
            <Link to="/">
              <Logo />
            </Link>
          </div>

          <h2 className="mt-4 text-2xl text-zinc-600 font-normal">
            Create your Noted account
          </h2>

          <SignupForm />

          <h3 className="mt-3">
            Already have an account?{" "}
            <b className="font-semibold text-zinc-700">
              <Link to="/login">Login</Link>
            </b>
          </h3>
        </div>
      </div>

      <div className="hidden bg-zinc-600 md:flex justify-center items-center p-4 md:w-[calc(100vw-27rem)]">
        <h1 className="text-4xl font-semibold text-white">
          A short pen is better than a long memory. Write a note.
        </h1>
      </div>
    </div>
  );
};
