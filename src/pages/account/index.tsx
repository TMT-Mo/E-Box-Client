import DataTable from "@/components/DataTable";
import { useDispatch, useSelector } from "@/hooks";
import { getUserList } from "@/slices/user";
import { Stack, Typography } from "@mui/material";
import React, { useEffect } from "react";

const AccountManagement = () => {
  const dispatch = useDispatch();
  const { currentPage, size, searchItemValue } = useSelector(
    (state) => state.user
  );
  const { filter } = useSelector((state) => state.filter);
  useEffect(() => {
    const getUserListHandler = () =>
      dispatch(
        getUserList({
          currentPage,
          size,
        })
      );
    getUserListHandler().unwrap();

    // return () => {
    //   getPostListHandler().abort();
    //   dispatch(clearPost());
    // };
  }, [
    currentPage,
    dispatch,
    filter?.field,
    filter?.value,
    searchItemValue,
    size,
  ]);

  useEffect(() => {
    return () => {
    //   dispatch(clearPost());
    };
  }, [dispatch]);

  return (
    <Stack marginTop={10} spacing={5}>
      <Typography fontWeight={600} variant="h5">
        Account Management
      </Typography>
      <div className="flex flex-col rounded-md border border-gray-400 bg-white">
        <DataTable />
      </div>
    </Stack>
  );
};

export default AccountManagement;
