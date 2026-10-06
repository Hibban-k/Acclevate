import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';

const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-transparent";

const variantStyles = {
    primary: "bg-brand-deep text-white hover:bg-ink",
    secondary: "bg-transparent border-brand-primary text-brand-deep hover:bg-surface-muted",
    outline: "bg-transparent text-ink hover:bg-surface-muted",
    ghost: "bg-transparent text-text-secondary hover:text-ink hover:bg-surface-muted",
};

const sizeStyles = {
    sm: "px-4 py-2 text-sm gap-2",
    md: "px-6 py-2.5 text-sm gap-2.5",
    lg: "px-8 py-3 text-base gap-2.5",
};

type BaseButtonProps = {
    variant?: keyof typeof variantStyles;
    size?: keyof typeof sizeStyles;
    withArrow?: boolean;
    className?: string;
    children: React.ReactNode;
};

type ButtonAsLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', withArrow = false, className = '', children, ...props }, ref) => {
        
        const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

        const arrowIcon = withArrow && (
            <svg className="w-4 h-4 translate-y-[0.5px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
        );

        if (props.href) {
            return (
                <Link ref={ref as any} href={props.href} className={combinedClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    <span>{children}</span>
                    {arrowIcon}
                </Link>
            );
        }

        return (
            <button ref={ref as any} className={combinedClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
                <span>{children}</span>
                {arrowIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';
