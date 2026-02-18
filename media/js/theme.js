(() => {
    'use strict';

    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);

    const getPreferredTheme = () => {
        const stored = getStoredTheme();
        if (stored) return stored;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    const applyTheme = theme => {
        document.documentElement.setAttribute('data-bs-theme', theme);
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.className = theme === 'dark' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill';
        }
    };

    // Apply before paint to avoid flash
    applyTheme(getPreferredTheme());

    window.addEventListener('DOMContentLoaded', () => {
        applyTheme(getPreferredTheme());

        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.addEventListener('click', () => {
                const current = document.documentElement.getAttribute('data-bs-theme');
                const next = current === 'dark' ? 'light' : 'dark';
                setStoredTheme(next);
                applyTheme(next);
            });
        }

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (!getStoredTheme()) applyTheme(getPreferredTheme());
        });
    });
})();
