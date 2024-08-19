# Дополнительные поля

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- не прописаны ссылки на несозданные ещё страницы

{% endnote %}

{% endif %}

На чтение поля получаются через метод [landing.site.getadditionalfields](./landing-site-get-additional-fields.md).

{% note warning %}

Ниже указаны коды полей, которые для записи в сущность необходимо указывать в массиве с ключом ADDITIONAL. Например, `ADDITIONAL_FIELDS: {UP_SHOW: 'Y'}`.

{% endnote %}

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **THEME_CODE**
[`unknown`](../../data-types.md) | Цветовая палитра. [Описание тем](../page/color-themes.md) | Да | Да ||
|| **THEME_CODE_TYPO**
[`unknown`](../../data-types.md) | Настройки шрифтов. | Да | Да ||
|| **B24BUTTON_CODE**
[`unknown`](../../data-types.md) | Идентификатор виджета на сайт. Передается JS-путь до виджета. Например, https://cdn.bitrix24.com/crm/loader_2_ibikwq.js | Да | Да ||
|| **B24BUTTON_COLOR**
[`unknown`](../../data-types.md) | Цвет виджета, может принимать значения: 
- site (использовать основной цвет сайта);
- button (использовать цвет из настроек виджета). | Да | Да ||
|| **UP_SHOW**
[`unknown`](../../data-types.md) | Показывать ли кнопку Вверх: Y/N. | Да | Да ||
|#

## Фоновая картинка

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **BACKGROUND_USE**
[`unknown`](../../data-types.md) | Использовать функционал: Y/N | Да | Да ||
|| **BACKGROUND_PICTURE**
[`unknown`](../../data-types.md) | Путь до изображения. | Да | Да ||
|| **BACKGROUND_POSITION**
[`unknown`](../../data-types.md) | Позиционирование: center (растянуть), repeat (замостить). | Да | Да ||
|| **BACKGROUND_COLOR**
[`unknown`](../../data-types.md) | Цвет фона. | Да | Да ||
|#

## Аналитика

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **YACOUNTER_USE**
[`unknown`](../../data-types.md) | Использовать Яндекс.Метрику: Y/N. | Да | Да ||
|| **YACOUNTER_COUNTER**
[`unknown`](../../data-types.md) | Код счетчика Яндекс.Метрики. | Да | Да ||
|| **GACOUNTER_USE**
[`unknown`](../../data-types.md) | Использовать Google Analytics: Y/N. | Да | Да ||
|| **GACOUNTER_COUNTER**
[`unknown`](../../data-types.md) | Код счетчика Google Analytics. | Да | Да ||
|| **GACOUNTER_SEND_CLICK**
[`unknown`](../../data-types.md) | Отправлять данные о кликах по кнопкам и ссылкам в Google Analytics. | Да | Да ||
|| **GACOUNTER_SEND_SHOW**
[`unknown`](../../data-types.md) | Отправлять данные о просмотре блоков страницы в Google Analytics. | Да | Да ||
|| **GTM_USE**
[`unknown`](../../data-types.md) | Использовать Google Tag Manager. | Да | Да ||
|| **GTM_COUNTER**
[`unknown`](../../data-types.md) | Код Google Tag Manager. | Да | Да ||
|#

## Карты

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **GMAP_USE**
[`unknown`](../../data-types.md) | Использовать Google Карты: Y/N. | Да | Да ||
|| **GMAP_CODE**
[`unknown`](../../data-types.md) | Код Google Карты. | Да | Да ||
|#

## Представление сайта

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **VIEW_USE**
[`unknown`](../../data-types.md) | Использовать представление: Y/N. | Да | Да ||
|| **VIEW_TYPE**
[`unknown`](../../data-types.md) | Тип представления: 
- no (без представления),
- ltr (отступ сверху и по бокам),
- all (отступ со всех сторон). | Да | Да ||
|#

## Robots.txt

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **ROBOTS_USE**
[`unknown`](../../data-types.md) | Показывать свой Robots.txt: Y/N. | Да | Да ||
|| **ROBOTS_CONTENT**
[`unknown`](../../data-types.md) | Контент robots.txt | Да | Да ||
|#

## Пользовательский HTML

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **HEADBLOCK_USE**
[`unknown`](../../data-types.md) | Использовать: Y/N. | Да | Да ||
|| **HEADBLOCK_CODE**
[`unknown`](../../data-types.md) | Блок HEAD, произвольный html. | Да | Да ||
|#

## Пользовательский CSS

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **CSSBLOCK_USE**
[`unknown`](../../data-types.md) | Использовать: Y/N. | Да | Да ||
|| **CSSBLOCK_CODE**
[`unknown`](../../data-types.md) | Произвольный CSS-код. | Да | Да ||
|| **CSSBLOCK_FILE**
[`unknown`](../../data-types.md) | Ссылка на CSS-файл. | Да | Да ||
|#