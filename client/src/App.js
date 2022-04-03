import '../src/styles/App.css';
import { Footer, Navigation } from '../src/components/index';
import { useContext } from 'react';
import { ElectionContext } from './context/ElectionContext';


function App() {
  // const { getNombreInscrits,
  //   getNombreVotesPremierTour,
  //   getNombreVotesSecondTour,
  //   getCandidats } = useContext(ElectionContext);

  // setInterval(() => {
  //   getNombreInscrits();
  //   getNombreVotesPremierTour();
  //   getNombreVotesSecondTour();
  //   getCandidats();
  // }, 200000);
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navigation />
      </div>
      <Footer />
    </div>
  );
}

export default App;
