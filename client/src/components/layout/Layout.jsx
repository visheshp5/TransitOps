import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "var(--bg)",
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main
          className="flex-1 p-8 overflow-auto"
          style={{
            background: "var(--bg)",
            color: "var(--text)",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;