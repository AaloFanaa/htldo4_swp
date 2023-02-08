import React from 'react';
import styles from './styles/Login.module.css';

export default function Login(props: any) {
  return (
    <div className={styles.wrapper}>
      Login
      <div onClick={props.tryLogin}>Click me</div>
    </div>
  );
}
