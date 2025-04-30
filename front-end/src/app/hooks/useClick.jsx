'use client'

import { useCallback, useEffect, useRef } from "react";

export default function useClick() {
    // Reference to the icon button
    const iconRef = useRef(null);

    // Reference to the nav menu
    const navRef = useRef(null);

    // Toggle nav visibility on icon click
    const handleClick = useCallback(() => {
        navRef.current?.classList.toggle('hidden');
    }, []);

    // Hide nav if clicking outside of the icon or nav
    const handleWindowClick = useCallback((e) => {
        if (
            navRef.current &&
            iconRef.current &&
            !iconRef.current.contains(e.target) &&
            !navRef.current.contains(e.target)
        ) {
            navRef.current.classList.add('hidden');
        }
    }, []);

    // Set up and clean up event listeners
    useEffect(() => {
        const icon = iconRef.current;

        icon?.addEventListener('click', handleClick);
        window.addEventListener('click', handleWindowClick);

        return () => {
            icon?.removeEventListener('click', handleClick);
            window.removeEventListener('click', handleWindowClick);
        };
    }, [handleClick, handleWindowClick]);

   return {
       bar: iconRef,
       content: navRef
   }
};

