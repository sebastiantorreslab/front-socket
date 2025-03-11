import { AppRouter } from "./router/router";
import { BrowserRouter as Router } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <div>
        <h1>Chat Peer to Peer</h1>
        <AppRouter />
      </div>
    </Router>
  );
};

export default App;
