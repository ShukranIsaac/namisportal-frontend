import React, { Component } from 'react';
import BootstrapGridColumn from './form.grid.column';
import "../gis/dynamic.form.css";

export default class DynamicFormFields extends Component {

    constructor() {
        super();
        this.state = {
            shareholderName: "",
            shareholders: [{ shareholderName: "", shareholderValue: "" }]
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleNameChange = evt => {
        this.setState({ shareholderName: evt.target.value, shareholderValue: "" });
    };

    handleShareholderNameChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
            if (idx !== sidx) return shareholder;
            return { ...shareholder, shareholderName: evt.target.value, shareholderValue: "" };
        });

        this.setState({ shareholders: newShareholders });
    };

    handleSubmit = evt => {
        evt.preventDefault();
        const { shareholderName, shareholders } = this.state;
        alert(`Incorporated: ${shareholderName} with ${shareholders.length} shareholders`);
    };

    handleAddShareholder = () => {
        this.setState({
            shareholders: this.state.shareholders.concat([{ shareholderName: "", shareholderValue: "" }])
        });
    };

    handleRemoveShareholder = idx => () => {
        this.setState({
            shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });
    };

    render() {

        return (
            <form onSubmit={this.handleSubmit}>

                {this.state.shareholders.map((shareholder, idx) => (
                    <div className="shareholder margin-fix form-row">
                        <strong>{(idx + 1)}.</strong>
                        <BootstrapGridColumn>
                            <input
                                type="text"
                                placeholder="Name"
                                value={shareholder.shareholderName}
                                onChange={this.handleShareholderNameChange(idx)}
                            />
                        </BootstrapGridColumn>
                        <BootstrapGridColumn>
                            <input
                                type="text"
                                placeholder="Value"
                                value={shareholder.shareholderValue}
                                onChange={this.handleShareholderNameChange(idx)}
                            />
                        </BootstrapGridColumn>
                        <button
                            type="button"
                            onClick={this.handleRemoveShareholder(idx)}
                            className="small"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <div className="shareholder margin-fix form-row">
                    <BootstrapGridColumn>
                        <input
                            type="submit"
                            className="small"
                            value="Submit"
                        />
                    </BootstrapGridColumn>
                    <BootstrapGridColumn>
                        <input
                            type="button"
                            onClick={this.handleAddShareholder}
                            className="small"
                            value="Add Line"
                        />
                    </BootstrapGridColumn>
                </div>
            </form>
        )

    }

}