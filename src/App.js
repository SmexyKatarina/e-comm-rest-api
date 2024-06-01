import './App.css';

import Header from './components/Header.js';
import CategoryContainer from './components/categories/CategoryContainer.js';
import Footer from './components/Footer.js';
import ItemContainer from './components/items/ItemContainer.js';

function App() {

  return (
    <div className="App">
      <Header /> 
        <CategoryContainer />
        <ItemContainer rowAmount={3} colAmount={3}/>
      <Footer />
    </div>
  );
}

export default App;
