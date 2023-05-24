import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreatePost.module.css';

import { useAuthValue } from '../../context/AuthContext/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument('posts');

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');

    // Validate image

    // Create tag array

    // Checking all values

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // Navigate to home
  };

  return (
    <div className={styles.create_post}>
      <h2>Create post</h2>
      <p>Write something about your post</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title: </span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            type="text"
            name="title"
            placeholder="Title"
            required
          />
        </label>
        <label>
          <span>Image: </span>
          <input
            onChange={(e) => setImage(e.target.value)}
            value={image}
            type="text"
            name="image"
            placeholder="Image"
            required
          />
        </label>
        <label>
          <span>Description: </span>
          <textarea
            onChange={(e) => setBody(e.target.value)}
            value={body}
            type="text"
            name="body"
            placeholder="Describe what happened here"
            required
          />
        </label>
        <label>
          <span>Tags: </span>
          <input
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            type="text"
            name="image"
            placeholder="Insert your tags"
            required
          />
        </label>
        {response.error && <p className="error">{response.error}</p>}
        {!response.loading && <button className="btn">Post</button>}
        {response.loading && (<button disabled className="btn">Posting...</button>) }
      </form>
    </div>
  );
};

export default CreatePost;
