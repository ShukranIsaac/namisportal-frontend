import React, { Fragment } from 'react';

const ButtonControl = ({ value, icon, handleClick }) => {

    return (
        <Fragment>
            <button text={value} value={value} onClick={ (e) => handleClick(e) } />
        </Fragment>
    );

}

export default ButtonControl;