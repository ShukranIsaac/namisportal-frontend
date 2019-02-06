import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

const UserFormCheckbox = ({ value, label, onChecked,  }) => {

    return (
      <>
        <Checkbox label={label} />
      </>
    );

}

export default UserFormCheckbox;
