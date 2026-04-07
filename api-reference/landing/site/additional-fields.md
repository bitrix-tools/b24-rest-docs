# Дополнительные поля сайта

Дополнительные поля сайта передаются в массиве `ADDITIONAL_FIELDS` при вызове методов [landing.site.add](./landing-site-add.md) и [landing.site.update](./landing-site-update.md).

Заполненные значения можно получить через метод [landing.site.getadditionalfields](./landing-site-get-additional-fields.md).

{% note info "" %}

Метод `landing.site.getadditionalfields` возвращает только непустые поля сайта.

Для записи используйте коды полей в массиве `ADDITIONAL_FIELDS`, например:

```json
{
    "ADDITIONAL_FIELDS": {
        "THEME_CODE": "1construction",
        "BACKGROUND_USE": "Y",
        "BACKGROUND_COLOR": "#f4f7fb"
    }
}
```

{% endnote %}

## Что нужно знать

- набор полей зависит от типа сайта, настроек и установленных модулей, поэтому не все поля доступны на каждом сайте
- для полей-флагов используются значения `Y` и `N`
- если поле пустое, метод `landing.site.getadditionalfields` не вернет его в ответе
- поле `BACKGROUND_PICTURE` при записи хранит идентификатор файла, а в ответе REST-метода обычно возвращается URL файла

## Тема и шрифты

#|
|| **Поле**
`тип` | **Описание** ||
|| **THEME_CODE**
[`string`](../../data-types.md) | Код цветовой темы сайта. Доступные значения перечислены в разделе [Цветовые темы страницы](../page/color-themes.md) ||
|| **THEME_USE**
[`string`](../../data-types.md) | Включить для сайта собственную цветовую палитру: `Y` или `N` ||
|| **THEME_COLOR**
[`string`](../../data-types.md) | Пользовательский цвет темы в формате HEX, например `#34bcf2` ||
|| **THEMEFONTS_USE**
[`string`](../../data-types.md) | Включить для сайта собственные настройки шрифтов: `Y` или `N` ||
|| **THEMEFONTS_CODE**
[`string`](../../data-types.md) | Шрифт основного текста ||
|| **THEMEFONTS_CODE_H**
[`string`](../../data-types.md) | Шрифт заголовков ||
|| **THEMEFONTS_SIZE**
[`string`](../../data-types.md) | Базовый размер текста. Поддерживаются значения `0.92857`, `1`, `1.14286` ||
|| **THEMEFONTS_COLOR**
[`string`](../../data-types.md) | Цвет основного текста в HEX-формате ||
|| **THEMEFONTS_COLOR_H**
[`string`](../../data-types.md) | Цвет заголовков в HEX-формате ||
|| **THEMEFONTS_LINE_HEIGHT**
[`string`](../../data-types.md) | Межстрочный интервал. Поддерживаются значения от `0.7` до `2` ||
|| **THEMEFONTS_FONT_WEIGHT**
[`string`](../../data-types.md) | Насыщенность основного текста. Поддерживаются значения от `100` до `900` с шагом `100` ||
|| **THEMEFONTS_FONT_WEIGHT_H**
[`string`](../../data-types.md) | Насыщенность заголовков. Поддерживаются значения от `100` до `900` с шагом `100` ||
|#

## Виджет Битрикс24

#|
|| **Поле**
`тип` | **Описание** ||
|| **B24BUTTON_USE**
[`string`](../../data-types.md) | Включить виджет Битрикс24: `Y` или `N` ||
|| **B24BUTTON_CODE**
[`string`](../../data-types.md) | Код или URL скрипта виджета Битрикс24. Его можно получить в настройках виджета в CRM ||
|| **B24BUTTON_COLOR**
[`string`](../../data-types.md) | Источник цвета виджета. Поддерживаются значения `site`, `button`, `custom` ||
|| **B24BUTTON_COLOR_VALUE**
[`string`](../../data-types.md) | Пользовательский цвет виджета в формате HEX. Используется, если `B24BUTTON_COLOR = custom` ||
|#

## Кнопка возврата вверх

#|
|| **Поле**
`тип` | **Описание** ||
|| **UP_SHOW**
[`string`](../../data-types.md) | Показывать кнопку возврата вверх: `Y` или `N` ||
|#

## Фон сайта

#|
|| **Поле**
`тип` | **Описание** ||
|| **BACKGROUND_USE**
[`string`](../../data-types.md) | Включить настройки фона сайта: `Y` или `N` ||
|| **BACKGROUND_PICTURE**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Фоновое изображение сайта. При записи передается идентификатор файла, при чтении REST-метод обычно возвращает URL файла ||
|| **BACKGROUND_POSITION**
[`string`](../../data-types.md) | Режим вывода фона. Поддерживаются значения `center`, `repeat`, `center_repeat_y`, `no_repeat` ||
|| **BACKGROUND_COLOR**
[`string`](../../data-types.md) | Цвет фона сайта в HEX-формате ||
|#

## Аналитика

Поля аналитики доступны не на всех тарифах. Если на вашем тарифе недоступны интеграции аналитики, включение этих полей не подключит счетчики.

#|
|| **Поле**
`тип` | **Описание** ||
|| **YACOUNTER_USE**
[`string`](../../data-types.md) | Включить Яндекс Метрику: `Y` или `N` ||
|| **YACOUNTER_COUNTER**
[`string`](../../data-types.md) | Идентификатор счетчика Яндекс Метрики ||
|| **GACOUNTER_USE**
[`string`](../../data-types.md) | Включить Google Analytics: `Y` или `N` ||
|| **GACOUNTER_COUNTER**
[`string`](../../data-types.md) | Идентификатор счетчика старого формата `UA-...`. Для актуального счетчика GA4 используйте поле `GACOUNTER_COUNTER_GA4` ||
|| **GACOUNTER_COUNTER_GA4**
[`string`](../../data-types.md) | Идентификатор счетчика Google Analytics 4 в формате `G-...` ||
|| **GACOUNTER_SEND_CLICK**
[`string`](../../data-types.md) | Отправлять события по кликам: `Y` или `N` ||
|| **GACOUNTER_CLICK_TYPE**
[`string`](../../data-types.md) | Откуда брать подпись для события клика. Поддерживаются значения `href` и `text` ||
|| **GACOUNTER_SEND_SHOW**
[`string`](../../data-types.md) | Отправлять события показа блоков: `Y` или `N` ||
|| **GTM_USE**
[`string`](../../data-types.md) | Включить Google Tag Manager: `Y` или `N` ||
|| **GTM_COUNTER**
[`string`](../../data-types.md) | Идентификатор контейнера Google Tag Manager ||
|#

## Карты

#|
|| **Поле**
`тип` | **Описание** ||
|| **GMAP_USE**
[`string`](../../data-types.md) | Включить Google Maps API: `Y` или `N` ||
|| **GMAP_CODE**
[`string`](../../data-types.md) | API-ключ Google Maps. Карты подключаются только если `GMAP_USE = Y` и это поле заполнено ||
|#

## Представление сайта

#|
|| **Поле**
`тип` | **Описание** ||
|| **VIEW_USE**
[`string`](../../data-types.md) | Включить специальное представление сайта: `Y` или `N` ||
|| **VIEW_TYPE**
[`string`](../../data-types.md) | Тип представления. Поддерживаются значения `no`, `ltr`, `all`, `mobile`, `adaptive` ||
|#

## Robots.txt

#|
|| **Поле**
`тип` | **Описание** ||
|| **ROBOTS_USE**
[`string`](../../data-types.md) | Включить пользовательский `robots.txt`: `Y` или `N` ||
|| **ROBOTS_CONTENT**
[`string`](../../data-types.md) | Содержимое пользовательского `robots.txt` ||
|#

## Пользовательский код

Поля `HEADBLOCK_*` доступны не на всех тарифах.

#|
|| **Поле**
`тип` | **Описание** ||
|| **HEADBLOCK_USE**
[`string`](../../data-types.md) | Включить пользовательский HTML или JavaScript в `head`: `Y` или `N` ||
|| **HEADBLOCK_CODE**
[`string`](../../data-types.md) | Произвольный HTML или JavaScript, который добавляется в `head` сайта ||
|| **CSSBLOCK_USE**
[`string`](../../data-types.md) | Включить пользовательский CSS: `Y` или `N` ||
|| **CSSBLOCK_CODE**
[`string`](../../data-types.md) | Произвольный CSS-код сайта ||
|| **CSSBLOCK_FILE**
[`string`](../../data-types.md) | Ссылка на внешний CSS-файл ||
|#

## Продолжите изучение

- [landing.site.add](./landing-site-add.md)
- [landing.site.update](./landing-site-update.md)
- [landing.site.getadditionalfields](./landing-site-get-additional-fields.md)
- [Поля сайта](./base-fields.md)
- [Цветовые темы страницы](../page/color-themes.md)
