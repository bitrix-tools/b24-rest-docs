'use strict';

// Витрина. Данные приходят уже посчитанными с сервера — здесь только
// отрисовка. Графики рисуются вручную в SVG: библиотека ради пяти форм
// не нужна, а без внешних загрузок дашборд работает где угодно.

var NS = 'http://www.w3.org/2000/svg';
var nf = new Intl.NumberFormat('ru-RU');
var state = { range: '7d', from: '', to: '', data: null };
var sortState = {};

function fmt(value) { return nf.format(value || 0); }

function pct(value, digits) {
    if (value === null || value === undefined) { return '—'; }
    return (value * 100).toFixed(digits === undefined ? 1 : digits).replace('.', ',') + '%';
}

function ms(value) {
    if (value === null || value === undefined) { return '—'; }
    return value >= 1000 ? (value / 1000).toFixed(1).replace('.', ',') + ' с' : value + ' мс';
}

var MONTHS = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];

function labelFor(ts, bucket) {
    var d = new Date(ts);
    var day = d.getUTCDate() + ' ' + MONTHS[d.getUTCMonth()];
    if (bucket === 'hour') {
        return day + ' ' + String(d.getUTCHours()).padStart(2, '0') + ':00';
    }
    return day;
}

function el(tag, attrs, text) {
    var node = document.createElementNS(NS, tag);
    for (var key in attrs) { node.setAttribute(key, attrs[key]); }
    if (text !== undefined) { node.textContent = text; }
    return node;
}

// Округлённая «шапка» у конца столбца: данные упираются в базовую линию,
// свободный конец скруглён на 4px.
function barPath(x, y, w, h, r) {
    if (h <= 0) { return ''; }
    var radius = Math.min(r, w / 2, h);
    return 'M' + x + ',' + (y + h)
        + 'V' + (y + radius)
        + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + -radius
        + 'h' + (w - 2 * radius)
        + 'a' + radius + ',' + radius + ' 0 0 1 ' + radius + ',' + radius
        + 'V' + (y + h) + 'Z';
}

// Сколько подписей влезет по ширине. При одной-двух точках — а «всё
// время» на свежей установке даёт ровно это — прежние фиксированные
// индексы 0/середина/конец совпадали и подписи вставали друг на друга.
function timeTicks(series, innerWidth, bucket) {
    if (!series.length) {
        return [];
    }
    if (series.length === 1) {
        return [0];
    }
    var sample = labelFor(series[series.length - 1].ts, bucket);
    var labelWidth = sample.length * 6.8;
    // Крайние подписи прижаты к краям графика и занимают полную ширину, а
    // средние центрированы и занимают половину в каждую сторону. Худшая
    // пара — предпоследняя и последняя: им нужно полторы ширины плюс зазор.
    var need = labelWidth * 1.6 + 14;
    var fit = Math.floor(innerWidth / need) + 1;
    if (fit < 2) {
        return [series.length - 1];
    }
    var count = Math.min(fit, series.length);
    var out = [];
    for (var i = 0; i < count; i += 1) {
        var index = Math.round((i * (series.length - 1)) / (count - 1));
        if (out.indexOf(index) === -1) {
            out.push(index);
        }
    }
    return out;
}

function drawTimeAxis(svg, series, bucket, x, height, innerWidth) {
    var ticks = timeTicks(series, innerWidth, bucket);
    ticks.forEach(function (index, n) {
        var anchor = 'middle';
        if (ticks.length > 1 && n === 0) {
            anchor = 'start';
        } else if (ticks.length > 1 && n === ticks.length - 1) {
            anchor = 'end';
        }
        svg.appendChild(el('text', {
            class: 'axis-label axis-time', x: x(index), y: height - 6, 'text-anchor': anchor,
        }, labelFor(series[index].ts, bucket)));
    });
}

function niceMax(value) {
    if (value <= 5) { return 5; }
    var pow = Math.pow(10, Math.floor(Math.log10(value)));
    var steps = [1, 2, 2.5, 5, 10];
    for (var i = 0; i < steps.length; i += 1) {
        if (value <= steps[i] * pow) { return steps[i] * pow; }
    }
    return 10 * pow;
}

// ------------------------------------------------------------- подсказка

function makeTip(host) {
    var tip = document.createElement('div');
    tip.className = 'tip';
    host.appendChild(tip);
    return {
        show: function (html, x, y) {
            tip.innerHTML = html;
            tip.classList.add('on');
            var box = host.getBoundingClientRect();
            var own = tip.getBoundingClientRect();
            var left = Math.max(4, Math.min(x + 12, box.width - own.width - 4));
            tip.style.left = left + 'px';
            tip.style.top = Math.max(4, y - own.height - 10) + 'px';
        },
        hide: function () { tip.classList.remove('on'); },
    };
}

// --------------------------------------------------- график с накоплением

function areaChart(host, series, bucket) {
    host.innerHTML = '';
    if (!series.length) { host.innerHTML = '<div class="empty">Пока нет данных</div>'; return; }

    var W = host.clientWidth || 900;
    var H = 220;
    var pad = { l: 44, r: 8, t: 12, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;

    var peak = 0;
    series.forEach(function (p) { peak = Math.max(peak, p.human + p.agent + p.unknown); });
    var max = niceMax(peak);

    // Порядок слоёв снизу вверх. Неопознанные — это вызовы из виджета с
    // клиентом, похожим на бота: их немного, но без них стопка не
    // сходится с плиткой «всего», и график выглядит враньём.
    var LAYERS = [
        { key: 'human', color: 'var(--human)', label: 'Люди' },
        { key: 'agent', color: 'var(--agent)', label: 'ИИ-агенты' },
        { key: 'unknown', color: 'var(--muted)', label: 'Неопознанные' },
    ];

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Активность песочницы за период' });
    var x = function (i) { return pad.l + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw); };
    var y = function (v) { return pad.t + ih - (v / max) * ih; };

    // Сетка: четыре линии, подписи только на них.
    for (var g = 0; g <= 4; g += 1) {
        var value = (max / 4) * g;
        svg.appendChild(el('line', { class: 'gridline', x1: pad.l, x2: W - pad.r, y1: y(value), y2: y(value) }));
        svg.appendChild(el('text', { class: 'axis-label', x: pad.l - 8, y: y(value) + 4, 'text-anchor': 'end' }, fmt(value)));
    }

    function baseAt(point, layerIndex) {
        var sum = 0;
        for (var n = 0; n < layerIndex; n += 1) {
            sum += point[LAYERS[n].key];
        }
        return sum;
    }

    function areaFor(layerIndex) {
        var key = LAYERS[layerIndex].key;
        var top = [];
        var bottom = [];
        series.forEach(function (p, i) {
            var base = baseAt(p, layerIndex);
            top.push(x(i) + ',' + y(base + p[key]));
            bottom.unshift(x(i) + ',' + y(base));
        });
        return 'M' + top.join('L') + 'L' + bottom.join('L') + 'Z';
    }

    // На одной-двух точках заливка между точками вырождается в полосу
    // нулевой ширины и график выглядит пустым, хотя данные есть. Такой
    // ряд честнее показать столбцами.
    var asBars = series.length <= 2;

    if (asBars) {
        var slot = iw / series.length;
        var barW = Math.min(72, Math.max(8, slot - 8));
        series.forEach(function (p, i) {
            var left = pad.l + i * slot + (slot - barW) / 2;
            LAYERS.forEach(function (layer, n) {
                var value = p[layer.key];
                if (!value) { return; }
                var base = baseAt(p, n);
                var top = y(base + value);
                var height = y(base) - top;
                // Зазор в 2px цветом подложки между сегментами стопки.
                var gap = base > 0 ? 2 : 0;
                svg.appendChild(el('rect', {
                    x: left, y: top, width: barW, height: Math.max(1, height - gap),
                    fill: layer.color, rx: 3,
                }));
            });
        });
    } else {
        LAYERS.forEach(function (layer, n) {
            svg.appendChild(el('path', { d: areaFor(n), fill: layer.color, 'fill-opacity': '0.85' }));
        });

        // Границы между слоями цветом подложки — чтобы стопка читалась
        // и в оттенках серого, а не только по цвету.
        for (var n = 0; n < LAYERS.length - 1; n += 1) {
            var edge = [];
            series.forEach(function (p, i) { edge.push(x(i) + ',' + y(baseAt(p, n + 1))); });
            svg.appendChild(el('polyline', { points: edge.join(' '), fill: 'none', stroke: 'var(--surface)', 'stroke-width': 2 }));
        }
    }

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));

    drawTimeAxis(svg, series, bucket, x, H, iw);

    var cursor = el('line', { class: 'baseline', y1: pad.t, y2: pad.t + ih, opacity: 0 });
    svg.appendChild(cursor);
    var dots = LAYERS.map(function (layer) {
        var dot = el('circle', { r: 4, fill: layer.color, stroke: 'var(--surface)', 'stroke-width': 2, opacity: 0 });
        svg.appendChild(dot);
        return dot;
    });

    host.appendChild(svg);
    var tip = makeTip(host);

    svg.addEventListener('mousemove', function (event) {
        var box = svg.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width * W;
        var i = Math.round(((px - pad.l) / iw) * (series.length - 1));
        i = Math.max(0, Math.min(series.length - 1, i));
        var p = series[i];

        cursor.setAttribute('x1', x(i));
        cursor.setAttribute('x2', x(i));
        cursor.setAttribute('opacity', asBars ? 0 : 1);
        LAYERS.forEach(function (layer, n) {
            var visible = !asBars && p[layer.key] > 0;
            dots[n].setAttribute('cx', x(i));
            dots[n].setAttribute('cy', y(baseAt(p, n) + p[layer.key]));
            dots[n].setAttribute('opacity', visible ? 1 : 0);
        });

        var rows = LAYERS.filter(function (layer) { return p[layer.key] > 0; }).map(function (layer) {
            return '<div class="row"><i style="background:' + layer.color + '"></i>' + layer.label
                + '<span class="n">' + fmt(p[layer.key]) + '</span></div>';
        }).join('');

        tip.show(
            '<b>' + labelFor(p.ts, bucket) + '</b>'
            + (rows || '<div class="row">Вызовов не было</div>')
            + '<div class="row">Всего<span class="n">' + fmt(p.total) + '</span></div>',
            (x(i) / W) * box.width, event.clientY - box.top
        );
    });

    svg.addEventListener('mouseleave', function () {
        tip.hide();
        cursor.setAttribute('opacity', 0);
        dots.forEach(function (dot) { dot.setAttribute('opacity', 0); });
    });
}

// --------------------------------------------------------- линия одной серии

function lineChart(host, series, bucket) {
    host.innerHTML = '';
    var points = series.filter(function (p) { return p.ok + p.err > 0; });
    if (!points.length) { host.innerHTML = '<div class="empty">Пока нет данных</div>'; return; }

    var W = host.clientWidth || 420;
    var H = 180;
    var pad = { l: 40, r: 8, t: 12, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;

    var values = series.map(function (p) {
        var attempted = p.ok + p.err;
        return attempted ? p.err / attempted : null;
    });
    var peak = 0;
    values.forEach(function (v) { if (v !== null) { peak = Math.max(peak, v); } });
    var max = Math.max(0.05, Math.ceil(peak * 20) / 20);

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Доля ошибочных вызовов' });
    var x = function (i) { return pad.l + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw); };
    var y = function (v) { return pad.t + ih - (v / max) * ih; };

    for (var g = 0; g <= 2; g += 1) {
        var value = (max / 2) * g;
        svg.appendChild(el('line', { class: 'gridline', x1: pad.l, x2: W - pad.r, y1: y(value), y2: y(value) }));
        svg.appendChild(el('text', { class: 'axis-label', x: pad.l - 8, y: y(value) + 4, 'text-anchor': 'end' }, pct(value, 0)));
    }

    // Разрывы там, где вызовов не было: соединять их прямой — врать.
    var run = [];
    var segments = [];
    values.forEach(function (v, i) {
        if (v === null) { if (run.length) { segments.push(run); run = []; } return; }
        run.push(x(i) + ',' + y(v));
    });
    if (run.length) { segments.push(run); }
    segments.forEach(function (seg) {
        if (seg.length === 1) {
            var parts = seg[0].split(',');
            svg.appendChild(el('circle', { cx: parts[0], cy: parts[1], r: 3, fill: 'var(--err)' }));
            return;
        }
        svg.appendChild(el('polyline', { points: seg.join(' '), fill: 'none', stroke: 'var(--err)', 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round' }));
    });

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));
    drawTimeAxis(svg, series, bucket, x, H, iw);

    var dot = el('circle', { r: 4, fill: 'var(--err)', stroke: 'var(--surface)', 'stroke-width': 2, opacity: 0 });
    svg.appendChild(dot);
    host.appendChild(svg);
    var tip = makeTip(host);

    svg.addEventListener('mousemove', function (event) {
        var box = svg.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width * W;
        var i = Math.max(0, Math.min(series.length - 1, Math.round(((px - pad.l) / iw) * (series.length - 1))));
        var p = series[i];
        var v = values[i];
        if (v === null) { tip.hide(); dot.setAttribute('opacity', 0); return; }
        dot.setAttribute('cx', x(i));
        dot.setAttribute('cy', y(v));
        dot.setAttribute('opacity', 1);
        tip.show('<b>' + labelFor(p.ts, bucket) + '</b>'
            + '<div class="row">Ошибочных<span class="n">' + pct(v) + '</span></div>'
            + '<div class="row">Вызовов<span class="n">' + fmt(p.ok + p.err) + '</span></div>',
            (x(i) / W) * box.width, event.clientY - box.top);
    });
    svg.addEventListener('mouseleave', function () { tip.hide(); dot.setAttribute('opacity', 0); });
}

// ----------------------------------------------------------- столбцы

function barChart(host, items, options) {
    host.innerHTML = '';
    var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
    if (!total) { host.innerHTML = '<div class="empty">Пока нет данных</div>'; return; }

    var W = host.clientWidth || 420;
    var H = options.height || 180;
    var pad = { l: 40, r: 8, t: 12, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;
    var max = niceMax(Math.max.apply(null, items.map(function (i) { return i.value; })));

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': options.label });
    var y = function (v) { return pad.t + ih - (v / max) * ih; };

    for (var g = 0; g <= 2; g += 1) {
        var value = (max / 2) * g;
        svg.appendChild(el('line', { class: 'gridline', x1: pad.l, x2: W - pad.r, y1: y(value), y2: y(value) }));
        svg.appendChild(el('text', { class: 'axis-label', x: pad.l - 8, y: y(value) + 4, 'text-anchor': 'end' }, fmt(value)));
    }

    // Зазор в 2px между соседними столбцами — требование читаемости.
    var slot = iw / items.length;
    var barW = Math.max(2, slot - 2);
    var tip = makeTip(host);

    items.forEach(function (item, i) {
        var x = pad.l + i * slot + (slot - barW) / 2;
        var h = (item.value / max) * ih;
        var path = el('path', { d: barPath(x, y(item.value), barW, h, 4), fill: 'var(--bar)' });
        var hit = el('rect', { x: pad.l + i * slot, y: pad.t, width: slot, height: ih, fill: 'transparent' });
        hit.addEventListener('mousemove', function (event) {
            var box = svg.getBoundingClientRect();
            tip.show('<b>' + item.label + '</b><div class="row">Вызовов<span class="n">' + fmt(item.value) + '</span></div>',
                ((x + barW / 2) / W) * box.width, event.clientY - box.top);
        });
        hit.addEventListener('mouseleave', function () { tip.hide(); });
        svg.appendChild(path);
        svg.appendChild(hit);
    });

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));
    (options.ticks || []).forEach(function (tick) {
        svg.appendChild(el('text', {
            class: 'axis-label', x: pad.l + tick.index * slot + slot / 2, y: H - 6, 'text-anchor': 'middle',
        }, tick.label));
    });

    host.appendChild(svg);
}

// ------------------------------------------------- ранжированные списки

function ranked(host, rows, options) {
    host.innerHTML = '';
    if (!rows.length) { host.innerHTML = '<div class="empty">Пока нет данных</div>'; return; }
    var max = rows[0].count || 1;
    var box = document.createElement('div');
    box.className = 'ranked';
    rows.forEach(function (row) {
        var line = document.createElement('div');
        line.className = 'row';
        var share = Math.max(2, (row.count / max) * 100);
        line.innerHTML = '<div class="track"><div class="fill" style="width:' + share + '%"></div></div>'
            + '<div class="name" title="' + escapeHtml(row.key) + '">' + escapeHtml(options.label ? options.label(row.key) : row.key) + '</div>'
            + '<div class="n">' + fmt(row.count) + '</div>';
        box.appendChild(line);
    });
    host.appendChild(box);
}

// ------------------------------------------------- сортируемые таблицы

var FORMATTERS = {
    text: function (v) { return escapeHtml(v === '' || v === null ? '—' : v); },
    num: function (v) { return v === null || v === undefined ? '—' : fmt(v); },
    pct: function (v) { return pct(v); },
    ms: function (v) { return ms(v); },
};

function compare(a, b, key, dir) {
    var x = a[key];
    var y = b[key];
    if (typeof x === 'string' || typeof y === 'string') {
        var result = String(x || '').localeCompare(String(y || ''), 'ru');
        return dir === 'asc' ? result : -result;
    }
    // Пустое значение всегда внизу, в любую сторону сортировки: иначе
    // «нет данных» вылезает наверх и мешает читать таблицу.
    if (x === null || x === undefined) { return 1; }
    if (y === null || y === undefined) { return -1; }
    return dir === 'asc' ? x - y : y - x;
}

function sortableTable(hostId, columns, rows, defaultKey) {
    var host = document.getElementById(hostId);
    host.innerHTML = '';
    if (!rows.length) {
        host.innerHTML = '<div class="empty">Пока нет данных</div>';
        return;
    }

    var sort = sortState[hostId];
    if (!sort) {
        sort = sortState[hostId] = { key: defaultKey, dir: 'desc' };
    }

    var sorted = rows.slice().sort(function (a, b) { return compare(a, b, sort.key, sort.dir); });

    var head = columns.map(function (column) {
        var active = column.key === sort.key;
        var arrow = active ? (sort.dir === 'asc' ? '↑' : '↓') : '';
        return '<th class="' + (column.type === 'text' ? '' : 'right') + '"'
            + ' aria-sort="' + (active ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none') + '">'
            + '<button type="button" data-key="' + column.key + '"' + (active ? ' class="active"' : '') + '>'
            + escapeHtml(column.label) + '<span class="arrow">' + arrow + '</span></button></th>';
    }).join('');

    var body = sorted.map(function (row) {
        return '<tr>' + columns.map(function (column) {
            var value = FORMATTERS[column.type || 'num'](row[column.key]);
            var title = column.type === 'text' ? ' title="' + escapeHtml(row[column.key]) + '"' : '';
            return '<td class="' + (column.type === 'text' ? 'cell-text' : 'right') + '"' + title + '>' + value + '</td>';
        }).join('') + '</tr>';
    }).join('');

    var table = document.createElement('div');
    table.className = 'scroll tall';
    table.innerHTML = '<table class="data"><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table>';
    host.appendChild(table);

    table.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-key]');
        if (!button) {
            return;
        }
        var key = button.dataset.key;
        var column = columns.filter(function (c) { return c.key === key; })[0];
        if (sort.key === key) {
            sort.dir = sort.dir === 'asc' ? 'desc' : 'asc';
        } else {
            sort.key = key;
            // Имя удобнее читать с начала алфавита, числа — с максимума.
            sort.dir = column && column.type === 'text' ? 'asc' : 'desc';
        }
        sortableTable(hostId, columns, rows, defaultKey);
    });
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (ch) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
}

// ------------------------------------------------------------- плитки

var OUTCOME_RU = {
    valid: 'Корректный вызов',
    invalid: 'Ошибка валидации',
    rejected_secret: 'Отклонён: секрет в запросе',
    unknown_method: 'Неизвестный метод',
    bad_json: 'Битый JSON',
    body_too_large: 'Тело больше лимита',
    rate_limited: 'Упёрся в лимит частоты',
    not_found: 'Неизвестный маршрут',
    error: 'Внутренняя ошибка',
    ok: 'Служебный запрос',
};

function kpis(data) {
    var t = data.totals;
    var host = document.getElementById('kpis');
    var tiles = [
        { label: 'Всего вызовов', value: fmt(t.attempted), foot: t.service ? fmt(t.service) + ' служебных сверх того' : 'за выбранный период' },
        { label: 'Успешных', value: fmt(t.ok), foot: pct(t.successRate) + ' от вызовов', dot: 'var(--ok)' },
        { label: 'Ошибочных', value: fmt(t.err), foot: pct(t.errorRate) + ' от вызовов', dot: 'var(--err)' },
        { label: 'ИИ-агенты', value: fmt(t.agent), foot: 'через HTTP-endpoint', dot: 'var(--agent)' },
        { label: 'Люди', value: fmt(t.human), foot: 'через виджет в документации', dot: 'var(--human)' },
        { label: 'Сессий', value: fmt(t.sessions), foot: 'уникальных за сутки, суммарно' },
    ];
    host.innerHTML = tiles.map(function (tile) {
        return '<div class="kpi"><div class="label">' + tile.label + '</div>'
            + '<div class="value">' + (tile.dot ? '<span class="dot" style="background:' + tile.dot + '"></span>' : '') + tile.value + '</div>'
            + '<div class="foot">' + tile.foot + '</div></div>';
    }).join('');
}

function recentTable(data) {
    var table = document.getElementById('recent');
    if (!data.recent.length) {
        table.innerHTML = '<tr><td class="empty">Событий пока не было</td></tr>';
        return;
    }
    var head = '<tr><th>Время</th><th>Метод</th><th>Кто</th><th>Исход</th><th>Ошибки</th><th>Время ответа</th></tr>';
    var rows = data.recent.map(function (row) {
        var when = new Date(row.ts).toLocaleString('ru-RU', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        var actor = row.actor === 'agent' ? 'ИИ-агент' : (row.actor === 'human' ? 'Человек' : 'Неизвестно');
        var ok = row.outcome === 'valid';
        return '<tr><td>' + when + '</td>'
            + '<td class="method">' + escapeHtml(row.method || '—') + '</td>'
            + '<td>' + actor + '</td>'
            + '<td><span class="tag ' + (ok ? 'ok' : 'err') + '">' + escapeHtml(OUTCOME_RU[row.outcome] || row.outcome) + '</span></td>'
            + '<td class="method">' + escapeHtml((row.errors || []).join(', ') || '—') + '</td>'
            + '<td>' + (row.ms === null || row.ms === undefined ? '—' : ms(row.ms)) + '</td></tr>';
    }).join('');
    table.innerHTML = head + rows;
}

function render(data) {
    state.data = data;
    kpis(data);

    var span = new Date(data.range.from).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
        + ' — ' + new Date(data.range.to).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    document.getElementById('activity-hint').textContent =
        'Вызовы по ' + (data.range.bucket === 'hour' ? 'часам' : 'суткам') + ', ' + span;
    document.getElementById('clear-dates').hidden = !data.range.custom;

    areaChart(document.getElementById('activity'), data.series, data.range.bucket);
    lineChart(document.getElementById('errorrate'), data.series, data.range.bucket);

    barChart(document.getElementById('hourofday'), data.hourOfDay.map(function (value, hour) {
        return { label: String(hour).padStart(2, '0') + ':00 UTC', value: value };
    }), {
        label: 'Вызовы по часам суток',
        ticks: [{ index: 0, label: '00' }, { index: 6, label: '06' }, { index: 12, label: '12' }, { index: 18, label: '18' }, { index: 23, label: '23' }],
    });

    barChart(document.getElementById('latency'), data.latency.map(function (bucket, i) {
        var prev = i === 0 ? 0 : data.latency[i - 1].edge;
        var label = bucket.edge === null ? 'дольше ' + ms(prev) : ms(prev) + ' – ' + ms(bucket.edge);
        return { label: label, value: bucket.count };
    }), {
        label: 'Распределение времени ответа',
        ticks: [{ index: 0, label: '1 мс' }, { index: 6, label: '100 мс' }, { index: 9, label: '1 с' }, { index: 12, label: '5 с+' }],
    });

    var tables = data.tables || { methods: [], pages: [], errors: [], errorParams: [] };

    sortableTable('methods', [
        { key: 'key', label: 'Метод', type: 'text' },
        { key: 'total', label: 'Вызовов' },
        { key: 'ok', label: 'Успешных' },
        { key: 'err', label: 'Ошибок' },
        { key: 'errorRate', label: 'Доля ошибок', type: 'pct' },
        { key: 'agent', label: 'Агенты' },
        { key: 'human', label: 'Люди' },
        { key: 'executed', label: 'Исполнено' },
        { key: 'avgMs', label: 'Ср. время', type: 'ms' },
    ], tables.methods, 'total');

    sortableTable('pages', [
        { key: 'key', label: 'Страница', type: 'text' },
        { key: 'total', label: 'Запусков' },
        { key: 'ok', label: 'Успешных' },
        { key: 'err', label: 'Ошибок' },
        { key: 'errorRate', label: 'Доля ошибок', type: 'pct' },
    ], tables.pages, 'total');

    sortableTable('errors', [
        { key: 'key', label: 'Класс ошибки', type: 'text' },
        { key: 'count', label: 'Случаев' },
        { key: 'share', label: 'Доля', type: 'pct' },
    ], tables.errors, 'count');

    sortableTable('errorparams', [
        { key: 'key', label: 'Параметр', type: 'text' },
        { key: 'count', label: 'Случаев' },
        { key: 'share', label: 'Доля', type: 'pct' },
    ], tables.errorParams, 'count');

    ranked(document.getElementById('outcomes'), data.outcomes, { label: function (key) { return OUTCOME_RU[key] || key; } });

    recentTable(data);

    var t = data.totals;
    document.getElementById('subtitle').textContent =
        'Симулятор REST API Битрикс24 · обновлено ' + new Date(data.generatedAt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('footer').innerHTML =
        '<span>Исполнено на датасете: ' + fmt(t.executed) + '</span>'
        + '<span>Отклонено секретов: ' + fmt(t.secret) + '</span>'
        + '<span>Упёрлось в лимит: ' + fmt(t.rateLimited) + '</span>'
        + '<span>Медиана ответа: ' + ms(t.p50Ms) + ', 95-й перцентиль: ' + ms(t.p95Ms) + '</span>'
        + '<span>Событий принято: ' + fmt(data.health.ingested) + '</span>';
}

function query() {
    if (state.from || state.to) {
        return 'from=' + encodeURIComponent(state.from) + '&to=' + encodeURIComponent(state.to);
    }
    return 'range=' + encodeURIComponent(state.range);
}

function load() {
    fetch('/api/stats?' + query(), { credentials: 'same-origin' })
        .then(function (response) { return response.json(); })
        .then(function (data) { if (data && data.totals) { render(data); } })
        .catch(function () { /* следующий тик подхватит */ });
}

function markRange(active) {
    [].forEach.call(document.querySelectorAll('#ranges button'), function (b) {
        b.setAttribute('aria-pressed', String(b.dataset.range === active));
    });
}

document.getElementById('ranges').addEventListener('click', function (event) {
    var button = event.target.closest('button[data-range]');
    if (!button) { return; }
    state.range = button.dataset.range;
    // Готовый период отменяет ручные даты, иначе непонятно, что показано.
    state.from = '';
    state.to = '';
    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    markRange(state.range);
    load();
});

['from', 'to'].forEach(function (id) {
    document.getElementById(id).addEventListener('change', function () {
        state[id] = this.value;
        markRange(state.from || state.to ? '' : state.range);
        load();
    });
});

document.getElementById('clear-dates').addEventListener('click', function () {
    state.from = '';
    state.to = '';
    document.getElementById('from').value = '';
    document.getElementById('to').value = '';
    markRange(state.range);
    load();
});

var resizeTimer;
window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { if (state.data) { render(state.data); } }, 150);
});

load();
setInterval(load, 60000);
