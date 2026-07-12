import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="flex bg-gray-100">

      <Sidebar />

      <div className="flex-1">

        <Navbar />

        <main className="p-10">

          {children}

        </main>

      </div>

    </div>
  );
};

export default Layout;