import { GridRenderCellParams } from "@mui/x-data-grid";
import React from "react";
import { StatusPost } from "@/util/constants";

const {Approved, Process, Rejected} = StatusPost
export const StatusCell = (props: GridRenderCellParams<Date>) => {
  const { value } = props;

  const createStatus = () => {
    if (value === Approved) {
      return (
        <span className=" px-3 py-1 rounded-md bg-green-100 text-green-600 text-xs border-green-400 border border-solid">
          {Approved}
        </span>
      );
    } else if (value === Process) {
      return (
        <span className=" px-3 py-1 rounded-md bg-blue-100 text-blue-600 text-xs border-blue-400 border border-solid">
          {Process}
        </span>
      );
    } else {
      return (
        <span className=" px-3 py-1 rounded-md bg-red-100 text-red-600 text-xs border-red-400 border border-solid">
          {Rejected}
        </span>
      );
    }
  };
  return (
    <div className="flex text-center">
      {createStatus()}
    </div>
  );
};
