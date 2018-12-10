import React, { Component } from 'react';
import { Select } from "@blueprintjs/select";
import { Button, MenuItem } from "@blueprintjs/core";

const LicensingSelect = Select.ofType();

class SelectDropdown extends Component {

  constructor(){
    super();
    this.state = {
      profile: '--Default--',
    }

  }

  handleValueChange = (profile) => {

    this.setState({ profile: `${profile.option}` });

  }

  filterFilm = (query, profile) => {

    return `${profile.option.toLowerCase()}`.indexOf(query.toLowerCase()) >= 0;

  };

  renderFilm = (profile, {handleClick, modifiers, query}) => {

    if (modifiers !== undefined && !modifiers.matchesPredicate) {

        return null;

    }

    const text = `${profile.option}`;

    return (
      <MenuItem
          active={modifiers.active}
          disabled={modifiers.disabled}
          key={text}
          onClick={handleClick}
          text={ text }
      />
    );

  }

  render() {

    const { profiles } = this.props;

    const { profile } = this.state;

    if (profiles === undefined && profiles === null) {

      return null;

    }

    return (
      <>
        <LicensingSelect
          name={profiles.name}
          items={profiles.options}
          itemRenderer={this.renderFilm}
          itemPredicate={this.filterFilm}
          onItemSelect={this.handleValueChange}
          onChange={this.props.onChange}>

          <Button text={profile} rightIcon="double-caret-vertical" />

        </LicensingSelect>
      </>
    );

  }

}

export default SelectDropdown;
