import { memo } from 'react';

const Dropdown = memo(({ category, options, selectedOptions, isOpen, toggleDropdown, handleOptionChange }) => {
  const handleClick = () => {
    toggleDropdown(category);
  };

  const renderedOptions = options.map((option) => (
    <label key={option} className="dropdown-option select-none	">
      <input
        type="checkbox"
        checked={selectedOptions[category].includes(option)}
        onChange={() => handleOptionChange(category, option)}
      />
      <span className="ml-2">{option}</span>
    </label>
  ));

  return (
    <div className="dropdown select-none	">
      <div
        className={`dropdown-header ${isOpen[category] ? 'open' : ''}`}
        onClick={handleClick}
      >
        <div className='h-full '>
          <span>
            {selectedOptions[category].length > 0
              ? selectedOptions[category].join(", ")
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>
      </div>
      {isOpen[category] && (
        <div className="dropdown-content">
          {renderedOptions}
        </div>
      )}
    </div>
  );
});

export default Dropdown;
