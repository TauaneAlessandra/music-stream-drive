import React from 'react';
import './Breadcrumb.css';

/**
 * Breadcrumb Component
 * Following @air/react specification
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - HTML elements as children (links and text)
 */
export const Breadcrumb = ({ children }) => {
  return (
    <nav className="air-breadcrumb-container" aria-label="Breadcrumb">
      <div className="air-breadcrumb">
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={index}>
            <div className="air-breadcrumb-item">
              {child}
            </div>
            {index < React.Children.count(children) - 1 && (
              <span className="air-breadcrumb-separator">/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Breadcrumb;
