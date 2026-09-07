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

function plural(count, one, few, many) {
    var mod100 = count % 100;
    if (mod100 >= 11 && mod100 <= 14) { return many; }
    var mod10 = count % 10;
    if (mod10 === 1) { return one; }
    if (mod10 >= 2 && mod10 <= 4) { return few; }
    return many;
}

// Человеческое название шага графика: «по часам», «по 6 часов», «по 3 дня».
function stepName(hours) {
    if (!hours || hours <= 1) { return 'по часам'; }
    if (hours < 24) { return 'по ' + hours + ' ' + plural(hours, 'часу', 'часа', 'часов'); }
    var days = Math.round(hours / 24);
    if (days === 1) { return 'по суткам'; }
    return 'по ' + days + ' ' + plural(days, 'дню', 'дня', 'дней');
}

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

// Шаг оси берётся только из мантисс 1, 2 и 5. Мантисса 2,5, которая была
// здесь раньше, и давала деления вида 0 / 1,25 / 2,5 / 3,75 / 5 на счётчике
// целых вызовов: niceMax(3) возвращал 5, а дальше максимум делился на
// четыре. Дробных вызовов не бывает, дробных делений быть не должно.
var STEP_MANTISSA = [1, 2, 5];
var DIVISION_ORDER = [4, 3, 5, 2];

function niceStep(raw, minStep) {
    if (!(raw > 0)) { return minStep; }
    var k = Math.floor(Math.log10(raw));
    for (var p = k; p <= k + 2; p += 1) {
        var pow = Math.pow(10, p);
        for (var i = 0; i < STEP_MANTISSA.length; i += 1) {
            var step = STEP_MANTISSA[i] * pow;
            if (step >= minStep && step >= raw - 1e-9) { return step; }
        }
    }
    return minStep;
}

// Подбирает шкалу, плотнее всего прижатую к данным: перебирает число
// делений и берёт вариант с наименьшим потолком. minStep = 1 для счётчиков
// и для процентных пунктов, cap ограничивает ось сверху (100 для долей).
function valueScale(peak, minStep, cap) {
    var best = null;
    for (var n = 0; n < DIVISION_ORDER.length; n += 1) {
        var divisions = DIVISION_ORDER[n];
        var step = niceStep((peak > 0 ? peak : 0) / divisions, minStep);
        var max = step * divisions;
        if (cap && max > cap + 1e-9) { continue; }
        if (!best || max < best.max - 1e-9) { best = { max: max, step: step, divisions: divisions }; }
    }
    if (!best) { best = { max: cap, step: cap / 2, divisions: 2 }; }

    var ticks = [];
    for (var i = 0; i <= best.divisions; i += 1) { ticks.push(best.step * i); }
    return { max: best.max, step: best.step, ticks: ticks };
}

// Левое поле под подписи оси значений: считается по самой длинной из них,
// иначе «10 000» вылезает за пределы карточки.
function axisPad(scale, format) {
    return Math.max(28, Math.ceil(String(format(scale.max)).length * 6.6) + 12);
}

function drawValueAxis(svg, ticks, y, pad, W, format) {
    ticks.forEach(function (value) {
        // На нуле сетку не рисуем — там уже проходит базовая линия, и две
        // линии друг на друге выглядят как утолщение.
        if (value > 0) {
            svg.appendChild(el('line', { class: 'gridline', x1: pad.l, x2: W - pad.r, y1: y(value), y2: y(value) }));
        }
        svg.appendChild(el('text', { class: 'axis-label', x: pad.l - 8, y: y(value) + 4, 'text-anchor': 'end' }, format(value)));
    });
}

// ------------------------------------------------------- сглаживание

// Монотонная кубическая интерполяция Фрича — Карлсона. В отличие от
// обычного сплайна она не даёт выбросов: кривая на каждом отрезке остаётся
// между значениями его концов. Для счётчиков это принципиально — обычный
// сплайн рисовал бы горбы между точками и провалы ниже нуля, то есть
// выдуманные вызовы и отрицательные значения.
function monotoneSlopes(xs, ys) {
    var n = ys.length;
    if (n < 2) { return [0]; }

    var secants = [];
    for (var i = 0; i < n - 1; i += 1) {
        var dx = xs[i + 1] - xs[i];
        secants.push(dx === 0 ? 0 : (ys[i + 1] - ys[i]) / dx);
    }

    var slopes = new Array(n);
    slopes[0] = secants[0];
    slopes[n - 1] = secants[n - 2];
    for (var k = 1; k < n - 1; k += 1) {
        // На локальном экстремуме наклон обнуляем — так кривая не
        // перелетает через точку.
        slopes[k] = secants[k - 1] * secants[k] <= 0
            ? 0
            : (secants[k - 1] + secants[k]) / 2;
    }

    for (var j = 0; j < n - 1; j += 1) {
        if (secants[j] === 0) {
            slopes[j] = 0;
            slopes[j + 1] = 0;
            continue;
        }
        var a = slopes[j] / secants[j];
        var b = slopes[j + 1] / secants[j];
        var scale = a * a + b * b;
        if (scale > 9) {
            var t = 3 / Math.sqrt(scale);
            slopes[j] = t * a * secants[j];
            slopes[j + 1] = t * b * secants[j];
        }
    }
    return slopes;
}

var SAMPLES_PER_SEGMENT = 8;

// Возвращает частую выборку значений вдоль кривой. Слои стопки сглаживаем
// именно так — по отдельности, а потом складываем: если сглаживать уже
// сложенные границы, они могут пересечься между узлами и слои налезут.
function sampleMonotone(values, samplesPerSegment) {
    var n = values.length;
    if (n === 0) { return []; }
    if (n === 1) { return [values[0]]; }

    var xs = [];
    for (var i = 0; i < n; i += 1) { xs.push(i); }
    var slopes = monotoneSlopes(xs, values);

    var out = [];
    for (var seg = 0; seg < n - 1; seg += 1) {
        var y0 = values[seg];
        var y1 = values[seg + 1];
        var m0 = slopes[seg];
        var m1 = slopes[seg + 1];
        for (var k = 0; k < samplesPerSegment; k += 1) {
            var t = k / samplesPerSegment;
            var t2 = t * t;
            var t3 = t2 * t;
            var value = (2 * t3 - 3 * t2 + 1) * y0
                + (t3 - 2 * t2 + t) * m0
                + (-2 * t3 + 3 * t2) * y1
                + (t3 - t2) * m1;
            // Страховка от вычислительной погрешности у нуля.
            out.push(value < 0 ? 0 : value);
        }
    }
    out.push(values[n - 1]);
    return out;
}

// Позиция выборки по оси X в долях индекса исходного ряда.
function sampleIndex(k, samplesPerSegment) {
    return k / samplesPerSegment;
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

    // Порядок слоёв снизу вверх. Неопознанные — вызовы из виджета с
    // клиентом, похожим на автоматический: их немного, но без них стопка
    // не сходится с плиткой «всего», и график занижает картину.
    var LAYERS = [
        { key: 'human', color: 'var(--human)', label: 'Люди' },
        { key: 'agent', color: 'var(--agent)', label: 'ИИ-агенты' },
        { key: 'unknown', color: 'var(--muted)', label: 'Неопознанные' },
    ];

    var peak = 0;
    series.forEach(function (p) { peak = Math.max(peak, p.human + p.agent + p.unknown); });

    var W = host.clientWidth || 900;
    var H = 220;
    var scale = valueScale(peak, 1);
    var pad = { l: axisPad(scale, fmt), r: 8, t: 12, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Активность песочницы за период' });
    var y = function (v) { return pad.t + ih - (v / scale.max) * ih; };

    // На одной-двух точках заливка между точками вырождается в полосу
    // нулевой ширины и график выглядит пустым, хотя данные есть.
    var asBars = series.length <= 2;
    var slot = iw / series.length;
    var xAt = asBars
        ? function (i) { return pad.l + i * slot + slot / 2; }
        : function (i) { return pad.l + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw); };

    drawValueAxis(svg, scale.ticks, y, pad, W, fmt);

    function baseAt(point, layerIndex) {
        var sum = 0;
        for (var n = 0; n < layerIndex; n += 1) { sum += point[LAYERS[n].key]; }
        return sum;
    }

    if (peak === 0) {
        // Период выбран, ось времени осмысленна, вызовов просто не было —
        // это другое состояние, чем «данных нет», и выглядеть должно иначе,
        // иначе читатель не понимает, сломан график или тишина настоящая.
        svg.appendChild(el('text', {
            class: 'empty-note', x: pad.l + iw / 2, y: pad.t + ih / 2, 'text-anchor': 'middle',
        }, 'За период вызовов не было'));
    } else if (asBars) {
        var barW = Math.min(72, Math.max(8, slot - 8));
        series.forEach(function (p, i) {
            var left = xAt(i) - barW / 2;
            LAYERS.forEach(function (layer, n) {
                var value = p[layer.key];
                if (!value) { return; }
                var base = baseAt(p, n);
                var top = y(base + value);
                var height = y(base) - top;
                var gap = base > 0 ? 2 : 0; // зазор цветом подложки между сегментами стопки
                svg.appendChild(el('rect', {
                    x: left, y: top, width: barW, height: Math.max(1, height - gap), fill: layer.color, rx: 3,
                }));
            });
        });
    } else {
        // Каждый слой сглаживается по отдельности, и только потом значения
        // складываются. Если сглаживать уже сложенные границы, между узлами
        // они могут пересечься и слои налезут друг на друга.
        var samples = LAYERS.map(function (layer) {
            return sampleMonotone(series.map(function (p) { return p[layer.key]; }), SAMPLES_PER_SEGMENT);
        });
        var sampleCount = samples[0].length;
        var sampleX = function (k) {
            return pad.l + (sampleIndex(k, SAMPLES_PER_SEGMENT) / (series.length - 1)) * iw;
        };

        // Накопленные границы: cumulative[n][k] — верх слоя n в выборке k.
        var cumulative = [];
        for (var n = 0; n < LAYERS.length; n += 1) {
            var row = new Array(sampleCount);
            for (var k = 0; k < sampleCount; k += 1) {
                row[k] = (n === 0 ? 0 : cumulative[n - 1][k]) + samples[n][k];
            }
            cumulative.push(row);
        }

        LAYERS.forEach(function (layer, n) {
            var top = [];
            var bottom = [];
            for (var k = 0; k < sampleCount; k += 1) {
                var base = n === 0 ? 0 : cumulative[n - 1][k];
                top.push(sampleX(k) + ',' + y(cumulative[n][k]));
                bottom.unshift(sampleX(k) + ',' + y(base));
            }
            svg.appendChild(el('path', {
                d: 'M' + top.join('L') + 'L' + bottom.join('L') + 'Z',
                fill: layer.color, 'fill-opacity': '0.85',
            }));
        });

        // Границы между слоями цветом подложки — стопка читается и в
        // оттенках серого, а не только по цвету.
        for (var b = 0; b < LAYERS.length - 1; b += 1) {
            var edge = [];
            for (var e = 0; e < sampleCount; e += 1) { edge.push(sampleX(e) + ',' + y(cumulative[b][e])); }
            svg.appendChild(el('polyline', { points: edge.join(' '), fill: 'none', stroke: 'var(--surface)', 'stroke-width': 2 }));
        }
    }

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));
    drawTimeAxis(svg, series, bucket, xAt, H, iw);

    var cursor = el('line', { class: 'cursor', y1: pad.t, y2: pad.t + ih, opacity: 0 });
    svg.appendChild(cursor);
    var dots = LAYERS.map(function (layer) {
        var dot = el('circle', { r: 4, fill: layer.color, stroke: 'var(--surface)', 'stroke-width': 2, opacity: 0 });
        svg.appendChild(dot);
        return dot;
    });

    host.appendChild(svg);
    var tip = makeTip(host);

    svg.addEventListener('pointermove', function (event) {
        var box = svg.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width * W;
        var i = asBars
            ? Math.floor((px - pad.l) / slot)
            : Math.round(((px - pad.l) / iw) * (series.length - 1));
        i = Math.max(0, Math.min(series.length - 1, i));
        var p = series[i];

        cursor.setAttribute('x1', xAt(i));
        cursor.setAttribute('x2', xAt(i));
        cursor.setAttribute('opacity', asBars ? 0 : 1);
        LAYERS.forEach(function (layer, n) {
            var visible = !asBars && p[layer.key] > 0;
            dots[n].setAttribute('cx', xAt(i));
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
            + (rows ? '<div class="row">Всего<span class="n">' + fmt(p.total) + '</span></div>' : ''),
            (xAt(i) / W) * box.width, event.clientY - box.top
        );
    });

    svg.addEventListener('pointerleave', function () {
        tip.hide();
        cursor.setAttribute('opacity', 0);
        dots.forEach(function (dot) { dot.setAttribute('opacity', 0); });
    });
}

// --------------------------------------------------------- линия одной серии

function lineChart(host, series, bucket) {
    host.innerHTML = '';
    var attemptedAnywhere = series.some(function (p) { return p.ok + p.err > 0; });
    if (!attemptedAnywhere) {
        // Доля ошибок от нуля вызовов не определена; рисовать 0 % — врать.
        host.innerHTML = '<div class="empty">Пока нет данных</div>';
        return;
    }

    // Ось в процентных пунктах. Раньше шкала считалась в долях, а подпись
    // округлялась до целого процента: линия стояла на 2,5 %, а подписана
    // была «3 %» — подпись не совпадала с положением линии.
    // Доля от одного-двух вызовов — это не показатель, а шум: одна ошибка
    // даёт сразу сто процентов. Такие корзины оставляем разрывом.
    var MIN_DENOMINATOR = 3;
    var valuesPp = series.map(function (p) {
        var attempted = p.ok + p.err;
        return attempted >= MIN_DENOMINATOR ? (p.err / attempted) * 100 : null;
    });
    var peakPp = 0;
    valuesPp.forEach(function (v) { if (v !== null && v > peakPp) { peakPp = v; } });

    var W = host.clientWidth || 420;
    var H = 180;
    var pctLabel = function (v) { return fmt(v) + '%'; };
    var scale = valueScale(peakPp, 1, 100);
    var pad = { l: axisPad(scale, pctLabel), r: 8, t: 12, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': 'Доля ошибочных вызовов' });
    // Индекс может быть дробным: сглаженная кривая ставит точки между узлами.
    var x = function (i) { return pad.l + (series.length === 1 ? iw / 2 : (i / (series.length - 1)) * iw); };
    var y = function (pp) { return pad.t + ih - (pp / scale.max) * ih; };

    drawValueAxis(svg, scale.ticks, y, pad, W, pctLabel);

    // Разрывы там, где вызовов не было: соединять их прямой — врать.
    var run = [];
    var segments = [];
    valuesPp.forEach(function (v, i) {
        if (v === null) { if (run.length) { segments.push(run); run = []; } return; }
        run.push({ index: i, value: v });
    });
    if (run.length) { segments.push(run); }

    segments.forEach(function (seg) {
        if (seg.length < 2) { return; }
        // Сглаживание монотонное: доля не может выскочить за пределы
        // соседних значений, то есть подняться выше ста процентов или
        // уйти ниже нуля между точками.
        var dense = sampleMonotone(seg.map(function (pt) { return pt.value; }), SAMPLES_PER_SEGMENT);
        var points = dense.map(function (value, k) {
            var pos = seg[0].index + sampleIndex(k, SAMPLES_PER_SEGMENT);
            return x(pos) + ',' + y(value);
        });
        svg.appendChild(el('polyline', {
            points: points.join(' '),
            fill: 'none', stroke: 'var(--err)', 'stroke-width': 2, 'stroke-linejoin': 'round', 'stroke-linecap': 'round',
        }));
    });

    // На скудных данных три отдельных часа — это три пикселя линии, которых
    // не видно, пока не наведёшь мышь. Ставим точки, пока их немного.
    var filled = valuesPp.filter(function (v) { return v !== null; }).length;
    if (filled <= 12) {
        segments.forEach(function (seg) {
            seg.forEach(function (pt) {
                svg.appendChild(el('circle', {
                    cx: x(pt.index), cy: y(pt.value), r: 2.5,
                    fill: 'var(--err)', stroke: 'var(--surface)', 'stroke-width': 1.5,
                }));
            });
        });
    }

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));
    drawTimeAxis(svg, series, bucket, x, H, iw);

    var dot = el('circle', { r: 4, fill: 'var(--err)', stroke: 'var(--surface)', 'stroke-width': 2, opacity: 0 });
    svg.appendChild(dot);
    host.appendChild(svg);
    var tip = makeTip(host);

    svg.addEventListener('pointermove', function (event) {
        var box = svg.getBoundingClientRect();
        var px = (event.clientX - box.left) / box.width * W;
        var i = Math.max(0, Math.min(series.length - 1, Math.round(((px - pad.l) / iw) * (series.length - 1))));
        var p = series[i];
        var v = valuesPp[i];
        if (v === null) { tip.hide(); dot.setAttribute('opacity', 0); return; }
        dot.setAttribute('cx', x(i));
        dot.setAttribute('cy', y(v));
        dot.setAttribute('opacity', 1);
        tip.show('<b>' + labelFor(p.ts, bucket) + '</b>'
            + '<div class="row">Ошибочных<span class="n">' + pct(v / 100) + '</span></div>'
            + '<div class="row">Вызовов<span class="n">' + fmt(p.ok + p.err) + '</span></div>',
            (x(i) / W) * box.width, event.clientY - box.top);
    });
    svg.addEventListener('pointerleave', function () { tip.hide(); dot.setAttribute('opacity', 0); });
}

// ----------------------------------------------------------- столбцы

function barChart(host, items, options) {
    host.innerHTML = '';
    var total = items.reduce(function (sum, item) { return sum + item.value; }, 0);
    if (!total) { host.innerHTML = '<div class="empty">Пока нет данных</div>'; return; }

    var peak = Math.max.apply(null, items.map(function (i) { return i.value; }));
    var W = host.clientWidth || 420;
    var H = options.height || 180;
    var scale = valueScale(peak, 1);
    var pad = { l: axisPad(scale, fmt), r: 8, t: 14, b: 24 };
    var iw = W - pad.l - pad.r;
    var ih = H - pad.t - pad.b;

    var svg = el('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': options.label });
    var y = function (v) { return pad.t + ih - (v / scale.max) * ih; };

    drawValueAxis(svg, scale.ticks, y, pad, W, fmt);

    // Зазор между столбцами не фиксированный: при двух десятках столбцов на
    // узкой карточке постоянные 2px съедали десятую часть ширины.
    var slot = iw / items.length;
    var gap = slot >= 14 ? 2 : 1;
    var barW = Math.max(1, slot - gap);
    var tip = makeTip(host);

    // Когда ненулевых столбцов один-два или один подавляет остальные,
    // сравнивать не с чем — подписываем значение прямо над столбцом, чтобы
    // не заставлять наводить мышь ради единственного числа.
    var sorted = items.map(function (i) { return i.value; }).sort(function (a, b) { return b - a; });
    var lonely = sorted.filter(function (v) { return v > 0; }).length <= 2 || sorted[0] >= 8 * (sorted[1] || 0);

    items.forEach(function (item, i) {
        var left = pad.l + i * slot + (slot - barW) / 2;
        var height = (item.value / scale.max) * ih;
        var bar = el('path', { class: 'bar', d: barPath(left, y(item.value), barW, height, Math.min(4, barW / 3)) });
        svg.appendChild(bar);

        if (lonely && item.value > 0) {
            svg.appendChild(el('text', {
                class: 'axis-label', x: left + barW / 2, y: y(item.value) - 6, 'text-anchor': 'middle',
            }, fmt(item.value)));
        }

        var hit = el('rect', { x: pad.l + i * slot, y: pad.t, width: slot, height: ih, fill: 'transparent' });
        hit.addEventListener('pointermove', function (event) {
            var box = svg.getBoundingClientRect();
            bar.classList.add('on');
            tip.show('<b>' + item.label + '</b><div class="row">Вызовов<span class="n">' + fmt(item.value) + '</span></div>',
                ((left + barW / 2) / W) * box.width, event.clientY - box.top);
        });
        hit.addEventListener('pointerleave', function () { bar.classList.remove('on'); tip.hide(); });
        svg.appendChild(hit);
    });

    svg.appendChild(el('line', { class: 'baseline', x1: pad.l, x2: W - pad.r, y1: y(0), y2: y(0) }));

    (options.ticks || []).forEach(function (tick) {
        // Крайние подписи прижимаем к краям, иначе последняя вылезает за
        // область графика на половину своей ширины.
        var anchor = tick.index === 0 ? 'start' : (tick.index === items.length - 1 ? 'end' : 'middle');
        var tx = Math.min(Math.max(pad.l + tick.index * slot + slot / 2, pad.l), W - pad.r);
        svg.appendChild(el('text', { class: 'axis-label', x: tx, y: H - 6, 'text-anchor': anchor }, tick.label));
    });

    host.appendChild(svg);
}

// ------------------------------------------------- ранжированный список

// Короткий список, где важен не точный масштаб, а порядок: полоса за
// текстом даёт долю от лидера, не отнимая места у самих подписей.
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

var RECENT_PER_PAGE = 5;
var recentPage = 0;

function recentTable(data) {
    var host = document.getElementById('recent');
    var rows = data.recent || [];
    host.innerHTML = '';

    if (!rows.length) {
        host.innerHTML = '<div class="empty">Событий пока не было</div>';
        return;
    }

    var pages = Math.max(1, Math.ceil(rows.length / RECENT_PER_PAGE));
    // Данные обновляются каждую минуту: если лента укоротилась, страница
    // может оказаться за пределами — возвращаемся на последнюю.
    recentPage = Math.min(Math.max(0, recentPage), pages - 1);

    var from = recentPage * RECENT_PER_PAGE;
    var slice = rows.slice(from, from + RECENT_PER_PAGE);

    var head = '<tr><th>Время</th><th>Метод</th><th>Кто</th><th>Исход</th><th>Ошибки</th><th>Время ответа</th></tr>';
    var body = slice.map(function (row) {
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

    var table = document.createElement('div');
    table.className = 'scroll';
    table.innerHTML = '<table>' + head + body + '</table>';
    host.appendChild(table);

    var nav = document.createElement('div');
    nav.className = 'pager';
    nav.innerHTML = '<button type="button" data-step="-1"' + (recentPage === 0 ? ' disabled' : '') + ' aria-label="Предыдущая страница">←</button>'
        + '<span>' + (from + 1) + '–' + (from + slice.length) + ' из ' + fmt(rows.length) + '</span>'
        + '<button type="button" data-step="1"' + (recentPage >= pages - 1 ? ' disabled' : '') + ' aria-label="Следующая страница">→</button>';
    host.appendChild(nav);

    nav.addEventListener('click', function (event) {
        var button = event.target.closest('button[data-step]');
        if (!button || button.disabled) { return; }
        recentPage += Number(button.dataset.step);
        recentTable(data);
    });
}

function render(data) {
    state.data = data;
    kpis(data);

    // Подписи времени показывают часы, только если шаг меньше суток.
    var axisBucket = data.range.stepHours < 24 ? 'hour' : 'day';

    var span = new Date(data.range.from).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })
        + ' — ' + new Date(data.range.to).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' });
    document.getElementById('activity-hint').textContent =
        'Вызовы ' + stepName(data.range.stepHours) + ', ' + span;
    document.getElementById('clear-dates').hidden = !data.range.custom;

    areaChart(document.getElementById('activity'), data.series, axisBucket);
    lineChart(document.getElementById('errorrate'), data.series, axisBucket);

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
