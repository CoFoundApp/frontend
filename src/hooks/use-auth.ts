import useUserStore from "@/stores/useUserStore"
import { redirect } from "next/navigation";
import { useEffect } from "react";

const useAuth = (requireAuth = true) => {
    const user = useUserStore(state => state.user);

    useEffect(() => {
        if (requireAuth && !user) {
            redirect('/login');
        } else if (!requireAuth && user) {
            redirect('/dashboard');
        }
    }, [user, requireAuth]);
};

export default useAuth;