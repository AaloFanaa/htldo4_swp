import styles from './SimpleButton.module.css';

function SimpleButton(props) {
  return (
    <div
      onClick={() => {
        props.handleClick(props.operator);
      }}
      className={styles.btn}
    >
      {props.operator}
    </div>
  );
}

export default SimpleButton;
