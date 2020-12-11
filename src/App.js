import logo from './logo.svg';
import './App.css';
import Avatar from './components/Avatar';
import Post from './components/Post';

function App() {
  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
}

export default App;
