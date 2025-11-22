/* eslint-disable react-hooks/rules-of-hooks */
import { Input } from "@/components/ui/input";
import { PenLine, PlusSquare, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteProduct, getAllProducts, type ProductType } from "@/api";
import { useAPIStore } from "@/context/APIContext";
import { useFormUpdater } from "@/context/useUpdateFormContext";
 
const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center space-x-1.5">
          <img
            className="w-6 rounded-sm h-6"
            src={item.images[0]}
            alt={item.name}
          />
          <h3 className="capitalize"> {item.name}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="default"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-3">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "prices",
    header: () => <div className="">Price</div>,
    cell: ({ row }) => {
      const prices = Array(row.getValue("prices"));
      const amount = parseFloat(
        prices[0].find((p: { size: string }) => p.size === "S")?.price as string
      );
      // Format the amount as a dollar amount
      console.log("prices: ", prices);

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;
      const { dispatch } = useAPIStore();
      const { setForm } = useFormUpdater();
      const navigate = useNavigate();
      const handleRemoveProduct = async () => {
        const res = await deleteProduct(product._id);
        dispatch({
          type: "DELETE_PRODUCT",
          payload: res.product as ProductType,
        });
        console.log("Remove product:", product._id);
      };
      const handleEditProduct = async () => {
        setForm({
          productName: product.name,
          brand: product.brand,
          description: product.description,
          category: product.category,
          rating: product.average_rating,
          images: product.images,
          prices: product.prices.map(p => ({
            size: p.size,
            price: p.price
          })),
        });
        navigate(`/edit/${product._id}`);
        console.log("Edit product:", product._id);
      };
      return (
        <div className=" transaction-all justify-end flex items-center space-x-1 5">
          <button
            onClick={handleEditProduct}
            className="border cursor-pointer group hover:border-blue-500 px-1 rounded-sm"
          >
            <PenLine className="w-4 group-hover:text-blue-500" />
          </button>
          {/* DELETE Dialect */}
          <AlertDialog>
            <AlertDialogTrigger>
              <button className="border cursor-pointer border-red-400 group hover:border-red-500 px-1 rounded-sm">
                <Trash className="w-4 text-red-400 group-hover:text-red-500" />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRemoveProduct}
                  className="cursor-pointer"
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
const HomeScreen = () => {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const {setForm} = useFormUpdater()
  const { state, dispatch } = useAPIStore();
  const products = state.products;
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getAllProducts();
      dispatch({ type: "SET_PRODUCTS", payload: data });
    };
    fetchProducts();
  }, [dispatch]);
  const table = useReactTable({
    data: products || [],
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
  });

  return (
    <div className="w-full h-full p-5">
      {/* search & cta btn */}
      <div className="flex items-center w-full justify-between py-5">
        <Input
          placeholder="Filter Products..."
          type="text"
          className="sm:w-md"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
        />
        {/* => create new product /new */}
        <Link
        onClick={() => {
            setForm({
          productName: "",
          brand: "",
          description: "",
          category: "",
          rating: "",
          images: [],
          prices: [
            { size: "S", price: "" },
            { size: "M", price: "" },
            { size: "L", price: "" },
          ],
        });
        }}
          to={"/new"}
          className="bg-blue-500 hover:opacity-90 rounded-md px-4 py-1 flex items-center space-x-1"
        >
          <PlusSquare className="w-4 text-white" />
          <h3 className="text-sm font-semibold text-white">Create</h3>
        </Link>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader className="bg-accent">
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-center space-x-2 py-4">
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
    </div>
  );
};

export default HomeScreen;
