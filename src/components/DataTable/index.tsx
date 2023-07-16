import React from "react";
import { DataGrid, GridFilterModel } from "@mui/x-data-grid";
import { useLocation } from "react-router-dom";
import { DataTableHeader, LocationPath } from "@/util/constants";
import { useDispatch, useSelector } from "@/hooks";
import { onChangePostPage } from "@/slices/post";
import { Data } from "@/models/mui-data";
import CustomPagination from "@/components/Pagination";
import { accountColumns, postColumns } from "@/components/DataTable/columns";
import { PostManagementToolBar } from "@/components/DataTable/post-management/toolbar";
import { setFilter } from "@/slices/filter";
import { onChangeUserPage } from "@/slices/user";

export interface GetRowIdParams {
  // The data item provided to the grid for the row in question
  id: string;
}

const DataTable: React.FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { admin, general } = LocationPath;
  const post = useSelector((state) => state.post);

  const { isGetPostListLoading, postList } = post;
  const user = useSelector((state) => state.user);

  const { isGetUserListLoading, userList } = user;
  const rowHeight = 52;

  const onFilterChange = React.useCallback(
    (filterModel: GridFilterModel) => {
      // Here you save the data you need from the filter model

      const { value, field } = filterModel.items[0];
      if (!value) {
        dispatch(setFilter(undefined));
        return;
      }
      // dispatch(clearTemplatePagination());
      // dispatch(clearDocumentPagination());
      // dispatch(clearAccountPagination());
      dispatch(setFilter({ field: field as DataTableHeader, value }));
    },
    [dispatch]
  );

  const data = (): Data => {
    switch (pathname) {
      case admin.postManagement:
        return {
          columns: postColumns,
          loading: isGetPostListLoading,
          table: postList,
          currentPage: post.currentPage,
          totalPages: Math.ceil(post.total! / post.size),
          onChangePage: (e, value) => {
            // eslint-disable-next-line no-debugger
            // debugger
            dispatch(onChangePostPage({ selectedPage: --value }));
          },
          toolbar: PostManagementToolBar,
        };
      case admin.account:
        return {
          columns: accountColumns,
          loading: isGetUserListLoading,
          table: userList,
          currentPage: user.currentPage,
          totalPages: Math.ceil(user.total! / user.size),
          onChangePage: (e, value) => {
            // eslint-disable-next-line no-debugger
            // debugger
            dispatch(onChangeUserPage({ selectedPage: --value }));
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
        onFilterModelChange={onFilterChange}
        filterMode="server"
        hideFooterPagination
        hideFooter
        slots={{
          toolbar: data().toolbar,
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
          ".MuiDataGrid-virtualScroller": {
            height: rowHeight * 5,
          },
        }}
      />
      {data().table.length > 0 && (
        <CustomPagination
          currentPage={data().currentPage!}
          totalPages={data().totalPages!}
          onChangePage={data().onChangePage!}
        />
      )}
    </>
  );
};

export default DataTable;
