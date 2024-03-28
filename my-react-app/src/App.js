
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddMember from './components/AddMember';
import AddVaccination from './components/AddVaccination';
import Member from './components/Member';
import ViewAllMembers from './components/ViewAllMembers';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<ViewAllMembers />} />
      <Route path='/AddMember' element={<AddMember />} />
       <Route path='/AddVaccination/:id' element={<AddVaccination />} />
       <Route path='/Member/:id' element={<Member />} />
       <Route path='/ViewAllMembers' element={<ViewAllMembers />} />
    </Routes>
  </Router>
  );
}

export default App;
