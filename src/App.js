import './App.css';
import Calendar from './components/Calendar/Calendar';

const now = new Date(2021, 4, 9);

function App() {
  return (
    <Calendar date={now} />
  );
}

export default App;
