import { toast } from 'react-toastify';

const useNotification = () => {
  const showNotification = (message: string) => {
    toast(message, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return { showNotification };
};

export default useNotification;