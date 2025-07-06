import { JSX } from "react";
import FormRegister from "@/app/components/auth/FormRegister";

const Register = (): JSX.Element => {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-gray-600 rounded-full -top-1/3 -left-1/3 opacity-30" />
            <div className="absolute w-[400px] h-[400px] bg-gray-700 rounded-full -top-1/4 -right-1/4 opacity-20" />
            <svg
                className="absolute h-[400px] -bottom-[18%] -right-1/5"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"
            >
                <path
                    fill="#364153"
                    fillOpacity="1"
                    d="M0,288L80,261.3C160,235,320,181,480,170.7C640,160,800,192,960,176C1120,160,1280,96,1360,64L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z" />
            </svg>
            <div className="card w-4/5 lg:w-[35%] bg-base-100 shadow-xl">
                <FormRegister />
            </div>
        </section>
    )
}

export default Register;