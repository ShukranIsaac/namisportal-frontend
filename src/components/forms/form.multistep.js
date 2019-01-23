import React, { Fragment, Component } from 'react';

import '../../assets/css/process_tracker.css';

import ConceptNote from '../financing/process/financing.concept.note';
import ConceptNoteAppraisal from '../financing/process/financing.concept.appraisal';
import PrefeasibilityStudy from '../financing/process/financing.prefeasibility.study';
import { GrantApplication } from '../financing/process/financing.application.grant';
import { PreliminaryEvaluation } from '../financing/process/financing.preliminary.evaluation';
import { FeasibilityReport } from '../financing/process/financing.feasibility.report';
import { GrantFinalEvaluation } from '../financing/process/financing.final.evaluation';
import { GrantDisbursement } from '../financing/process/financing.disbursement';

/**
 * Gets current nav stage state
 * 
 * @param {Integer} indx 
 * @param {Integer} length 
 */
const getNavStates = (indx, length) => {

    let styles = []

    for (let i = 0; i < length; i++) {

      if (i < indx) {
        styles.push('done')
      } else if (i === indx) {
        styles.push('doing')
      } else {
        styles.push('todo')
      }

    }

    return { current: indx, styles: styles }
}

/**
 * Check current stage state
 * 
 * @param {Integer} currentStep 
 * @param {Integer} stepsLength 
 */
const checkNavState = (currentStep, stepsLength) => {

    if (currentStep > 0 && currentStep < stepsLength - 1) {

        return {
            showPreviousBtn: true,
            showNextBtn: true,
            showSaveButton: false
        }

    } else if (currentStep === 0) {

        return {
            showPreviousBtn: false,
            showNextBtn: true,
            showSaveButton: false
        }

    } else if(currentStep === stepsLength - 1) {

        return {
            showSaveButton: true,
            showNextBtn: false,
        }

    } else {

        return {
            showPreviousBtn: true,
            showNextBtn: false,
            showSaveButton: false
        }

    }
}

/**
 * Multi-step form process completion
 * 
 * @author Isaac S. Mwakabira
 * 
 */
export class MultiStepForm extends Component {

    state = {
        showPreviousBtn: false,
        showNextBtn: true,
        showSaveButton: false,
        compState: 0,
        navState: getNavStates(0, this.props.steps.length),
        formFields: {},
    }

    /**
     * Set navigation state ie. stage
     * 
     * @param {Integer} next
     */
    setNavState = next => {

        this.setState({
            navState: getNavStates(next, this.props.steps.length)
        });

        if (next < this.props.steps.length) {
            this.setState({ compState: next })
        }

        this.setState(checkNavState(next, this.props.steps.length));

    }

    /**
     * Press 'Enter' or click on progress bar for next step.
     * 
     * @param {Event} evt
     */
    handleKeyDown = evt => {

        if (evt.which === 13) {
            this.next()
        }

    }

    /**
     * Handle user event change
     * 
     * @param {Event} event
     * 
     */
    handleChange= (event) => {

        this.setState({ [event.target.name]: event.target.value });

    }

    /**
     * Handle user event onClick navigation stage: progress bar
     * 
     * @param {Event} evt
     * 
     */
    handleOnClick = evt => {

        const currentIndex = evt.currentTarget.value;

        if (currentIndex === this.props.steps.length - 1 && this.state.compState === this.props.steps.length - 1) {
            this.setNavState(this.props.steps.length);
        } else {
            this.setNavState(currentIndex);
        }

    }
  
    next = () => {
        this.setNavState(this.state.compState + 1)
    }
  
    previous = () => {

        if (this.state.compState > 0) {
            this.setNavState(this.state.compState - 1)
        }

    }
  
    getClassName = (className, i) => {
        
        return className + '-' + this.state.navState.styles[i];
    }

    /**
     * Render steps progress tracker 
     * and apply all appropriate styles
     * 
     * @returns {List} li
     */
    renderSteps = () => {

        return this.props.steps.map((s, i) => (
            <li
                className={this.getClassName('progtrckr', i)}
                onClick={this.handleOnClick}
                key={i}
                value={i}
            >
                <em>{i + 1}</em>
                <span>{ i + 1}</span>
                {/* <span>{ this.props.steps[i].name }</span> */}
            </li>
        ));

    }

    /**
     * Save current fields data in the current state and continue to
     * the next stage in the process
     * 
     * @param {Object} fields
     * 
     */
    save = (fields) => {

        return function() {
            // fieldValues is in the initial state of the component, we are simply appending
            // to and overriding keys in `fieldValues` with the `fields` with Object.assign
            this.setState({ fieldValues: Object.assign({}, this.state.fieldValues, fields) });
        }();
    }

    /**
     * Submit to the remote datasource
     * 
     */
    submit = () => {}

    /**
     * Each case renders a specific component
     * and expecting the user to supplies all required field data before saving 
     * to continue to the next stage in the process of finance application
     * 
     * @param {Integer} componentState
     * 
     */
    renderComponent = (componentState) => {

        switch(componentState) {
            case 0:
                return (
                    <Fragment>
                        <ConceptNote next={ this.next } />
                    </Fragment>
                );

            case 1:
                return (
                    <Fragment>
                        <ConceptNoteAppraisal next={ this.next } />
                    </Fragment>
                );

            case 2:
                return (
                    <Fragment>
                        <PrefeasibilityStudy next={ this.next } />
                    </Fragment>
                );

            case 3:
                return (
                    <Fragment>
                        <GrantApplication next={ this.next } />
                    </Fragment>
                );

            case 4:
                return (
                    <Fragment>
                        <PreliminaryEvaluation next={ this.next } />
                    </Fragment>
                );

            case 5:
                return (
                    <Fragment>
                        <FeasibilityReport next={ this.next } />
                    </Fragment>
                );

            case 6:
                return (
                    <Fragment>
                        <GrantFinalEvaluation next={ this.next } />
                    </Fragment>
                );

            case 7:
                return (
                    <Fragment>
                        <GrantDisbursement submit={ this.submit } />
                    </Fragment>
                );

            default: {

                return (
                    <Fragment></Fragment>
                );

            }
                
        }

    }

    /**
     * renders this component
     */
    render () {

      return (
            <div onKeyDown={this.handleKeyDown}>

                <ol className='progtrckr'> {this.renderSteps()} </ol>

                <div className='container'>

                    {this.renderComponent(this.state.compState)}

                    <div style={this.props.showNavigation ? {} : { display: 'none' }}>

                        <button
                            style={this.state.showPreviousBtn ? {} : { display: 'none' }}
                            onClick={this.previous}
                        >
                        Previous
                        </button>

                        <button
                            style={this.state.showNextBtn ? {} : { display: 'none' }}
                            onClick={this.next}
                        >
                        Next
                        </button>

                        <button
                            style={this.state.showSaveButton ? {} : { display: 'none' }}
                            onClick={this.save}
                        >
                        Save
                        </button>

                    </div>
                    
                </div>
            </div>
        );
    }
}

/**
 * Default props ie. set navigation true to be shown
 */
MultiStepForm.defaultProps = {
    showNavigation: true
}