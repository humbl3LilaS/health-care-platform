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

interface DataTableProps<TData> {
    columns: DataColumn<TData>
    data: TData[]
}


//export const columns: ((AccessorKeyColumnDefBase<Appointment, Patient> & Partial<IdIdentifier<Appointment, Patient>>) | (AccessorKeyColumnDefBase<...> & Partial<...>) | (AccessorKeyColumnDefBase<...> & Partial<...>))[]

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

    return <div>
        <Table>
            <TableHeader>
                {
                    table.getHeaderGroups().map((headerGroup) =>
                                                    <TableRow key={headerGroup.id}>
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
        <div className={"flex items-center justify-between"}>
            <button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                {'<'}
            </button>
            <button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                {'>'}
            </button>
        </div>

    </div>
}

export default DataTable;