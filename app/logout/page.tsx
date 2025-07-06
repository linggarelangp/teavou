"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Swal from "sweetalert2";

const Logout = (): void => {
    const router = useRouter();

    useEffect(() => {
        const logout = async () => {
            await fetch("/api/auth/logout", { method: "POST" });

            return Swal.fire({
                title: "Logout Successful",
                text: "You have been logged out successfully.",
                icon: "success",
                confirmButtonText: "OK",
                allowOutsideClick: false,
            }).then((value) => {
                if (value.isConfirmed) {
                    router.replace("/");
                }
            });
        };

        logout();
    }, []);
};

export default Logout;