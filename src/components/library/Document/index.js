import React from 'react'
import PropTypes from 'prop-types';
import { 
    Button, Card, Callout, 
    Collapse, Elevation, Icon 
} from "@blueprintjs/core"
import { redirect } from '../../user/user.redirect';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
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
    docContainer: {
        marginBottom: '10px',
        textAlign: 'left'
    },
    alignCenter: {
        textAlign: 'center'
    }
})

export const Document = withStyles(styles, {
    withTheme: true
})(({
    name, 
    path, 
    summary, 
    index,
    classes,
    isOpen,
    _id,
    activeElement,
    handleClick
}) => {
    // console.log(activeElement)
    // console.log(isOpen)
    return (
        <div className={classes.docContainer}>
            <Callout id={_id} onClick={handleClick} className={classes.button} righticon="add">
                <div style={{ alignSelf: 'flex-start' }}>{`${index}. ${name}`}</div>
                <div style={{ marginLeft: 'auto' }}>
                    {isOpen && _id===activeElement ? <Icon icon="remove" /> : <Icon icon="add" />}
                </div>
            </Callout>
            <Collapse isOpen={isOpen && _id===activeElement}>
                <Card interactive={true} elevation={Elevation.ZERO}>
                    <p> {summary} </p>
                    <a href="#/" onClick={e => redirect.toExternalLink({ url: path, event: e }) } download={name}>
                        <Button className={classes.alignCenter} rightIcon="download" intent="success" text="Download File/PDF" />
                    </a>
                </Card>
            </Collapse>
        </div>
    );
});

Document.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
}

export default withStyles(styles, {
    withTheme: true
})(Document);
