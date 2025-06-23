import { z } from "zod";

export const validateImageFile = (file: File, ctx: z.RefinementCtx) => {
    if (!file.type.startsWith("image/")) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "File must be an image" });
    } else if (file.size > 5 * 1024 * 1024) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Image size exceeds 5MB limit" });
    }
};

export const validateImageFileUpdate = (file: File | null | undefined, ctx: z.RefinementCtx) => {
    if (file && file instanceof File) {
        if (!file.type.startsWith("image/")) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "File must be an image" });
        } else if (file.size > 5 * 1024 * 1024) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Image size exceeds 5MB limit" });
        }
    }
}
