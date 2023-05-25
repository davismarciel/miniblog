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

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');

    // Validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError('Invalid image URL');
    }

    // Create tag array
    const tagsArray = tags.split(',').map((tags) => tags.trim().toLowerCase());

    // Checking all values
    if (!title || !image || !body || !tags) {
      setFormError('Fill all the empty fields');
    }
    if (formError) return;
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // Navigate to home

    navigate('/');
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
        {formError && <p className="error">{formError}</p>}
        {!response.loading && <button className="btn">Post</button>}
        {response.loading && (<button disabled className="btn">Posting...</button>) }
      </form>
    </div>
  );
};

export default CreatePost;
