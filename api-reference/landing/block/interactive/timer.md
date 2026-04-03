# Счетчики обратного отсчета

Для таймера в [манифесте блока](../manifest.md) подключите расширение `landing_countdown`.

## Как настроить счетчик

Минимальный вариант:

```php
'assets' => [
    'ext' => ['landing_countdown'],
],
```

Опционально можно указать версию блока:

```php
'block' => [
    'version' => '18.5.0',
],
```

`version` используют, чтобы ограничить добавление блока в старых версиях продукта, где нужные ресурсы еще отсутствуют.

## Что делает расширение timer

Расширение `landing_countdown` рассчитывает оставшееся время до `data-end-date` и обновляет значения элементов `js-cd-days`, `js-cd-hours`, `js-cd-minutes`, `js-cd-seconds`.

## Атрибут даты окончания

Для ноды-контейнера таймера добавьте атрибут даты завершения:

```php
'attrs' => [
    '.landing-block-node-date' => [
        [
            'name' => 'Дата окончания',
            'type' => 'date',
            'time' => true,
            'format' => 'ms',
            'attribute' => 'data-end-date',
        ],
    ],
],
```

## Разметка таймера

Контейнер таймера должен иметь класс `js-countdown`. Внутри контейнера должны быть ноды:

- `js-cd-days` — дни
- `js-cd-hours` — часы
- `js-cd-minutes` — минуты
- `js-cd-seconds` — секунды

Опционально можно добавить:

- `js-cd-years` — годы
- `js-cd-month` — месяцы

Поддерживаются атрибуты:

- `data-end-date` — дата окончания в Unix-time в миллисекундах
- `data-start-date` — стартовая дата для расчетов
- `data-years-format` — формат вывода лет
- `data-month-format` — формат вывода месяцев
- `data-days-format` — формат вывода дней
- `data-hours-format` — формат вывода часов
- `data-minutes-format` — формат вывода минут
- `data-seconds-format` — формат вывода секунд
- `data-days-expired-classes` — классы, которые добавляются при нулевом значении дней

Форматы значений:

- `%S` — с лидирующим нулем, например `03`
- `%-S` — без лидирующего нуля, например `3`

Для часов можно использовать `%H` или `%I`/`%-I`. Формат `%I` и `%-I` выводит полное количество часов до конца таймера. В этом режиме обычно убирают `data-days-format` и элемент `js-cd-days`.

## Пример

```html
<section class="landing_block g-pt-30 g-pb-30 g-bg-orange g-color-white">
    <div class="landing-block-node-date mx-auto js-countdown text-center g-font-weight-300 g-line-height-1-2"
        data-end-date="1555249081000"
        data-days-format="%D"
        data-hours-format="%H"
        data-minutes-format="%M"
        data-seconds-format="%S"
        data-days-expired-classes="u-countdown--days-expiried">

        <div class="landing-block-node-number u-countdown--days-hide d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-days">12</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter u-countdown--days-hide d-inline-block g-font-size-36">:</div>
    
        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-hours">01</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter d-inline-block g-font-size-36">:</div>

        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-minutes">52</span>
            </div>
        </div>

        <div class="landing-block-node-number-delimiter d-inline-block g-font-size-36">:</div>

        <div class="landing-block-node-number d-inline-block g-mx-20">
            <div class="landing-block-node-number-number g-font-size-36 mb-0">
                <span class="js-cd-seconds">52</span>
            </div>
        </div>
    </div>
</section>
```

## Примеры штатных блоков

Примеры блоков этого типа можно посмотреть в репозитории через методы [landing.block.getmanifestfile](../methods/landing-block-get-manifest-file.md) и [landing.block.getrepository](../methods/landing-block-get-repository.md).

Коды некоторых штатных блоков:

- `51.2.countdown_04`
- `51.3.countdown_08`
- `51.3.countdown_08_wo_bg`
- `51.4.countdown_music`
- `51.5.countdown_event`
- `51.7.countdown_13`
- `51.1.countdown_01`

## Что важно учитывать

- `data-end-date` передается в миллисекундах
- для `%I` и `%-I` выводится общее количество часов, без отдельного блока дней
- если нужно скрывать дни после обнуления, используйте `data-days-expired-classes`

## Продолжите изучение

- [Слайдеры](./sliders.md)
- [Галереи](./gallery.md)
- [Файл манифеста блока](../manifest.md)
- [Типы нод](../node-types.md)
