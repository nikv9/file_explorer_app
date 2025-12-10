
import { Route, Routes } from 'react-router-dom'
import FileExplorer from './components/FileExplorer'

const App = () => {
  
  return (
    <div className='min-h-dvh'>
      <h2 className='font-semibold text-xl text-center p-4 border-b border-gray-500'>File Explorer</h2>
      <Routes>
        <Route path='/' element={<FileExplorer/>}/>
      </Routes>
    </div>
  )
}

export default App