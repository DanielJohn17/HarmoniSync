import { FaRegCheckCircle } from "react-icons/fa";
import "./Notify.css";

const Notify = ({ message, isVisible }) => {
  console.log("Notification: " + message);
  return (
    <div className={`notification-sider ${isVisible ? "visible" : ""}`}>
      <div className="flex align-center justify-center gap-1">
        <FaRegCheckCircle className="text-green-600" />
        {message}
      </div>
    </div>
  );
};

export default Notify;
