import { toast } from "react-hot-toast";

export const useToast = () => {
	const success = (message, options = {}) => {
		toast.success(message, {
			duration: 3000,
			...options,
		});
	};

	const error = (message, options = {}) => {
		toast.error(message, {
			duration: 3000,
			...options,
		});
	};

	return {
		success,
		error,
	};
};
