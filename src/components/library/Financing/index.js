import React, { Fragment } from 'react';

const Financing = (props) => {

    const { library, general } = props;

    return general && (
        !general.isLoading ? (
            <Fragment>
                { props.renderDocuments(library) }
            </Fragment>
        ) : <div className="loader"></div>
    )

}

export default Financing;
