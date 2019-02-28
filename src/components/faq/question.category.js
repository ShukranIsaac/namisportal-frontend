import React, { Component } from 'react'
import { Card, Callout, Collapse, Elevation, Icon } from "@blueprintjs/core"

/**
 * Render question category
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export default class QuestionCategory extends Component {

    constructor(){
        super();
        this.state = {
            isOpen: false
        }

        this.handleClick = this.handleClick.bind(this);
    }

    render() {

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

        const categoryContainer = {
            marginBottom: '10px',
            textAlign: 'left'
        }

        const { name, index } = this.props;

        return (
            <div style={categoryContainer}>

                <Callout onClick={this.handleClick} style={button} rightIcon="download">
                    <div style={{ alignSelf: 'flex-start'}}>{ (index + 1) + '. ' + name }</div>
                    <div style={{marginLeft: 'auto'}}> <Icon icon="download"/> </div>
                </Callout>

                <Collapse isOpen={this.state.isOpen}>

                    <Card interactive={true} elevation={Elevation.ZERO}>
                        
                        { this.props.children }

                    </Card>

                </Collapse>

            </div>
        );
    }

    handleClick(){

        this.setState({isOpen: !this.state.isOpen})
        
    }
}
