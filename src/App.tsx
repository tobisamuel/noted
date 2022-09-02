import { Routes, Route } from "react-router-dom";
import {
  Home,
  LoginPage,
  NotesPage,
  NotFound,
  ProfilePage,
  SignUpPage,
} from "./pages";
import RequireAuth from "./components/requireAuth";
import ProfileForm from "./components/profileForm";
import PasswordForm from "./components/passwordForm";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<SignUpPage />} />

      <Route element={<RequireAuth />}>
        <Route path="notes" element={<NotesPage />} />
        <Route path="account" element={<ProfilePage />}>
          <Route path="profile" element={<ProfileForm />} />
          <Route path="password" element={<PasswordForm />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
