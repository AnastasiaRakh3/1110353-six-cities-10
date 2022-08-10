import './loading.css';

export default function Loading(): JSX.Element {
  return (
    <div className='lds-container'>
      <div className="lds-hourglass"></div>
    </div>
  );
}
