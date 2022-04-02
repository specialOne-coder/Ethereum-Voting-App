import '../src/styles/App.css';
import { Footer,Navigation } from '../src/components/index';


function App() {
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
