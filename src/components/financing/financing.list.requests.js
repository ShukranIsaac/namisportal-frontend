import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent, Divider } from '@blueprintjs/core';
import { withStyles, FormControl, Paper } from '@material-ui/core';
import styles from '../contact/form.styles';
import { SelectInputControl } from '../forms/form.selectinput.field';

/**
 * Component to list all requests so far placed by each
 * individual institution.
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export const ListFinancingRequests = (withStyles(styles)(({
    category,
    handleClick,
    handleChange,
    general,
    // option,
    classes,
}) => {
    
    return (
        <Fragment>

            <ButtonControl 
                intent={Intent.NONE} 
                value="New Subcategory"
                name="create"
                handleClick={e => handleClick(e) }
            />

            <div className={classes.margin} />

            <Divider />

            <FormControl>

                <Paper elevation={0}>
                    
                    <SelectInputControl 
                        name="Category Option"
                        onChange={ e => handleChange(e) }
                    >
                        <option value="">{ `Choose category to edit` }</option>
                        <option value={ `parent` } onClick={ (e) => handleClick(e) }>Parent</option>
                        <option value={ `child` } onClick={ (e) => handleClick(e) }>Child</option>
                    </SelectInputControl>

                </Paper>

            </FormControl>

            <div className={classes.margin} />
            <div className={classes.margin} />

            <div>
                {
                    general && (
                        !general.isLoading ? (
                            ((category !== null && category !== undefined)) && category !== undefined && category.about
                        ) : <div style={{ marginTop: `40px` }} className="loader" />
                    )
                }
            </div>

        </Fragment>
    );

}))

ListFinancingRequests.propTypes = {
    classes: PropTypes.object.isRequired,
}