/* Concept 2 — Theme toggle: dropdown with Light / Dark / Auto */
(() => {
    'use strict';

    const STORAGE_KEY = 'aromaterapia-theme';

    const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
    const setStoredTheme = theme => localStorage.setItem(STORAGE_KEY, theme);

    const getSystemTheme = () =>
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    const applyTheme = () => {
        const stored = getStoredTheme() || 'auto';
        const effective = stored === 'auto' ? getSystemTheme() : stored;
        document.documentElement.setAttribute('data-bs-theme', effective);
    };

    const updateToggleUI = () => {
        const stored = getStoredTheme() || 'auto';
        const btn = document.getElementById('theme-toggle-btn');
        const icon = document.getElementById('theme-toggle-icon');
        const label = document.getElementById('theme-toggle-label');
        if (!btn) return;

        const config = {
            light: { icon: 'bi-sun-fill', label: 'Claro' },
            dark:  { icon: 'bi-moon-stars-fill', label: 'Oscuro' },
            auto:  { icon: 'bi-circle-half', label: 'Auto' }
        };

        const c = config[stored] || config.auto;
        if (icon) icon.className = `bi ${c.icon}`;
        if (label) label.textContent = c.label;

        document.querySelectorAll('[data-theme-value]').forEach(item => {
            item.classList.toggle('active', item.getAttribute('data-theme-value') === stored);
            item.setAttribute('aria-pressed', item.getAttribute('data-theme-value') === stored);
        });
    };

    /* Apply immediately (before DOMContentLoaded to avoid flash) */
    applyTheme();

    window.addEventListener('DOMContentLoaded', () => {
        updateToggleUI();

        /* Dropdown item clicks */
        document.querySelectorAll('[data-theme-value]').forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                const value = item.getAttribute('data-theme-value');
                setStoredTheme(value);
                applyTheme();
                updateToggleUI();
            });
        });

        /* React to OS theme changes when set to auto */
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const stored = getStoredTheme();
            if (!stored || stored === 'auto') {
                applyTheme();
            }
        });
    });
})();
