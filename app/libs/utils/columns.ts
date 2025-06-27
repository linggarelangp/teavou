import { Product, User } from "@/app/types"
import { Column } from "@/app/types/table"

export const UserColumn: Column<User>[] = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" }
]

export const ProductColumn: Column<Product>[] = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Price", accessor: "price" },
    { header: "Stock", accessor: "stock" },
    { header: "Image", accessor: "path" },
]
