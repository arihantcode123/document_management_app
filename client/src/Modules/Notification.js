import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// toast.configure(); // Initialize the toast library

const Notification=(message,type) => {     
  if(type==="success")toast.success(message);
  else if(type==="error")toast.error(message);
  else if(type==="info")toast.info(message);
  else if(type==="warning")toast.warn(message);
};

export default Notification;
