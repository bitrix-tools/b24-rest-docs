# Дополнительные поля страницы

Дополнительные поля страницы передаются в массиве `ADDITIONAL_FIELDS` при вызове методов [landing.landing.add](./methods/landing-landing-add.md) и [landing.landing.update](./methods/landing-landing-update.md).

Заполненные значения можно получить через метод [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md).

{% note info %}

Метод `landing.landing.getadditionalfields` возвращает только непустые поля страницы.

Для записи используйте коды полей в массиве `ADDITIONAL_FIELDS`, например:

```json
{
    "ADDITIONAL_FIELDS": {
        "METAROBOTS_INDEX": "Y",
        "METAMAIN_USE": "Y",
        "METAMAIN_TITLE": "Заголовок страницы"
    }
}
```

{% endnote %}

## Что нужно знать

- набор полей зависит от типа сайта, настроек и установленных модулей, поэтому не все поля доступны на каждом сайте
- служебные поля могут приходить в ответе метода чтения, но их не задают вручную
- для полей-флагов используют значения `Y` и `N`
- если поле пустое, метод `landing.landing.getadditionalfields` не вернет его в ответе
- поля `METAOG_IMAGE`, `BACKGROUND_PICTURE` и `FAVICON_PICTURE` связаны с файлами
- поля `SETTINGS_*` относятся к настройкам каталога и торгового раздела

## Тема и шрифты

#|
|| **Поле**
`тип` | **Описание** ||
|| **THEME_CODE**
[`string`](../../data-types.md) | Код цветовой темы страницы. Доступные значения перечислены в разделе [Цветовые темы страницы](./color-themes.md) ||
|| **THEME_USE**
[`string`](../../data-types.md) | Включить для страницы собственную цветовую палитру: `Y` или `N` ||
|| **THEME_COLOR**
[`string`](../../data-types.md) | Пользовательский цвет темы в формате HEX, например `#34bcf2` ||
|| **THEMEFONTS_USE**
[`string`](../../data-types.md) | Включить для страницы собственные настройки шрифтов: `Y` или `N` ||
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
[`string`](../../data-types.md) | Насыщенность основного текста. Поддерживаются значения от `100` до `900` ||
|| **THEMEFONTS_FONT_WEIGHT_H**
[`string`](../../data-types.md) | Насыщенность заголовков. Поддерживаются значения от `100` до `900` ||
|| **FONTS_CODE**
[`string`](../../data-types.md) | Служебное поле с HTML для подключения шрифтов. Может присутствовать в ответе метода чтения ||
|#

## Социальные сети и SEO

#|
|| **Поле**
`тип` | **Описание** ||
|| **METAOG_TITLE**
[`string`](../../data-types.md) | Заголовок для Open Graph, тег `og:title` ||
|| **METAOG_DESCRIPTION**
[`string`](../../data-types.md) | Описание для Open Graph, тег `og:description` ||
|| **METAOG_IMAGE**
[`string`](../../data-types.md) | Изображение для Open Graph, тег `og:image`. Обычно метод чтения возвращает URL файла ||
|| **METAMAIN_USE**
[`string`](../../data-types.md) | Включить собственные мета-теги страницы: `Y` или `N` ||
|| **METAMAIN_TITLE**
[`string`](../../data-types.md) | Значение тега `title` ||
|| **METAMAIN_DESCRIPTION**
[`string`](../../data-types.md) | Значение тега `description` ||
|| **METAMAIN_KEYWORDS**
[`string`](../../data-types.md) | Значение тега `keywords` ||
|| **METAKEYWORDS_KEYWORDS**
[`string`](../../data-types.md) | Значение тега `keywords` из отдельного хука `METAKEYWORDS` ||
|| **METAROBOTS_INDEX**
[`string`](../../data-types.md) | Разрешить индексацию страницы: `Y` или `N` ||
|| **METAGOOGLEVERIFICATION_USE**
[`string`](../../data-types.md) | Включить мета-тег подтверждения Google Search Console: `Y` или `N` ||
|| **METAGOOGLEVERIFICATION_META**
[`string`](../../data-types.md) | Полный тег подтверждения Google Search Console ||
|| **METAYANDEXVERIFICATION_USE**
[`string`](../../data-types.md) | Включить мета-тег подтверждения Яндекс Вебмастера: `Y` или `N` ||
|| **METAYANDEXVERIFICATION_META**
[`string`](../../data-types.md) | Полный тег подтверждения Яндекс Вебмастера ||
|| **ROBOTS_USE**
[`string`](../../data-types.md) | Включить пользовательский `robots.txt`: `Y` или `N` ||
|| **ROBOTS_CONTENT**
[`string`](../../data-types.md) | Содержимое пользовательского `robots.txt` ||
|#

## Фон, анимация, иконка и представление страницы

#|
|| **Поле**
`тип` | **Описание** ||
|| **BACKGROUND_USE**
[`string`](../../data-types.md) | Включить настройки фона страницы: `Y` или `N` ||
|| **BACKGROUND_PICTURE**
[`string`](../../data-types.md) | Фоновое изображение страницы. Обычно метод чтения возвращает URL файла ||
|| **BACKGROUND_POSITION**
[`string`](../../data-types.md) | Режим вывода фона. Поддерживаются значения `center`, `repeat`, `center_repeat_y`, `no_repeat` ||
|| **BACKGROUND_COLOR**
[`string`](../../data-types.md) | Цвет фона страницы в HEX-формате ||
|| **FAVICON_PICTURE**
[`string`](../../data-types.md) | Изображение favicon. Обычно метод чтения возвращает URL файла ||
|| **VIEW_USE**
[`string`](../../data-types.md) | Включить специальное представление страницы: `Y` или `N` ||
|| **VIEW_TYPE**
[`string`](../../data-types.md) | Тип представления. Поддерживаются значения `no`, `ltr`, `all`, `mobile`, `adaptive` ||
|| **PADDING_TOPBOTTOM**
[`string`](../../data-types.md) | Вертикальные внешние отступы страницы. Поддерживаются значения `N`, `u-outer-space-v1`, `u-outer-space-v2` ||
|| **PADDING_LEFTRIGHT**
[`string`](../../data-types.md) | Горизонтальные ограничения макета. Поддерживаются значения `N`, `g-layout-semiboxed`, `g-layout-boxed` ||
|| **LAYOUT_BREAKPOINT**
[`string`](../../data-types.md) | Точка переключения адаптивного представления. Поддерживаются значения `mobile`, `tablet`, `desktop`, `all` ||
|| **TRANSITION_COLOR**
[`string`](../../data-types.md) | Цвет фона для анимации появления страницы ||
|| **UP_SHOW**
[`string`](../../data-types.md) | Показывать кнопку возврата вверх: `Y` или `N` ||
|#

## Аналитика и пиксели

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
[`string`](../../data-types.md) | Идентификатор счетчика Universal Analytics ||
|| **GACOUNTER_COUNTER_GA4**
[`string`](../../data-types.md) | Идентификатор счетчика Google Analytics 4 ||
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
|| **PIXELFB_USE**
[`string`](../../data-types.md) | Включить пиксель Facebook: `Y` или `N` ||
|| **PIXELFB_COUNTER**
[`string`](../../data-types.md) | Идентификатор пикселя Facebook ||
|| **PIXELVK_USE**
[`string`](../../data-types.md) | Включить пиксель VK: `Y` или `N` ||
|| **PIXELVK_COUNTER**
[`string`](../../data-types.md) | Идентификатор пикселя VK ||
|#

## Пользовательский код и стили

#|
|| **Поле**
`тип` | **Описание** ||
|| **HEADBLOCK_USE**
[`string`](../../data-types.md) | Включить пользовательский HTML или JavaScript в `head`: `Y` или `N` ||
|| **HEADBLOCK_CODE**
[`string`](../../data-types.md) | Произвольный HTML или JavaScript, который добавляется в `head` страницы ||
|| **CSSBLOCK_USE**
[`string`](../../data-types.md) | Включить пользовательский CSS: `Y` или `N` ||
|| **CSSBLOCK_CODE**
[`string`](../../data-types.md) | Произвольный CSS-код страницы ||
|| **CSSBLOCK_FILE**
[`string`](../../data-types.md) | Ссылка на внешний CSS-файл ||
|| **CUSTOMCSS_CSS_CODE**
[`string`](../../data-types.md) | Дополнительный пользовательский CSS-код из отдельного hook ||
|| **CUSTOMCSS_CSS_URL**
[`string`](../../data-types.md) | Ссылка на внешний CSS-файл из отдельного hook ||
|#

## Карты

#|
|| **Поле**
`тип` | **Описание** ||
|| **GMAP_USE**
[`string`](../../data-types.md) | Включить Google Maps API: `Y` или `N` ||
|| **GMAP_CODE**
[`string`](../../data-types.md) | API-ключ Google Maps ||
|| **YMAP_USE**
[`string`](../../data-types.md) | Включить API Яндекс Карт: `Y` или `N` ||
|| **YMAP_CODE**
[`string`](../../data-types.md) | API-ключ Яндекс Карт ||
|#

## Виджет Битрикс24

#|
|| **Поле**
`тип` | **Описание** ||
|| **B24BUTTON_USE**
[`string`](../../data-types.md) | Включить виджет Битрикс24: `Y` или `N` ||
|| **B24BUTTON_CODE**
[`string`](../../data-types.md) | Код или URL скрипта виджета ||
|| **B24BUTTON_COLOR**
[`string`](../../data-types.md) | Источник цвета виджета. Поддерживаются значения `site`, `button`, `custom` ||
|| **B24BUTTON_COLOR_VALUE**
[`string`](../../data-types.md) | Пользовательский цвет виджета в HEX-формате ||
|| **B24BUTTON_HELP**
[`string`](../../data-types.md) | Служебное поле со ссылкой на справку ||
|#

## Cookies и служебные баннеры

#|
|| **Поле**
`тип` | **Описание** ||
|| **COOKIES_USE**
[`string`](../../data-types.md) | Показывать баннер cookies: `Y` или `N` ||
|| **COOKIES_AGREEMENT_ID**
[`string`](../../data-types.md) | Использовать соглашение в баннере cookies: `Y` или `N` ||
|| **COOKIES_COLOR_BG**
[`string`](../../data-types.md) | Цвет фона баннера cookies в HEX-формате ||
|| **COOKIES_COLOR_TEXT**
[`string`](../../data-types.md) | Цвет текста баннера cookies в HEX-формате ||
|| **COOKIES_POSITION**
[`string`](../../data-types.md) | Положение баннера cookies. Поддерживаются значения `bottom_left`, `bottom_right` ||
|| **COOKIES_MODE**
[`string`](../../data-types.md) | Режим баннера cookies. Поддерживаются значения `A` и `I` ||
|| **COPYRIGHT_SHOW**
[`string`](../../data-types.md) | Показывать подпись или служебный футер: `Y` или `N` ||
|| **COPYRIGHT_CODE**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор варианта текста для футера ||
|#

## Производительность

#|
|| **Поле**
`тип` | **Описание** ||
|| **SPEED_ASSETS**
[`string`](../../data-types.md) | Служебное поле со списком ресурсов для оптимизации ||
|| **SPEED_USE_LAZY**
[`string`](../../data-types.md) | Использовать lazy load: `Y` или `N` ||
|| **SPEED_USE_WEBPACK**
[`string`](../../data-types.md) | Использовать webpack-режим сборки ресурсов: `Y` или `N` ||
|#

## Настройки каталога и торгового раздела

Эти поля формирует хук `SETTINGS`. Они зависят от установленных модулей каталога, валют и торгового функционала. Часть полей из этой группы может быть недоступна на конкретном сайте.

#|
|| **Поле**
`тип` | **Описание** ||
|| **SETTINGS_IBLOCK_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор инфоблока каталога ||
|| **SETTINGS_SECTION_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор раздела каталога ||
|| **SETTINGS_HIDE_NOT_AVAILABLE**
[`string`](../../data-types.md) | Режим скрытия недоступных товаров ||
|| **SETTINGS_HIDE_NOT_AVAILABLE_OFFERS**
[`string`](../../data-types.md) | Скрывать недоступные варианты товара: `Y` или `N` ||
|| **SETTINGS_PRODUCT_SUBSCRIPTION**
[`string`](../../data-types.md) | Включить подписку на товар: `Y` или `N` ||
|| **SETTINGS_USE_PRODUCT_QUANTITY**
[`string`](../../data-types.md) | Включить учет остатков товара: `Y` или `N` ||
|| **SETTINGS_DISPLAY_COMPARE**
[`string`](../../data-types.md) | Показывать сравнение товаров: `Y` или `N` ||
|| **SETTINGS_PRICE_CODE**
[`array`](../../data-types.md) | Массив кодов типов цен ||
|| **SETTINGS_CURRENCY_ID**
[`string`](../../data-types.md) | Код валюты ||
|| **SETTINGS_PRICE_VAT_INCLUDE**
[`string`](../../data-types.md) | Включать НДС в цену: `Y` или `N` ||
|| **SETTINGS_SHOW_OLD_PRICE**
[`string`](../../data-types.md) | Показывать старую цену: `Y` или `N` ||
|| **SETTINGS_SHOW_DISCOUNT_PERCENT**
[`string`](../../data-types.md) | Показывать процент скидки: `Y` или `N` ||
|| **SETTINGS_USE_PRICE_COUNT**
[`string`](../../data-types.md) | Включить диапазоны цен: `Y` или `N` ||
|| **SETTINGS_SHOW_PRICE_COUNT**
[`integer`](../../data-types.md) | Количество цен для вывода ||
|| **SETTINGS_USE_ENHANCED_ECOMMERCE**
[`string`](../../data-types.md) | Включить расширенную электронную торговлю: `Y` или `N` ||
|| **SETTINGS_DATA_LAYER_NAME**
[`string`](../../data-types.md) | Название слоя данных для аналитики ||
|| **SETTINGS_BRAND_PROPERTY**
[`string`](../../data-types.md) | Код свойства бренда ||
|| **SETTINGS_CART_POSITION**
[`string`](../../data-types.md) | Положение корзины. Поддерживаются значения `TC`, `TR`, `CR`, `BR`, `BC`, `BL`, `CL`, `TL` ||
|| **SETTINGS_AGREEMENT_USE**
[`string`](../../data-types.md) | Включить соглашения: `Y` или `N` ||
|| **SETTINGS_AGREEMENT_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор соглашения ||
|| **SETTINGS_AGREEMENTS**
[`array`](../../data-types.md) | Массив соглашений в формате `{ID, CHECKED, REQUIRED}` ||
|#

## Продолжите изучение

- [landing.landing.add](./methods/landing-landing-add.md)
- [landing.landing.update](./methods/landing-landing-update.md)
- [Цветовые темы страницы](./color-themes.md)
- [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md)
- [landing.syspage.set](./special-pages/landing-syspage-set.md)
