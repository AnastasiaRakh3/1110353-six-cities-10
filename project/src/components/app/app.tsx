import MainScreen from '../../pages/main-screen/main-screen';

type AppProps = {
  cardsOnPage: number;
};

function App({cardsOnPage} : AppProps): JSX.Element {
  return <MainScreen cardsOnPage = {cardsOnPage}/>;
}

export default App;
