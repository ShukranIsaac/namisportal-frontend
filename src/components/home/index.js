import React, { Component } from 'react';
import { Elevation, Button, Card, Callout, Code, H5, Intent, Switch } from "@blueprintjs/core";
import { Flex, Box } from 'reflexbox'

class Home extends Component {
  render(){
    return (
      <div>
        <Flex p={4} align='center' justify='center'
        m={1}
        w={1}>
          <Box w={1/2} p={1} align='center'>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5><a href="#">Visually important content</a></h5>
            <p>
              The component is a simple wrapper around the CSS API that provides props for modifiers and optional
              title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
              element.
            </p>
            <Button>Chek it out</Button>
          </Card>
          </Box>
        </Flex>
        <Flex p={4} align='center' justify='center'
        m={1}
        w={1}>
          <Box w={1/3} p={1}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5><a href="#">Visually important content</a></h5>
            <p>
              The component is a simple wrapper around the CSS API that provides props for modifiers and optional
              title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
              element.
            </p>
            <Button>Chek it out</Button>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5><a href="#">Visually important content</a></h5>
            <p>
              The component is a simple wrapper around the CSS API that provides props for modifiers and optional
              title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
              element.
            </p>
            <Button>Chek it out</Button>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5><a href="#">Visually important content</a></h5>
            <p>
              The component is a simple wrapper around the CSS API that provides props for modifiers and optional
              title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
              element.
            </p>
            <Button>Chek it out</Button>
          </Card>
          </Box>
          <Box w={1/3} p={1}>
          <Card interactive={true} elevation={Elevation.TWO}>
            <h5><a href="#">Visually important content</a></h5>
            <p>
              The component is a simple wrapper around the CSS API that provides props for modifiers and optional
              title element. Any additional HTML props will be spread to the rendered <Code>{"<div>"}</Code>{" "}
              element.
            </p>
            <Button>Chek it out</Button>
          </Card>
          </Box>
        </Flex>
      </div>
    );
  }
}

export default Home;
