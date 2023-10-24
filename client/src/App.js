<<<<<<< HEAD
import Bubbles from './components/Bubbles';
import Router from './router/router';

/**
 * The function exports a component called "App" that returns a "Routeur" component.
 * @returns A component called "Routeur" is being returned.
 */
export default function App() {
  return (
  <>
    <Bubbles />
    <Router />
  </>
=======
// import Router from './router/router';
import Bubbles from './components/Bubbles';
import Router from './routes/Router';
function App() {
  return (
    <>
      {/* <Bubbles /> */}
      <Router />
    </>
>>>>>>> f69f19c643f46b4b7d9666f4d619e6b27e1a2179
  )
}

export default App;
