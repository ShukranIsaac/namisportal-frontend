import React, { Fragment } from 'react';
import { Button } from '@blueprintjs/core';

const ButtonControl = ({ name, value, intent, icon, handleClick, disabled }) => {

    return (
        <Fragment>
            <Button
                name={ name }
                intent={intent} 
                text={value} 
                value={value} 
                onClick={ (e) => handleClick(e) } 
                style={{ margin: '1px' }}
                disabled={ disabled }
            />
        </Fragment>
    );

}

export default ButtonControl;