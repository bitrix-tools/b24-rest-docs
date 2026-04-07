"use strict";
(function () {

    const CSS = `
.copy-md-btn-wrap {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
#copy-md-btn-tooltip {
    position: fixed;
    white-space: nowrap;
    background: var(--g-color-base-tooltip, #333);
    color: var(--g-color-text-light-primary, #fff);
    font-size: 12px;
    line-height: 1.4;
    padding: 4px 10px;
    border-radius: 6px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.15s;
    z-index: 99999;
    box-shadow: 0 2px 8px rgba(0,0,0,0.18);
}
#copy-md-btn-tooltip::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: var(--g-color-base-tooltip, #333);
}
#copy-md-btn-tooltip.copy-md-btn-tooltip--visible {
    opacity: 1;
}
`;

    const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16">
  <rect x="5.75" y="5.75" width="8.5" height="9.5" rx="1.25" stroke="currentColor" stroke-width="1.5"/>
  <path d="M10.25 5.75V3.5a1.25 1.25 0 0 0-1.25-1.25H2.75A1.25 1.25 0 0 0 1.5 3.5v7.5c0 .69.56 1.25 1.25 1.25H5"
        stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
</svg>`;

    function injectStyles() {
        if (document.getElementById('copy-md-btn-styles')) return;
        const s = document.createElement('style');
        s.id = 'copy-md-btn-styles';
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    function getTooltip() {
        let el = document.getElementById('copy-md-btn-tooltip');
        if (!el) {
            el = document.createElement('span');
            el.id = 'copy-md-btn-tooltip';
            document.body.appendChild(el);
        }
        return el;
    }

    let hideTimer = null;

    function showTooltip(anchorBtn, text) {
        const tooltip = getTooltip();
        clearTimeout(hideTimer);

        tooltip.textContent = text;
        tooltip.classList.remove('copy-md-btn-tooltip--visible');
        tooltip.style.left = '-9999px';
        tooltip.style.top  = '-9999px';

        const rect = anchorBtn.getBoundingClientRect();
        const tw   = tooltip.offsetWidth;

        const left = rect.left + rect.width / 2 - tw / 2;
        const top  = rect.top - tooltip.offsetHeight - 10;

        tooltip.style.left = left + 'px';
        tooltip.style.top  = top  + 'px';
        tooltip.classList.add('copy-md-btn-tooltip--visible');

        hideTimer = setTimeout(() => tooltip.classList.remove('copy-md-btn-tooltip--visible'), 2000);
    }

    function copyTextFallback(text) {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.cssText = 'position:fixed;top:-9999px;left:-9999px;opacity:0;';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
            document.execCommand('copy');
        } finally {
            document.body.removeChild(ta);
        }
    }

    async function copyToClipboard(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            copyTextFallback(text);
        }
    }

    async function copyPageMd(btn) {
        const apiUrl = '/get_page_content.php?url=' + encodeURIComponent(window.location.pathname);
        btn.disabled = true;
        try {
            const resp = await fetch(apiUrl);
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            const data = await resp.json();
            if (!data.content) throw new Error('empty content');
            await copyToClipboard(data.content);
            showTooltip(btn, 'Скопировано!');
        } catch (err) {
            console.warn('[copy-md-button]', err);
            showTooltip(btn, 'Ошибка :(');
        } finally {
            btn.disabled = false;
        }
    }

    function mountInto(controls) {
        if (controls.querySelector('.copy-md-btn-wrap')) return;

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'g-button g-button_view_flat-secondary g-button_size_m g-button_pin_round-round dc-control';
        btn.setAttribute('aria-label', 'Скопировать исходный текст страницы');
        btn.title = 'Скопировать исходный текст страницы';
        btn.innerHTML = `<span class="g-button__icon"><span class="g-button__icon-inner">${ICON_SVG}</span></span>`;
        btn.addEventListener('click', () => copyPageMd(btn));

        const wrap = document.createElement('span');
        wrap.className = 'copy-md-btn-wrap dc-controls__control';
        wrap.appendChild(btn);

        const divider = document.createElement('div');
        divider.className = 'dc-divider-control dc-divider-control_vertical dc-controls__divider';

        controls.appendChild(divider);
        controls.appendChild(wrap);
    }

    function getPageControls() {
        return document.querySelectorAll('.dc-doc-page__controls .dc-controls');
    }

    function isPageControls(node) {
        return node.closest('.dc-doc-page__controls') !== null;
    }

    function tryMount() {
        if (window.__DATA__ && window.__DATA__.data && window.__DATA__.data.leading) return;
        getPageControls().forEach(mountInto);
    }

    function startObserver() {
        const observer = new MutationObserver((mutations) => {
            for (const m of mutations) {
                if (!m.addedNodes.length) continue;
                for (const node of m.addedNodes) {
                    if (!(node instanceof Element)) continue;
                    if (node.classList && node.classList.contains('dc-controls') && isPageControls(node)) {
                        mountInto(node);
                    } else if (node.querySelector) {
                        node.querySelectorAll('.dc-controls').forEach((el) => {
                            if (isPageControls(el)) mountInto(el);
                        });
                    }
                }
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    function init() {
        injectStyles();
        tryMount();
        startObserver();
    }

    if (document.readyState === 'loading' || document.readyState === 'interactive') {
        document.addEventListener('DOMContentLoaded', init, { once: true });
    } else {
        init();
    }

})();
