import React from "react";

/**
 * Props for the Button component.
 * @property {React.ReactNode} children - The content of the button.
 * @property {"button" | "submit"} [type] - The type of the button, defaults to "button".
 * @property {string} [className] - Additional CSS classes for the button.
 */
interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit";
    className?: string;
    disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button", className, ...props }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`bg-blue-500 text-white py-2 px-4 rounded 
                        hover:bg-blue-600 transition ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;