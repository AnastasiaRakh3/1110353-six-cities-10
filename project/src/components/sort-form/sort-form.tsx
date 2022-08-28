import { useState, memo } from 'react';
import { SortType } from '../../const';

type SortFormProps = {
  activeSortType: string;
  onChangeSortType: (sortType: string) => void,
};

function SortForm({ activeSortType, onChangeSortType }: SortFormProps): JSX.Element {

  const [isOpened, setIsOpened] = useState(false);

  const handleSelectSortType = (type: string) => {
    onChangeSortType(type);
    setIsOpened(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpened(!isOpened)}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isOpened ? 'places__options--opened' : ''}`}>
        {Object.values(SortType).map((type) => (
          <li
            key={type}
            className={`places__option ${activeSortType === type ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSelectSortType(type)}
          >{type}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default memo(SortForm);
