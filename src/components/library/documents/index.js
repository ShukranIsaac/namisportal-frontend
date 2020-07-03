import React, { Fragment } from 'react';

const Documents = ({ 
    library_documents, 
    general,
    renderDocuments
}) => general && (!general.isLoading ? (<Fragment>
            { renderDocuments(library_documents) }
        </Fragment>
    ) : <div className="loader" />
);

export default Documents;
