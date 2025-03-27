import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faBell, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <header className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md">
      <h1 className="text-xl font-bold"></h1>

      <div className="flex items-center gap-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 bg-gray-800 rounded-full text-white focus:outline-none"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute right-3 top-3 text-gray-400"
          />
        </div>

        {/* Notifications */}
        <FontAwesomeIcon icon={faBell} className="text-xl cursor-pointer hover:text-yellow-500" />

        {/* User Profile */}
        <FontAwesomeIcon icon={faUserCircle} className="text-2xl cursor-pointer hover:text-blue-500" />
      </div>
    </header>
  );
};

export default Header;
