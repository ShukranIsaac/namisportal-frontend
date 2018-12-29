import React, { Fragment } from "react";
import { Button, Navbar, Alignment } from "@blueprintjs/core";
import { Link } from "react-router-dom";
import { Flex } from "reflexbox";

const AppHeader = () => {

    const navOption = {
        
    }

    return (
        <Fragment>

            <Flex wrap row p={0} w={[1, 1, 1]} m={0}>
                <Navbar>
                    <Navbar.Group align={Alignment.LEFT}>
                        <Link to="/">
                            <Navbar.Heading>Malawi Mini Grids</Navbar.Heading>
                        </Link>
                    </Navbar.Group>
                    <Navbar.Group align={Alignment.RIGHT}>

                        <Navbar.Divider />

                        <Link to="/">
                            <Button className="bp3-minimal" icon="home" text="Home" />
                        </Link>
                        <Link to="/licensing">
                            <Button className="bp3-minimal" icon="take-action" text="Licensing" />
                        </Link>
                        <Link to="/financing">
                            <Button className="bp3-minimal" icon="dollar" text="Financing" />
                        </Link>
                        <Link to="/library">
                            <Button className="bp3-minimal" icon="document" text="Library" />
                        </Link>
                        <Link to="/directory">
                            <Button className="bp3-minimal" icon="manual" text="Directory" />
                        </Link>
                        <Link to="/gis">
                            <Button className="bp3-minimal" icon="geosearch" text="GIS" />
                        </Link>
                        <Link to="/news">
                            <Button className="bp3-minimal" icon="applications" text="News" />
                        </Link>
                        <Link to="/faq">
                            <Button className="bp3-minimal" icon="help" text="FAQ" />
                        </Link>
                        <Link to="/contact">
                            <Button className="bp3-minimal" icon="id-number" text="Contact" />
                        </Link>

                        <Navbar.Divider />

                        <Link to="/cms">
                            <Button className="bp3-minimal" icon="user" />
                        </Link>
                        <Button className="bp3-minimal" icon="notifications" />
                        <Button className="bp3-minimal" icon="cog" />

                    </Navbar.Group>
                </Navbar>
            </Flex>

        </Fragment>
    );
}

export default AppHeader;