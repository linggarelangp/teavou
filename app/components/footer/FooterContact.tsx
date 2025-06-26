import Image from "next/image";
import { JSX } from "react";

const FooterContact = (): JSX.Element => {
    return (
        <div className="w-1/2 lg:w-1/4 text-gray-300 flex flex-col mb-4 lg:mb-0">
            <h4 className="text-2xl pb-2 lg:pb-5">Contact</h4>
            <div className="space-y-2 font-extralight mb-2">
                <p className="font-extralight">Address: Jl. Ring Road Utara, Ngringin, Condongcatur, Kec. Depok, Kabupaten Sleman, Daerah Istimewa
                    Yogyakarta 55281</p>
                <p className="font-extralight">Email: kevinirawan91@gmail.com</p>
                <p className="font-extralight">Phone: +62 813 4882 6269</p>
            </div>

            <p className="font-extralight mb-3">Payment Accepted</p>
            <Image
                src="/img/payment.png"
                alt="Payment Methods"
                width={200}
                height={200}
            />
        </div>
    );
};

export default FooterContact;