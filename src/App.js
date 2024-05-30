import './App.css';

import Header from './components/Header.js';
import CategoryContainer from './components/categories/CategoryContainer.js';
import Footer from './components/Footer.js';

function App() {

  return (
    <div className="App">
      <Header /> 
        <CategoryContainer />
      <Footer />
    </div>
  );
}

export default App;
