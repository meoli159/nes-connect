
import './App.css';
import VideoPlayer from './components/VideoPlayer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
              
        <form action= "../../post" method='post'
        className='form' >
          <button type='submit'>Connected? test</button>
        </form>
        <div>
          <VideoPlayer></VideoPlayer>
        </div>
      </header>
      <body>
        
      </body>
    </div>
  );
}

export default App;
