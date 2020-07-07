import React, { Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCategoryIcon from '@material-ui/icons/AddTwoTone';
import DeleteCategoryIcon from '@material-ui/icons/Delete';
import EditCategoryIcon from '@material-ui/icons/Edit';
import ListCategoryIcon from '@material-ui/icons/ViewList';
import { profile } from '../user/user.profile';

export const ButtonControls = ({
    keys,
    handleClick,
    user,
    id
}) => {
    return keys.map(element => {
        return <Fragment>
            {
                element==="create" && <IconButton 
                    color="primary" 
                    aria-label="category option"
                    name="create"
                    onClick={e => handleClick(e)}
                    disabled={!profile.canWrite({ user })}
                >
                    <AddCategoryIcon />
                </IconButton>
            }
            {
                element==="default" && <IconButton 
                    color="primary" 
                    aria-label="category option"
                    name="default"
                    onClick={e => handleClick(e)}
                    disabled={!profile.canWrite({ user })}
                >
                    <ListCategoryIcon />
                </IconButton>
            }
            {
                element==="delete" && <IconButton 
                    color="secondary" 
                    aria-label="category option"
                    name="delete"
                    onClick={e => handleClick(e)}
                    disabled={!profile.canWrite({ user })}
                >
                    <DeleteCategoryIcon />
                </IconButton>
            }
            {
                element==="edit" && <IconButton 
                    color="primary" 
                    aria-label="category option"
                    name="edit"
                    id={id}
                    onClick={e => handleClick(e)}
                    disabled={!profile.canWrite({ user })}
                >
                    <EditCategoryIcon />
                </IconButton>
            }
        </Fragment>
    });
}

export default ButtonControls;