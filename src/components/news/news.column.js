import React from 'react';
import { Box } from 'reflexbox';

import NewsListItem from './news.list.item';

const NewsColumn = ({w, p, props}) => {

    return (
        <>
            <Box w={w} p={p}>
                
                <NewsListItem {...props} />

                <NewsListItem {...props} />

                <NewsListItem {...props} />

            </Box>
        </>
    );

}

export default NewsColumn;