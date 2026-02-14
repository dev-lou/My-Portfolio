'use client'

import { motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

interface SlideInButtonProps {
    children: ReactNode
    onClick?: () => void
    href?: string
    variant?: 'primary' | 'secondary'
    icon?: ReactNode
    iconPosition?: 'left' | 'right'
    className?: string
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
    fullWidth?: boolean
}

export default function SlideInButton({
    children,
    onClick,
    href,
    variant = 'primary',
    icon,
    iconPosition = 'right',
    className = '',
    type = 'button',
    disabled = false,
    fullWidth = false,
}: SlideInButtonProps) {
    const [isHovered, setIsHovered] = useState(false)

    const baseClasses = `
        relative overflow-hidden
        px-6 py-3.5
        rounded-xl
        font-medium
        transition-colors duration-300
        flex items-center justify-center gap-2
        ${fullWidth ? 'w-full' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    `

    const variantClasses = {
        primary: `
            bg-transparent
            text-white
            border border-blue-500/50
        `,
        secondary: `
            bg-transparent
            text-gray-300
            border border-white/20
        `,
    }

    const fillColors = {
        primary: 'from-blue-500 to-cyan-500',
        secondary: 'from-white/20 to-white/10',
    }

    const hoverHandlers = {
        onMouseEnter: () => !disabled && setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    }

    const content = (
        <>
            {/* Background fill animation - slides from left on hover */}
            <motion.span
                className={`absolute inset-0 bg-gradient-to-r ${fillColors[variant]}`}
                initial={false}
                animate={{ x: isHovered ? '0%' : '-100%' }}
                transition={{ 
                    type: 'tween',
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1]
                }}
            />
            
            {/* Shine effect on hover */}
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={false}
                animate={{ x: isHovered ? '200%' : '-200%' }}
                transition={{ 
                    type: 'tween',
                    duration: 0.5,
                    ease: 'easeInOut',
                    delay: isHovered ? 0.1 : 0
                }}
            />

            {/* Content */}
            <span className="relative z-10 flex items-center gap-2">
                {icon && iconPosition === 'left' && (
                    <motion.span
                        className="flex items-center"
                        animate={{ x: isHovered ? -2 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        {icon}
                    </motion.span>
                )}
                <span>{children}</span>
                {icon && iconPosition === 'right' && (
                    <motion.span
                        className="flex items-center"
                        animate={{ x: isHovered ? 3 : 0 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        {icon}
                    </motion.span>
                )}
            </span>
        </>
    )

    // If href is provided, render as link
    if (href) {
        const isExternal = href.startsWith('http')
        return (
            <motion.a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                animate={{ 
                    scale: isHovered ? 1.02 : 1,
                    y: isHovered ? -2 : 0,
                    borderColor: isHovered ? 'transparent' : undefined
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                {...hoverHandlers}
            >
                {content}
            </motion.a>
        )
    }

    // Otherwise render as button
    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            animate={{ 
                scale: isHovered && !disabled ? 1.02 : 1,
                y: isHovered && !disabled ? -2 : 0,
                borderColor: isHovered ? 'transparent' : undefined
            }}
            whileTap={disabled ? {} : { scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...hoverHandlers}
        >
            {content}
        </motion.button>
    )
}

// Smaller variant for inline use
export function SlideInButtonSmall({
    children,
    onClick,
    href,
    variant = 'primary',
    icon,
    iconPosition = 'right',
    className = '',
}: Omit<SlideInButtonProps, 'type' | 'disabled' | 'fullWidth'>) {
    const [isHovered, setIsHovered] = useState(false)

    const baseClasses = `
        relative overflow-hidden
        px-4 py-2
        rounded-lg
        text-sm font-medium
        transition-colors duration-300
        flex items-center justify-center gap-1.5
    `

    const variantClasses = {
        primary: `
            bg-transparent
            text-white
            border border-blue-500/50
        `,
        secondary: `
            bg-transparent
            text-gray-300
            border border-white/20
        `,
    }

    const fillColors = {
        primary: 'from-blue-500 to-cyan-500',
        secondary: 'from-white/20 to-white/10',
    }

    const hoverHandlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    }

    const content = (
        <>
            <motion.span
                className={`absolute inset-0 bg-gradient-to-r ${fillColors[variant]}`}
                initial={false}
                animate={{ x: isHovered ? '0%' : '-100%' }}
                transition={{ type: 'tween', duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
            <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
                initial={false}
                animate={{ x: isHovered ? '200%' : '-200%' }}
                transition={{ type: 'tween', duration: 0.5, ease: 'easeInOut', delay: isHovered ? 0.1 : 0 }}
            />
            <span className="relative z-10 flex items-center gap-1.5">
                {icon && iconPosition === 'left' && icon}
                <span>{children}</span>
                {icon && iconPosition === 'right' && icon}
            </span>
        </>
    )

    if (href) {
        const isExternal = href.startsWith('http')
        return (
            <motion.a
                href={href}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className={`${baseClasses} ${variantClasses[variant]} ${className}`}
                animate={{ 
                    scale: isHovered ? 1.02 : 1,
                    borderColor: isHovered ? 'transparent' : undefined
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                {...hoverHandlers}
            >
                {content}
            </motion.a>
        )
    }

    return (
        <motion.button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            animate={{ 
                scale: isHovered ? 1.02 : 1,
                borderColor: isHovered ? 'transparent' : undefined
            }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            {...hoverHandlers}
        >
            {content}
        </motion.button>
    )
}
