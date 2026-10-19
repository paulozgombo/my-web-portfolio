'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import {
    Brand,
    Container,
    GlassBar,
    MenuButton,
    MenuLine,
    MenuLink,
    MenuPanel,
    NavbarContainer,
} from './style'

type links = {
    label: string,
    href: string
}

const defaultLinks: links[] = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
]

const panelVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { type: 'spring', stiffness: 360, damping: 30, staggerChildren: 0.055 },
    },
    exit: { opacity: 0, y: -6, scale: 0.98, transition: { duration: 0.16 } },
}

const linkVariants: Variants = {
    hidden: { opacity: 0, y: -5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
}

const glassBarVariants: Variants = {
    clear: {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        borderColor: 'rgba(0, 0, 0, 0)',
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        backdropFilter: 'blur(0px)',
    },
    glass: {
        backgroundColor: 'rgba(255, 255, 255, 0.72)',
        borderColor: 'rgba(0, 0, 0, 0.08)',
        boxShadow: '0 10px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(20px)',
    },
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isOverContent, setIsOverContent] = useState(false)
    const navbarRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const navbar = navbarRef.current
        if (!navbar) return

        const updateOverlap = () => {
            const navbarRect = navbar.getBoundingClientRect()
            const contentElements = document.querySelectorAll<HTMLElement>(
                'main, section, article, footer, div, [data-navbar-underlay]',
            )
            const overlapsContent = Array.from(contentElements).some((element) => {
                if (navbar.contains(element)) return false

                const contentRect = element.getBoundingClientRect()
                return (
                    contentRect.width > 0 &&
                    contentRect.height > 0 &&
                    contentRect.top < navbarRect.bottom &&
                    contentRect.bottom > navbarRect.top &&
                    contentRect.left < navbarRect.right &&
                    contentRect.right > navbarRect.left
                )
            })

            setIsOverContent(overlapsContent)
        }

        updateOverlap()
        window.addEventListener('scroll', updateOverlap, { passive: true })
        window.addEventListener('resize', updateOverlap)

        return () => {
            window.removeEventListener('scroll', updateOverlap)
            window.removeEventListener('resize', updateOverlap)
        }
    }, [])

    return (
        <Container ref={navbarRef}>
            <NavbarContainer aria-label="Main navigation">
                <GlassBar
                    variants={glassBarVariants}
                    initial="clear"
                    animate={isOverContent ? 'glass' : 'clear'}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Brand href="/" aria-label="Pauloz home">
                        Pauloz<span>.</span>
                    </Brand>
                    <MenuButton
                        type="button"
                        aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isOpen}
                        aria-controls="primary-navigation"
                        onClick={() => setIsOpen((open) => !open)}
                        whileTap={{ scale: 0.92 }}
                    >
                        <MenuLine animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} />
                        <MenuLine animate={isOpen ? { opacity: 0 } : { opacity: 1 }} />
                        <MenuLine animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} />
                    </MenuButton>
                </GlassBar>

                <AnimatePresence>
                    {isOpen && (
                        <MenuPanel
                            id="primary-navigation"
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={panelVariants}
                            style={{ transformOrigin: 'top right' }}
                        >
                            {defaultLinks.map((link) => (
                                <motion.div key={link.href} variants={linkVariants}>
                                    <MenuLink href={link.href} onClick={() => setIsOpen(false)}>
                                        {link.label}
                                    </MenuLink>
                                </motion.div>
                            ))}
                        </MenuPanel>
                    )}
                </AnimatePresence>
            </NavbarContainer>
        </Container>
    )
}