(function (root, factory) {
    'use strict';
    // Ядро симулятора одинаково работает в браузере (виджет) и в Node (тесты, CI).
    if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        root.B24Sim = factory();
    }
})(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    var PAGE_SIZE = 50;

    // Идентификаторы, которые возвращают write-методы, заведомо не пересекаются
    // с датасетом: агент не примет их за существующий объект.
    var SYNTHETIC_ID_BASE = 900000;

    // ---------------------------------------------------------------- секреты

    var SECRET_PATTERNS = [
        { re: /\/rest\/\d+\/[a-z0-9]{8,}\//i, what: 'вебхук' },
        { re: /\b(access_token|refresh_token)\b/i, what: 'OAuth-токен' },
    ];

    var SECRET_KEYS = ['auth', 'access_token', 'refresh_token', 'webhook', 'client_secret'];

    function findSecret(params) {
        var serialized;
        try {
            serialized = JSON.stringify(params);
        } catch (e) {
            serialized = '';
        }

        for (var i = 0; i < SECRET_PATTERNS.length; i++) {
            if (SECRET_PATTERNS[i].re.test(serialized)) {
                return SECRET_PATTERNS[i].what;
            }
        }

        if (params && typeof params === 'object') {
            for (var k = 0; k < SECRET_KEYS.length; k++) {
                if (Object.prototype.hasOwnProperty.call(params, SECRET_KEYS[k])) {
                    return 'параметр ' + SECRET_KEYS[k];
                }
            }
        }

        return null;
    }

    // -------------------------------------------------------------- валидация

    function levenshtein(a, b) {
        var m = a.length;
        var n = b.length;
        var prev = new Array(n + 1);
        var curr = new Array(n + 1);

        for (var j = 0; j <= n; j++) {
            prev[j] = j;
        }

        for (var i = 1; i <= m; i++) {
            curr[0] = i;
            for (var k = 1; k <= n; k++) {
                var cost = a.charAt(i - 1) === b.charAt(k - 1) ? 0 : 1;
                curr[k] = Math.min(curr[k - 1] + 1, prev[k] + 1, prev[k - 1] + cost);
            }
            for (var c = 0; c <= n; c++) {
                prev[c] = curr[c];
            }
        }

        return prev[n];
    }

    function suggest(name, candidates) {
        var best = null;
        var bestDistance = Infinity;
        var target = String(name).toLowerCase();

        for (var i = 0; i < candidates.length; i++) {
            var distance = levenshtein(target, String(candidates[i]).toLowerCase());
            if (distance < bestDistance) {
                bestDistance = distance;
                best = candidates[i];
            }
        }

        var limit = Math.max(2, Math.floor(target.length / 3));
        return bestDistance <= limit ? best : null;
    }

    function isPlainObject(value) {
        return value !== null && typeof value === 'object' && !Array.isArray(value);
    }

    function looksNumeric(value) {
        return typeof value === 'number' || (typeof value === 'string' && value.trim() !== '' && isFinite(Number(value)));
    }

    // Проверка значения по базовому типу схемы. Битрикс24 принимает числа строками,
    // поэтому "12" для integer — не ошибка.
    function checkType(value, base) {
        switch (base) {
            case 'string':
                return typeof value === 'string' || typeof value === 'number';
            case 'integer':
                return looksNumeric(value) && Number(value) % 1 === 0;
            case 'number':
                return looksNumeric(value);
            case 'boolean':
                return typeof value === 'boolean' || value === 'Y' || value === 'N' || value === 1 || value === 0 || value === '1' || value === '0';
            case 'char':
                // В документации `char` стоит и у флагов Y/N, и у коротких строк —
                // требовать строго Y/N значит ругаться на корректные вызовы.
                return typeof value === 'string' || typeof value === 'number';
            case 'object':
            case 'array':
                // Документация называет ассоциативный массив PHP то `array`, то `object`,
                // а в JSON это объект. Различать их здесь — источник ложных ошибок.
                return isPlainObject(value) || Array.isArray(value);
            case 'date':
            case 'datetime':
                return typeof value === 'string' && !isNaN(Date.parse(value));
            case 'any':
            default:
                return true;
        }
    }

    function describeType(field) {
        return field.type && field.type !== 'unknown' ? field.type : field.base;
    }

    function validate(spec, params) {
        var errors = [];
        var warnings = [];
        var input = isPlainObject(params) ? params : {};

        var known = spec.params.map(function (p) {
            return p.name;
        });

        // Неизвестные параметры верхнего уровня
        Object.keys(input).forEach(function (key) {
            if (known.indexOf(key) !== -1) {
                return;
            }
            var hint = suggest(key, known);
            errors.push({
                class: 'unknown_param',
                param: key,
                hint: hint ? 'Возможно, вы имели в виду ' + hint : 'Параметр не описан в документации метода',
            });
        });

        spec.params.forEach(function (param) {
            var present = Object.prototype.hasOwnProperty.call(input, param.name) && input[param.name] !== '' && input[param.name] !== undefined;

            if (!present) {
                if (param.required === true) {
                    errors.push({
                        class: 'missing_required',
                        param: param.name,
                        hint: 'Обязательный параметр, тип ' + describeType(param),
                    });
                } else if (param.required === 'unknown') {
                    // Документация не размечает обязательность на этой странице —
                    // молчать нельзя, иначе вызов «валиден» и на портале падает.
                    warnings.push({
                        class: 'required_unknown',
                        param: param.name,
                        message:
                            'В документации не размечена обязательность параметра «' +
                            param.name +
                            '». Симулятор не может это проверить — сверьтесь с описанием метода.',
                    });
                }
                return;
            }

            if (!checkType(input[param.name], param.base)) {
                errors.push({
                    class: 'wrong_type',
                    param: param.name,
                    expected: describeType(param),
                    got: Array.isArray(input[param.name]) ? 'array' : typeof input[param.name],
                });
                return;
            }

            if (param.ref && isPlainObject(input[param.name])) {
                validateFields(spec, param, input[param.name], errors, warnings);
            }
        });

        checkEntityFields(spec, input, warnings);

        return { ok: errors.length === 0, errors: errors, warnings: warnings };
    }

    // В задачах фильтр пишется как RESPONSIBLE_ID, а поле называется responsibleId —
    // сравниваем имена без регистра и подчёркиваний.
    function normalizeFieldName(name) {
        return String(name).replace(/_/g, '').toLowerCase();
    }

    // Имена полей внутри filter, order и select в схеме метода не описаны: их состав
    // живёт на отдельной странице. Здесь это предупреждение, а не ошибка — справочник
    // полей может быть неполным, и ложная ошибка хуже пропущенной опечатки.
    function checkEntityFields(spec, input, warnings) {
        if (!spec.entityFields || !spec.entityFields.length) {
            return;
        }

        var known = {};
        spec.entityFields.forEach(function (name) {
            known[normalizeFieldName(name)] = name;
        });

        function report(where, raw) {
            if (!raw || /^UF_/i.test(raw) || raw === '*' || raw === 'UF_*') {
                return;
            }
            if (known[normalizeFieldName(raw)]) {
                return;
            }
            var hint = suggest(raw, spec.entityFields);
            warnings.push({
                class: 'unknown_field',
                param: where + '.' + raw,
                message:
                    'Поле «' + raw + '» не найдено среди полей этой сущности' +
                    (hint ? '. Возможно, вы имели в виду ' + hint : '. Список полей отдаёт метод *.fields'),
            });
        }

        if (isPlainObject(input.filter)) {
            Object.keys(input.filter).forEach(function (key) {
                report('filter', parseFilterKey(key).field);
            });
        }

        if (isPlainObject(input.order)) {
            Object.keys(input.order).forEach(function (key) {
                report('order', key);
            });
        }

        if (Array.isArray(input.select)) {
            input.select.forEach(function (name) {
                report('select', name);
            });
        }
    }

    function validateFields(spec, param, value, errors, warnings) {
        var defName = param.ref.replace('#/defs/', '');
        var def = spec.defs && spec.defs[defName];
        if (!def) {
            return;
        }

        var byName = {};
        def.fields.forEach(function (field) {
            byName[field.name] = field;
        });
        var names = Object.keys(byName);

        Object.keys(value).forEach(function (key) {
            var field = byName[key];

            if (!field) {
                // Пользовательские поля и поля смарт-процессов в схеме не описаны:
                // это предупреждение, а не ошибка.
                if (/^UF_/i.test(key) || (def.dynamic && def.dynamic.allowed)) {
                    warnings.push({
                        class: 'unknown_dynamic_field',
                        param: param.name + '.' + key,
                        message:
                            'Поле не описано в документации. Если это пользовательское поле — так и должно быть; ' +
                            'актуальный список полей отдаёт метод *.fields.',
                    });
                    return;
                }
                var hint = suggest(key, names);
                errors.push({
                    class: 'unknown_param',
                    param: param.name + '.' + key,
                    hint: hint ? 'Возможно, вы имели в виду ' + hint : 'Поле не описано в документации метода',
                });
                return;
            }

            if (!checkType(value[key], field.base)) {
                errors.push({
                    class: 'wrong_type',
                    param: param.name + '.' + key,
                    expected: describeType(field),
                    got: Array.isArray(value[key]) ? 'array' : typeof value[key],
                });
            }
        });

        def.fields.forEach(function (field) {
            if (field.required === true && !Object.prototype.hasOwnProperty.call(value, field.name)) {
                errors.push({
                    class: 'missing_required',
                    param: param.name + '.' + field.name,
                    hint: 'Обязательное поле, тип ' + describeType(field),
                });
            }
        });
    }

    // ------------------------------------------------- исполнение read-методов

    // В задачах фильтр приходит в верхнем регистре (RESPONSIBLE_ID), а поля ответа —
    // в camelCase (responsibleId). Симулятор повторяет это поведение портала.
    function toCamel(name) {
        return String(name)
            .toLowerCase()
            .replace(/_([a-z0-9])/g, function (_, ch) {
                return ch.toUpperCase();
            });
    }

    var OPERATORS = [
        { prefix: '!@', op: 'nin' },
        { prefix: '>=', op: 'gte' },
        { prefix: '<=', op: 'lte' },
        { prefix: '!=', op: 'ne' },
        { prefix: '=%', op: 'like_explicit' },
        { prefix: '%=', op: 'like_explicit' },
        { prefix: '@', op: 'in' },
        { prefix: '%', op: 'like' },
        { prefix: '>', op: 'gt' },
        { prefix: '<', op: 'lt' },
        { prefix: '!', op: 'ne' },
        { prefix: '=', op: 'eq' },
    ];

    function parseFilterKey(key) {
        for (var i = 0; i < OPERATORS.length; i++) {
            if (key.indexOf(OPERATORS[i].prefix) === 0) {
                return { op: OPERATORS[i].op, field: key.slice(OPERATORS[i].prefix.length) };
            }
        }
        return { op: 'eq', field: key };
    }

    function comparable(value) {
        if (value === null || value === undefined) {
            return null;
        }
        if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
            return Date.parse(value);
        }
        if (looksNumeric(value)) {
            return Number(value);
        }
        return String(value).toLowerCase();
    }

    function matchOne(actual, op, expected) {
        var a = comparable(actual);
        var b = comparable(expected);

        switch (op) {
            case 'eq':
                return String(actual) === String(expected);
            case 'ne':
                return String(actual) !== String(expected);
            case 'gt':
                return a !== null && a > b;
            case 'lt':
                return a !== null && a < b;
            case 'gte':
                return a !== null && a >= b;
            case 'lte':
                return a !== null && a <= b;
            case 'like':
                return String(actual === null ? '' : actual).toLowerCase().indexOf(String(expected).toLowerCase()) !== -1;
            case 'like_explicit':
                var pattern = String(expected).toLowerCase();
                var text = String(actual === null ? '' : actual).toLowerCase();
                var starts = pattern.charAt(0) === '%';
                var ends = pattern.charAt(pattern.length - 1) === '%';
                var core = pattern.replace(/^%/, '').replace(/%$/, '');
                if (starts && ends) return text.indexOf(core) !== -1;
                if (starts) return text.lastIndexOf(core) === text.length - core.length;
                if (ends) return text.indexOf(core) === 0;
                return text === core;
            default:
                return false;
        }
    }

    function matchFilter(item, filter, resolveField) {
        if (!isPlainObject(filter)) {
            return true;
        }

        return Object.keys(filter).every(function (rawKey) {
            var parsed = parseFilterKey(rawKey);
            var field = resolveField(parsed.field);
            var actual = item[field];
            var expected = filter[rawKey];

            if (parsed.op === 'in' || (Array.isArray(expected) && parsed.op === 'eq')) {
                return (Array.isArray(expected) ? expected : [expected]).some(function (v) {
                    return String(actual) === String(v);
                });
            }

            if (parsed.op === 'nin') {
                return !(Array.isArray(expected) ? expected : [expected]).some(function (v) {
                    return String(actual) === String(v);
                });
            }

            return matchOne(actual, parsed.op, expected);
        });
    }

    function applyOrder(items, order, resolveField) {
        if (!isPlainObject(order)) {
            return items;
        }

        var keys = Object.keys(order);
        if (!keys.length) {
            return items;
        }

        return items.slice().sort(function (left, right) {
            for (var i = 0; i < keys.length; i++) {
                var field = resolveField(keys[i]);
                var direction = String(order[keys[i]]).toUpperCase() === 'DESC' ? -1 : 1;
                var a = comparable(left[field]);
                var b = comparable(right[field]);
                if (a === b) {
                    continue;
                }
                if (a === null) return 1;
                if (b === null) return -1;
                return a > b ? direction : -direction;
            }
            return 0;
        });
    }

    function applySelect(item, select, resolveField, alwaysKeep) {
        if (!Array.isArray(select) || !select.length || select.indexOf('*') !== -1) {
            return item;
        }

        var picked = {};
        (alwaysKeep || []).forEach(function (key) {
            if (Object.prototype.hasOwnProperty.call(item, key)) {
                picked[key] = item[key];
            }
        });

        select.forEach(function (name) {
            if (name === 'UF_*') {
                return;
            }
            var field = resolveField(name);
            if (Object.prototype.hasOwnProperty.call(item, field)) {
                picked[field] = item[field];
            }
        });

        return picked;
    }

    function paginate(items, start) {
        var offset = Math.max(0, parseInt(start, 10) || 0);
        var page = items.slice(offset, offset + PAGE_SIZE);
        var next = offset + PAGE_SIZE < items.length ? offset + PAGE_SIZE : null;
        return { page: page, next: next, total: items.length };
    }

    var identity = function (name) {
        return name;
    };

    // Описание исполнителей: какая сущность, как называть поля, как обернуть ответ.
    var EXECUTORS = {
        'crm.deal.list': listExecutor('deals', identity, ['ID']),
        'crm.deal.get': getExecutor('deals', 'id', 'ID'),
        'crm.lead.list': listExecutor('leads', identity, ['ID']),
        'crm.lead.get': getExecutor('leads', 'id', 'ID'),
        'crm.contact.list': listExecutor('contacts', identity, ['ID']),
        'crm.contact.get': getExecutor('contacts', 'id', 'ID'),
        'crm.company.list': listExecutor('companies', identity, ['ID']),
        'crm.company.get': getExecutor('companies', 'id', 'ID'),
        'crm.status.list': listExecutor('statuses', identity, ['ID']),
        'user.get': listExecutor('users', identity, ['ID']),
        'tasks.task.list': listExecutor('tasks', toCamel, ['id'], 'tasks'),
        'tasks.task.get': getExecutor('tasks', 'taskId', 'id', 'task'),
        'crm.category.list': function (params, dataset) {
            var entityTypeId = params.entityTypeId;
            var categories = dataset.entities.categories.filter(function (category) {
                return String(category.entityTypeId) === String(entityTypeId);
            });
            return { result: { categories: categories } };
        },
    };

    function listExecutor(entity, resolveField, alwaysKeep, wrapKey) {
        return function (params, dataset) {
            var items = dataset.entities[entity] || [];

            var filtered = items.filter(function (item) {
                return matchFilter(item, params.filter, resolveField);
            });

            var ordered = applyOrder(filtered, params.order, resolveField);
            var paged = paginate(ordered, params.start);

            var rows = paged.page.map(function (item) {
                return applySelect(item, params.select, resolveField, alwaysKeep);
            });

            var response = {};
            response.result = wrapKey ? wrap(wrapKey, rows) : rows;
            response.total = paged.total;
            if (paged.next !== null) {
                response.next = paged.next;
            }
            return response;
        };
    }

    function getExecutor(entity, idParam, idField, wrapKey) {
        return function (params, dataset) {
            var wanted = params[idParam];
            var items = dataset.entities[entity] || [];
            var found = null;

            for (var i = 0; i < items.length; i++) {
                if (String(items[i][idField]) === String(wanted)) {
                    found = items[i];
                    break;
                }
            }

            if (!found) {
                if (Number(wanted) >= SYNTHETIC_ID_BASE) {
                    return {
                        __error: {
                            error: 'SIMULATOR_NOT_PERSISTED',
                            error_description:
                                'Объект с идентификатором ' +
                                wanted +
                                ' был возвращён симулятором как результат write-метода и не сохранялся. ' +
                                'Симулятор не хранит созданные объекты — используйте идентификаторы из тестового датасета.',
                        },
                    };
                }
                return {
                    __error: {
                        error: 'NOT_FOUND',
                        error_description: 'Объект не найден в тестовом датасете. Доступные идентификаторы: 1…' + items.length + '.',
                    },
                };
            }

            return { result: wrapKey ? wrap(wrapKey, found) : found };
        };
    }

    function wrap(key, value) {
        var wrapped = {};
        wrapped[key] = value;
        return wrapped;
    }

    // ----------------------------------------------------------------- вызов

    function syntheticIdFor(method) {
        var hash = 0;
        for (var i = 0; i < method.length; i++) {
            hash = (hash * 31 + method.charCodeAt(i)) >>> 0;
        }
        return SYNTHETIC_ID_BASE + (hash % 90000);
    }

    function call(spec, params, dataset) {
        var input = isPlainObject(params) ? params : {};

        var secret = findSecret(input);
        if (secret) {
            return {
                error: 'SECURITY_REJECTED',
                error_description:
                    'Запрос содержит ' +
                    secret +
                    '. Симулятор не выполняет реальных вызовов и не принимает секреты. ' +
                    'Реальный вызов выполняйте напрямую на своём портале: POST https://{ваш_портал}/rest/{user_id}/{webhook}/' +
                    spec.method,
                simulator: { mode: 'simulated', rejected: true },
            };
        }

        var validation = validate(spec, input);
        var warnings = validation.warnings.slice();

        if (spec.deprecated) {
            warnings.push({
                class: 'deprecated_method',
                message: 'Метод устарел' + (spec.deprecated.successor ? ', используйте ' + spec.deprecated.successor : ''),
                successor: spec.deprecated.successor || null,
            });
        }

        if (!validation.ok) {
            return {
                error: 'SIMULATOR_VALIDATION',
                error_description: validation.errors
                    .map(function (item) {
                        if (item.class === 'wrong_type') {
                            return 'неверный тип ' + item.param + ' (ожидается ' + item.expected + ', получено ' + item.got + ')';
                        }
                        if (item.class === 'missing_required') {
                            return 'не передан обязательный параметр ' + item.param;
                        }
                        return 'неизвестный параметр ' + item.param;
                    })
                    .join('; '),
                simulator: {
                    mode: 'simulated',
                    data: dataset ? dataset.version : null,
                    validation: { ok: false, errors: validation.errors },
                    warnings: warnings,
                },
            };
        }

        var executor = EXECUTORS[spec.method];

        if (executor && dataset) {
            var executed = executor(input, dataset);

            if (executed.__error) {
                return {
                    error: executed.__error.error,
                    error_description: executed.__error.error_description,
                    simulator: { mode: 'simulated', data: dataset.version, validation: { ok: true }, warnings: warnings },
                };
            }

            executed.time = zeroTime();
            executed.simulator = {
                mode: 'simulated',
                data: dataset.version,
                executed: true,
                note: 'Вызов исполнен на тестовом датасете, не на реальном портале.',
                docs: spec.page || null,
                warnings: warnings,
            };
            return executed;
        }

        // Метод без исполнителя: валидация прошла, данные не создаются.
        var response = {};
        response.result = spec.kind === 'write' && /\.add$/.test(spec.method) ? syntheticIdFor(spec.method) : true;
        response.time = zeroTime();
        response.simulator = {
            mode: 'simulated',
            data: dataset ? dataset.version : null,
            executed: false,
            persisted: false,
            note:
                spec.kind === 'write'
                    ? 'Параметры корректны. Объект НЕ создан — симулятор ничего не сохраняет. Реальный вызов делайте на своём портале.'
                    : 'Параметры корректны. Для этого метода тестовых данных нет — ответ не рассчитывался.',
            docs: spec.page || null,
            warnings: warnings,
        };
        return response;
    }

    function zeroTime() {
        return { start: 0, finish: 0, duration: 0, processing: 0, operating: 0 };
    }

    function isExecutable(method) {
        return Object.prototype.hasOwnProperty.call(EXECUTORS, method);
    }

    return {
        validate: validate,
        call: call,
        isExecutable: isExecutable,
        findSecret: findSecret,
        PAGE_SIZE: PAGE_SIZE,
        SYNTHETIC_ID_BASE: SYNTHETIC_ID_BASE,
    };
});
