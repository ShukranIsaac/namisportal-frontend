import React, { useState } from 'react'
import { Card, Callout, Collapse, Elevation, Icon } from "@blueprintjs/core"
import { withStyles } from '@material-ui/core';

/**
 * Render question category
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const QuestionCategory = ({
    name, 
    index,
    classes,
    ...props
}) => {
    const [state, setState] = useState({ isOpen: false })

    const handleClick = () => setState({isOpen: !state.isOpen});
    
    return (
        <div className={classes.categoryContainer}>
            <Callout onClick={ handleClick } 
                name={ `${ state.isOpen }` } 
                className={classes.button} righticon="download"
            >
                <div style={{ alignSelf: 'flex-start'}}>
                    { (index + 1) + '. ' + name }
                </div>
                <div style={{marginLeft: 'auto'}}>
                    { state.isOpen ? <Icon icon="remove"/> : <Icon icon="add"/>} 
                </div>
            </Callout>

            <Collapse isOpen={state.isOpen}>
                <Card interactive={true} elevation={Elevation.ZERO}>
                    { props.children }
                </Card>
            </Collapse>
        </div>
    );
}

const styles = ({
    button: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        borderRadius: '0',
        background: '#BFCCD6',
        fontSize: '1.2em',
        padding: '10px',
        cursor: 'pointer'
    },
    categoryContainer: {
        marginBottom: '10px',
        textAlign: 'left'
    }
});

export default withStyles(styles, {
    withTheme: true
})(QuestionCategory);
