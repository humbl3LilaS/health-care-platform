"use client"

import {
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table";
import {DataColumn} from "@/types";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";

interface DataTableProps<TData> {
    columns: DataColumn<TData>
    data: TData[]
}


function DataTable<TData>({data, columns}: DataTableProps<TData>) {

    const [pagination, setPagination] = useState<PaginationState>(
        {
            pageIndex: 0,
            pageSize: 5
        })

    const table = useReactTable(
        {
            data,
            columns,
            getCoreRowModel: getCoreRowModel(),
            getPaginationRowModel: getPaginationRowModel(),
            onPaginationChange: setPagination,
            state: {
                pagination
            }
        }
    )

    return <div className={"data-table"}>
        <Table className={"shad-table"}>
            <TableHeader className={"bg-dark-200"}>
                {
                    table.getHeaderGroups().map((headerGroup) =>
                                                    <TableRow key={headerGroup.id} className={"shad-table-row-header"}>
                                                        {headerGroup.headers.map((header) => {
                                                            return <TableHead key={header.id}>
                                                                {header.isPlaceholder ? null
                                                                                      : flexRender(
                                                                        header.column.columnDef.header,
                                                                        header.getContext()
                                                                    )}
                                                            </TableHead>
                                                        })}
                                                    </TableRow>
                    )
                }
            </TableHeader>
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={"shad-table-row"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                ) : (
                     <TableRow>
                         <TableCell colSpan={columns.length} className="h-24 text-center">
                             No results.
                         </TableCell>
                     </TableRow>
                 )}
            </TableBody>


        </Table>
        <div className={"p-4 flex items-center justify-between"}>
            <Button
                className="shad-gray-btn"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                <ArrowLeft/> <span>Previous</span>
            </Button>
            <Button
                className="shad-gray-btn"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                <span>Next</span> <ArrowRight/>
            </Button>
        </div>

    </div>
}

export default DataTable;