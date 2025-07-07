"use client";

import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
    }, [router]);
};

export default Logout;