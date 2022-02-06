import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';


const ProgressBar = ({ active, completed, quantity }) => {
  const [percentage, setPercentage] = useState(0);

  const getPercentage = () => {
    console.log(completed, quantity)
    const value = (completed * 100) / quantity;
    return Math.round(value);
  }

  const showPercentage = () => {
    setTimeout(() => {
      const total = getPercentage();
      setPercentage(total)
    }, 500)
  }

  useEffect(() => {
    showPercentage();
  }, [completed, quantity])
  
  return (
    <div className="progress">
      <CircularProgressbar
        value={ percentage }
        text={ percentage + '%' }
        styles={buildStyles({
          textColor: `${active ? 'white' : 'transparent'}`,
          pathColor: '#61c9a3',
          trailColor: '#292929',
        })} 
      />
    </div>
  );
};

export default ProgressBar;