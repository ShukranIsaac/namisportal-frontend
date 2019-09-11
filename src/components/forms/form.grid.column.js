import React, { Component } from 'react';

/**
 * Grid Column
 * 
 * @author Isaac S. Mwakabira
 */
export default class BootstrapGridColumn extends Component {

    render() {

        return (
            <>
                {/* <!-- Grid column --> */}
                <div className="col">
                    {/* <!-- Material input --> */}
                    <div className="md-form mt-0">
                        {
                            this.props.children
                        }
                    </div>
                </div>
            </>
        );

    }

}