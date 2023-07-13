import { IPost } from "@/models/post";
import { GridColDef, GridFilterModel } from "@mui/x-data-grid";

export interface Data {
    columns?: GridColDef[];
    loading?: boolean;
    table: IPost[];
    currentPage?: number;
    totalPages?: number;
    onChangePage?: (event: React.ChangeEvent<unknown>, page: number) => void;
    filterModel?: GridFilterModel,
    toolbar?: React.JSXElementConstructor<JSX.Element>
  }