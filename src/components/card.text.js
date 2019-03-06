import React from 'react';
import { Callout } from '@blueprintjs/core';

/**
 * Card to show when there is no data from the API
 * 
 * @author Isaac S. Mwakabira
 * @param {String} text 
 */
export const NoDataCard = ({ text, header, intent }) => {

    return (
        <div>
            <Callout iconName='infor-sign' intent={ intent }>
                <h6>{ header }</h6>
                { text }
            </Callout>
        </div>
    );

}