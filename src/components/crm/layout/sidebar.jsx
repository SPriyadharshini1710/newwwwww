import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faUsers, faCog, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-5">
      <h2 className="text-lg text-white font-bold mb-6 bg-warning">SoCial Media</h2>

      <ul className="space-y-4">
        <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faHome} />
          Dashboard
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faChartLine} />
          Reports
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faUsers} />
          Clients
        </li>

        <li className="flex items-center gap-3 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faCog} />
          Settings
        </li>

        <li className="flex items-center gap-3 text-red-500 cursor-pointer hover:bg-gray-700 p-2 rounded">
          <FontAwesomeIcon icon={faSignOutAlt} />
          Logout
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
