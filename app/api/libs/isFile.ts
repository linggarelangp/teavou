export const isRealFile = (file: unknown): boolean => {
    return typeof file === "object" && file !== null && "arrayBuffer" in file && "type" in file && "size" in file;
};