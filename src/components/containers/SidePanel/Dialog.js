import React, { createRef } from "react";
import "./Dialog.scss";
class CustomDialog extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
    this.modalRef = createRef();
    this.overlayRef = createRef();
    this.state = { value: props.initialValue };

    const onComplete = () => {
      this.inputRef.current.focus();
    };
  }

  componentDidMount() {
    document.body.addEventListener("click", this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.onClickOutside);
  }

  onClickOutside = (e) => {
    const { onClose } = this.props;
    const element = e.target;

    if (this.modalRef.current && !this.modalRef.current.contains(element)) {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    }
  };

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { onSubmit, onClose } = this.props;
    onSubmit(value);
    onClose();
  };

  render() {
    const { value } = this.state;

    return (
      <div className="CustomDialog">
        <div className="CustomDialog__header">
          <div className="CustomDialog__title">Header.</div>
          <div className="CustomDialog__close">
            <span className=""></span>
          </div>
        </div>
        <div className="CustomDialog__content">
          <p> Content</p>
        </div>
        <div className="CustomDialog__footer">
          <button>Close</button>
        </div>
      </div>
    );
  }
}

export default CustomDialog;
