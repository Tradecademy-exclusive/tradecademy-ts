/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import * as React from 'react'
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
} from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { CourseType, EnrollType } from '@/types'
import CalendarDropdown from './calendar-dropdown'

export function DataTableDemo({
  columns,
  data,
  courses,
}: {
  columns: ColumnDef<EnrollType>[]
  data: EnrollType[]
  courses: CourseType[]
}) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [dataCopy, setDataCopy] = React.useState<EnrollType[]>(data)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [course, setCourse] = React.useState<string>('')
  const [search, setSearch] = React.useState<string>('')
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  )

  const table = useReactTable({
    data: dataCopy,
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
    initialState: {
      pagination: {
        pageSize: 5,
      },
      sorting: [{ id: 'price', desc: false }],
    },
  })

  const filters = [
    {
      key: 'search',
      filterFn: (item: EnrollType) =>
        item.user.email.toLowerCase().includes(search.toLowerCase()),
    },
    {
      key: 'course',
      filterFn: (item: EnrollType) => item.course.title === course,
    },
    {
      key: 'date',
      filterFn: (item: EnrollType) => {
        if (!selectedDate) return true
        const itemDate = new Date(item.createdAt)

        const selectedDateWithoutTime = new Date(selectedDate)
        selectedDateWithoutTime.setHours(0, 0, 0, 0)

        itemDate.setHours(0, 0, 0, 0)

        return itemDate <= selectedDateWithoutTime
      },
    },
  ]

  React.useEffect(() => {
    let filteredData = data

    filters.forEach((filter) => {
      if (filter.key === 'search' && search) {
        filteredData = filteredData.filter(filter.filterFn)
      } else if (filter.key === 'course' && course) {
        filteredData = filteredData.filter(filter.filterFn)
      } else if (filter.key === 'date' && selectedDate) {
        filteredData = filteredData.filter(filter.filterFn)
      }
    })

    setDataCopy(filteredData)
  }, [search, course, selectedDate])

  return (
    <div className='w-full p-5'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          onChange={(event) => {
            const value = event.target.value.toLowerCase()
            setSearch(value)
          }}
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Course <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='center'>
            <div className='flex flex-col items-start w-full'>
              {courses.map((item) => (
                <DropdownMenuCheckboxItem
                  key={item.id}
                  className='w-full'
                  checked={course === item.title}
                  onClick={() => setCourse(item.title)}
                >
                  {item.title}
                </DropdownMenuCheckboxItem>
              ))}
              <DropdownMenuCheckboxItem
                className='w-full'
                checked={!course}
                onClick={() => {
                  setCourse('')
                }}
              >
                All
              </DropdownMenuCheckboxItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className='ml-5'>
          <CalendarDropdown
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='rounded-md border'>
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
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
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
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
