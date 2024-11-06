import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import TaskList from './component/TaskList/TaskList';
import AddTask from './component/AddTask/AddTask';
import UpdateTask from './component/UpdateTask/UpdateTask';
import ViewTask from './component/ViewTask/ViewTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<TaskList/>}></Route>
        <Route path='/add' element={<AddTask/>}></Route>
        <Route path='/edit/:id' element={<UpdateTask/>}></Route>
        <Route path='/view/:id' element={<ViewTask/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
