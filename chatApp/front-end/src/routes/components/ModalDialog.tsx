import React, { Children } from 'react';
import styles from '../../styles/ModalDialog.module.css';

interface props {
  show: boolean;
  onHide: () => void;
}

export default function ModalDialog(props: React.PropsWithChildren<props>) {
  return (
    <div
      className={props.show ? styles.ModalDialog : styles.ModalDialogHide}
      onClick={() => {
        props.onHide;
      }}
    >
      <div className={styles.dialogWrapper}>{props.children}</div>
    </div>
  );
}
