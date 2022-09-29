import { NavLink, Outlet } from "react-router-dom";
import Layout from "../components/layout";

const navigation = [
  { name: "My Profile", href: "profile" },
  { name: "Password", href: "password" },
];

export const ProfilePage = () => {
  return (
    <Layout>
      <section>
        <div className="w-screen mx-auto lg:w-[1024px]">
          <div className="flex justify-start items-center p-4 space-x-4 bg-zinc-500 text-white lg:hidden">
            {/* Mobile Nav  */}
            {navigation.map((item, i) => (
              <div key={i}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    isActive ? " font-semibold text-white rounded-md" : ""
                  }
                >
                  {item.name}
                </NavLink>
              </div>
            ))}
          </div>

          {/* Side Nav */}
          <div className="w-full mt-8 flex lg:h-[70vh]">
            <div className="hidden w-1/4 lg:block">
              <ul>
                {navigation.map((item, i) => (
                  <li className="text-zinc-500 pb-4" key={i}>
                    <NavLink
                      to={item.href}
                      className={({ isActive }) =>
                        isActive
                          ? "font-semibold text-zinc-500 transition-all duration-100"
                          : ""
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
                <li className="w-9/12 border-t border-gray-200"></li>
                <li className="pt-2 text-red-600">Delete Account</li>
              </ul>
            </div>

            <div className="w-screen px-4 lg:px-0 lg:w-3/4 lg:ml-4">
              <Outlet />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};
