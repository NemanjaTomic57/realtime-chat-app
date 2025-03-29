import toast from "react-hot-toast"

export const generalErrorToast = () => {
    return toast.loading("Something unexpected happened. Please try again.")
}