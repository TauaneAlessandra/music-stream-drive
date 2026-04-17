import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

/**
 * Dropdown Component
 * Following @air/react specification
 */
export const Dropdown = ({ 
  children, 
  id, 
  placement = 'bottom-start', 
  openOnHover = false,
  disabled = false 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    if (!disabled && !openOnHover) {
      setIsOpen(!isOpen);
    }
  };

  const handleMouseEnter = () => {
    if (openOnHover && !disabled) {
      setIsOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (openOnHover && !disabled) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Separate trigger from items
  const trigger = React.Children.toArray(children).find(
    child => child.props?.slot === 'trigger'
  );
  const items = React.Children.toArray(children).filter(
    child => child.props?.slot !== 'trigger'
  );

  return (
    <div 
      className={`air-dropdown ${isOpen ? 'is-open' : ''} ${placement}`} 
      id={id}
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="air-dropdown-trigger" onClick={toggleDropdown}>
        {trigger}
      </div>
      
      {isOpen && !disabled && (
        <div className={`air-dropdown-menu ${placement}`}>
          {items}
        </div>
      )}
    </div>
  );
};

export const DropdownItem = ({ 
  children, 
  onClick, 
  disabled = false,
  prefix,
  suffix,
  slot,
  divider = false,
  sx // Added sx for mui-like flexibility
}) => {
  return (
    <div 
      className={`air-dropdown-item ${disabled ? 'is-disabled' : ''} ${divider ? 'has-divider' : ''}`} 
      style={sx}
      onClick={!disabled ? onClick : undefined}
      slot={slot}
    >
      {prefix && <span className="air-dropdown-item-prefix">{prefix}</span>}
      <span className="air-dropdown-item-content">{children}</span>
      {suffix && <span className="air-dropdown-item-suffix">{suffix}</span>}
    </div>
  );
};

export default Dropdown;
