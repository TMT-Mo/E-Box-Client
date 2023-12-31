import DataTable from "@/components/DataTable";
import { useDispatch, useSelector } from "@/hooks";
import { clearPost, getPostList } from "@/slices/post";
import { DataTableHeader, StatusPost } from "@/util/constants";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

const PostManagement = () => {
  const dispatch = useDispatch();
  const { STATUS } = DataTableHeader;
  const { currentPage, size, searchItemValue } = useSelector(
    (state) => state.post
  );
  const { filter } = useSelector((state) => state.filter);
  useEffect(() => {
    const getPostListHandler = () =>
      dispatch(
        getPostList({
          currentPage,
          size,
          status:
            filter?.field === STATUS
              ? (filter?.value as StatusPost)
              : undefined,
          title: searchItemValue,
        })
      );
    getPostListHandler().unwrap();

    // return () => {
    //   getPostListHandler().abort();
    //   dispatch(clearPost());
    // };
  }, [
    STATUS,
    currentPage,
    dispatch,
    filter?.field,
    filter?.value,
    searchItemValue,
    size,
  ]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);

  return (
    <Stack marginTop={10} spacing={5}>
      <Typography fontWeight={600} variant="h5">
        Post Management
      </Typography>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </Stack>
  );
};

export default PostManagement;
