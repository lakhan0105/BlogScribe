import React, { useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import constants from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { addBlog } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

function WriteBlog() {
  // setup editorRef
  const editorRef = useRef(null);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialVal = {
    id: uuidv4(),
    user_id: user.user_id,
    title: "",
    content: null,
    img_url: "",
    category: "",
    is_featured: false,
  };

  const [blogData, setBlogData] = useState(initialVal);

  // function that runs getContent and sets it in editorRef
  const log = () => {
    // if editor instance is present
    if (editorRef.current) {
      setBlogData((prev) => {
        return {
          ...prev,
          id: uuidv4(),
          content: editorRef.current.getContent(),
        };
      });
    }
  };

  // handleChange
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setBlogData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  // handleSubmit
  async function handleSubmit(e) {
    e.preventDefault();
    log();

    try {
      dispatch(addBlog(blogData));
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Wrapper className="page-center">
      <h2>write your blog</h2>

      {/* form */}
      <form onSubmit={handleSubmit}>
        <div>
          <input
            className="title"
            name="title"
            type="text"
            placeholder="title"
            onChange={handleChange}
          />
          <input
            className="image"
            type="file"
            name="img_url"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="editor-container">
          <Editor
            apiKey={constants.tinymceApiKey}
            onInit={(_evt, editor) => (editorRef.current = editor)}
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount linkchecker",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            }}
            initialValue="type the content here"
          />
        </div>

        <button type="submit">save</button>
      </form>
    </Wrapper>
  );
}

// styles
const Wrapper = styled.section`
  font-family: "Roboto", sans-serif;

  h2 {
    margin-bottom: 0.5em;
  }

  .title {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    padding: 0.1em;
    border: 1px solid #b4b4b4;
    border-radius: 0.2em;
  }

  .image {
    background-color: salmon;
  }
`;

export default WriteBlog;
