import React, { Fragment } from 'react';

const Documents = ({ 
    library_documents,
    renderDocuments
}) => (<Fragment>
    { renderDocuments(library_documents) }
</Fragment>)

export default Documents;
