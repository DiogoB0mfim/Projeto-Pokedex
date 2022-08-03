import Router from "./router/Router";
import GlobalState from "./global/GlobalState"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"

const App = () => {
  return (
      <GlobalState>
      <Router/>
      <ToastContainer/>
      </GlobalState>
  )
}
export default App;
