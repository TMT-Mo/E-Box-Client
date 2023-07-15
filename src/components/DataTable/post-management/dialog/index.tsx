import {
  Dialog,
  DialogContent,
  Box,
  Stack,
  Typography,
  IconButton,
  DialogActions,
  Switch,
  TextField,
  styled,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { useDispatch, useSelector } from "@/hooks";
import { LoadingButton } from "@mui/lab";
import { approvePost } from "@/slices/post";
import { ApprovePostArgs } from "@/models/post";
import { StatusPost } from "@/util/constants";

interface Props {
  isOpen: boolean;
  handleToggleDialog: () => void;
}

const CustomButton = styled(
  LoadingButton,
  {}
)({
  background: "rgb(63 128 255)",
  borderRadius: "6px",
  textTransform: "none",
  color: "white",
  fontWeight: "bold",
  ":hover": {
    background: "rgb(29 78 216)",
  },
});

export const PostManagementDialog = (props: Props) => {
  const { isOpen, handleToggleDialog } = props;
  const { postDetail, isApprovePostLoading } = useSelector(
    (state) => state.post
  );
  const { category, description, title, creator, id, approver, feedback, status } =
    postDetail!;
  const [isAccepting, setIsAccepting] = useState<boolean>(true);
  const { userInfo } = useSelector((state) => state.user);
  const { Approved, Rejected } = StatusPost;
  const [approvePostArgs, setApprovePostArgs] = useState<ApprovePostArgs>({
    approver: userInfo!.id,
    id,
    feedback: feedback ?? "",
    status: isAccepting ? Approved : Rejected,
  });
  const dispatch = useDispatch();

  const approvePostHandler = async () => {
    await dispatch(approvePost(approvePostArgs)).unwrap();
  };

  return (
    <Dialog open={isOpen} onClose={handleToggleDialog}>
      <DialogContent>
        <Box minWidth="500px">
          <Stack spacing={3}>
            <Stack direction="row" justifyContent="end">
              <IconButton onClick={handleToggleDialog}>
                <CloseIcon />
              </IconButton>
            </Stack>
            <Typography fontSize="1.5rem" textAlign="center" fontWeight={700}>
              Verifying Post
            </Typography>
            <Stack>
              <Typography fontSize="1rem" fontWeight={600}>
                Title
              </Typography>
              <Typography fontSize="1rem">{title}</Typography>
            </Stack>
            <Stack>
              <Typography fontSize="1rem" fontWeight={600}>
                Category
              </Typography>
              <Typography fontSize="1rem">{category.name}</Typography>
            </Stack>
            <Stack>
              <Typography fontSize="1rem" fontWeight={600}>
                Description
              </Typography>
              <Typography fontSize="1rem">{description}</Typography>
            </Stack>
            <Stack>
              <Typography fontSize="1rem" fontWeight={600}>
                Creator
              </Typography>
              <Typography fontSize="1rem">{creator.username}</Typography>
            </Stack>
            {approver && (
              <Stack>
                <Typography fontSize="1rem" fontWeight={600}>
                  Approver
                </Typography>
                <Typography fontSize="1rem">{approver?.username}</Typography>
              </Stack>
            )}
            <div className="flex items-center">
              <Switch
                checked={isAccepting}
                onClick={() => setIsAccepting((prevState) => !prevState)}
                sx={{
                  "&	.MuiSwitch-track": {
                    backgroundColor: "#ff5252",
                  },
                  "& .MuiSwitch-thumb": {
                    backgroundColor: `${!isAccepting && "#ff5252"}`,
                  },
                }}
              />
              <h4>{isAccepting ? "Approve" : "Reject"}</h4>
            </div>
            <TextField
              multiline
              rows={3}
              // disabled={isAccepting}
              placeholder="Give feedback..."
              onChange={(e) =>
                setApprovePostArgs((prevState) => ({
                  ...prevState,
                  feedback: e.target.value,
                }))
              }
            />
            {status === StatusPost.Process && <CustomButton
              onClick={approvePostHandler}
              loading={isApprovePostLoading}
            >
              Submit
            </CustomButton>}
          </Stack>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};
