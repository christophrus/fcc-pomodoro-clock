import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
* @augments {Component<{  dataElement:any,  decId:any,  id:any,  incId:any,  label:any,  labelId:any,  length:any,  onClick:any>}
*/
class LengthController extends Component {

    render() {
        const { id, length, onClick, label, labelId, dataElement, incId, decId } = this.props;
        return (
            <div className="flex flex-col justify-center items-center">
                <h2 id={labelId}>{label}</h2>
                <div>
                <button data-element={dataElement} id={decId} value="-" className="p-2 m-2 rounded-full text-pink-darkest shadow-md bg-teal fa fa-minus inline-block" onClick={onClick}></button>
                <span id={id}>{length}</span>
                <button data-element={dataElement} id={incId} value="+" className="p-2 m-2 rounded-full text-pink-darkest shadow-md bg-teal fa fa-plus inline-block" onClick={onClick}></button>
                </div>
            </div>
        );
    }
}

LengthController.propTypes = {
  dataElement: PropTypes.any,
  decId: PropTypes.any,
  id: PropTypes.any,
  incId: PropTypes.any,
  label: PropTypes.any,
  labelId: PropTypes.any,
  length: PropTypes.any,
  onClick: PropTypes.any
}

export default LengthController;