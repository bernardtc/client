import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import { ThemeProviderWrapper } from "./context/theme.context";
import { AuthProviderWrapper } from './context/auth.context';
import AudioPlayer from './components/AudioPlayer';
import './styles/customize-progress-bar.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
     <AuthProviderWrapper>
      <ThemeProviderWrapper>
         <App />
         <AudioPlayer/>
      </ThemeProviderWrapper>
     </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
