'use strict';

// Сборка машиночитаемой схемы метода из страницы документации.
// Вход — markdown страницы, выход — объект схемы (см. simulator/README.md)
// и список замечаний линтера.

const { parseTables } = require('./yfm-table.js');

const READ_SUFFIXES = ['.get', '.list', '.fields', '.getlist', '.getfields'];

// Доменные типы документации → базовый тип для валидации.
const TYPE_MAP = {
    string: 'string',
    'string[]': 'array',
    integer: 'integer',
    'integer[]': 'array',
    int: 'integer',
    double: 'number',
    float: 'number',
    number: 'number',
    boolean: 'boolean',
    bool: 'boolean',
    char: 'char',
    object: 'object',
    array: 'array',
    any: 'any',
    unknown: 'any',
    date: 'date',
    datetime: 'datetime',
    timestamp: 'integer',
    time: 'object',
    user: 'integer',
    file: 'any',
    diskfile: 'any',
    money: 'string',
    url: 'string',
    email: 'string',
    phone: 'string',
    color: 'string',
    placement: 'string',
    crm_status: 'string',
    crm_category: 'integer',
    crm_currency: 'string',
    crm_contact: 'integer',
    crm_company: 'integer',
    crm_lead: 'integer',
    crm_deal: 'integer',
    crm_quote: 'integer',
    crm_multifield: 'array',
    crm_entity: 'integer',
    crm_userfield: 'object',
    crm_item_product_row: 'object',
    crm_activity_communication: 'object',
    lead: 'integer',
    item: 'object',
    text: 'string',
    location: 'object',
    lang_map: 'any',
    attached_diskfile: 'any',
    uf_enum_element: 'any',
    crm_enum_ownertype: 'string',
    crm_enum_activitytype: 'integer',
    crm_entity_type: 'string',
    catalog_product: 'integer',
    tasks_task: 'integer',
    sonet_group: 'integer',
    department: 'integer',
};

function classifyKind(method) {
    const lower = method.toLowerCase();
    return READ_SUFFIXES.some((s) => lower.endsWith(s)) ? 'read' : 'write';
}

// «Кто может выполнять метод: ...» и «Scope: [`crm`](...)» лежат в цитате в шапке.
function extractScope(md) {
    const m = md.match(/^>\s*Scope:\s*\[`([^`]+)`\]/m);
    return m ? m[1].trim() : null;
}

function extractPermissions(md) {
    const m = md.match(/^>\s*Кто может выполнять метод:\s*(.+)$/m);
    return m ? cleanText(m[1]) : null;
}

function extractTitle(md) {
    const m = md.match(/^#\s+(.+)$/m);
    return m ? cleanText(m[1]) : null;
}

// Имя метода — последний «точечный» идентификатор в заголовке H1.
function extractMethod(md) {
    const h1 = md.match(/^#\s+(.+)$/m);
    if (!h1) {
        return null;
    }
    const matches = h1[1].match(/\b[a-z][a-z0-9_]*(?:\.[a-z0-9_]+)+\b/gi);
    if (!matches || !matches.length) {
        return null;
    }
    const candidate = matches[matches.length - 1];

    if (/\.(md|html|json|php|js)$/i.test(candidate)) {
        return null;
    }

    // Имя целиком в верхнем регистре — это событие (ONCRMDEALADD, CATALOG.PRICE.ON.ADD).
    // Событие нельзя вызвать, симулятору его предлагать нечего.
    if (candidate === candidate.toUpperCase()) {
        return null;
    }

    // BX24.* — методы клиентской библиотеки BX24.js, а не REST.
    if (/^BX24\./i.test(candidate)) {
        return null;
    }

    return candidate;
}

function extractDeprecated(md) {
    if (!/\{%\s*note\s+warning\s+"DEPRECATED"/.test(md)) {
        return null;
    }
    const block = md.match(/\{%\s*note\s+warning\s+"DEPRECATED"[^%]*%\}([\s\S]*?)\{%\s*endnote\s*%\}/);
    if (!block) {
        return { successor: null };
    }
    const link = block[1].match(/\[([a-z0-9_.]+)\]\(([^)]+)\)/i);
    return { successor: link ? link[1] : null };
}

// Пример успешного ответа — первый json-блок после «## Обработка ответа».
function extractResultExample(md) {
    const idx = md.search(/^##\s+Обработка ответа\s*$/m);
    if (idx === -1) {
        return null;
    }
    const tail = md.slice(idx);
    const fence = tail.match(/```json\s*\n([\s\S]*?)\n```/);
    if (!fence) {
        return null;
    }
    try {
        return JSON.parse(fence[1]);
    } catch (e) {
        return null;
    }
}

function cleanText(text) {
    // Содержимое инлайн-кода прячем на время чистки: иначе снятие markdown-эмфазы
    // съедает звёздочки внутри значений вроде `'*'` и `'UF_*'`.
    const codes = [];

    return String(text)
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`\n]*)`/g, (match, inner) => {
            codes.push(inner);
            return '@@code' + (codes.length - 1) + '@@';
        })
        .replace(/\{%\s*(note|cut|list|endnote|endcut|endlist)[^%]*%\}/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/[*_]{1,3}/g, '')
        .replace(/@@code(\d+)@@/g, (match, index) => codes[Number(index)])
        .replace(/\s+/g, ' ')
        .trim();
}

function shorten(text, limit) {
    const clean = cleanText(text);
    if (clean.length <= limit) {
        return clean;
    }
    const cut = clean.slice(0, limit);
    const lastDot = cut.lastIndexOf('. ');
    return (lastDot > limit * 0.5 ? cut.slice(0, lastDot + 1) : cut).trim() + '…';
}

// Ячейка вида "**NAME***\n[`type`](../data-types.md)" → имя, тип, признак обязательности.
function parseNameCell(rawCell) {
    // Часть страниц размечает обязательность надстрочной звёздочкой `**id^*^**`
    // вместо `**id***`. Приводим к одному виду.
    const cell = rawCell.replace(/\*\*([^*\n]+?)\^\*\^\*\*/g, '**$1***');

    const nameMatch = cell.match(/\*\*([^*\n]+?)\*\*(\*)?/);
    if (!nameMatch) {
        return null;
    }

    const name = nameMatch[1].trim();
    const requiredMark = Boolean(nameMatch[2]);

    let type = null;
    const linked = cell.match(/\[`([^`]+)`\]\(/);
    if (linked) {
        type = linked[1].trim();
    } else {
        const rest = cell.slice(nameMatch.index + nameMatch[0].length);
        const inline = rest.match(/`([^`]+)`/);
        if (inline) {
            type = inline[1].trim();
        }
    }

    return { name, requiredMark, docType: type };
}

function baseTypeOf(docType) {
    if (!docType) {
        return 'any';
    }
    const key = docType.toLowerCase().trim();
    if (TYPE_MAP[key]) {
        return TYPE_MAP[key];
    }
    if (key.endsWith('[]')) {
        return 'array';
    }
    return null; // неизвестный доменный тип — уходит в замечания линтера
}

function tableToFields(table, ctx) {
    const fields = [];

    table.rows.forEach((row, index) => {
        if (index === 0) {
            return; // строка заголовков
        }
        if (row.length < 2) {
            ctx.notes.push({ level: 'warn', code: 'row_without_cells', detail: row[0] ? row[0].slice(0, 60) : '' });
            return;
        }

        const parsed = parseNameCell(row[0]);
        if (!parsed) {
            ctx.notes.push({ level: 'warn', code: 'cell_without_name', detail: row[0].slice(0, 60) });
            return;
        }

        const base = baseTypeOf(parsed.docType);
        if (base === null) {
            ctx.unknownTypes.add(parsed.docType);
        }

        fields.push({
            name: parsed.name,
            type: parsed.docType || 'unknown',
            base: base || 'any',
            required: parsed.requiredMark ? true : ctx.requiredConvention ? false : 'unknown',
            description: shorten(row[1], 400),
        });
    });

    return fields;
}

// Заголовок «### Параметр fields {#fields}» связывает подтаблицу с параметром.
function findParamSubtables(md, tables) {
    const result = new Map();
    const headingRe = /^###\s+Параметр\s+([A-Za-z_][A-Za-z0-9_]*)/gm;
    const lines = md.split(/\r?\n/);

    let match;
    while ((match = headingRe.exec(md)) !== null) {
        const lineNumber = md.slice(0, match.index).split(/\r?\n/).length;
        const next = tables.find((t) => t.startLine > lineNumber);
        if (next) {
            result.set(match[1], next);
        }
    }

    void lines;
    return result;
}

function tablesAfterHeading(md, headingRe, tables) {
    const idx = md.search(headingRe);
    if (idx === -1) {
        return null;
    }
    const lineNumber = md.slice(0, idx).split(/\r?\n/).length;
    return tables.find((t) => t.startLine > lineNumber) || null;
}

function buildSpec(markdown, sourcePath) {
    const notes = [];
    const unknownTypes = new Set();

    const method = extractMethod(markdown);
    if (!method) {
        return { spec: null, notes: [{ level: 'skip', code: 'no_method_in_h1' }], unknownTypes };
    }

    const hasParamsSection = /^##\s+Параметры( метода)?\s*$/m.test(markdown);
    if (!hasParamsSection) {
        return { spec: null, notes: [{ level: 'skip', code: 'no_params_section' }], unknownTypes };
    }

    const tables = parseTables(markdown);
    if (!tables.length) {
        return { spec: null, notes: [{ level: 'warn', code: 'no_tables' }], unknownTypes };
    }

    // Соглашение о звёздочке считается применённым, если страница подключает сноску
    // об обязательных параметрах или хотя бы один параметр помечен звёздочкой.
    const requiredConvention =
        /_includes\/required\.md/.test(markdown) || /\*\*[^*\n]+\*\*\*/.test(markdown);

    const ctx = { notes, unknownTypes, requiredConvention };

    const paramsTable = tablesAfterHeading(markdown, /^##\s+Параметры( метода)?\s*$/m, tables);
    if (!paramsTable) {
        return { spec: null, notes: [{ level: 'warn', code: 'params_table_not_found' }], unknownTypes };
    }

    const params = tableToFields(paramsTable, ctx);
    if (!params.length) {
        notes.push({ level: 'warn', code: 'empty_params_table' });
    }

    const subtables = findParamSubtables(markdown, tables);
    const defs = {};

    for (const param of params) {
        if (param.base !== 'object' && param.base !== 'array') {
            continue;
        }
        const table = subtables.get(param.name);
        if (!table) {
            param.dynamic = { allowed: true, note: 'Состав полей не описан подтаблицей на этой странице' };
            notes.push({ level: 'info', code: 'object_without_subtable', detail: param.name });
            continue;
        }
        // Состав полей описан подтаблицей: неизвестное поле — ошибка, и только
        // пользовательские UF_* пропускаются с предупреждением.
        const defName = param.name + 'Fields';
        defs[defName] = {
            dynamic: { allowed: false, ufAllowed: true, note: 'Пользовательские поля UF_* в схеме не описаны' },
            fields: tableToFields(table, ctx),
        };
        param.ref = '#/defs/' + defName;
    }

    const returnsTable = tablesAfterHeading(markdown, /^###\s+(Возвращаемые данные|Ответ в случае успеха)\s*$/m, tables);

    const spec = {
        $v: 1,
        method,
        scope: extractScope(markdown),
        kind: classifyKind(method),
        title: extractTitle(markdown),
        permissions: extractPermissions(markdown),
        params,
        defs,
        requiredConvention,
        confidence: 'parsed',
        source: { file: sourcePath.replace(/\\/g, '/') },
    };

    const deprecated = extractDeprecated(markdown);
    if (deprecated) {
        spec.deprecated = deprecated;
    }

    const resultExample = extractResultExample(markdown);
    if (resultExample) {
        spec.resultExample = resultExample;
    } else {
        notes.push({ level: 'info', code: 'no_result_example' });
    }

    if (returnsTable) {
        spec.returns = tableToFields(returnsTable, ctx);
    }

    const unknownRequired = params.filter((p) => p.required === 'unknown').length;
    if (unknownRequired > 0) {
        notes.push({ level: 'warn', code: 'required_unknown', detail: String(unknownRequired) });
    }

    return { spec, notes, unknownTypes };
}

module.exports = { buildSpec, baseTypeOf, cleanText, shorten, TYPE_MAP };
