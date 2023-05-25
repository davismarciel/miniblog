import React, { useState } from 'react';
// Hooks
import { useNavigate, Link } from 'react-router-dom';
// CSS
import styles from './Home.module.css';

const Home = () => {
  const [query, setQuery] = useState('');
  const [posts] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.home}>
      <h1>See your newest posts</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search for tags"
        />
        <button className="btn btn-dark">Search</button>
      </form>
      <div className="post-list">
        <h1>Posts</h1>
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Post not found</p>
            <Link to="/posts/create" className="btn">Create your post</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
