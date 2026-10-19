import Link from 'next/link'
import { motion } from 'framer-motion'
import styled from 'styled-components'

export const Container = styled.header`
    width: min(100% - 32px, 1200px);
    margin: 16px auto 0;
    position: sticky;
    top: 16px;
    z-index: 10;
`

export const NavbarContainer = styled.nav`
    width: 100%;
    position: relative;
`

export const GlassBar = styled(motion.div)`
    min-height: 60px;
    padding: 0 18px 0 22px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid transparent;
    border-radius: 18px;
    background: transparent;
    box-shadow: none;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
`

export const Brand = styled(Link)`
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
    transition: color 180ms ease;

    span {
        color: #000;
    }

    &:hover {
        color: #000;
    }
`

export const MenuButton = styled(motion.button)`
    width: 40px;
    height: 40px;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    border: 1px solid transparent;
    border-radius: 12px;
    background: transparent;
    color: #fff;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:hover {
        background: rgba(255, 255, 255, 0.06);
    }

    &:focus-visible {
        outline: 2px solid #fff;
        outline-offset: 3px;
    }
`

export const MenuLine = styled(motion.span)`
    width: 16px;
    height: 1.5px;
    display: block;
    border-radius: 2px;
    background: currentColor;
`

export const MenuPanel = styled(motion.div)`
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 100%;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.08);
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.68);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.86);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    transform-origin: top right;
`

export const MenuLink = styled(Link)`
    min-height: 48px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    border-radius: 10px;
    color: #000;
    font-size: 15px;
    font-weight: 500;
    transition: background 180ms ease, color 180ms ease, padding 180ms ease;

    &:hover,
    &:focus-visible {
        padding-left: 18px;
        background: rgba(0, 0, 0, 0.06);
        color: #000;
        outline: none;
    }
`
