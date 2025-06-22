type ValidationError = {
    path: (string | number)[];
    message: string;
};

export interface ResponseData {
    status: number;
    message: string;
    data?: unknown;
    errors?: Record<ValidationError, string>;
};