import React, { Component } from 'react';
import { Collapse, Callout, Icon, Card, Elevation } from '@blueprintjs/core';
import { redirect } from '../../user/user.redirect';

//  import '../style.css'

/**
 * Renders a single panel
 * 
 * @author Paul Sembereka (Pablo)
 * 
 */
class Panel extends Component{

    constructor(){
        super()
        this.state = {
            isOpen: false,
            collapsed: false
        }
        this.handleClick = this.handleClick.bind(this)
    }
   
    handleExternalLink = (text) => {

        /**
         * Find <a> tags in the text passed to the method, 
         * Set onclick event and return the final modified text to be rendered
         */
        const textLink = (text || "")
            .replace(/([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi, (match, space, url) => {

                var hyperlink = url;
                if (!hyperlink.match('^https?:\/\/')) {
                    hyperlink = 'http://' + hyperlink;
                }

                return (
                    space + '<a name="link" href="' + hyperlink + '" onClick="'+ 
                    eval(`${ (e) => redirect.toExternalLink({ url: e.target.href, event: e }) }`) +
                    '">' + url + '</a>'
                );

            }
          )

        console.log(textLink);

    }
    
    render(){
        
        const button = {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            borderRadius: '0',
            background: '#D8E1E8',
            fontSize: '1.2em',
            padding: '10px',
            cursor: 'pointer'
        }

        const docContainer = {
            marginBottom: '10px',
            textAlign: 'left'
        }
        
        let { heading, text } = this.props;
        this.handleExternalLink(text);

        return (
            <div style={docContainer}>
                <Callout onClick={this.handleClick} style={button} righticon="add">
                    <div style={{ alignSelf: 'flex-start'}}>{ heading }</div>
                    <div style={{marginLeft: 'auto'}}>
                       { this.state.collapsed ? <Icon icon="remove"/> : <Icon icon="add"/>} 
                    </div>
                </Callout>
                
                <Collapse isOpen={this.state.isOpen}>   
                    <Card interactive={true} elevation={Elevation.ZERO}>
                        <p dangerouslySetInnerHTML={{ __html: text }} />
                    </Card>
              </Collapse>
            </div>
        )
    }

    handleClick(){
        this.setState(() => ({isOpen: !this.state.isOpen, collapsed: !this.state.collapsed}))
    }
    
}

export default Panel;

