import { useParams } from 'react-router-dom';
import styles from './Post.module.css';

import { useDocumentId } from '../../hooks/useDocumentId';

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useDocumentId('posts', id);
  return (
    <div className={styles.post_container}>
      {loading && <p className="loading">Loading post...</p>}
      {post && (
        <div className={styles.post_center}>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <p>{post.body}</p>
          <strong>About:</strong>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>
                  #
                  {tag}
                </span>
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
