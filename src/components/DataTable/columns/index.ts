import { PostManagementActionCell } from "@/components/DataTable/post-management/action-cell";
import { statusOnlyOperators } from "@/components/DataTable/post-management/filter/status";
import { StatusCell } from "@/components/DataTable/post-management/status-cell";
import { GridColDef } from "@mui/x-data-grid";

export const postColumns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    headerAlign: "center",
    filterable: false,
    align: "center",
  },
  {
    field: "description",
    headerName: "Description",
    flex: 1,
    minWidth: 200,
    filterable: false,
    hideable: false,
  },

  {
    field: "status",
    headerName: "Status",
    sortable: false,
    renderCell: StatusCell,
    filterOperators: statusOnlyOperators,
  },
  // {
  //   field: "category[name]",
  //   headerName: "Category",
  //   align: "center",
  //   headerAlign: "center",
  //   flex: 0.5,
  //   sortable: false,
  //   filterable: false,
  // },
  // {
  //   field: "creator",
  //   headerName: "Creator",
  //   flex: 0.5,
  //   sortable: false,
  //   filterable: false,
  // },
  {
    field: "action",
    headerName: "Action",
    filterable: false,
    sortable: false,
    hideable: false,
    align: "center",
    headerAlign: "center",
    renderCell: PostManagementActionCell,
  },
];

export const accountColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    headerAlign: "center",
    filterable: false,
    minWidth: 200,
    align: "center",
  },
  {
    field: "username",
    headerName: "Username",
    flex: 1,
    minWidth: 200,
    filterable: false,
    hideable: false,
  },

  {
    field: "status",
    headerName: "Status",
    sortable: false,
    renderCell: StatusCell,
    filterOperators: statusOnlyOperators,
  },
  // {
  //   field: "category[name]",
  //   headerName: "Category",
  //   align: "center",
  //   headerAlign: "center",
  //   flex: 0.5,
  //   sortable: false,
  //   filterable: false,
  // },
  // {
  //   field: "creator",
  //   headerName: "Creator",
  //   flex: 0.5,
  //   sortable: false,
  //   filterable: false,
  // },
  {
    field: "action",
    headerName: "Action",
    filterable: false,
    sortable: false,
    hideable: false,
    align: "center",
    headerAlign: "center",
    // renderCell: PostManagementActionCell,
  },
];
