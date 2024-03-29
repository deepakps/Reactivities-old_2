import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

// Date - 06th Apr, 2023.

interface Props {
    inverted?: boolean;
    content: string;
}

export default function LoadingComponent({ inverted = true, content = 'Loading Activity...' }: Props) {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}