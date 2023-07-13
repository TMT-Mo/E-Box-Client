import { useDispatch, useSelector } from "@/hooks";
import { createPost } from "@/slices/post";
import {
  Typography,
  Autocomplete,
  Backdrop,
  CircularProgress,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import { LoadingButton } from "@mui/lab";

interface Props {
  handleToggleSubmitForm: () => void;
  isOpenPostForm: boolean
}

interface SubmitForm {
  title?: string;
  description?: string;
  category?: string;
  creator?: string;
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

const SubmitForm = (props: Props) => {
  const dispatch = useDispatch();
  const {
    isGetPostCategoryListLoading,
    categoryList,
    total,
    isCreatePostLoading,
  } = useSelector((state) => state.post);
  const { handleToggleSubmitForm, isOpenPostForm } = props;
  const [submitForm, setSubmitForm] = useState<SubmitForm>();
  const { userInfo } = useSelector((state) => state.user);

  const onSubmitPostHandler = async () => {
    await dispatch(
      createPost({ ...submitForm, creator: userInfo?.id })
    ).unwrap();
    setSubmitForm({ category: "", creator: "", description: "", title: "" });
    handleToggleSubmitForm();
  };
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpenPostForm}
      // onClick={handleOpenSubmitForm}
    >
      <Stack minWidth={500} bgcolor="#fff" borderRadius={5} p={5} spacing={3}>
        <Stack alignItems="end">
          <ClearIcon
            style={{ color: "#000" }}
            onClick={handleToggleSubmitForm}
          />
        </Stack>
        <Typography
          color="#000"
          textAlign="center"
          fontWeight={600}
          fontSize="1.5rem"
        >
          Create a post
        </Typography>
        <Stack spacing={1}>
          <Typography color="#000">Title:</Typography>
          <TextField
            value={submitForm?.title}
            onChange={(value) =>
              setSubmitForm((prevState) => ({
                ...prevState,
                title: value.target.value,
              }))
            }
          />
        </Stack>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Typography color="#000">Category:</Typography>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            sx={{ width: 300 }}
            loading={isGetPostCategoryListLoading}
            options={categoryList}
            onChange={(e, value) =>
              setSubmitForm((prevState) => ({
                ...prevState,
                category: value?.id,
              }))
            }
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {isGetPostCategoryListLoading ? (
                        <CircularProgress color="primary" size={20} />
                      ) : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
              />
            )}
          />
        </Stack>

        <Stack spacing={1}>
          <Typography color="#000">Description:</Typography>
          <TextField
            rows={3}
            multiline
            value={submitForm?.description}
            onChange={(value) =>
              setSubmitForm((prevState) => ({
                ...prevState,
                description: value.target.value,
              }))
            }
          />
        </Stack>
        <CustomButton
          onClick={onSubmitPostHandler}
          loading={isCreatePostLoading}
        >
          Submit
        </CustomButton>
      </Stack>
    </Backdrop>
  );
};

export default SubmitForm;
