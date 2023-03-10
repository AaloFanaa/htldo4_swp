import React, { Children, useEffect } from 'react';
import styles from '../../styles/ModalDialog.module.css';

interface props {
  show: boolean;
  onHide: (parmas: Event) => void;
}

// useEffect(() => {}, []);

export default function ModalDialog(props: React.PropsWithChildren<props>) {
  return (
    <div
      className={props.show ? styles.ModalDialog : styles.ModalDialogHide}
      onClick={(event: any) => {
        props.onHide(event);
      }}>
      <div className={styles.dialogWrapper}>{props.children}</div>
    </div>
  );
}
