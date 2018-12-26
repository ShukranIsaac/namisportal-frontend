import React, { Component } from 'react';
import { Elevation, Button, Card } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox';

import ContactForm from './contact.form';

class Contact extends Component {

  render(){

    return (
      <>

        <Flex
          wrap
          align='center'
          justify='center'
          m={1}
          w={1}
          p={3}
          className='landing-info'>
          <Box w={1/2} p={1}>
            bhvrvbble;o
          </Box>
          <Box w={1/2} p={1}>

            <Card elevation={Elevation.TWO}>

              <ContactForm />

            </Card>

          </Box>
        </Flex>

      </>
    );

  }
}

export default Contact;
