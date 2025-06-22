import * as bcrypt from 'bcrypt';

export const hashPassword = async (plainPassword: string): Promise<string> => {
    const saltRounds = 10;

    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(plainPassword, salt);
        return hash;
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(message);
    };
};

export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(message);
    };
};