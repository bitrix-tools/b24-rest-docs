# Файл манифеста

Файл манифеста сопровождает каждый [блок](./index.md) и описывает:

- редактируемые элементы в разметке блока
- стили, доступные в редакторе
- дополнительные атрибуты
- подключаемые ресурсы

Получить файл манифеста блока можно с помощью метода [landing.block.getmanifestfile](./methods/landing-block-get-manifest-file.md).

## Пример файла манифеста

```php
$manifest = [
    'block' => [
        'name' => 'Текст и изображение в две колонки',
        'section' => ['text_image', 'columns'],
        'type' => ['page', 'store', 'smn', 'knowledge', 'group', 'mainpage'],
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
                'title' => 'Заголовок',
                'type' => ['typo', 'heading'],
            ],
            '.landing-block-node-text' => [
                'title' => 'Текст',
                'type' => 'typo',
            ],
            '.landing-block-node-button' => [
                'title' => 'Кнопка',
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

Манифест блока состоит из набора ключей. Каждый ключ отвечает за отдельную часть описания блока: структуру, редактируемые элементы, стили, атрибуты и подключаемые ресурсы. В одном манифесте можно использовать сразу несколько ключей.

### Ключ block

Ключ `block` задает базовые свойства блока:

- `name` — название блока
- `section` — раздел или массив разделов в каталоге блоков. Актуальные коды разделов можно получить методом [landing.block.getrepository](./methods/landing-block-get-repository.md)
- `dynamic` — признак поддержки динамического режима блока. Если передать `false`, блок нельзя использовать как динамический
- `subtype` — подтип спецблока, одно значение или массив
- `subtype_params` — параметры подтипа
- `type` — тип сайта, где доступен блок. Поддерживаемые типы сайта: 
  - `page` — обычные сайты и лендинги
  - `store` — магазины
  - `smn` — служебный тип сайтов для раздела «Сайты24» в БУС
  - `knowledge` — базы знаний
  - `group` — базы знаний групп соцсети
  - `mainpage` — главная страница портала

В зависимости от редакции и версии продукта могут встречаться дополнительные служебные значения `type`.

### Ключ nodes

Ключ `nodes` описывает элементы, которые можно редактировать как контент. Для указания нод используются CSS-селекторы. В качестве селектора рекомендуется выбирать понятные структурные классы, например с префиксом `landing-block-node-`.

Один и тот же селектор можно использовать в разных блоках, но селектор ноды не должен совпадать с селектором карточки этого же блока.

В `nodes` ключами выступают селекторы редактируемых элементов, а в значениях задаются метка ноды, ее тип и дополнительные параметры. От типа ноды зависит, как именно элемент будет редактироваться в интерфейсе.

Возможные типы нод:

- `text` — текстовый контент элемента
- `img` — изображение 
- `link` — ссылка 
- `icon` — иконка
- `embed` — встраиваемый медиа-контент
- `map` — карта
- `component` — встраиваемый компонент
- `styleimg` — изображение, управляемое через стилевые настройки

Подробнее: [Типы нод](./node-types.md).

### Ключ cards

Ключ `cards` описывает карточки. Карточки применяются для повторяемого контента, например списка услуг, сотрудников или элементов галереи.

В базовом варианте достаточно описания карточек в манифесте, а для более сложных сценариев используется расширенное управление карточками.

Рекомендации:

- используйте отдельные селекторы карточек и нод
- используйте понятные структурные классы, например `landing-block-card-*`
- не смешивайте карточки разных селекторов в одном общем родителе без расширенной схемы карточек

Подробнее о расширенной схеме: [Расширенное описание карточек](./extended-description.md).

### Ключ style

Ключ `style` задает, какие стилевые настройки доступны в редакторе.

При изменении внешнего вида блоков обычно меняются CSS-классы, а не инлайн-атрибут `style` у нод. Например, при изменении размера текста система может заменить условный класс `g-font-size-12` на `g-font-size-16`, а не записывать `font-size` напрямую в `style`.

Структура:

- `style.block` — стили блока целиком
- `style.nodes` — стили отдельных элементов внутри блока по CSS-селекторам

Типы стилей:

- `block-default` — базовые настройки оформления блока
- `block-default-background` — базовый блок с фоном
- `block-default-background-height-vh` — блок с фоном и высотой во viewport
- `paddings` — внешние и внутренние отступы
- `margins` — внешние отступы
- `box` — настройки контейнера (цвет, тень, прозрачность)
- `bg` — цвет фона
- `button` — стили кнопки
- `typo` — расширенные типографические настройки текста
- `typo-simple` — упрощенные настройки типографики
- `typo-link` — оформление ссылок
- `navbar` — настройки панели навигации
- `navbar-bg-color` — настройки панели навигации с фоном
- `navbar-full` — расширенные настройки панели навигации
- `block-default-background-overlay` — базовый блок с настройками фонового оверлея
- `block-default-background-overlay-height-vh` — вариант с оверлеем и настройкой высоты экрана
- `block-default-wo-background` — базовый блок без настроек фона
- `block-default-wo-paddings` — блок без настроек отступов
- `block-default-wo-background-vh-animation` — блок без фона, с настройкой высоты экрана и анимацией
- `block-border` — настройки рамки блока
- `container` — настройки контейнера контента
- `heading` — настройки заголовка
- `border-colors` — цвета рамки и рамки при наведении
- `background-gradient` — градиентный фон
- `background-hover` — фон при наведении
- `widget` — стили для виджетов

Набор типов стиля и параметры внутри каждого типа расширяемые и зависят от подключенных style-манифестов и версии продукта.

{% cut "Справочный список типов стиля и их параметров" %}

```php
$styleTypes = [
    'block-default' => [
        'display',
        'background',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
    ],
    'block-default-background' => [
        'display',
        'background',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
    ],
    'block-default-background-height-vh' => [
        'display',
        'background',
        'height-vh',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
    ],
    'paddings' => [
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
    ],
    'margins' => [
        'margin-top',
        'margin-bottom',
        'margin-left',
        'margin-right',
    ],
    'box' => [
        'background-color',
        'box-shadow',
        'opacity',
    ],
    'bg' => [
        'background-color',
    ],
    'button' => [
        'button-color',
        'button-color-hover',
        'button-type',
        'button-size',
        'button-padding',
        'border-radius',
        'color',
        'color-hover',
        'border-color-hover',
        'font-family',
        'text-transform',
    ],
    'typo' => [
        'text-align',
        'color',
        'font-size',
        'font-family',
        'font-weight',
        'text-decoration',
        'text-transform',
        'line-height',
        'letter-spacing',
        'word-break',
        'text-shadow',
        'padding-top',
        'padding-left',
        'padding-right',
        'margin-bottom',
    ],
    'typo-simple' => [
        'font-size',
        'font-family',
        'font-weight',
        'text-decoration',
        'text-transform',
        'line-height',
        'letter-spacing',
    ],
    'typo-link' => [
        'color',
        'color-hover',
        'font-size',
        'font-family',
        'font-weight',
        'text-decoration',
        'text-transform',
        'letter-spacing',
        'text-shadow',
    ],
    'navbar' => [
        'navbar-align',
        'navbar-color',
        'navbar-color-hover',
    ],
    'navbar-bg-color' => [
        'navbar-align',
        'navbar-color',
        'navbar-bg',
        'navbar-color-hover',
        'navbar-bg-hover',
    ],
    'navbar-full' => [
        'navbar-align',
        'navbar-color',
        'navbar-color-hover',
        'navbar-color-fix-moment',
        'navbar-color-fix-moment-hover',
    ],
    'block-default-background-overlay' => [
        'display',
        'background-attachment',
        'background-size',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
        'background-overlay',
    ],
    'block-default-background-overlay-height-vh' => [
        'display',
        'background-attachment',
        'background-size',
        'height-vh',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
        'background-overlay',
    ],
    'block-default-wo-background' => [
        'display',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
    ],
    'block-default-wo-paddings' => [
        'display',
        'background-color',
    ],
    'block-default-wo-background-vh-animation' => [
        'display',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
        'margin-top',
        'height-vh',
        'animation',
    ],
    'block-border' => [
        'background',
        'block-border-type',
        'block-border-margin',
        'border-radius',
        'block-border-position',
    ],
    'container' => [
        'container-max-width',
        'padding-left',
        'padding-right',
    ],
    'heading' => [
        'text-align',
        'heading-v2',
        'border-color',
        'border-color-hover',
        'margin-bottom',
    ],
    'border-colors' => [
        'border-color',
        'border-color-hover',
    ],
    'background-gradient' => [
        'background-color',
    ],
    'background-hover' => [
        'background-color-hover',
    ],
    'widget' => [
        'background',
        'widget-type',
        'margin-top',
        'margin-bottom',
        'padding-top',
        'padding-bottom',
        'padding-left',
        'padding-right',
    ],
];
```

{% endcut %}

### Ключ attrs

Ключ `attrs` описывает дополнительные параметры, значения которых сохраняются в атрибутах DOM-элементов.

Типы атрибутов:

- `text` — однострочное текстовое поле
- `date` — выбор даты и времени
- `html` — многострочное текстовое поле
- `dropdown` — выпадающий список
- `checkbox` — чекбокс или группа чекбоксов
- `radio` — выбор одного варианта из списка
- `multiselect` — множественный выбор
- `image` — выбор изображения
- `icon` — выбор иконки
- `link` — ссылка с расширенными настройками
- `url` — упрощенное поле URL
- `slider` — слайдер одного значения
- `range-slider` — слайдер диапазона значений
- `palette` — выбор из палитры
- `color` — выбор цвета
- `sortable-list` — сортируемый список значений
- `position` — выбор позиции/направления элемента
- `catalog-view` — настройки отображения каталожных данных
- `filter` — настройки фильтра
- `user-select` — выбор пользователя
- `dynamic_source` — выбор динамического источника данных

Подробнее: [Атрибуты](./attributes.md).

### Ключи lang_original и lang

Ключи `lang_original` и `lang` задают локализацию подписей в манифесте блока.

- `lang_original` — исходный язык фраз в манифесте
- `lang` — набор переводов по языкам

Рекомендации:

- задавайте `lang_original` в соответствии с фактическим языком манифеста
- используйте одинаковые фразы-ключи в `lang`, как в исходном манифесте

Подробнее: [Локализация блока](./localization.md).

### Ключ menu

Ключ `menu` используется, когда нужно многоуровневое меню с отдельными настройками корневых и дочерних пунктов.

Если достаточно одного уровня, меню можно реализовать и как обычные карточки со ссылками.

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
    - `liClassName` для вложенных `<li>`,
    - `aClassName` для ссылок `<a>` в дочерних пунктах
- `nodes` — редактируемые элементы внутри пункта меню, например, ссылка

В одном манифесте можно описать несколько многоуровневых меню, то есть несколько корневых селекторов в `menu`.

### Ключ assets

Ключ `assets` задает JS- и CSS-ресурсы, которые подключаются при добавлении блока на страницу.

- `css` — внешние CSS-файлы
- `js` — внешние JS-файлы
- `ext` — JS-расширения ядра Битрикс

Если один и тот же файл уже подключен другим блоком, повторно он не добавляется.

Ключ `ext` используется для подключения библиотек ядра. Подключать следует только поддерживаемые расширения, доступные в окружении блока.

Поддерживаются:

- `landing_form` — логика и интерфейсы для блоков форм
- `landing_carousel` — логика карусели/слайдера для карточек и изображений
- `landing_google_maps_new` — интеграция с картами Google в актуальном сценарии
- `landing_map` — базовая логика карт в блоках
- `landing_countdown` — таймер обратного отсчета
- `landing_gallery_cards` — галерея карточек/изображений
- `landing_chat` — чатовые сценарии в лендингах

Для репозиторных блоков дополнительно используется расширение для Vue-виджетов `landing.widgetvue`.

Если скрипт использует библиотеки, которые загружаются ядром, инициализацию лучше оборачивать в `BX.ready(...)`, чтобы код выполнялся после системных подключений:

```js
BX.ready(function () {
    console.log($(window));
});
```

## Анимация

Чтобы анимация работала в штатном режиме:

- у ноды должен быть класс `js-animation`
- в `style` для этой ноды должен быть указан тип `animation`
- при необходимости можно сразу добавить класс эффекта, например, `fadeIn`
