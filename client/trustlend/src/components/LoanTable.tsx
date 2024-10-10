

import * as React from "react"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ScrollArea, ScrollBar } from "./ui/scroll-area"
import { useQuery } from '@tanstack/react-query';
import { RequestLoan } from "./LatestLoans"
import { formatEther } from "ethers"

async function fetchLoanRequests() {
  const response = await fetch('/api/requestloans/allloans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch loan requests');
  }

  const data = await response.json();
  return data.requestLoans;
}


// const data: Payment[] = [
//     {
//       id: "0x1a2b3c4d",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 50,
//       borrowedAmount: 1000,
//       interestRate: 5,
//       duration: 12, // in months
//       collateralAmount: 100,
//       status: "Paid" 
//     },
//     {
//       id: "0x2b3c4d5e",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 60,
//       borrowedAmount: 2000,
//       interestRate: 4.5,
//       duration: 24,
//       collateralAmount: 100,
//       status:  "Pending"
//     },
//     {
//       id: "0x3c4d5e6f",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 55,
//       borrowedAmount: 1500,
//       interestRate: 5.2,
//       duration: 18,
//       collateralAmount: 100,
//       status: "Lend" 
//     },
//     {
//       id: "0x3c4d5e6fd",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 55,
//       borrowedAmount: 1500,
//       interestRate: 5.2,
//       duration: 18,
//       collateralAmount: 100,
//       status:  "Paid" 
//     },
//     {
//       id: "0x3c4d5e6fq",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 55,
//       borrowedAmount: 1500,
//       interestRate: 5.2,
//       duration: 18,
//       collateralAmount: 100,
//       status:  "Pending"
//     },
//     {
//       id: "0x3c4d5e6fe",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 55,
//       borrowedAmount: 1500,
//       interestRate: 5.2,
//       duration: 18,
//       collateralAmount: 100,
//       status:  "Paid" 
//     },
//     {
//       id: "0x3c4d5e6fr",
//       image: "https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80",
//       loanPercentage: 55,
//       borrowedAmount: 1500,
//       interestRate: 5.2,
//       duration: 18,
//       collateralAmount: 100,
//       status: "Lend" 
//     },
//     // Add more loans here...
//   ];
  

// export interface RequestLoan{
  
//   id : `0x${string}`;
//   reg__borrower: `0x${string}`;
//   reg__loanId: `0x${string}`;
//   reg__collateralAmount: string;
//   reg__borrowedAmount:string;
//   reg__interest: string;
//   reg__percentage: string;
//   blockNumber: string;
//   blockTimeStamp:string;
//   transactionHash: `0x${string}`;
  

  
// }
const handleAmountButtonClick = (payment: RequestLoan) => {
    alert(`Amount: ${payment.reg__borrowedAmount}`);
  };
  

export const columns: ColumnDef<RequestLoan>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value:any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value:any) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "reg__collateralAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Collateral Amount (link)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{Number(formatEther(BigInt(row.getValue("reg__collateralAmount")))).toFixed(5)}</div>,
  },
  {
    accessorKey: "reg__interest",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Interest (usdc)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{Number(formatEther(BigInt(row.getValue("reg__interest")))).toFixed(5)}</div>,
  },
  {
    accessorKey: "reg__percentage",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
         Percentage (%)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("reg__percentage")}</div>,
  },

  {
    accessorKey: "reg__borrowedAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Borrowed Amount (usdc)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{Number(formatEther(BigInt(row.getValue("reg__borrowedAmount")))).toFixed(5)}</div>,
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration (days)
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("duration")}</div>,
  },

  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      return (
        <div className="text-right font-medium">
          <Button className="bg-blue-400"  onClick={() => handleAmountButtonClick(row.original)}>
            Lend
          </Button>
        </div>
      );
    },
  },
  
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
           <Button>Liquidate</Button>
            <DropdownMenuSeparator />
            
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function LoanTable() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['requestLoansAll'],
    queryFn: fetchLoanRequests,
  });
  console.log("data is data",data)

  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <ScrollArea className="w-full h-72 whitespace-nowrap rounded-md border">
    <div >
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter loans..."
          value={(table.getColumn("borrowedAmount")?.getFilterValue() as string) ?? ""}
          onChange={(event: any) =>
            table.getColumn("borrowedAmount")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      <ScrollBar orientation="vertical" />
    </div>
  </ScrollArea>
  
  )
}
