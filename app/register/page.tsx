import { JSX } from "react";

import { WaveIcon } from "@/app/components/Icon";
import { FormRegister } from "@/app/components/Form";

const Register = (): JSX.Element => {
    return (
        <section className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
            <div className="absolute w-[600px] h-[600px] bg-gray-600 rounded-full -top-1/3 -left-1/3 opacity-30" />
            <div className="absolute w-[400px] h-[400px] bg-gray-700 rounded-full -top-1/4 -right-1/4 opacity-20" />

            <WaveIcon />

            <div className="card w-4/5 lg:w-[35%] bg-base-100 shadow-xl">
                <FormRegister />
            </div>
        </section>
    )
}

export default Register;