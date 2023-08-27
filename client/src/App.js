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
  )
}
