/* eslint-disable react/jsx-one-expression-per-line */
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

import { useAuthValue } from '../../context/AuthContext/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const name = user.displayName;
  const { documents: posts, loading, error } = useFetchDocument('posts', null, uid);

  console.log(uid);
  console.log(name);
  return (
    <div>
      <h1 className={styles.user_name}>Welcome {name}!</h1>
      <h2>Dashboard</h2>
      <p>Manage your posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.no_posts}>
          <p>No posts found</p>
          <Link to="/posts/create" className="btn">Create your first post</Link>
        </div>
      ) : (
        <div />
      )}
      {loading && (<p>Loading posts...</p>)}
      {posts && posts.map((post) => (
        <h3>{post.title}</h3>
      ))}
    </div>
  );
};

export default Dashboard;
