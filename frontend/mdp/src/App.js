import React, { useState } from 'react';
import './style/style.css';
import IndexPage from "./component/IndexPage";
import HeartDisease from "./component/HeartDisease";
import DiabetesDisease from "./component/DiabetesDisease";
import BreastCancerApp from './component/BreastCancer';
import ParkinsonsApp from './component/Parkinsons';

function Sidebar({ items, onItemClick, selectedItemIndex }) {
  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <div
          key={index}
          className={`sidebar-item ${selectedItemIndex === index ? 'selected' : ''}`}
          onClick={() => onItemClick(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function App() {
  const [selectedItemIndex, setSelectedItemIndex] = useState(0); // Initially selected index
  const items = [
    'Home',
    'Heart Disease',
    'Diabetes',
    'Breast Cancer',
    'Parkinsons disease'
  ];

  const handleItemClick = (index) => {
    setSelectedItemIndex(index);
  };


  const renderContent = () => {
    switch(selectedItemIndex) {
      case 0:
        return <IndexPage />;
      case 1:
        return <HeartDisease />;
      case 2:
        return <DiabetesDisease />;
      case 3:
        return <BreastCancerApp />;
      case 4:
        return <ParkinsonsApp />;
      // Add cases for other items here when their content is ready
      default:
        return <div>No content available</div>;
    }
  };


  return (
  
    <div className="app">
      <Sidebar items={items} onItemClick={handleItemClick} selectedItemIndex={selectedItemIndex} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;  







/* import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './style/style.css'; // Import your CSS styles

import IndexPage from "./component/IndexPage";
import HeartDisease from "./component/HeartDisease";
import DiabetesDisease from "./component/DiabetesDisease";
import BreastCancerApp from './component/BreastCancer';
import ParkinsonsApp from './component/Parkinsons';

function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-item">Home</Link>
      <Link to="/heart-disease" className="sidebar-item">Heart Disease</Link>
      <Link to="/diabetes" className="sidebar-item">Diabetes</Link>
      <Link to="/breast-cancer" className="sidebar-item">Breast Cancer</Link>
      <Link to="/parkinsons-disease" className="sidebar-item">Parkinson's Disease</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/heart-disease" element={<HeartDisease />} />
            <Route path="/diabetes" element={<DiabetesDisease />} />
            <Route path="/breast-cancer" element={<BreastCancerApp />} />
            <Route path="/parkinsons-disease" element={<ParkinsonsApp />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; */














// App.js
// import React, {useState} from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import HeartDiseasePage from './component/HeartDisease';
// import DiabetesPage from './component/DiabetesDisease';
// import IndexPage from './component/IndexPage';
// import BreastCancerApp from './component/BreastCancer';
// import ParkinsonsApp from './component/Parkinsons';
// import Navbar from './component/Navbar';
//import Navbar1 from './component/Navbar1';

// function App() {
//   return (
//     <Router>
//       <Navbar1 />
//       <Routes>
//         <Route path="/" element={<IndexPage />} />
//         <Route path="/heart-disease" element={<HeartDiseasePage />} />
//         <Route path="/diabetes" element={<DiabetesPage />} />
//         <Route path="/breast_cancer" element={<BreastCancerApp />} />
//         <Route path="/parkinsons" element={<ParkinsonsApp />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

