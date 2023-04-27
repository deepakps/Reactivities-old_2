import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

// Date - 22nd Feb, 2023.

/*Code refactored & shifted to activityStore.ts. Date - 26th Apr, 2023.
interface Props {
    openForm: () => void;
}*/

export default function NavBar(/*{ openForm }: Props*/) {
    const { activityStore } = useStore();

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
                    <Button onClick={() => activityStore.openForm()} positive content="Create Activity" />
                </Menu.Item>
            </Container>
        </Menu>
    )
}