# Дополнительные поля страницы

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Дополнительные поля — это настройки страницы: цветовая тема и шрифты, мета-теги для поисковиков и соцсетей, счетчики аналитики, свой код и стили. Например, через них к странице подключают Яндекс Метрику.

Записать поля можно методом [landing.landing.update](./methods/landing-landing-update.md) в объекте `fields.ADDITIONAL_FIELDS`, прочитать заполненные — методом [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md). Новой странице поля записывают так же, сразу после создания методом [landing.landing.add](./methods/landing-landing-add.md).

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может получить поля: пользователь с правом «просмотр» сайта. Для изменения полей нужны права «редактирование» и «изменение настроек» сайта

{% note info "" %}

Чтобы записать поля, передайте в `lid` идентификатор страницы из метода [landing.landing.add](./methods/landing-landing-add.md) или [landing.landing.getList](./methods/landing-landing-get-list.md), а в `fields.ADDITIONAL_FIELDS` — коды полей и значения. Пример запроса:

```json
{
    "lid": 349,
    "fields": {
        "ADDITIONAL_FIELDS": {
            "METAROBOTS_INDEX": "Y",
            "METAMAIN_USE": "Y",
            "METAMAIN_TITLE": "Заголовок страницы",
            "METAOG_IMAGE": 41003
        }
    }
}
```

{% endnote %}

## Что нужно знать

- на сайте доступны не все поля: набор зависит от типа сайта, настроек и установленных модулей
- служебные поля, например `FONTS_CODE` и `SPEED_ASSETS`, могут прийти в ответе метода [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md), но передавать их в [landing.landing.update](./methods/landing-landing-update.md) не нужно
- для полей-флагов используют значения `Y` и `N`
- флаг `*_USE` включает свою группу полей: например, `METAMAIN_TITLE` попадет на страницу, только если `METAMAIN_USE` равно `Y`
- если поле пустое, метод [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md) не вернет его в ответе
- поля `METAOG_IMAGE`, `BACKGROUND_PICTURE` и `FAVICON_PICTURE` хранят изображение: запишите в них идентификатор файла из метода [landing.block.uploadfile](../block/methods/landing-block-upload-file.md), например `41003`. В `METAOG_IMAGE` и `BACKGROUND_PICTURE` можно записать и ссылку на изображение
- при чтении поля-изображения, в которое записан идентификатор файла, приложение получит ссылку на файл, а вебхук — идентификатор строкой, например `"41003"`. Записанную ссылку на изображение приложение и вебхук получат как есть
- поля `SETTINGS_*` — настройки каталога и торгового раздела. Если в Битрикс24 установлен модуль каталога, метод [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md) вернет их у страниц сайтов и магазинов со значениями по умолчанию, даже если их не задавали. Поля с пустым значением по умолчанию, например `SETTINGS_IBLOCK_ID`, в ответ не попадут. У страниц Базы знаний полей `SETTINGS_*` нет

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
[`string`](../../data-types.md) | Межстрочный интервал: от `0.7` до `2` с шагом `0.1` ||
|| **THEMEFONTS_FONT_WEIGHT**
[`string`](../../data-types.md) | Насыщенность основного текста: от `100` до `900` с шагом `100` ||
|| **THEMEFONTS_FONT_WEIGHT_H**
[`string`](../../data-types.md) | Насыщенность заголовков: от `100` до `900` с шагом `100` ||
|| **FONTS_CODE**
[`string`](../../data-types.md) | Служебное поле с HTML для подключения шрифтов. Может присутствовать в ответе метода чтения ||
|#

## Социальные сети и SEO

#|
|| **Поле**
`тип` | **Описание** ||
|| **METAOG_TITLE**
[`string`](../../data-types.md) | Заголовок превью страницы в соцсетях и мессенджерах, тег Open Graph `og:title` ||
|| **METAOG_DESCRIPTION**
[`string`](../../data-types.md) | Описание превью страницы в соцсетях и мессенджерах, тег Open Graph `og:description` ||
|| **METAOG_IMAGE**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Изображение для Open Graph, тег `og:image`. При записи передайте идентификатор файла или ссылку на изображение. Если записан идентификатор, при чтении приложение получит ссылку на файл, а вебхук — сам идентификатор ||
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
[`string`](../../data-types.md) | Включить пользовательский `robots.txt`: `Y` или `N`. У страницы поле не действует — задайте его сайту методом [landing.site.update](../site/landing-site-update.md) ||
|| **ROBOTS_CONTENT**
[`string`](../../data-types.md) | Содержимое пользовательского `robots.txt`. Как и `ROBOTS_USE`, действует только у сайта ||
|#

## Фон, анимация, иконка и представление страницы

#|
|| **Поле**
`тип` | **Описание** ||
|| **BACKGROUND_USE**
[`string`](../../data-types.md) | Включить настройки фона страницы: `Y` или `N` ||
|| **BACKGROUND_PICTURE**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Фоновое изображение страницы. При записи передайте идентификатор файла или ссылку на изображение. Если записан идентификатор, при чтении приложение получит ссылку на файл, а вебхук — сам идентификатор ||
|| **BACKGROUND_POSITION**
[`string`](../../data-types.md) | Режим вывода фона. Поддерживаются значения `center`, `repeat`, `center_repeat_y`, `no_repeat` ||
|| **BACKGROUND_COLOR**
[`string`](../../data-types.md) | Цвет фона страницы в HEX-формате ||
|| **FAVICON_PICTURE**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Изображение favicon — значка страницы во вкладке браузера. При записи передайте идентификатор файла: ссылку на изображение метод сохранит, но значок на странице не появится. Если записан идентификатор, при чтении приложение получит ссылку на файл, а вебхук — сам идентификатор ||
|| **VIEW_USE**
[`string`](../../data-types.md) | Включить специальное представление страницы: `Y` или `N` ||
|| **VIEW_TYPE**
[`string`](../../data-types.md) | Тип представления: `no` — без отступов, `ltr` — отступ вверху и по бокам, `all` — отступы со всех сторон, `mobile` — для мобильных устройств, `adaptive` — адаптивный контейнер ||
|| **PADDING_TOPBOTTOM**
[`string`](../../data-types.md) | Вертикальные внешние отступы страницы. Поддерживаются значения `N`, `u-outer-space-v1`, `u-outer-space-v2` ||
|| **PADDING_LEFTRIGHT**
[`string`](../../data-types.md) | Горизонтальные ограничения макета. Поддерживаются значения `N`, `g-layout-semiboxed`, `g-layout-boxed` ||
|| **LAYOUT_BREAKPOINT**
[`string`](../../data-types.md) | Точка переключения адаптивного представления. Поддерживаются значения `mobile`, `tablet`, `desktop`, `all` ||
|| **TRANSITION_COLOR**
[`string`](../../data-types.md) | Цвет фона для анимации появления страницы. У страницы поле не действует — задайте его сайту методом [landing.site.update](../site/landing-site-update.md) ||
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
[`string`](../../data-types.md) | Включить пиксель Facebook*: `Y` или `N` ||
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
[`string`](../../data-types.md) | Дополнительный пользовательский CSS-код из отдельного хука ||
|| **CUSTOMCSS_CSS_URL**
[`string`](../../data-types.md) | Ссылка на внешний CSS-файл из отдельного хука ||
|#

## Карты

#|
|| **Поле**
`тип` | **Описание** ||
|| **GMAP_USE**
[`string`](../../data-types.md) | Включить Google Maps API: `Y` или `N`. У страницы поле не действует — задайте его сайту методом [landing.site.update](../site/landing-site-update.md) ||
|| **GMAP_CODE**
[`string`](../../data-types.md) | API-ключ Google Maps. Как и `GMAP_USE`, действует только у сайта ||
|| **YMAP_USE**
[`string`](../../data-types.md) | Включить API Яндекс Карт: `Y` или `N`. У страницы поле не действует — задайте его сайту методом [landing.site.update](../site/landing-site-update.md) ||
|| **YMAP_CODE**
[`string`](../../data-types.md) | API-ключ Яндекс Карт. Как и `YMAP_USE`, действует только у сайта ||
|#

## Виджет Битрикс24

#|
|| **Поле**
`тип` | **Описание** ||
|| **B24BUTTON_USE**
[`string`](../../data-types.md) | Включить виджет Битрикс24 — кнопку на странице, через которую посетитель связывается с компанией: `Y` или `N` ||
|| **B24BUTTON_CODE**
[`string`](../../data-types.md) | Ссылка на скрипт виджета, который Битрикс24 подключает на странице ||
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
[`string`](../../data-types.md) | Показывать баннер cookies: `Y` или `N`. У страницы поля `COOKIES_*` не действуют — задайте их сайту методом [landing.site.update](../site/landing-site-update.md) ||
|| **COOKIES_AGREEMENT_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор соглашения, текст которого показывает баннер cookies. Список соглашений возвращает метод [userconsent.agreement.list](../../user-consent/user-consent-agreement-list.md) ||
|| **COOKIES_COLOR_BG**
[`string`](../../data-types.md) | Цвет фона баннера cookies в HEX-формате ||
|| **COOKIES_COLOR_TEXT**
[`string`](../../data-types.md) | Цвет текста баннера cookies в HEX-формате ||
|| **COOKIES_POSITION**
[`string`](../../data-types.md) | Положение баннера cookies. Поддерживаются значения `bottom_left`, `bottom_right` ||
|| **COOKIES_MODE**
[`string`](../../data-types.md) | Режим баннера cookies: `A` — нужно согласие посетителя, `I` — только сообщение о сборе cookies ||
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
[`string`](../../data-types.md) | Использовать lazy load: `Y` или `N`. У страницы поле не действует — задайте его сайту методом [landing.site.update](../site/landing-site-update.md) ||
|| **SPEED_USE_WEBPACK**
[`string`](../../data-types.md) | Использовать webpack-режим сборки ресурсов: `Y` или `N`. Как и `SPEED_USE_LAZY`, действует только у сайта ||
|#

## Настройки каталога и торгового раздела

Набор полей этой группы зависит от того, какие модули установлены: каталог, валюты, торговля.

#|
|| **Поле**
`тип` | **Описание** ||
|| **SETTINGS_IBLOCK_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор инфоблока каталога ||
|| **SETTINGS_SECTION_ID**
[`string`](../../data-types.md) \| [`integer`](../../data-types.md) | Идентификатор раздела каталога ||
|| **SETTINGS_HIDE_NOT_AVAILABLE**
[`string`](../../data-types.md) | Как показывать недоступные товары: `Y` — не показывать, `L` — в конце списка, `N` — в общем списке ||
|| **SETTINGS_HIDE_NOT_AVAILABLE_OFFERS**
[`string`](../../data-types.md) | Как показывать недоступные торговые предложения: `Y` — не показывать, `L` — показывать только с возможностью подписки, `N` — показывать все ||
|| **SETTINGS_PRODUCT_SUBSCRIPTION**
[`string`](../../data-types.md) | Включить подписку на товар: `Y` или `N` ||
|| **SETTINGS_USE_PRODUCT_QUANTITY**
[`string`](../../data-types.md) | Разрешить покупателю указывать количество товара: `Y` или `N` ||
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
[`integer`](../../data-types.md) | Количество товара, для которого выбирать цену, если у товара есть диапазоны цен ||
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

\
**Принадлежит компании Meta Platforms, Inc., которая признана экстремистской и запрещена на территории Российской Федерации.*

## Продолжите изучение

- [landing.landing.add](./methods/landing-landing-add.md)
- [landing.landing.update](./methods/landing-landing-update.md)
- [Цветовые темы страницы](./color-themes.md)
- [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md)
- [landing.syspage.set](./special-pages/landing-syspage-set.md)
