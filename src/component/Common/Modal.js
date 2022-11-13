import React from "react";
import "../../scss/component/Admin/Modal.scss";
const Modal = ({ isShowing, hide, deleteId }) =>
  isShowing ? (
    <React.Fragment>
      <div className="modal-overlay" />
      <div
        className="modal-wrapper"
        aria-modal
        aria-hidden
        tabIndex={-1}
        role="dialog"
      >
        <div className="modal">
          <div className="modal-header">
            <button
              type="button"
              className="modal-close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <p>Bạn có chắc chắn muốn xóa không?</p>
          <button type="button" className="Admin_remove" onClick={deleteId}>
            XÓA
          </button>
        </div>
      </div>
    </React.Fragment>
  ) : null;

export default Modal;
