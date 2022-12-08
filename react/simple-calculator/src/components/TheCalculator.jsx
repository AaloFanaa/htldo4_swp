import styles from './TheCalculator.module.css';
import { useEffect, useState } from 'react';

function TheCalculator(props) {
  const [strCalc, setStrCalc] = useState('');

  useEffect(() => {
    setStrCalc(props.strInput);
  }, [props.strInput]);

  const handleChange = (event) => {
    setStrCalc(event.target.value);
    props.strChange(event.target.value);
  };

  return (
    <input
      onChange={(e) => {
        handleChange(e);
      }}
      type="text"
      value={strCalc}
      className={styles.inputCalc}
    />
  );
}

export default TheCalculator;
