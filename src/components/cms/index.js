import React, { Fragment, Component } from 'react';
import { Flex } from 'reflexbox';
import { Elevation, Card } from "@blueprintjs/core";

import CustomColumn from '../news/custom.column';
import { UserContext } from '../user/user.context';
import FormTextareaField from '../forms/form.textarea.field';
import FormTextInputField from '../forms/form.textinput.field';
import FormFileinputField from '../forms/form.fileinput.field';
import ButtonControl from '../forms/buttons/button.default.control';
import { TextEditor } from '../forms/editor';

class CMSIndex extends Component {

    render() {
        return (
            <UserContext.Consumer>
                {
                    (context) => {
    
                        return (
                            <Fragment>
                
                                <Flex wrap row align='top' justify='left' m={1} w={1} p={1} style={{ margin: '0px' }}>
                    
                                    <CustomColumn w={1/5} p={0} style={{}}>
                                        
                                        <Card elevation={Elevation.ZERO}>
                                            side { `${ context.state.isLoggedIn }` }
                                        </Card>
                    
                                    </CustomColumn>
                    
                                    <CustomColumn w={1/2} p={1} style={{}}>
    
                                        <FormTextareaField
                                            name="content"
                                            placeholder="News content..."
                                            handleChange={ (e) => {
                                                console.log(e.target.value);
                                            }}
                                        />
    
                                        <FormTextInputField
                                            name="title"
                                            placeholder="Article title..."
                                            type="text"
                                            handleChange={ e => {
                                                console.log(e.target.value);
                                            } }
                                        />
    
                                        <FormFileinputField 
                                            handleInputChange={ e => {
                                                console.log(e.target.value);
                                            }} 
                                        />
    
                                        <ButtonControl
                                            value="Edit"
                                        />
    
                                        <TextEditor />
    
                                    </CustomColumn>
                    
                                </Flex>
                
                            </Fragment>
                        );
    
                    }
                }
            </UserContext.Consumer>
        );
    }

}

export default CMSIndex;