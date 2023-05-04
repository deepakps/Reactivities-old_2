import { Button, Container, Menu } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

// Date - 22nd Feb, 2023.

/*Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.*/
export default function NavBar() {

    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    {/* Specifying just number indicates 'px'.
                    Date - 22nd Feb, 2023. */}
                    <img src="/assets/logo.png" alt="logo" style={{ marginRight: 10 }} />
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}