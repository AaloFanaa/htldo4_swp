import styles from './TheCalculator.module.css';
import { useState } from 'react';

function TheCalculator(props) {
  const [strCalc, setStrCalc] = useState(props.strInput);

  const handleChange = (event) => {
    setStrCalc(event.target.value);
    props.strChange(strCalc);
  };

  return (
    <input
      onChange={(e) => {
        handleChange(e);
      }}
      className={styles.inputCalc}
      type="text"
      value={strCalc}
    />
  );
}

export default TheCalculator;
