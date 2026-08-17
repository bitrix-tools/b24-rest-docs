'use strict';

// Разбор YFM-таблиц Diplodoc:
//
//   #|
//   || **Название**
//   `тип` | **Описание** ||
//   || **fields***
//   [`object`](../data-types.md) | Значения полей ||
//   |#
//
// Строка таблицы начинается с `||` и заканчивается на `||`, ячейки внутри строки
// разделены `|`. Внутри ячейки может лежать вложенная таблица (`#| ... |#`) и блок
// кода — в них разделители игнорируются.

const FENCE_RE = /^(```|~~~)/;

function isFenceStart(line) {
    return FENCE_RE.test(line.trim());
}

// Находит все таблицы верхнего уровня. Возвращает массив
// { startLine, endLine, rows: [[cell, cell], ...] }.
function parseTables(markdown) {
    const lines = markdown.split(/\r?\n/);
    const tables = [];

    let inFence = false;
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (isFenceStart(line)) {
            inFence = !inFence;
            i++;
            continue;
        }

        if (!inFence && line.trim() === '#|') {
            const block = collectTableBlock(lines, i);
            if (block) {
                tables.push({
                    startLine: i + 1,
                    endLine: block.endIndex + 1,
                    rows: parseRows(block.body),
                });
                i = block.endIndex + 1;
                continue;
            }
        }

        i++;
    }

    return tables;
}

// Собирает тело таблицы от строки `#|` до парного `|#` с учётом вложенности.
function collectTableBlock(lines, openIndex) {
    let depth = 0;
    let inFence = false;
    const body = [];

    for (let i = openIndex; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();

        if (isFenceStart(line)) {
            inFence = !inFence;
        }

        if (!inFence) {
            if (trimmed === '#|') {
                depth++;
                if (depth === 1) {
                    continue; // открывающий маркер самой таблицы в тело не попадает
                }
            } else if (trimmed === '|#') {
                depth--;
                if (depth === 0) {
                    return { body, endIndex: i };
                }
            }
        }

        body.push(line);
    }

    return null; // незакрытая таблица — считаем страницу непарсибельной
}

// Делит тело таблицы на строки. Строка начинается с `||` в начале строки файла
// и заканчивается на `||` в конце строки файла.
function parseRows(bodyLines) {
    const rows = [];

    let current = null;
    let inFence = false;
    let nested = 0;

    for (const line of bodyLines) {
        const trimmed = line.trim();

        if (isFenceStart(line)) {
            inFence = !inFence;
        }

        const structural = !inFence;

        if (structural && trimmed === '#|') {
            nested++;
        } else if (structural && trimmed === '|#') {
            nested = Math.max(0, nested - 1);
        }

        const atTopLevel = structural && nested === 0;

        if (atTopLevel && current === null && trimmed.startsWith('||')) {
            current = [line.replace(/^\s*\|\|/, '')];
        } else if (current !== null) {
            current.push(line);
        } else {
            continue; // мусор между строками таблицы
        }

        if (atTopLevel && current !== null && trimmed.endsWith('||') && !(current.length === 1 && trimmed === '||')) {
            const last = current.length - 1;
            current[last] = current[last].replace(/\|\|\s*$/, '');
            rows.push(splitCells(current.join('\n')));
            current = null;
        }
    }

    if (current !== null) {
        rows.push(splitCells(current.join('\n')));
    }

    return rows;
}

// Делит текст строки таблицы на ячейки по разделителям `|`, игнорируя те, что
// находятся внутри блока кода, инлайн-кода или вложенной таблицы.
function splitCells(rowText) {
    const lines = rowText.split('\n');
    const cells = [];
    let buffer = [];

    let inFence = false;
    let nested = 0;

    for (const line of lines) {
        if (isFenceStart(line)) {
            inFence = !inFence;
            buffer.push(line);
            continue;
        }

        const trimmed = line.trim();

        if (!inFence && trimmed === '#|') {
            nested++;
            buffer.push(line);
            continue;
        }

        if (!inFence && trimmed === '|#') {
            nested = Math.max(0, nested - 1);
            buffer.push(line);
            continue;
        }

        if (inFence || nested > 0) {
            buffer.push(line);
            continue;
        }

        const parts = splitLineOnPipes(line);

        if (parts.length === 1) {
            buffer.push(line);
            continue;
        }

        buffer.push(parts[0]);
        for (let k = 1; k < parts.length; k++) {
            cells.push(buffer.join('\n').trim());
            buffer = [parts[k]];
        }
    }

    cells.push(buffer.join('\n').trim());

    return cells;
}

// Делит одну строку по `|`, пропуская инлайн-код и экранированные символы.
function splitLineOnPipes(line) {
    const parts = [];
    let start = 0;
    let inCode = false;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (ch === '\\') {
            i++;
            continue;
        }

        if (ch === '`') {
            inCode = !inCode;
            continue;
        }

        if (ch === '|' && !inCode) {
            // `||` внутри строки — не разделитель ячеек
            if (line[i + 1] === '|' || line[i - 1] === '|') {
                i++;
                continue;
            }
            parts.push(line.slice(start, i));
            start = i + 1;
        }
    }

    parts.push(line.slice(start));

    return parts;
}

module.exports = { parseTables, splitCells };
