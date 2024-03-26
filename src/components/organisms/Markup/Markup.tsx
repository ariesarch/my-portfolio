import React from "react";
type Props = {
    children?: React.ReactNode;
};

export default function Markup({ children }: Props) {
    return <div>{children}</div>;
}
