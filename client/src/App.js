import { BrowserRouter,Navigate,Routes,Route } from 'react-router-dom';
import HomePage from './scenes/homepage/index.jsx';
import LoginPage from './scenes/loginpage/index.jsx';
import ProfilePage from './scenes/profilepage/index.jsx';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CssBaseline,ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material';
import { themesettings } from 'theme';

function App() {
  const mode=useSelector((state)=>{
    // console.log("state is ");
    // console.log(state);                                         
    return state.mode;
  });
  const userexists=useSelector((state)=>Boolean(state.token));
  //console.log("mode is "+mode);
  const theme=createTheme(themesettings(mode));
  //console.log(theme);
  return (
    <div className="app">
       <BrowserRouter>
        <ThemeProvider theme={theme}>
        <CssBaseline />
          <Routes>
            <Route path='/' element={!userexists ? <LoginPage /> : <Navigate to="/home" />} />
            <Route path='/home' element={userexists ? <HomePage /> : <Navigate to="/" />} />
            <Route path='/profile/:userid' element={userexists ? <ProfilePage /> : <Navigate to="/" />} />
          </Routes>
        </ThemeProvider>
       </BrowserRouter>
    </div>
  );
}

export default App;
