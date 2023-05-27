import React from 'react';

import { Link } from 'react-router-dom';

import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useQuery } from '../../hooks/useQuery';

import PostDetail from '../../components/PostDetail/PostDetail';

import styles from './Search.module.css';

const Search = () => {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocument('posts', search);
  return (
    <div className={styles.search_container}>
      <h2>Search:</h2>
      <div className={styles.no_post}>
        {posts && posts.length === 0 && (
          <>
            <p>Post not found</p>
            <Link to="/" className="btn btn-dark">Back to posts</Link>
          </>
        )}
      </div>
      {posts && posts.map((post) => (
        <div className={styles.post_search}>
          <PostDetail key={post.id} post={post} />
        </div>
      ))}
    </div>
  );
};

export default Search;
