import React, { JSX } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface TablePaginationProps {
    currentPage: number;
    totalPages: number;
    onPrev: () => void;
    onNext: () => void;
}

const TablePagination = ({ currentPage, totalPages, onPrev, onNext }: TablePaginationProps): JSX.Element | null => {
    if (totalPages <= 1) return null;
    return (
        <div className="w-full flex justify-end my-2">
            <div className="w-64 join">
                <button
                    onClick={onPrev}
                    disabled={currentPage === 1}
                    className="join-item btn"
                >
                    <IoIosArrowBack className="text-lg" />
                </button>

                <div className="w-32 join-item btn">{`Page ${currentPage} of ${totalPages}`}</div>

                <button
                    onClick={onNext}
                    disabled={currentPage === totalPages}
                    className="join-item btn"
                >
                    <IoIosArrowForward className="text-lg" />
                </button>
            </div>
        </div>
    );
};

export default TablePagination;