# Дополнительные поля сущности страница

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров

{% endnote %}

{% endif %}

Одинаковые поля с Сайтом у страницы имеют более высокий приоритет.

На чтение поля получаются через метод [landing.landing.getadditionalfields](./methods/landing-landing-get-additional-fields.md).

{% note warning %}

Ниже указаны коды полей, которые для записи в сущность необходимо указывать в массиве с ключом ADDITIONAL. Например, `ADDITIONAL_FIELDS => [METAROBOTS_INDEX => Y]`.

{% endnote %}

## Темы

#|
|| **Поле** | **Описание** | **Чтение** | **Запись** ||
|| **THEME_CODE**
[`unknown`](../../data-types.md) | Цветовая палитра. [Описание тем](./color-themes.md) | Да | Да ||
|| **THEME_CODE_TYPO**
[`unknown`](../../data-types.md) | Настройки шрифтов. | Да | Да ||
|#

## Предпросмотр в социальных сетях

#|
|| **METAOG_TITLE**
[`unknown`](../../data-types.md) | Заголовок, тег `og:title`. | Да | Да ||
|| **METAOG_DESCRIPTION**
[`unknown`](../../data-types.md) | Описание, тег `og:description`. | Да | Да ||
|| **METAOG_IMAGE**
[`unknown`](../../data-types.md) | Изображение, тег `og:image`. | Да | Да ||
|#

## Мета-теги

#|
|| **METAMAIN_USE**
[`unknown`](../../data-types.md) | Задать мета-теги: Y/N. | Да | Да ||
|| **METAMAIN_TITLE**
[`unknown`](../../data-types.md) | Заголовок, тег `title`. | Да | Да ||
|| **METAMAIN_DESCRIPTION**
[`unknown`](../../data-types.md) | Описание, тег `description`. | Да | Да ||
|| **METAMAIN_KEYWORDS**
[`unknown`](../../data-types.md) | Ключевые слова, тег `keywords`. | Да | Да ||
|#

## Фоновая картинка

#|
|| **BACKGROUND_USE**
[`unknown`](../../data-types.md) | Использовать функционал: Y/N | Да | Да ||
|| **BACKGROUND_PICTURE**
[`unknown`](../../data-types.md) | Путь до изображения. | Да | Да ||
|| **BACKGROUND_POSITION**
[`unknown`](../../data-types.md) | Позиционирование:
- center (растянуть),
- repeat (замостить). | Да | Да ||
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

## Пользовательский HTML

#|
|| **HEADBLOCK_USE**
[`unknown`](../../data-types.md) | Использовать: Y/N. | Да | Да ||
|| **HEADBLOCK_CODE**
[`unknown`](../../data-types.md) | Блок HEAD, произвольный html. | Да | Да ||
|#

## Пользовательский CSS

#|
|| **CSSBLOCK_USE**
[`unknown`](../../data-types.md) | Использовать: Y/N. | Да | Да ||
|| **CSSBLOCK_CODE**
[`unknown`](../../data-types.md) | Произвольный CSS-код. | Да | Да ||
|| **CSSBLOCK_FILE**
[`unknown`](../../data-types.md) | Ссылка на CSS-файл. | Да | Да ||
|#

## Представление страницы

#|
|| **VIEW_USE**
[`unknown`](../../data-types.md) | Использовать представление: Y/N. | Да | Да ||
|| **VIEW_TYPE**
[`unknown`](../../data-types.md) | Тип представления:
- no (без представления),
- ltr (отступ сверху и по бокам),
- all (отступ со всех сторон). | Да | Да ||
|#

## Прочее

#|
|| **METAROBOTS_INDEX**
[`unknown`](../../data-types.md) | Индексировать страницу в поисковых системах: Y/N. | Да | Да ||
|#