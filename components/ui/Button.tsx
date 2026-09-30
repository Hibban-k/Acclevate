import Link from 'next/link';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, forwardRef } from 'react';

// Common base styles for all buttons
const baseStyles = "inline-flex items-center justify-center font-semibold rounded-base transition-all duration-300";

const variantStyles = {
    primary: "bg-navy-900 text-white hover:bg-navy-800 shadow-md hover:shadow-premium-hover hover:-translate-y-0.5 active:translate-y-0 active:scale-95",
    secondary: "bg-transparent border shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-95 relative overflow-hidden",
    outline: "bg-transparent text-navy-900 border-2 border-navy-900 hover:bg-navy-50",
    ghost: "bg-transparent text-slate-600 hover:text-navy-900 hover:bg-slate-100",
};

const sizeStyles = {
    sm: "px-5 py-2.5 text-sm gap-2",
    md: "px-8 py-4 text-sm gap-2.5",
    lg: "px-10 py-5 text-base md:text-lg gap-2.5",
};

type BaseButtonProps = {
    variant?: keyof typeof variantStyles;
    size?: keyof typeof sizeStyles;
    withArrow?: boolean;
    textColor?: string;
    borderColor?: string;
    className?: string;
    children: React.ReactNode;
};

// Props for when the component is a Link
type ButtonAsLinkProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};

// Props for when the component is a regular button
type ButtonAsButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
};

type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ variant = 'primary', size = 'md', withArrow = false, textColor, borderColor, className = '', children, ...props }, ref) => {
        
        // If textColor or borderColor is provided, it will override the defaults
        const defaultTextColor = !textColor ? (variant === 'secondary' ? 'text-slate-800' : '') : '';
        const defaultBorderColor = !borderColor ? (variant === 'secondary' ? 'border-slate-400/40 hover:border-slate-400/80' : '') : '';
        
        const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${textColor || defaultTextColor} ${borderColor || defaultBorderColor} ${className}`;

        const arrowIcon = withArrow && (
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 font-normal relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        );

        const shinyEffect = variant === 'secondary' && (
            <div className="absolute top-0 -left-[150%] w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] group-hover:left-[200%] transition-all duration-700 ease-in-out pointer-events-none z-0" />
        );

        if (props.href) {
            return (
                <Link ref={ref as any} href={props.href} className={`group ${combinedClassName}`} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
                    {shinyEffect}
                    <span className="relative z-10">{children}</span>
                    {arrowIcon}
                </Link>
            );
        }

        return (
            <button ref={ref as any} className={`group ${combinedClassName}`} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
                {shinyEffect}
                <span className="relative z-10">{children}</span>
                {arrowIcon}
            </button>
        );
    }
);

Button.displayName = 'Button';
