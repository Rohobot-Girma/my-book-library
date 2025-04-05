import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Category from './pages/Category';
import BookDetails from './pages/BookDetails';
import RatingFeedback from './pages/RatingFeedback';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/rate/:id" element={<RatingFeedback />} />
      </Routes>
    </Router>
  );
}

export default App;