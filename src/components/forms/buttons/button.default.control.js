import React, { Fragment } from 'react';
import { Button } from '@blueprintjs/core';

const ButtonControl = ({ value, intent, icon, handleClick }) => {

    return (
        <Fragment>
            <Button 
                intent={intent} 
                text={value} 
                value={value} 
                onClick={ (e) => handleClick(e) } 
            />
        </Fragment>
    );

}

export default ButtonControl;