import React, { useState } from 'react';
// Hooks
import { useNavigate, Link } from 'react-router-dom';
import { useFetchDocument } from '../../hooks/useFetchDocument';
// CSS
import styles from './Home.module.css';
import PostDetail from '../../components/PostDetail/PostDetaiil';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocument('posts');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
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
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) => (
          <h3 key={post.id} className={styles.post_container}>
            <PostDetail key={post.id} post={post} />
          </h3>
        ))}
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

// function PostContainer()

export default Home;
