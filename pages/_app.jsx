// import App from 'next/app'
// import { Grommet, grommet as grommetTheme } from 'grommet'

// export default class MyApp extends App {
//   render() {
//     const { Component, pageProps } = this.props
//     return (
//       <Grommet theme={grommetTheme}>
//         <Component {...pageProps} />
//       </Grommet>
//     )
//   }
// }
import React from 'react';
import { Grommet, grommet as grommetTheme } from 'grommet';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../utils/theme'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
        <Grommet theme={grommetTheme}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </Grommet>
  );
}

export default MyApp;