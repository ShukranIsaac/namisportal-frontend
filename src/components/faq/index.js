import React, { Component } from 'react';
import { Select } from "@blueprintjs/select";
import { Button, MenuItem } from "@blueprintjs/core";
const LicensingSelect = Select.ofType() 

const films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
]

class FAQ extends Component {
  constructor(){
    super();
    this.state = {
      film: films[0].title
    }
  }

  render(){


   // this.setState({film: })
    const { film } = this.state; 
    return (
      <div>
        <LicensingSelect 
          items={films} 
          itemRenderer={this.renderFilm} 
          itemPredicate={this.filterFilm} 
          onItemSelect={this.handleValueChange}>
          <Button text={film} rightIcon="double-caret-vertical" />
        </LicensingSelect>
      </div>
    );
  }

  handleValueChange = (film) => {
    const text = `${film.year}. ${film.title}`;
    
    this.setState({ film: text });
  }

  renderFilm = (film, { handleClick, modifiers, query }) => {
    if (!modifiers.matchesPredicate) {
        return null;
    }
    const text = `${film.year}. ${film.title}`;
    return (
        <MenuItem
            active={modifiers.active}
            disabled={modifiers.disabled}
            label={film.year.toString()}
            key={text}
            onClick={handleClick}
            text={ text }
        />
    );
  };

  filterFilm = (query, film) => {
    return `${film.title.toLowerCase()} ${film.year}`.indexOf(query.toLowerCase()) >= 0;
  };
}

export default FAQ;
