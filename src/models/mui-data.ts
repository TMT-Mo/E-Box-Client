import { IPost } from "@/models/post";
import { IUser } from "@/models/user";
import { DataTableHeader } from "@/util/constants";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";

export interface Data {
  columns?: GridColDef[];
  loading?: boolean;
  table: IPost[] | IUser[];
  currentPage?: number;
  totalPages?: number;
  onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
  filterModel?: GridFilterModel;
  toolbar?: React.JSXElementConstructor<JSX.Element>;
}

export interface DateFilter{
  startDate?: string,
  endDate?: string
}
export interface FilterModel {
  value: number | string | boolean | DateFilter;
  field: DataTableHeader;
}

type Sort = "asc" | "desc";

export interface SorterModel {
  field: DataTableHeader;
  sort: Sort;
}
