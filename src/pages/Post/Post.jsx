import { useParams, Link } from 'react-router-dom';
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
          <div className={styles.back}>
            <Link className="btn btn-outline" to={`/posts/edit/${post.id}`}>
              Back to homepage
            </Link>
          </div>
          <h1>{post.title}</h1>
          <img className={styles.post_image} src={post.image} alt={post.title} />
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
