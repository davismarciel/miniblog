import React from 'react';
// CSS
import { Link } from 'react-router-dom';
import styles from './About.module.css';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        About Mini
        <span>Blog</span>
      </h2>
      <p>This project was made using React.js on frontend and Firebase in backend</p>
      <Link to="/posts/create" className="btn">Start posting</Link>
    </div>
  );
};

export default About;
