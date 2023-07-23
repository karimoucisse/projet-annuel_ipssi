import { Link, useLocation } from 'react-router-dom';
import Picture from "../assets/img/musk.jpg";
import { Box } from '@mui/material';

/**
 * This is a React component that displays a 404 error message with the current page path and a link to
 * the homepage.
 * @returns A functional component named `NoMatch` is being returned. It displays a message "404" along
 * with the current page's path using `useLocation` hook. It also provides a button to navigate back to
 * the home page using `Link` component from `react-router-dom`.
 */
export default function NoMatch() {
  let location = useLocation();

  return (
    <Box sx={{display: "flex", justifyContent: "space-around", flexDirection: "column", alignItems: "center", gap: 2}}>
      <h2>404</h2>
      <code>Page : {location.pathname}</code>
      <Box component="img" sx={{borderRadius: "50vh", height: "30rem", width: "30rem", objectFit: "cover"}} src={Picture} alt="Elon Musk smoking" />
      <br />
      <Link to="/" className="btn btn-primary">
        Retour sur la page principale
      </Link>
      <div>
      <audio controls src = "this-is-elon-musk.mp3" type="audio/mp3">
      </audio>
      </div>

    </Box>
  );
}