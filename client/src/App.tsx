import { CssBaseline, ThemeProvider } from '@material-ui/core';
import RootPage from './pages/root-page';
import myTheme from './theme';

function App() {
  return (
    <CssBaseline>
      <ThemeProvider theme={myTheme}>
        <RootPage />
      </ThemeProvider>
    </CssBaseline>
  );
}

export default App;
