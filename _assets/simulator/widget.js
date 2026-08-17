(function () {
    'use strict';

    // Виджет «Попробовать метод»: форма из схемы, клиентская валидация,
    // симулированный ответ. Реальных вызовов не делает и секретов не принимает.
    //
    // Вёрстка собирается из компонентов самой документации: g-card, g-button,
    // g-text-input, g-label, yfm-note, yfm-tabs, pre > code.hljs. Собственных
    // стилей — только раскладка (см. widget.css).

    var ASSETS_ROOT = resolveAssetsRoot();

    var state = {
        dataset: null,
        datasetRequest: null,
        specs: {},
        mounted: null,
    };

    // Датасет весит заметно больше схемы и нужен только на первом «Выполнить»,
    // поэтому грузится лениво, а не на каждой странице документации.
    function loadDataset() {
        if (state.dataset) {
            return Promise.resolve(state.dataset);
        }
        if (!state.datasetRequest) {
            state.datasetRequest = fetchJson(ASSETS_ROOT + 'fixtures/dataset.json').then(function (dataset) {
                state.dataset = dataset;
                return dataset;
            });
        }
        return state.datasetRequest;
    }

    function resolveAssetsRoot() {
        var script = document.currentScript;
        var src = script ? script.src : '';
        var marker = src.lastIndexOf('/simulator/');
        return marker === -1 ? '/_assets/simulator/' : src.slice(0, marker) + '/simulator/';
    }

    function fetchJson(url) {
        return fetch(url, { credentials: 'omit' }).then(function (response) {
            if (!response.ok) {
                throw new Error(url + ' → HTTP ' + response.status);
            }
            return response.json();
        });
    }

    // ------------------------------------------------- компоненты документации

    function el(tag, className, text) {
        var node = document.createElement(tag);
        if (className) {
            node.className = className;
        }
        if (text !== undefined && text !== null) {
            node.textContent = text;
        }
        return node;
    }

    function gLabel(text, theme) {
        var label = el('span', 'g-label g-label_theme_' + (theme || 'normal') + ' g-label_size_xs');
        label.appendChild(el('span', 'g-label__text', text));
        return label;
    }

    function gButton(text, view) {
        var button = el('button', 'g-button g-button_view_' + (view || 'normal') + ' g-button_size_m g-button_pin_round-round');
        button.type = 'button';
        button.appendChild(el('span', 'g-button__text', text));
        return button;
    }

    function gTextInput(type) {
        var wrapper = el('span', 'g-text-input g-text-input_size_m g-text-input_view_normal g-text-input_pin_round-round');
        var content = el('span', 'g-text-input__content');
        var input = el('input', 'g-text-input__control');
        input.type = type || 'text';
        content.appendChild(input);
        wrapper.appendChild(content);
        wrapper.control = input;
        return wrapper;
    }

    function gTextArea(rows) {
        var wrapper = el('span', 'g-text-area g-text-area_size_m g-text-area_view_normal g-text-area_pin_round-round');
        var content = el('span', 'g-text-area__content');
        var area = el('textarea', 'g-text-area__control');
        area.rows = rows || 3;
        content.appendChild(area);
        wrapper.appendChild(content);
        wrapper.control = area;
        return wrapper;
    }

    function gSelect() {
        var wrapper = el('span', 'g-text-input g-text-input_size_m g-text-input_view_normal g-text-input_pin_round-round b24sim-select');
        var content = el('span', 'g-text-input__content');
        var select = el('select', 'g-text-input__control');
        content.appendChild(select);
        wrapper.appendChild(content);
        wrapper.control = select;
        return wrapper;
    }

    function yfmNote(accent, title, body) {
        var note = el('div', 'yfm-note yfm-accent-' + accent);
        note.setAttribute('note-type', accent);
        if (title) {
            note.appendChild(el('p', 'yfm-note-title', title));
        }
        var content = el('div', 'yfm-note-content');
        if (typeof body === 'string') {
            content.appendChild(el('p', null, body));
        } else if (body) {
            content.appendChild(body);
        }
        note.appendChild(content);
        return note;
    }

    function codeBlock(text) {
        var pre = el('pre', 'b24sim__code');
        pre.appendChild(el('code', 'hljs', text));
        return pre;
    }

    // Табы кода — та же разметка, что у примеров в статьях.
    function yfmTabs(items) {
        var root = el('div', 'yfm-tabs');
        var list = el('div', 'yfm-tab-list');
        list.setAttribute('role', 'tablist');
        var panels = [];

        root.appendChild(list);

        items.forEach(function (item, index) {
            var tab = el('div', 'yfm-tab yfm-tab-group' + (index === 0 ? ' active' : ''), item.title);
            tab.setAttribute('role', 'tab');
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
            tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');

            var panel = el('div', 'yfm-tab-panel' + (index === 0 ? ' active' : ''));
            panel.setAttribute('role', 'tabpanel');
            panel.appendChild(item.content);

            tab.addEventListener('click', function () {
                list.querySelectorAll('.yfm-tab').forEach(function (node) {
                    node.classList.remove('active');
                    node.setAttribute('aria-selected', 'false');
                    node.setAttribute('tabindex', '-1');
                });
                panels.forEach(function (node) {
                    node.classList.remove('active');
                });
                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                tab.setAttribute('tabindex', '0');
                panel.classList.add('active');
            });

            list.appendChild(tab);
            root.appendChild(panel);
            panels.push(panel);
        });

        return root;
    }

    // ----------------------------------------------------------- служебное

    // Имя метода берём из заголовка страницы — тем же правилом, что и генератор схем.
    // Так на каждой странице не нужен индекс методов, который иначе весил бы сотни
    // килобайт и грузился бы даже там, где виджет не нужен.
    function findMethodForPage() {
        if (window.location.pathname.indexOf('/api-reference/') === -1) {
            return null;
        }

        var heading = document.querySelector('.dc-doc-page__body h1, main h1, h1');
        if (!heading) {
            return null;
        }

        var matches = heading.textContent.match(/\b[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+\b/gi);
        if (!matches || !matches.length) {
            return null;
        }

        var candidate = matches[matches.length - 1];
        return /\.(md|html|json|php|js)$/i.test(candidate) ? null : candidate;
    }

    function typeLabel(field) {
        return field.type && field.type !== 'unknown' ? field.type : field.base;
    }

    // В форме описание должно занимать строку-две: полный текст уходит в подсказку.
    function shortenText(text, limit) {
        if (text.length <= limit) {
            return text;
        }
        var cut = text.slice(0, limit);
        var lastSpace = cut.lastIndexOf(' ');
        return (lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s.,;:—-]+$/, '') + '…';
    }

    // ------------------------------------------------------- редакторы значений

    function createValueControl(field, value) {
        if (field.base === 'char' || field.base === 'boolean') {
            var select = gSelect();
            [['', '— не передавать —'], ['Y', 'Y'], ['N', 'N']].forEach(function (pair) {
                var option = el('option', null, pair[1]);
                option.value = pair[0];
                select.control.appendChild(option);
            });
            select.control.value = value === undefined ? '' : String(value);
            return select;
        }

        var isNumber = field.base === 'integer' || field.base === 'number';
        var input = gTextInput(isNumber ? 'number' : 'text');
        if (field.base === 'date' || field.base === 'datetime') {
            input.control.placeholder = '2026-01-31T00:00:00+03:00';
        }
        if (value !== undefined && value !== null) {
            input.control.value = String(value);
        }
        return input;
    }

    function readValueControl(wrapper, field) {
        var raw = wrapper.control.value;
        if (raw === '' || raw === null || raw === undefined) {
            return undefined;
        }
        if (field.base === 'integer' || field.base === 'number') {
            return Number(raw);
        }
        return raw;
    }

    function findField(def, name) {
        for (var i = 0; i < def.fields.length; i++) {
            if (def.fields[i].name === name) {
                return def.fields[i];
            }
        }
        return null;
    }

    // Объект с описанной схемой полей: строка = выбор поля + значение.
    function createFieldsEditor(spec, param) {
        var def = spec.defs[param.ref.replace('#/defs/', '')];
        var wrapper = el('div', 'b24sim__fields');
        var rows = el('div');
        wrapper.appendChild(rows);

        function addRow(fieldName) {
            var row = el('div', 'b24sim__field-row');

            var nameSelect = gSelect();
            def.fields.forEach(function (field) {
                var option = el('option', null, field.name + '  ·  ' + typeLabel(field));
                option.value = field.name;
                nameSelect.control.appendChild(option);
            });
            var custom = el('option', null, '— другое поле (UF_…) —');
            custom.value = '__custom__';
            nameSelect.control.appendChild(custom);

            var customName = gTextInput('text');
            customName.control.placeholder = 'UF_CRM_...';
            customName.style.display = 'none';

            var valueHolder = el('div', 'b24sim__field-value');

            var remove = gButton('×', 'flat');
            remove.title = 'Убрать поле';
            remove.addEventListener('click', function () {
                rows.removeChild(row);
            });

            function renderValue() {
                valueHolder.innerHTML = '';
                var field = findField(def, nameSelect.control.value) || { base: 'string', type: 'string' };
                var control = createValueControl(field, undefined);
                valueHolder.appendChild(control);
                row.read = function () {
                    var name = nameSelect.control.value === '__custom__' ? customName.control.value.trim() : nameSelect.control.value;
                    if (!name) {
                        return null;
                    }
                    var read = readValueControl(control, field);
                    return read === undefined ? null : { name: name, value: read };
                };
            }

            nameSelect.control.addEventListener('change', function () {
                customName.style.display = nameSelect.control.value === '__custom__' ? '' : 'none';
                renderValue();
            });

            if (fieldName) {
                nameSelect.control.value = fieldName;
            }
            renderValue();

            row.appendChild(nameSelect);
            row.appendChild(customName);
            row.appendChild(valueHolder);
            row.appendChild(remove);
            rows.appendChild(row);
        }

        var add = gButton('Добавить поле', 'flat-action');
        add.classList.add('b24sim__add');
        add.addEventListener('click', function () {
            addRow(null);
        });
        wrapper.appendChild(add);

        var seed = def.fields.filter(function (field) {
            return field.required === true;
        });
        if (!seed.length) {
            var titleField = findField(def, 'TITLE') || findField(def, 'title');
            seed = titleField ? [titleField] : def.fields.slice(0, 1);
        }
        seed.slice(0, 3).forEach(function (field) {
            addRow(field.name);
        });

        wrapper.read = function () {
            var result = {};
            var any = false;
            Array.prototype.forEach.call(rows.children, function (row) {
                var entry = row.read && row.read();
                if (entry) {
                    result[entry.name] = entry.value;
                    any = true;
                }
            });
            return any ? result : undefined;
        };

        return wrapper;
    }

    function createJsonEditor(placeholder) {
        var area = gTextArea(3);
        area.control.placeholder = placeholder;
        area.read = function () {
            var raw = area.control.value.trim();
            if (!raw) {
                area.classList.remove('g-text-area_state_error');
                return undefined;
            }
            try {
                var parsed = JSON.parse(raw);
                area.classList.remove('g-text-area_state_error');
                return parsed;
            } catch (error) {
                area.classList.add('g-text-area_state_error');
                throw new Error('Некорректный JSON: ' + error.message);
            }
        };
        return area;
    }

    function createArrayEditor(placeholder) {
        var input = gTextInput('text');
        input.control.placeholder = placeholder;
        input.read = function () {
            var raw = input.control.value.trim();
            if (!raw) {
                return undefined;
            }
            if (raw.charAt(0) === '[') {
                return JSON.parse(raw);
            }
            return raw
                .split(',')
                .map(function (part) {
                    return part.trim();
                })
                .filter(Boolean);
        };
        return input;
    }

    function createParamControl(spec, param) {
        if (param.ref && spec.defs[param.ref.replace('#/defs/', '')]) {
            return createFieldsEditor(spec, param);
        }
        if (param.base === 'object') {
            var hint = param.name === 'filter' ? '{">=DATE_CREATE": "2026-01-01T00:00:00+03:00"}' : param.name === 'order' ? '{"ID": "DESC"}' : '{}';
            return createJsonEditor(hint);
        }
        if (param.base === 'array') {
            return createArrayEditor('ID, TITLE, DATE_CREATE');
        }
        var control = createValueControl(param, undefined);
        control.read = function () {
            return readValueControl(control, param);
        };
        return control;
    }

    // -------------------------------------------------------------- сниппеты

    function buildSnippets(method, params) {
        var pretty = JSON.stringify(params, null, 4);
        var inline = JSON.stringify(params);

        return [
            {
                title: 'cURL (Webhook)',
                code:
                    'curl -X POST \\\n' +
                    '  -H "Content-Type: application/json" \\\n' +
                    "  -d '" + inline + "' \\\n" +
                    '  https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/' + method,
            },
            {
                title: 'cURL (OAuth)',
                code:
                    'curl -X POST \\\n' +
                    '  -H "Content-Type: application/json" \\\n' +
                    "  -d '" + JSON.stringify(assign({}, params, { auth: '**put_access_token_here**' })) + "' \\\n" +
                    '  https://**put_your_bitrix24_address**/rest/' + method,
            },
            {
                title: 'JS (SDK)',
                code:
                    'const response = await $b24.actions.v2.call.make({\n' +
                    "  method: '" + method + "',\n" +
                    '  params: ' + pretty.replace(/\n/g, '\n  ') + ',\n' +
                    '  requestId: Text.getUuidRfc4122()\n' +
                    '})',
            },
            {
                title: 'PHP',
                code: "$result = $b24Service->core->call(\n    '" + method + "',\n    " + phpArray(params, 1) + '\n);',
            },
            {
                title: 'Python',
                code:
                    'response = requests.post(\n' +
                    "    'https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/" + method + "',\n" +
                    '    json=' +
                    pretty.replace(/\n/g, '\n    ').replace(/\btrue\b/g, 'True').replace(/\bfalse\b/g, 'False').replace(/\bnull\b/g, 'None') +
                    '\n)',
            },
        ];
    }

    function assign(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            Object.keys(source).forEach(function (key) {
                target[key] = source[key];
            });
        }
        return target;
    }

    function phpArray(value, depth) {
        var pad = new Array(depth + 1).join('    ');
        var padInner = new Array(depth + 2).join('    ');

        if (Array.isArray(value)) {
            return '[\n' + value.map(function (item) {
                return padInner + phpArray(item, depth + 1);
            }).join(',\n') + '\n' + pad + ']';
        }
        if (value !== null && typeof value === 'object') {
            return '[\n' + Object.keys(value).map(function (key) {
                return padInner + "'" + key + "' => " + phpArray(value[key], depth + 1);
            }).join(',\n') + '\n' + pad + ']';
        }
        if (typeof value === 'string') {
            return "'" + value.replace(/'/g, "\\'") + "'";
        }
        return String(value);
    }

    // ----------------------------------------------------------------- рендер

    // Заголовок спойлера — единственное место, где на странице сказано, что вызов
    // симулированный. Убирать эту формулировку нельзя: без неё виджет выглядит
    // как реальное обращение к порталу.
    function summaryText(spec) {
        if (spec.executable) {
            return 'Попробовать метод на тестовых данных';
        }
        return spec.kind === 'write'
            ? 'Попробовать метод — проверка параметров без записи данных'
            : 'Попробовать метод — проверка параметров';
    }

    function render(spec) {
        // yfm-cut-highlight — штатная подсветка спойлера в документации: без неё
        // свёрнутый виджет теряется в тексте страницы.
        var details = el('details', 'yfm-cut yfm-cut-highlight b24sim');
        details.appendChild(el('summary', 'yfm-cut-title', summaryText(spec)));

        var content = el('div', 'yfm-cut-content');
        var card = el('div', 'g-card g-card_theme_normal g-card_type_container g-card_size_m b24sim__card');
        content.appendChild(card);
        details.appendChild(content);

        var form = el('form', 'b24sim__form');
        var controls = {};

        var table = el('table');
        var tbody = el('tbody');

        spec.params.forEach(function (param) {
            var row = el('tr');

            var nameCell = el('td', 'b24sim__param-cell');
            var namePara = el('p');
            namePara.appendChild(el('strong', null, param.name));
            namePara.appendChild(el('br'));
            namePara.appendChild(el('code', null, typeLabel(param)));
            nameCell.appendChild(namePara);

            // Описание параметра целиком есть на странице выше — в форме оно только
            // в подсказке, иначе виджет вырастает на несколько экранов.
            if (param.description) {
                nameCell.title = param.description;
            }

            if (param.required === true) {
                nameCell.appendChild(gLabel('обязательный', 'danger'));
            } else if (param.required === 'unknown') {
                // Не ошибка и не угроза — просто документация не размечает обязательность.
                var unknown = gLabel('обязательность неизвестна', 'unknown');
                unknown.title = 'На странице метода не проставлена звёздочка обязательности, поэтому симулятор не может её проверить';
                nameCell.appendChild(unknown);
            }


            var controlCell = el('td');
            var control = createParamControl(spec, param);
            controls[param.name] = control;
            controlCell.appendChild(control);

            row.appendChild(nameCell);
            row.appendChild(controlCell);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        form.appendChild(table);

        var actions = el('div', 'b24sim__actions');
        var run = gButton('Выполнить', 'action');
        run.type = 'submit';
        var reset = gButton('Сбросить', 'normal');
        actions.appendChild(run);
        actions.appendChild(reset);
        form.appendChild(actions);
        card.appendChild(form);

        var output = el('div', 'b24sim__output');
        card.appendChild(output);

        form.addEventListener('submit', function (event) {
            event.preventDefault();
            output.innerHTML = '';

            var params = {};
            try {
                Object.keys(controls).forEach(function (name) {
                    var value = controls[name].read ? controls[name].read() : undefined;
                    if (value !== undefined) {
                        params[name] = value;
                    }
                });
            } catch (error) {
                output.appendChild(yfmNote('alert', 'Не удалось собрать запрос', error.message));
                return;
            }

            run.disabled = true;
            loadDataset()
                .catch(function () {
                    return null; // без датасета остаётся валидация — это лучше, чем ничего
                })
                .then(function (dataset) {
                    run.disabled = false;
                    output.appendChild(renderResult(spec, params, window.B24Sim.call(spec, params, dataset)));
                });
        });

        reset.addEventListener('click', function () {
            mount(spec, true);
            var fresh = document.querySelector('.b24sim');
            if (fresh) {
                fresh.open = true; // сброс не должен схлопывать спойлер
            }
        });

        return details;
    }

    function renderResult(spec, params, response) {
        var box = el('div', 'b24sim__result');

        if (response.error) {
            var details = el('div');
            details.appendChild(el('p', null, response.error_description || ''));

            var errors = response.simulator && response.simulator.validation && response.simulator.validation.errors;
            if (errors && errors.length) {
                var list = el('ul');
                errors.forEach(function (item) {
                    var text = item.param + ' — ' + item.class;
                    if (item.hint) {
                        text += '. ' + item.hint;
                    }
                    if (item.expected) {
                        text += '. Ожидается ' + item.expected + ', получено ' + item.got;
                    }
                    list.appendChild(el('li', null, text));
                });
                details.appendChild(list);
            }

            box.appendChild(yfmNote('alert', response.error, details));
        } else {
            box.appendChild(
                yfmNote(
                    'tip',
                    'Вызов корректен',
                    response.simulator && response.simulator.executed
                        ? 'Ответ рассчитан на тестовом датасете ' + response.simulator.data + '.'
                        : response.simulator && response.simulator.persisted === false
                        ? 'Параметры валидны. Объект не создан — симулятор ничего не сохраняет.'
                        : 'Параметры валидны.'
                )
            );
        }

        var warnings = (response.simulator && response.simulator.warnings) || [];
        if (warnings.length) {
            var warnList = el('ul');
            warnings.forEach(function (warning) {
                warnList.appendChild(el('li', null, warning.message || warning.class));
            });
            box.appendChild(yfmNote('warning', 'Обратите внимание', warnList));
        }

        box.appendChild(
            yfmTabs([
                { title: 'Ответ', content: codeBlock(JSON.stringify(response, null, 2)) },
            ].concat(
                buildSnippets(spec.method, params).map(function (snippet) {
                    return { title: snippet.title, content: codeBlock(snippet.code) };
                })
            ))
        );

        return box;
    }

    // ----------------------------------------------------------------- монтаж

    function findAnchor() {
        var main = document.querySelector('.dc-doc-page__body') || document.querySelector('.dc-doc-page__main') || document.querySelector('main') || document.body;
        var headings = main.querySelectorAll('h2');
        for (var i = 0; i < headings.length; i++) {
            var text = headings[i].textContent.replace(/\s+/g, ' ').trim();
            if (text.indexOf('Примеры кода') === 0 || text.indexOf('Обработка ответа') === 0) {
                return { parent: headings[i].parentNode, before: headings[i] };
            }
        }
        return { parent: main, before: null };
    }

    function mount(spec, force) {
        var existing = document.querySelector('.b24sim');
        if (existing && !force) {
            return;
        }
        if (existing && existing.parentNode) {
            existing.parentNode.removeChild(existing);
        }

        var anchor = findAnchor();
        anchor.parent.insertBefore(render(spec), anchor.before);
        state.mounted = spec.method;
    }

    function ensureForCurrentPage() {
        var method = findMethodForPage();

        if (!method) {
            var stale = document.querySelector('.b24sim');
            if (stale && stale.parentNode) {
                stale.parentNode.removeChild(stale);
            }
            state.mounted = null;
            return;
        }

        if (state.mounted === method && document.querySelector('.b24sim')) {
            return;
        }

        if (Object.prototype.hasOwnProperty.call(state.specs, method)) {
            if (state.specs[method]) {
                mount(state.specs[method], true);
            }
            return;
        }

        // Схемы есть не у всех страниц; отсутствие — обычная ситуация, не ошибка.
        state.specs[method] = null;

        fetchJson(ASSETS_ROOT + 'spec/methods/' + method + '.json')
            .then(function (spec) {
                state.specs[method] = spec;
                mount(spec, true);
            })
            .catch(function () {
                state.specs[method] = null;
            });
    }

    // Документация работает как SPA, поэтому за сменой страницы следим наблюдателем.
    // Другие скрипты страницы правят DOM непрерывно (например, b24addons.js
    // навешивает иконки копирования), поэтому здесь троттлинг с гарантированным
    // запуском, а не debounce: сбрасываемый таймер под потоком мутаций
    // не срабатывал бы никогда и виджет не смонтировался бы вовсе.
    var MIN_INTERVAL = 400;

    function observePageChanges() {
        var lastRun = 0;
        var pending = null;

        function fire() {
            pending = null;
            lastRun = Date.now();
            ensureForCurrentPage();
        }

        new MutationObserver(function (records) {
            // Собственные изменения виджета не считаем поводом для пересборки.
            var external = records.some(function (record) {
                var target = record.target;
                return !(target && target.closest && target.closest('.b24sim'));
            });
            if (!external || pending) {
                return;
            }

            var elapsed = Date.now() - lastRun;
            if (elapsed >= MIN_INTERVAL) {
                fire();
            } else {
                pending = setTimeout(fire, MIN_INTERVAL - elapsed);
            }
        }).observe(document.body, { childList: true, subtree: true });
    }

    function boot() {
        if (!window.B24Sim) {
            console.warn('Симулятор: ядро B24Sim не загружено');
            return;
        }

        ensureForCurrentPage();
        observePageChanges();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', boot);
    } else {
        boot();
    }
})();
