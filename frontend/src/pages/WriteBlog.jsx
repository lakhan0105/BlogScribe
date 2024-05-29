import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Editor } from "@tinymce/tinymce-react";
import constants from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { ID } from "appwrite";

import { createBlog, createBlogImg } from "../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";

function WriteBlog() {
  // setup editorRef
  const editorRef = useRef(null);
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const initialVal = {
    userId: user.$id,
    title: "",
    content: null,
    blog_img: ID.unique(),
    category: "",
    is_featured: false,
  };

  const [blogData, setBlogData] = useState(initialVal);
  const [contentData, setContentData] = useState("");

  // function that runs getContent and sets it in editorRef
  const log = () => {
    // if editor instance is present
    if (editorRef.current) {
      const content = editorRef.current.getContent();
      setContentData(() => {
        return content;
      });
    }
  };

  // function to create a desc from contentData
  function createDesc() {
    const div = document.createElement("div");
    div.innerHTML = contentData;
    const paras = div.querySelector("p")?.textContent;
    const desc = paras?.substring(0, 100);
    return desc;
  }

  // save the contentData in blogData
  useEffect(() => {
    console.log("inside contentData useeffect");
    const desc = createDesc();
    setBlogData((prev) => {
      return { ...prev, content: contentData, desc };
    });
  }, [contentData]);

  // handleChange
  function handleChange(e) {
    const key = e.target.name;
    const value = e.target.value;
    setBlogData((prev) => {
      return { ...prev, [key]: value };
    });
  }

  // handleSubmit
  function handleSubmit(e) {
    e.preventDefault();
    log();

    try {
      dispatch(createBlog(blogData));
      dispatch(createBlogImg(blogData.blog_img));
      setTimeout(() => {
        // console.log(blogData);
        navigate("/");
      }, 3000);
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
            id="uploader"
            type="file"
            name="blog_img"
            accept="image/*"
            // onChange={handleChange}
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
            onChange={log}
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
