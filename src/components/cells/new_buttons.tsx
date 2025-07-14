"use client";

import { Button } from "@/components/buttons/button";
import "@/app/globals.css";

const noChildren = "";

/*
 * The most basic form of a button; Everything depends on this.
 * Only manages CSS.
 * Future business logics must be managed by the higher wrappers/further down dependents
 */
function _BaseWithoutBorderButton({
    children,
    yellowBackground,
    icon,
    onClick,
    className = "",
}) {
    const background = yellowBackground
        ? "hover:bg-[#ffffff] bg-[#efefef]"
        : "bg-[#ffffff] hover:bg-[#efefef]";

    return (
        <Button
            className={`${background} !flex items-center justify-between ${className}`}
            onClick={onClick}
        >
            <span className="material-icons-round"> {icon} </span>

            {/*this ternary is useless but it's just to make the code more readable */}
            {children ? (
                <span className="text-base font-normal "> {children} </span>
            ) : (
                noChildren
            )}
        </Button>
    );
}

// Wraps/Depends on _BaseWithoutBorderButton
function _BaseWithBorderButton({
    children,
    onClick,
    yellowBackground,
    className = "",
    icon = "",
}) {
    return (
        <_BaseWithoutBorderButton
            icon={icon}
            yellowBackground={yellowBackground}
            className={`border-2 border-[#dcdcdc] hover:border-[#efefef] border-opacity-100 ${className}`}
            onClick={onClick}
        >
            {children}
        </_BaseWithoutBorderButton>
    );
}

// Wraps/Depends on _BaseWithBorderButton
export function ButtonIconOnlyBorder({
    onClick,
    icon,
    yellowBackground = false,
    className = "",
}) {
    return (
        <_BaseWithBorderButton
            icon={icon}
            onClick={onClick}
            className={className}
            yellowBackground={yellowBackground}
        >
            {noChildren}
        </_BaseWithBorderButton>
    );
}

// Wraps/Depends on _BaseWithBorderButton
export function ButtonWithTextBorder({
    text,
    onClick,
    yellowBackground = false,
    icon,
    className = "",
}) {
    return (
        <_BaseWithBorderButton
            onClick={onClick}
            className={className}
            icon={icon}
            yellowBackground={yellowBackground}
        >
            {text}
        </_BaseWithBorderButton>
    );
}

// Wraps _BaseWithoutBorderButton
export function ButtonIconOnlyBorderless({
    onClick,
    icon,
    yellowBackground = false,
    className = "",
}) {
    return (
        <_BaseWithoutBorderButton
            onClick={onClick}
            className={className}
            icon={icon}
            yellowBackground={yellowBackground}
        >
            {noChildren}
        </_BaseWithoutBorderButton>
    );
}

// Wraps _BaseWithoutBorderButton
export function ButtonWithTextBorderless({
    text,
    onClick,
    icon,
    yellowBackground = false,
    className = "",
}) {
    return (
        <_BaseWithoutBorderButton
            onClick={onClick}
            className={className}
            icon={icon}
            yellowBackground={yellowBackground}
        >
            {text}
        </_BaseWithoutBorderButton>
    );
}

export function DEBUGComponent() {
    // TODO: ButtonWithTextBorderless
    return (
        <>
            <ButtonIconOnlyBorder
                icon="arrow_upward"
                onClick={() => alert("Clicked!")}
            />

            <ButtonIconOnlyBorderless
                icon="arrow_upward"
                onClick={() => alert("Clicked!")}
            />

            <ButtonWithTextBorder
                text="lebron james"
                onClick={() => alert("BUttone with thext border ")}
                icon="arrow_upward"
            />

            <ButtonWithTextBorderless
                text="lmas"
                onClick={() => alert("BUttone with thext no border ")}
                icon="arrow_upward"
            />
        </>
    );
}

// TODO:
// - btns with icon [DONE]
//      - with borders
//          - with text
//          - without text
//      - w/o borders
//          - with text
//          - without text
// - make use of globals.css [DONE]
// - rectify globals.css to use the figma icons i guess? [ABANDONNED]
