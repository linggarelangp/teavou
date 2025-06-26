import { JSX } from "react";
import FormLogin from "@/app/components/login/FormLogin";


const Login = (): JSX.Element => {
    return (
        <section className="w-full h-screen flex justify-center items-center">
            <div className="card w-96 h-auto bg-base-100 card-md shadow-lg">
                <FormLogin />
            </div>
        </section>
    )
}

export default Login