import React, { Children, useEffect } from 'react';
import styles from '../../styles/ModalDialog.module.css';

interface props {
  show: boolean;
  onHide: (parmas: Event) => void;
  escPressed: () => void;
}

export default function ModalDialog(props: React.PropsWithChildren<props>) {
  const escFunction: (event: KeyboardEvent) => void = (
    event: KeyboardEvent
  ) => {
    if (event.key === 'Escape') {
      props.escPressed();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, [escFunction]);

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
