import bcrypt from "bcrypt";

/**
 * Hashes a plain password using bcrypt.
 * 
 * @param plainPassword - The plain text password to hash.
 * @returns A promise that resolves to the hashed password.
 * @throws An error if hashing fails.
 */
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

/**
 * Compares a plain password with a hashed password.
 * 
 * @param plainPassword - The plain text password to compare.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to true if the passwords match, otherwise false.
 * @throws An error if comparison fails.
 */
export const comparePassword = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plainPassword, hashedPassword);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "An unknown error occurred";
        throw new Error(message);
    };
};