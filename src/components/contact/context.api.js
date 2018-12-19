import React, { Component } from 'react';

// new context
const AppContext = React.createContext();

// then new provider
class MyProvider extends Component {

  state = {
    name: '',
    age: 0,
  }

  render() {

      return (
        <AppContext.Provider value={{ state: this.state, }}>

            {this.props.children}

        </AppContext.Provider>
      );

  }

}

const Family = (props) => {

  return (
    <div className="family">

      <Person />

    </div>
  );
}

class Person extends Component {

  render() {

    return (
      <div className="person">

        <AppContext.Consumer>
            {
              (context) => {
                  return (
                    <React.Fragment>

                        <p>{context.state.name} - {context.state.age}</p>

                    </React.Fragment>
                  );
              }
            }
        </AppContext.Consumer>

      </div>
    );
  }
}

class Contact extends Component {

  state = {
    name: 'Isaac',
    age: 23,
    cool: true,
  }

  render(){

    return (
      <MyProvider>

        <Family />

      </MyProvider>
    );

  }
}

export default Contact;