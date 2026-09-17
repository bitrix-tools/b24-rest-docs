# Файл манифеста

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Манифест — это описание [блока](./index.md) в виде массива. Разметка блока задает, как он выглядит, а манифест — что в нем можно менять:

- редактируемые элементы в разметке блока
- стили, доступные в редакторе
- дополнительные атрибуты
- подключаемые ресурсы

У штатных блоков Битрикс24 манифест лежит в файле `.description.php` рядом с блоком. Приложение передает манифест своего блока при регистрации — в параметре `manifest` метода [landing.repo.register](../user-blocks/landing-repo-register.md).

Примеры на этой странице записаны PHP-массивом, как в `.description.php`. В REST-вызов тот же набор ключей передают объектом JSON: параметр `manifest` объявлен типом `object`.

Манифест нужен в двух задачах: когда вы собираете собственный блок и когда меняете чужой блок через REST. Во втором случае манифест показывает, какие селекторы принимают методы изменения: ноды из `nodes`, карточки из `cards`, атрибуты из `attrs`, стили из `style`.

## Как получить манифест

- [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md) — исходный манифест шаблона по коду блока, например `01.big_with_text`
- [landing.block.getmanifest](./methods/landing-block-get-manifest.md) — манифест блока, уже размещенного на странице, со служебными полями и подставленными переводами

Манифест разбирают на штатном блоке: получите список шаблонов методом [landing.block.getrepository](./methods/landing-block-get-repository.md), а затем запросите манифест нужного блока по его коду. Параметры вызова `landing.block.getmanifestfile`:

```json
{
    "code": "01.big_with_text"
}
```

Манифест писать нужно не всегда. Если вы берете готовый блок Битрикс24 и меняете только значения его нод и атрибутов, сразу переходите к методам раздела [Работа с блоками](./methods/index.md).

## Пример файла манифеста

```php
$manifest = [
    'block' => [
        'name' => 'Текст и изображение в две колонки',
        'section' => ['text_image', 'columns'],
        'type' => ['page', 'store', 'knowledge', 'group'],
        'dynamic' => false,
        'description' => 'Блок с заголовком, текстом, кнопкой и изображением',
    ],
    'cards' => [
        '.landing-block-card' => [
            'name' => 'Колонка',
            'label' => ['.landing-block-node-title'],
        ],
    ],
    'nodes' => [
        '.landing-block-node-title' => [
            'name' => 'Заголовок',
            'type' => 'text',
        ],
        '.landing-block-node-text' => [
            'name' => 'Текст',
            'type' => 'text',
        ],
        '.landing-block-node-button' => [
            'name' => 'Кнопка',
            'type' => 'link',
        ],
        '.landing-block-node-image' => [
            'name' => 'Изображение',
            'type' => 'img',
            'dimensions' => [
                'maxWidth' => 1200,
                'maxHeight' => 1200,
            ],
            'allowInlineEdit' => false,
            'useInDesigner' => true,
        ],
    ],
    'style' => [
        'block' => [
            'type' => ['block-default'],
        ],
        'nodes' => [
            '.landing-block-card' => [
                'name' => 'Колонка',
                'type' => ['columns', 'animation'],
            ],
            '.landing-block-node-title' => [
                'name' => 'Заголовок',
                'type' => ['typo', 'heading'],
            ],
            '.landing-block-node-text' => [
                'name' => 'Текст',
                'type' => 'typo',
            ],
            '.landing-block-node-button' => [
                'name' => 'Кнопка',
                'type' => 'button',
            ],
            '.landing-block-node-image' => [
                'name' => 'Изображение',
                'type' => ['box'],
            ],
        ],
    ],
    'attrs' => [
        '.landing-block-node-text' => [
            [
                'name' => 'Режим отображения',
                'type' => 'dropdown',
                'attribute' => 'data-view',
                'items' => [
                    ['name' => 'Короткий', 'value' => 'short'],
                    ['name' => 'Полный', 'value' => 'full'],
                ],
            ],
        ],
    ],
    'assets' => [
        'css' => ['https://example.com/landing/custom-block.css'],
        'js' => ['https://example.com/landing/custom-block.js'],
        'ext' => ['landing_form'],
    ],
];
```

## Ключи манифеста

Манифест блока состоит из набора ключей. Каждый ключ отвечает за отдельную часть описания блока. В одном манифесте используют сразу несколько ключей.

Сам манифест — необязательный параметр метода [landing.repo.register](../user-blocks/landing-repo-register.md): без него блок зарегистрируется, но редактировать в нем будет нечего. Минимальный рабочий набор для своего блока — `nodes` с редактируемыми элементами. Остальные ключи добавляют по мере надобности.

#|
|| **Ключ** | **Что описывает** | **Подробнее** ||
|| `block` | Название блока, раздел каталога, типы сайтов и подтип спецблока | [Ключ block](#block-key) ||
|| `nodes` | Редактируемые элементы блока и их типы | [Ключ nodes](#nodes-key), [Типы нод](./node-types.md) ||
|| `cards` | Повторяемые элементы: карточки услуг, сотрудников, слайдов | [Ключ cards](#cards-key), [Расширенное описание карточек](./extended-description.md) ||
|| `style` | Стилевые настройки, доступные в редакторе | [Ключ style](#style-key) ||
|| `attrs` | Дополнительные настройки, которые сохраняются в DOM-атрибуты | [Ключ attrs](#attrs-key), [Атрибуты](./attributes.md) ||
|| `menu` | Многоуровневое меню с настройками корневых и дочерних пунктов | [Ключ menu](#menu-key) ||
|| `assets` | Подключаемые CSS-файлы, JS-файлы и расширения ядра | [Ключ assets](#assets-key) ||
|| `lang_original`, `lang` | Исходный язык подписей и их переводы | [Ключи lang_original и lang](#lang-key), [Локализация блока](./localization.md) ||
|#

### Ключ block {#block-key}

Ключ `block` задает базовые свойства блока. У блока, который приложение регистрирует методом [landing.repo.register](../user-blocks/landing-repo-register.md), название, описание и разделы каталога берутся из полей `fields.NAME`, `fields.DESCRIPTION` и `fields.SECTIONS`, а не отсюда: из ключа `block` для такого блока читаются только `type`, `subtype` и `subtype_params`.

Поля ключа:

- `name` — название блока
- `section` — раздел или массив разделов в каталоге блоков. Актуальные коды разделов можно получить методом [landing.block.getrepository](./methods/landing-block-get-repository.md)
- `dynamic` — признак поддержки динамического режима у штатного блока. По умолчанию ключ не задают, и блок можно использовать как динамический. Запрещает режим только явное значение `false`
- `subtype` — подтип спецблока, одно значение или массив. Если значений несколько, обработчики применяются по очереди и каждый дополняет манифест. Какие подтипы бывают: [Специальные блоки](./special/index.md)
- `subtype_params` — параметры подтипа. У каждого сценария свои: они перечислены на странице сценария в разделе [Специальные блоки](./special/index.md)
- `type` — тип сайта, где доступен блок. Поддерживаемые типы сайта:
  - `page` — обычные сайты и лендинги
  - `store` — магазины
  - `smn` — служебный тип сайтов для раздела «Сайты24» в БУС
  - `knowledge` — базы знаний
  - `group` — базы знаний групп соцсети
  - `vibe` — главная страница Битрикс24

Значение `page` автоматически добавляет к блоку и тип `smn`. Если ключ `type` не задавать, блок считается общим и будет доступен во всех типах сайтов. Чтобы убрать блок из каталога, передайте в `type` строку `null` или пустую строку — такой блок скрыт.

### Ключ nodes {#nodes-key}

Ключ `nodes` описывает элементы, которые можно редактировать как контент. Для указания нод используются CSS-селекторы. В качестве селектора рекомендуется выбирать понятные структурные классы, например с префиксом `landing-block-node-`.

Один и тот же селектор можно использовать в разных блоках. А вот совпадение селектора ноды и селектора карточки внутри одного блока лучше не допускать: система не проверяет это при регистрации, но в редакторе будет непонятно, что именно редактируется.

В `nodes` ключами выступают селекторы редактируемых элементов, а в значениях задаются метка ноды, ее тип и дополнительные параметры. От типа ноды зависит, как именно элемент будет редактироваться в интерфейсе и в каком формате хранится его значение.

Основных типов нод восемь: от текста и изображения до карты и встроенного компонента. Перечень типов, их поля и примеры разметки: [Типы нод](./node-types.md).

### Ключ cards {#cards-key}

Ключ `cards` описывает карточки. Карточки применяются для повторяемого контента, например списка услуг, сотрудников или элементов галереи.

В `cards` ключами выступают селекторы повторяемых элементов. Базовые поля описания:

- `name` — название карточки в форме настроек
- `label` — селектор ноды или массив селекторов, по которым собирается заголовок карточки в списке

Остальные поля — пресеты, группировка и запреты на действия — относятся к расширенной схеме и разобраны в статье [Расширенное описание карточек](./extended-description.md).

Рекомендации:

- используйте отдельные селекторы карточек и нод
- используйте понятные структурные классы, например `landing-block-card-*`
- не смешивайте карточки разных селекторов в одном общем родителе без расширенной схемы карточек

Если карточки — это пункты меню и нужны отдельные настройки для корневых и дочерних уровней, вместо `cards` используют [ключ menu](#menu-key).

### Ключ style {#style-key}

Ключ `style` задает, какие стилевые настройки доступны в редакторе. Подпись стилевой группы в интерфейсе берется из ключа `name`: только значения `name` попадают в перевод манифеста.

При изменении внешнего вида блоков обычно меняются CSS-классы, а не инлайн-атрибут `style` у нод. Например, при изменении размера текста система может заменить условный класс `g-font-size-12` на `g-font-size-16`, а не записывать `font-size` напрямую в `style`.

Структура:

- `style.block` — стили блока целиком
- `style.nodes` — стили отдельных элементов внутри блока по CSS-селекторам

Ниже перечислены группы стилей и параметры, которые каждая из них открывает в редакторе. В `type` можно передать и отдельный код параметра, например `columns`, `animation`, `display`, `background` или `border-radius`.

#|
|| **Группа** | **Что настраивает** | **Параметры** ||
|| `block-default` | Базовое оформление блока | `display`, `background`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top` ||
|| `block-default-background` | Базовый блок с фоном | `display`, `background`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top` ||
|| `block-default-background-height-vh` | Блок с фоном и высотой во viewport | `display`, `background`, `height-vh`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top` ||
|| `block-default-background-overlay` | Базовый блок с фоновым оверлеем | `display`, `background-attachment`, `background-size`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top`, `background-overlay` ||
|| `block-default-background-overlay-height-vh` | Оверлей вместе с настройкой высоты экрана | `display`, `background-attachment`, `background-size`, `height-vh`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top`, `background-overlay` ||
|| `block-default-wo-background` | Базовый блок без настроек фона | `display`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top` ||
|| `block-default-wo-paddings` | Блок без настроек отступов | `display`, `background-color` ||
|| `block-default-wo-background-vh-animation` | Блок без фона, с высотой экрана и анимацией | `display`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right`, `margin-top`, `height-vh`, `animation` ||
|| `block-border` | Рамку блока | `background`, `block-border-type`, `block-border-margin`, `border-radius`, `block-border-position` ||
|| `paddings` | Внутренние отступы | `padding-top`, `padding-bottom`, `padding-left`, `padding-right` ||
|| `margins` | Внешние отступы | `margin-top`, `margin-bottom`, `margin-left`, `margin-right` ||
|| `container` | Контейнер контента | `container-max-width`, `padding-left`, `padding-right` ||
|| `box` | Цвет, тень и прозрачность контейнера | `background-color`, `box-shadow`, `opacity` ||
|| `bg` | Цвет фона | `background-color` ||
|| `background-gradient` | Градиентный фон | `background-color` ||
|| `background-hover` | Фон при наведении | `background-color-hover` ||
|| `border-colors` | Цвет рамки и рамки при наведении | `border-color`, `border-color-hover` ||
|| `button` | Оформление кнопки | `button-color`, `button-color-hover`, `button-type`, `button-size`, `button-padding`, `border-radius`, `color`, `color-hover`, `border-color-hover`, `font-family`, `text-transform` ||
|| `heading` | Заголовок | `text-align`, `heading-v2`, `border-color`, `border-color-hover`, `margin-bottom` ||
|| `typo` | Расширенную типографику текста | `text-align`, `color`, `font-size`, `font-family`, `font-weight`, `text-decoration`, `text-transform`, `line-height`, `letter-spacing`, `word-break`, `text-shadow`, `padding-top`, `padding-left`, `padding-right`, `margin-bottom` ||
|| `typo-simple` | Упрощенную типографику | `font-size`, `font-family`, `font-weight`, `text-decoration`, `text-transform`, `line-height`, `letter-spacing` ||
|| `typo-link` | Оформление ссылок | `color`, `color-hover`, `font-size`, `font-family`, `font-weight`, `text-decoration`, `text-transform`, `letter-spacing`, `text-shadow` ||
|| `navbar` | Панель навигации | `navbar-align`, `navbar-color`, `navbar-color-hover` ||
|| `navbar-bg-color` | Панель навигации с фоном | `navbar-align`, `navbar-color`, `navbar-bg`, `navbar-color-hover`, `navbar-bg-hover` ||
|| `navbar-full` | Панель навигации с настройками закрепленного состояния | `navbar-align`, `navbar-color`, `navbar-color-hover`, `navbar-color-fix-moment`, `navbar-color-fix-moment-hover` ||
|| `widget` | Оформление виджетов | `background`, `widget-type`, `margin-top`, `margin-bottom`, `padding-top`, `padding-bottom`, `padding-left`, `padding-right` ||
|#

Набор групп и параметры внутри каждой группы расширяемые: они зависят от подключенных style-манифестов и версии продукта.

Отдельного ключа `animation` в манифесте нет — анимация подключается как параметр стиля. Чтобы она работала в штатном режиме:

- у ноды должен быть класс `js-animation`
- в `style` для этой ноды должен быть указан тип `animation`
- при необходимости можно сразу добавить класс эффекта, например `fadeIn`

### Ключ attrs {#attrs-key}

Ключ `attrs` описывает дополнительные настройки блока, значения которых сохраняются в DOM-атрибутах элементов, например `data-view="short"`.

У каждой настройки задают имя DOM-атрибута в поле `attribute` и тип поля в редакторе в поле `type` — от текстового поля и выпадающего списка до палитры, выбора изображения и динамического источника данных. Ключ `attrs` описывают в четырех местах манифеста: в корне, внутри `style.nodes`, внутри `style.block` и внутри `cards`. От места зависит, в какой форме редактора появится поле.

Полный перечень типов, их поля и места описания: [Атрибуты](./attributes.md#attribute-types).

### Ключ menu {#menu-key}

Ключ `menu` используется, когда нужно многоуровневое меню с отдельными настройками корневых и дочерних пунктов. Развилку с ключом `cards` смотрите в разделе [Ключ cards](#cards-key).

Пример многоуровневого меню:

```php
'menu' => [
    '.landing-block-node-menu' => [
        'item' => '.landing-block-node-menu-item',
        'name' => 'Меню',
        'root' => [
            'ulClassName' => 'landing-block-node-menu navbar-nav',
            'liClassName' => 'landing-block-node-menu-item nav-item',
            'aClassName' => 'landing-block-node-menu-link nav-link',
        ],
        'children' => [
            'ulClassName' => 'landing-block-node-menu navbar-nav',
            'liClassName' => 'landing-block-node-menu-item nav-item',
            'aClassName' => 'landing-block-node-menu-link nav-link',
        ],
        'nodes' => [
            '.landing-block-node-menu-link' => [
                'name' => 'Ссылка',
                'type' => 'link',
            ],
        ],
    ],
]
```

Основные поля:

- ключ массива `.landing-block-node-menu` — селектор корневого `<ul>`
- `item` — селектор элементов `<li>`
- `name` — название меню в интерфейсе
- `root` — классы для корневого уровня меню:
  - `ulClassName` для контейнера `<ul>`
  - `liClassName` для пунктов `<li>`
  - `aClassName` для ссылок `<a>`
- `children` — классы для дочерних уровней меню:
  - `ulClassName` для вложенного `<ul>`
  - `liClassName` для вложенных `<li>`
  - `aClassName` для ссылок `<a>` в дочерних пунктах
- `nodes` — редактируемые элементы внутри пункта меню, например ссылка

В одном манифесте можно описать несколько многоуровневых меню, то есть несколько корневых селекторов в `menu`.

### Ключ assets {#assets-key}

Ключ `assets` задает JS- и CSS-ресурсы, которые подключаются при добавлении блока на страницу.

- `css` — внешние CSS-файлы
- `js` — внешние JS-файлы
- `ext` — расширения ядра Битрикс24

Если один и тот же файл уже подключен другим блоком, повторно он не добавляется. Зависимости расширений перечислять не нужно: Битрикс24 подключает их сам.

Расширения, которые используют блоки:

#|
|| **Расширение** | **Что подключает** | **Где описано** ||
|| `landing_form` | Логику и интерфейсы блоков с CRM-формой | [Формы в блоках](./special/crm-forms.md) ||
|| `landing_map` | Интерфейс настройки карты в блоке | [Карты в блоках](./special/maps.md) ||
|| `landing_carousel` | Слайдер для карточек и изображений | [Слайдеры](./interactive/sliders.md) ||
|| `landing_gallery_cards` | Просмотр изображений блока в отдельном окне | [Галереи](./interactive/gallery.md) ||
|| `landing_countdown` | Счетчик обратного отсчета | [Счетчики обратного отсчета](./interactive/timer.md) ||
|| `landing_chat` | Виджет чата на странице сайта | Отдельной страницы нет ||
|| `landing_google_maps_new` | Ничего своего; подтягивает `landing_map` | [Карты в блоках](./special/maps.md) ||
|#

Есть еще расширение `landing.widgetvue` — оно обслуживает Vue-виджеты на главной странице Битрикс24. В `assets.ext` его не указывают: обработчик подтипа `widgetvue` сам собирает блоку и `assets`, и `nodes`, и `style`.

Если скрипт использует библиотеки, которые загружаются ядром, инициализацию лучше оборачивать в `BX.ready(...)`, чтобы код выполнялся после системных подключений:

```js
BX.ready(function () {
    // здесь расширения из assets.ext уже подключены
});
```

### Ключи lang_original и lang {#lang-key}

Ключи `lang_original` и `lang` задают локализацию подписей в манифесте блока.

- `lang_original` — исходный язык фраз в манифесте
- `lang` — набор переводов по языкам

Рекомендации:

- задавайте `lang_original` в соответствии с фактическим языком манифеста
- используйте одинаковые фразы-ключи в `lang`, как в исходном манифесте

Переводятся только значения ключей `name`. Перечень таких подписей: [Какие подписи участвуют в переводе](./localization.md#translatable-keys).

Подробнее: [Локализация блока](./localization.md).

## Права и ограничения

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Ограничения:

- манифест штатного блока Битрикс24 через REST изменить нельзя. Методы `landing.block.*` меняют размещенный блок, а не описание его шаблона
- разметку своего блока передают отдельно от манифеста — в поле `fields.CONTENT` метода [landing.repo.register](../user-blocks/landing-repo-register.md). Селекторы из `nodes`, `cards` и `attrs` должны существовать в этой разметке, иначе настройке не к чему привязаться
- в `assets.ext` подключают только те расширения ядра, которые доступны в окружении блока

## Продолжите изучение

- [{#T}](./node-types.md)
- [{#T}](./attributes.md)
- [{#T}](./extended-description.md)
- [{#T}](./localization.md)
- [{#T}](./special/index.md)
- [{#T}](./interactive/index.md)
- [{#T}](./methods/landing-block-get-manifest-file.md)
- [{#T}](../user-blocks/landing-repo-register.md)
