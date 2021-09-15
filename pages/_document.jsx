// import Document from 'next/document'
// import { ServerStyleSheet } from 'styled-components'

// export default class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const sheet = new ServerStyleSheet()
//     const originalRenderPage = ctx.renderPage

//     try {
//       ctx.renderPage = () =>
//         originalRenderPage({
//           enhanceApp: (App) => (props) =>
//             sheet.collectStyles(<App {...props} />),
//         })

//       const initialProps = await Document.getInitialProps(ctx)
//       return {
//         ...initialProps,
//         styles: (
//           <>
//             {initialProps.styles}
//             {sheet.getStyleElement()}
//           </>
//         ),
//       }
//     } finally {
//       sheet.seal()
//     }
//   }
// }
import Document, {
  Html, Head, Main, NextScript,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ServerStyleSheets } from '@material-ui/core/styles';
import theme from '../utils/theme';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => styledComponentsSheet.collectStyles(materialSheets.collect(<App {...props} />)),
      });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}