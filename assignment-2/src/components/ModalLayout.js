import React, { useRef } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const ModalLayout = (props) => {
  const { children, isOpen, setIsOpen } = props;

  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  return (
    <div id="modals" className={`${!isOpen ? 'modal-close' : ''}`}>
      <div ref={wrapperRef} className="modal-content-wrapper">
        {children}
      </div>
    </div>
  );
};

export default ModalLayout;
