'use client';

// import Button from "./legacy_buttons/buttons"
import { ButtonIconOnlyBorderless } from "./new_buttons";
// import "tailwindcss";

export default function ButtonIsland() {
    return (
        <>
            <div className="flex justify-between w-auto h-8 rounded-lg absolute bg-[#efefef] right-16 top-[-18px] p-0.5 z-10">
                <ButtonIconOnlyBorderless
                    icon="play_arrow"
                    yellowBackground={true}
                    onClick={() => console.log("Play")}
                    className="mr-1"
                />
                <ButtonIconOnlyBorderless
                    icon="arrow_upward"
                    yellowBackground={true}
                    onClick={() => console.log("up")}
                    className="mr-1"
                />
                <ButtonIconOnlyBorderless
                    icon="arrow_downward"
                    yellowBackground={true}
                    onClick={() => console.log("down")}
                    className="mr-1"
                />
                <ButtonIconOnlyBorderless
                    icon="delete"
                    yellowBackground={true}
                    onClick={() => console.log("del")}
                />
            </div>
        </>
    );
}
