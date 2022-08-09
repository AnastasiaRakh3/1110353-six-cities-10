import './loading-screen.css';

export default function LoadingScreen(): JSX.Element {
  return (
    <div className='lds-container'>
      <div className="lds-hourglass"></div>
    </div>
  );
}
