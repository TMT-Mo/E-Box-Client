import React from "react";
import { DataGrid, GridColumnVisibilityModel } from "@mui/x-data-grid";
// import CustomPagination from "./pagination";
// import CustomNoRow from "components/CustomNoRow";
import { useLocation } from "react-router-dom";
import { LocationPath } from "@/util/constants";
import { useDispatch, useSelector } from "@/hooks";
import { onChangePostPage } from "@/slices/post";
import { Data } from "@/models/mui-data";
import CustomPagination from "@/components/Pagination";
import { postColumns } from "@/components/DataTable/columns";
import { PostManagementToolBar } from "@/components/DataTable/toolbar/post-management";
import { Container } from "@mui/material";

export interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id: string;
}

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { admin, general } = LocationPath;
  const { isGetPostListLoading, postList, total, currentPage, size } = useSelector(state => state.post)

  const rowHeight = 52

  const data = (): Data => {
    switch (pathname) {
      case admin.postManagement:
        return {
          columns: postColumns,
          loading: isGetPostListLoading,
          table: postList,
          currentPage,
          totalPages: Math.ceil(total! / size),
          onChangePage: (e, value) => {
            // eslint-disable-next-line no-debugger
            // debugger
            dispatch(onChangePostPage({ selectedPage: --value }));
          },
          toolbar: PostManagementToolBar,
        };
      default:
        return { table: [] };
    }
  };

  const getRowId = (params: GetRowIdParams) => {
    return params.id;
  };

  return (
    <>
    <DataGrid
        rows={data().table}
        columns={data().columns!}
        loading={data().loading}
        getRowId={getRowId}
        rowHeight={rowHeight}
        hideFooterPagination
        hideFooter
        slots={{
          toolbar: data().toolbar
        }}
        slotProps={{
          panel: {
            placement: "bottom-end",
          },
          columnsPanel: {
            sx: {
              "& .MuiDataGrid-panelFooter button:first-child": {
                display: "none",
              },
            },
          },
          filterPanel: {
            sx: {
              "& .MuiDataGrid-filterForm": {
                // scale: '80%',
                maxWidth: `${window.innerWidth < 720 ? "270px" : "500px"}`,
              },
              "& .MuiDataGrid-filterFormOperatorInput": {
                display: "flex",
                justifyContent: "center",
              },
            },
          },
        }}
        sx={{
          borderTop: "none",
          ".MuiDataGrid-columnHeaders": {
            borderTop: "1px solid #E0E0E0",
          },
          ".MuiDataGrid-virtualScroller":{
            height: rowHeight*size
          }
        }}
      />
      {data().table.length > 0 && (
        <CustomPagination
          currentPage={data().currentPage!}
          totalPages={data().totalPages!}
          onChangePage={data().onChangePage!}
        />
      )}</>
  );
};

export default DataTable;
