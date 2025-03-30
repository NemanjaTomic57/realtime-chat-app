import toast from "react-hot-toast"

export const generalErrorToast = () => {
    return toast.error("Something unexpected happened. Please try again.")
}