import Sidebar from "./sidebar";
import Header from "./header";
import Body from "./body";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <Body>asjhdfgas</Body>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
