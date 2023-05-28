/* eslint-disable react/jsx-one-expression-per-line */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './EditPost.module.css';

import { useAuthValue } from '../../context/AuthContext/AuthContext';
import { useDocumentId } from '../../hooks/useDocumentId';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post, error } = useDocumentId('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);

      const textTags = post.tagsArray.join(', ');
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();
  const { updateDocument, response } = useUpdateDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError('');

    // Validate image
    try {
      new URL(image);
    } catch (error) {
      setFormError('Invalid image URL');
      return;
    }

    // Create tag array
    const tagsArray = tags.split(',').map((tags) => tags.trim().toLowerCase());

    // Checking all values
    if (!title || !image || !body || !tags) {
      setFormError('Fill all the empty fields');
    }
    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    // Navigate to dashboard
    navigate('/dashboard');
  };
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Edit post: {post.title}</h2>
          <p>Make changes to your post</p>
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
            <p className={styles.preview_title}>Image preview:</p>
            <img className={styles.image_preview} src={post.image} alt={post.title} />
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
                name="tags"
                placeholder="Insert your tags"
                required
              />
            </label>
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
            {!response.loading && <button className="btn">Edit</button>}
            {response.loading && (<button disabled className="btn">Editing...</button>) }
          </form>

        </>
      )}

    </div>
  );
};

export default EditPost;
