import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../redux/slices/auth";
import "easymde/dist/easymde.min.css";
import axios from "../../axios";
import { URL_BACK_END } from "../../config.js";
import TextField from "@mui/material/TextField";
import { CardMedia, Paper, Button, Stack } from "@mui/material";

export const AddPost = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [preview, setPreview] = React.useState(null);
  const inputFileRef = React.useRef(null);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (id) {
      axios.get(`/post/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags.join(", "));
        setImageUrl(data.imageUrl);
      });
    }
  }, []);

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || !e.target.files.length) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
    setImageUrl("");
    e.target.value = null;
  };

  const onClickRemoveImage = () => {
    setSelectedFile(null);
    setImageUrl("");
  };

  // for SimpleMDE
  const onChange = React.useCallback(async (value) => {
    setText(value);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Enter text...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );
  //

  const onSubmit = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("tags", tags);
    formData.append("text", text);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    formData.append("imageUrl", imageUrl);
    try {
      const { data } = isEdit
        ? await axios.patch(`/post/${id}`, formData)
        : await axios.post("/post", formData);
      const _id = isEdit ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert(error.massage);
    }
  };

  if (!isAuth) {
    return <Navigate to={"/"} />;
  }
  return (
    <Paper elevation={0} style={{ padding: 30 }}>
      <Button
        onClick={() => inputFileRef.current.click()}
        variant="outlined"
        size="large"
      >
        Download preview
      </Button>
      <input
        ref={inputFileRef}
        type="file"
        onChange={onSelectFile}
        hidden
        accept=".png, .jpg, .jpeg"
      />
      {(selectedFile || imageUrl) && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <CardMedia
            component="img"
            height="100%"
            src={
              preview ? preview : imageUrl && `${URL_BACK_END}/api${imageUrl}`
            }
            alt="Uploaded"
          />
        </>
      )}
      <Stack sx={{ pt: 3 }} spacing={3}>
        <TextField
          variant="standard"
          placeholder="Title of the article..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
        />
        <TextField
          variant="standard"
          placeholder="Tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          fullWidth
        />
        <SimpleMDE value={text} onChange={onChange} options={options} />
        <Stack direction="row" spacing={3}>
          <Button onClick={onSubmit} size="large" variant="contained">
            {isEdit ? "Edit" : "Publish"}
          </Button>
          <Link
            to="/"
            style={{
              textDecoration: "none",
            }}
          >
            <Button size="large">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
};
