"use client";

import styles from './snack.module.css';

type SnackbarProps = {
    message: string | '';
    open: boolean;
    error: boolean;
    onClose: () => void;
  };

  export function Snackbar({ message, open, error, onClose }: SnackbarProps) {
    return (
      <div className={`${styles.snackbar} ${error ? styles.snackbarError : ''} ${open ? styles.show : ''}`} onClick={onClose}>
        {message}
      </div>
    );
  }