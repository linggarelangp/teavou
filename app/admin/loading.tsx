import { JSX } from "react";

const Loading = (): JSX.Element => {
    return (
        <div className="w-full h-screen fixed inset-0 flex items-center justify-center bg-white z-50">
            <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    );
};

export default Loading;