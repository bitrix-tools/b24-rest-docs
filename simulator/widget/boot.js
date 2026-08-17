(function () {
    'use strict';

    // Загрузчик симулятора. Подключается на всех страницах документации, поэтому
    // делает минимум: смотрит адрес и заголовок страницы и только на страницах
    // методов подтягивает ядро и виджет. На остальных ~1100 страницах не грузится
    // ничего и не создаётся ни одного наблюдателя.

    var ASSETS_ROOT = resolveAssetsRoot();
    var CHECK_INTERVAL = 400;

    var loading = false;
    var lastPath = null;
    var retries = 0;

    function resolveAssetsRoot() {
        var script = document.currentScript;
        var src = script ? script.src : '';
        var marker = src.lastIndexOf('/simulator/');
        return marker === -1 ? '/_assets/simulator/' : src.slice(0, marker) + '/simulator/';
    }

    // То же правило, что у генератора схем: имя метода — последний «точечный»
    // идентификатор в заголовке страницы.
    function methodOnPage() {
        if (window.location.pathname.indexOf('/api-reference/') === -1) {
            return null;
        }

        var heading = document.querySelector('.dc-doc-page__body h1, main h1, h1');
        if (!heading) {
            return null;
        }

        var matches = heading.textContent.match(/\b[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+\b/gi);
        if (!matches) {
            return null;
        }

        var candidate = matches[matches.length - 1];
        if (/\.(md|html|json|php|js)$/i.test(candidate)) {
            return null;
        }
        if (candidate === candidate.toUpperCase() || /^BX24\./i.test(candidate)) {
            return null; // события и методы BX24.js вызвать нельзя
        }

        return candidate;
    }

    function addScript(src, onload) {
        var script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = onload || null;
        document.head.appendChild(script);
    }

    function ensureLoaded() {
        if (window.B24SimWidget) {
            window.B24SimWidget.mount();
            return;
        }
        if (loading) {
            return;
        }
        loading = true;
        addScript(ASSETS_ROOT + 'core.js', function () {
            addScript(ASSETS_ROOT + 'widget.js');
        });
    }

    // Документация работает как SPA: адрес меняется раньше, чем содержимое,
    // поэтому после смены адреса несколько раз перепроверяем заголовок.
    function tick() {
        var path = window.location.pathname;

        if (path !== lastPath) {
            lastPath = path;
            retries = 5;
        }

        if (methodOnPage()) {
            retries = 0;
            ensureLoaded();
            return;
        }

        if (retries > 0) {
            retries--;
            return;
        }

        if (window.B24SimWidget) {
            window.B24SimWidget.unmount();
        }
    }

    function start() {
        tick();
        setInterval(tick, CHECK_INTERVAL);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }
})();
