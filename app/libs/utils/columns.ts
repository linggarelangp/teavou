import { IUser, Product } from "@/app/types"
import { Column } from "@/app/types/table"

export const UserColumn: Column<IUser>[] = [
    { header: "Name", accessor: "name" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" }
]

export const ProductColumn: Column<Product>[] = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Price", accessor: "price" },
    { header: "Stock", accessor: "stock" },
    { header: "Image", accessor: "path" },
]
