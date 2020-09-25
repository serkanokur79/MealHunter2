import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Header from './components/Header';
import Meal from './components/Meal';
import Main from './components/Main';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import CatPage from './components/CatPage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? 'dark' : 'light';
  const theme = createMuiTheme({
    palette: {
      type: palletType,
    },
  });
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Paper>
          <Grid container direction='column'>
            <Header title='Meal Hunter' handleThemeChange={handleThemeChange} />
            <Grid item container>
              <Grid item sm={false} md={1}></Grid>
              <Grid item sm={12} md={10}>
                <Switch>
                  <Route exact path='/cat/:name'>
                    <CatPage />
                  </Route>
                  <Route exact path='/'>
                    <Main />
                  </Route>
                  <Route exact path='/meal/:id'>
                    <Meal />
                  </Route>
                  <Route>
                    <NotFound />
                  </Route>
                </Switch>
              </Grid>
              <Grid item sm={false} md={1}></Grid>
            </Grid>
            <Footer />
          </Grid>
        </Paper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
