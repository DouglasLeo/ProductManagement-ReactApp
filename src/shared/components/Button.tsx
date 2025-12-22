import React from 'react';

const Button = ({
                    children,
                    disabled,
                    ...props
                }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {

    return (
        <button disabled={disabled} {...props}>
            {children}
        </button>
    );
};

export default Button;