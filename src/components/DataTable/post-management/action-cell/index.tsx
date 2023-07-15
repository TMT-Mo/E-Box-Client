import { IconButton } from "@mui/material";
import { TouchRippleActions } from "@mui/material/ButtonBase/TouchRipple";
import { GridRenderCellParams } from "@mui/x-data-grid";
import React, { useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "@/hooks";
import { PostManagementDialog } from "@/components/DataTable/post-management/dialog";
import { getPostDetail } from "@/slices/post";
import { IPost } from "@/models/post";

export const PostManagementActionCell = (props: GridRenderCellParams<Date>) => {
  const { hasFocus, row } = props;
  const buttonElement = React.useRef<HTMLButtonElement | null>(null);
  const rippleRef = React.useRef<TouchRippleActions | null>(null);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const {postDetail} = useSelector(state => state.post)

  React.useLayoutEffect(() => {
    if (hasFocus) {
      const input = buttonElement.current?.querySelector("input");
      input?.focus();
    } else if (rippleRef.current) {
      // Only available in @mui/material v5.4.1 or later
      rippleRef.current.stop();
    }
  }, [hasFocus]);

  const onOpenAccountDetail = () => {
    dispatch(getPostDetail({ post: row as unknown as IPost }));
    //   dispatch(getSignature({userId: (row as IUser).id})).unwrap()
    setIsOpen(true);
  };

  const handleToggleDialog = (event?: object, reason?: string) => {
    if (reason === "backdropClick") return;
    setIsOpen((prevState) => !prevState);
    //   accountDetail && dispatch(clearAccountDetail());
  };

  return (
    <div>
      <IconButton aria-label="delete" onClick={onOpenAccountDetail}>
        <BorderColorIcon fontSize="small" />
      </IconButton>
      {postDetail && <PostManagementDialog
        handleToggleDialog={handleToggleDialog}
        isOpen={isOpen}
      />}
    </div>
  );
};
