// IMPORTS HERE
import './App.css'
import WelcomeMessage from './components/WelcomeMessage'
import SortFilterMenu from './components/SortFilterMenu'
// import FetchAndDisplayFromQueue from './FetchAndDisplayFromQueue';

function App () {
  return (
  // { /*CALL COMPONENTS/FUNCTIONS HERE*/ }
    <>
    <WelcomeMessage/>
    <SortFilterMenu/>
    {/* <FetchAndDisplayFromQueue/> */}
    </>
  )
}

export default App