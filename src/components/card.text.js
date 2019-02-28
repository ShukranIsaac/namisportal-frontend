import React from 'react';

/**
 * Card to show when there is no data from the API
 * 
 * @author Isaac S. Mwakabira
 * @param {String} text 
 */
export const NoDataCard = ({ text }) => {

    return (
        <div className="card" style={{ background: '#dcdde1',  marginBottom: '30px' }}>
            <div className="card-body" style={{ padding: '20px' }}> { text } </div>
        </div>
    );

}