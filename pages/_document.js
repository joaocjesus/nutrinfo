import { ServerStyleSheets } from '@material-ui/core/styles';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const isProduction = process.env.NODE_ENV === 'production' && process.env.PRODUCTION === 'true';
    console.log('=== _document.js #39 === ( isProduction ) =======>', isProduction);
    console.log('=== _document.js #40 === ( process.env.PRODUCTION ) =======>', process.env.PRODUCTION);
    console.log(`=== _document.js #41 === ( process.env.NODE_ENV === 'production' ) =======>`, process.env.NODE_ENV === 'production');
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      isProduction,
      // Styles fragment is rendered after the app and page rendering finish.
      styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  setGoogleTags() {
    return {
      __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-168058659-2');
      `,
    };
  }

  render() {
    const { isProduction } = this.props;

    return (
      <Html lang="en">
        <Head/>
        <body>
        <Main/>
        <NextScript/>
        {isProduction && (
          <>
            <script
              async
              src="https://www.googletagmanager.com/gtag/js?id=UA-168058659-2"
            />
            {/* We call the function above to inject the contents of the script tag */}
            <script dangerouslySetInnerHTML={this.setGoogleTags()}/>
          </>
        )}
        </body>
      </Html>
    );
  }
}
