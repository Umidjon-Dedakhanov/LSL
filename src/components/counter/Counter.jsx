import Timetodisplay from './Timetodisplay';

const ShowCounter = ({ days, hours, minutes, seconds }) => {
  return (
    <div className="show-counter">
        <Timetodisplay value={days} type={'Days'} isDanger={days <= 3} />
        <p>:</p>
        <Timetodisplay value={hours} type={'Hours'} isDanger={false} />
        <p>:</p>
        <Timetodisplay value={minutes} type={'Mins'} isDanger={false} />
        <p>:</p>
        <Timetodisplay value={seconds} type={'Seconds'} isDanger={false} />
    </div>
  );
};

export default ShowCounter;