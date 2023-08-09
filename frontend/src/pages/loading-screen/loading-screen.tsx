import { Helmet } from 'react-helmet-async';

function LoadingScreen(): JSX.Element {
  return (
    <section className="loading">
      <Helmet>
        <title>Loading...</title>
      </Helmet>
      <p>Loading ...</p>
    </section>
  );
}

export default LoadingScreen;
