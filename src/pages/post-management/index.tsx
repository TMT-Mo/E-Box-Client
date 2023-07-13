import DataTable from "@/components/DataTable";
import { useDispatch, useSelector } from "@/hooks";
import { clearPost, getPostList } from "@/slices/post";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

const PostManagement = () => {
  const dispatch = useDispatch();
  const { currentPage, size } = useSelector((state) => state.post);

  useEffect(() => {
    const getPostListHandler = () =>
      dispatch(getPostList({ currentPage, size }));
    getPostListHandler().unwrap();

    // return () => {
    //   getPostListHandler().abort();
    //   dispatch(clearPost());
    // };
  }, [currentPage, dispatch, size]);

  useEffect(() => {
    return () => {
      dispatch(clearPost());
    };
  }, [dispatch]);

  return (
    <Stack marginTop={10} spacing={5} >
      <Typography fontWeight={600} variant="h5">Await Signing</Typography>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </Stack>
  );
};

export default PostManagement;
