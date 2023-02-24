import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

// Date - 22nd Feb, 2023.

export default function NavBar() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    {/* Specifying just number indicates 'px'.
                    Date - 22nd Feb, 2023. */}
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}