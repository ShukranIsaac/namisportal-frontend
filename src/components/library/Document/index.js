import React, { Component } from 'react'
import { Button, Card, Callout, Collapse, Elevation, Icon } from "@blueprintjs/core"
import { redirect } from '../../user/user.redirect';

export default class Document extends Component {

    constructor(){
        super();
        this.state = {
            isOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render(){
        const button = {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            borderRadius: '0',
            background: '#BFCCD6',
            fontSize: '1.2em',
            padding: '10px',
            cursor: 'pointer'
        }

        const docContainer = {
            marginBottom: '10px',
            textAlign: 'left'
        }

        const alignCenter = {
            textAlign: 'center'
        }

        let { name, path, summary, index } = this.props;

        return (
            <div style={docContainer}>
                <Callout onClick={this.handleClick} style={button} righticon="add">
                    <div style={{ alignSelf: 'flex-start'}}>{`${ index }. ${ name }`}</div>
                    <div style={{marginLeft: 'auto'}}>
                        { this.state.isOpen ? <Icon icon="remove"/> : <Icon icon="add"/>}
                    </div>
                </Callout>
                <Collapse isOpen={this.state.isOpen}>
                <Card interactive={true} elevation={Elevation.ZERO}>
                    <p> { summary } </p>
                    <a  href="#/" onClick={ e => redirect.toExternalLink({ url: path, event: e })} download={name}>
                        <Button style={alignCenter} rightIcon="download" intent="success" text="Download" />
                    </a>
                </Card>
                </Collapse>

            </div>
        );
    }

    handleClick(){

        this.setState({isOpen: !this.state.isOpen})
        
    }
}
