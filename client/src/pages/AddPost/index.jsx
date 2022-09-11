import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { selectIsAuth } from "../../redux/slices/auth";
import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../axios";

export const AddPost = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const isAuth = useSelector(selectIsAuth);
  const [text, setText] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [tags, setTags] = React.useState([]);
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
        setTags(data.tags.join(","));
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

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const saveImage = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("image", selectedFile);
      try {
        const { data } = await axios.post("/uploads", formData);
        return data.url;
      } catch (error) {
        console.warn(error);
        alert("Error!!!");
      }
    }
    if (imageUrl) {
      return imageUrl;
    }
    return "";
  };

  const onSubmit = async () => {
    const imagePass = await saveImage();
    try {
      const fields = {
        title,
        tags,
        text,
        imageUrl: imagePass,
      };
      const { data } = isEdit
        ? await axios.patch(`/post/${id}`, fields)
        : await axios.post("/post", fields);
      const _id = isEdit ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (error) {
      console.warn(error);
      alert("Error when creating the article");
    }
  };

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
      <input ref={inputFileRef} type="file" onChange={onSelectFile} hidden />
      {(selectedFile || imageUrl) && (
        <>
          <Button
            variant="contained"
            color="error"
            onClick={onClickRemoveImage}
          >
            Delete
          </Button>
          <img
            className={styles.image}
            src={
              preview
                ? preview
                : imageUrl && `http://localhost:4444/api${imageUrl}`
            }
            alt="Uploaded"
          />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title of the article..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEdit ? "Edit" : "Publish"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
