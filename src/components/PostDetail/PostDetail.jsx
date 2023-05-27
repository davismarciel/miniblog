import { Link } from 'react-router-dom';
import styles from './PostDetail.module.css';

const PostDetail = ({ post }) => {
  return (
    <div className={styles.post_detail}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p className={styles.createdby}><span className={styles.username}>{post.createdBy}</span></p>
      <div className={styles.tags}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link className={styles.read_display} to={`/posts/${post.id}`}>
        <button className="btn btn-outline">Ler</button>
      </Link>
    </div>
  );
};

export default PostDetail;
