import React, { Fragment, Component } from 'react';

// import SearchInputControl from '../forms/search.form.field';

import './library.css';
import ButtonControl from '../forms/buttons/button.default.control';
import { Intent } from '@blueprintjs/core';
import { Divider, withStyles, FormControl, Paper } from '@material-ui/core';
import styles from '../contact/form.styles';
import { UserProfile, profile } from '../user/user.profile';
import { SelectInputControl } from '../forms/form.selectinput.field';

/**
 * List all documents by category groups
 * 
 * @author Isaac S. Mwakabira
 * 
 */
class ListLibraryDocuments extends Component {

    constructor() {
        super()
        this.state = {
            lock: false
        }
    }

    componentDidMount() {

        // Library filters/subcategories
        const resources = this.props.maincategory;
        const { lock } = this.state;

        // if resources not null
        if (resources !== null && !lock) {

            if (resources.subCategories.length !== 0) {
                // first subcategory in the library main category
                
                // fetch its documents
                // this.props.fetchCategoryDocs(resources.subCategories[0]._id);

                // set lock to true
                Object.assign(this.state, { lock: true });
            }

        }
    }

    handleChange = (event) => {

        const resourceSelected = event.target.value;

        const resources = this.props.maincategory;

        // if resources not null
        if (resources !== null) {

            // then iterate through the subcategories
            // and filter the chosen section
            const filteredResource = resources.subCategories.length !== 0 && resources.subCategories.filter(resource => {

                if (resourceSelected !== null && resource !== null) {
                    // check if the chosen resource from the drop down list
                    // equals one of the resources/subCategories
                    // in Library
                    if (resource.name === resourceSelected) {
                        return resource;
                    } else {
                        return null;
                    }
                } else {
                    return null;
                }

            });

            // was anything returned
            if (filteredResource) {
                // fetch its documents
                this.props.fetchCategoryDocs(filteredResource[0]._id);

                this.setState({ [event.target.name]: resourceSelected })
            }
        }
    }

    render() {

        const { classes, general, handleClick, sub_cate_documents } = this.props;

        // Library filters/subcategories
        const resources = this.props.maincategory;

        // authenticated user
        const user = UserProfile.get();

        return (
            <Fragment>

                <ButtonControl
                    intent={Intent.NONE}
                    value="New Document"
                    name="create"
                    handleClick={e => handleClick(e)}
                    disabled={!profile.canWrite({ user })}
                />

                <div className={classes.margin} />

                <Divider />

                <div className={classes.margin} />

                { /** filter categories here */}
                <FormControl>

                    <Paper elevation={0}>

                        <SelectInputControl
                            name="library_resource"
                            {...this.state}
                            onChange={e => this.handleChange(e)}
                            value={this.state.library_resource }
                        >
                            <option value="">{`Choose library resource`}</option>
                            {
                                (resources !== null && resources !== undefined) && (
                                    resources.subCategories.length !== 0 && resources.subCategories.map(({ _id, name }, index) => {

                                        // filters
                                        return <option id={_id} key={`${index}`} value={name}>{name}</option>

                                    })
                                )
                            }
                        </SelectInputControl>

                    </Paper>

                </FormControl>

                {
                    general && (
                        !general.isLoading ? (
                            sub_cate_documents !== null ? (
                                sub_cate_documents.length !== 0 ? (
                                    <Fragment>

                                        <ul>
                                            {
                                                sub_cate_documents.map((document, index) => {

                                                    return (
                                                        <Fragment key={document.name}>
                                                            <li id={index} key={document.name}>
                                                                <div style={{ marginTop: `0.5em` }}>
                                                                    {`${document.name}(${document.filename})`}
                                                                </div>
                                                                {/* {
                                                                    !profile.canWrite({ user })
                                                                        ? <a href="#/">{document.name}</a>
                                                                        : <a
                                                                            href={`${'/library/' + document.name}`}
                                                                            onClick={(e) => handleClick(e)}
                                                                            name="edit"
                                                                            id={document.name}
                                                                        >
                                                                            {document.name}
                                                                        </a>
                                                                } */}
                                                            </li>
                                                        </Fragment>
                                                    );

                                                })
                                            }
                                        </ul>

                                    </Fragment>
                                ) : <div>No documents found</div>
                            ) : <div>No documents found</div>
                        ) : (
                                <div style={{ marginTop: `50px` }} className="loader" />
                            )
                    )
                }
            </Fragment>
        );
    }

};

export default withStyles(styles)(ListLibraryDocuments);