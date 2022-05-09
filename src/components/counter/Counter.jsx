import Timetodisplay from './Timetodisplay';

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  console.log(days)
  return (
    <div className="show-counter">
         <Timetodisplay value={days} type={'Days'} isDanger={false} />
         <p>:</p>
        <Timetodisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <Timetodisplay value={minutes} type={'Mins'} isDanger={minutes <= 5} />
        <p>:</p>
        <Timetodisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

export default ShowCounter;