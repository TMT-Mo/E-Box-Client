import { useSelector } from "@/hooks";
import { DataTableHeader, StatusPost } from "@/util/constants";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
  } from "@mui/material";
  import {
    GridFilterOperator,
    GridFilterItem,
    GridFilterInputValueProps,
  } from "@mui/x-data-grid";
  import React from 'react'
  
  interface Items {
    value: StatusPost;
    label: string;
  }
  const { Approved, Process, Rejected } = StatusPost;
  const items: Items[] = [
    { value: Process, label: Process },
    { value: Approved, label: Approved },
    { value: Rejected, label: Rejected },
  ];
  
  const { STATUS } = DataTableHeader;
  const SelectStatus = (props: GridFilterInputValueProps) => {
    const { applyValue, item } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { filter} = useSelector((state) => state.filter);
  
    const handleChange = (e: SelectChangeEvent) => {
      applyValue({
        ...item,
        value: e.target.value,
        field: STATUS,
      });
    };
  
    return (
      <FormControl variant="standard" sx={{ minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">
          Filter value
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          label="Age"
          value={filter?.value as string}
          onChange={handleChange}
        >
          {items.map((item, index) => (
            <MenuItem value={item.value} key={index}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };
  
  export const statusOnlyOperators: GridFilterOperator[] = [
    {
      label: "equal",
      value: "equal",
      getApplyFilterFn: (filterItem: GridFilterItem) => {
        return filterItem.value;
      },
      InputComponent: SelectStatus,
    },
  ];
  