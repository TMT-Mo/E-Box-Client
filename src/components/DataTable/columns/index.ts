import { GridColDef } from "@mui/x-data-grid";

export const postColumns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      headerAlign: "center",
      
      align: "center",
    },
    {
      field: 'description',
      headerName: "Description",
      flex: 1,
      minWidth: 200,
      filterable: false,
      hideable: false,
    },
    
    {
      field: 'status',
      headerName: "Status",
      sortable: false,
    },
    {
      field: 'category',
      headerName: "Category",
      align: "center",
      headerAlign: 'center',
      flex: .5,
      sortable: false,
    },
    {
      field: 'creator',
      headerName: "Creator",
      flex: 0.5,
      sortable: false,
    },
    {
      field: 'action',
      headerName: "Action",
      filterable: false,
      sortable: false,
      hideable: false,
      align: "center",
      headerAlign: "center",
    },
  ];