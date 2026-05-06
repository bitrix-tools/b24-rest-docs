# Атрибуты

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Атрибуты — это дополнительные значения, которые сохраняются в элементах блока и используются в настройках, JS-логике и условной стилизации. Например, через атрибуты можно хранить параметры карты, ссылок, режимов отображения и других сценариев блока.

Атрибуты регистрируются в ключе `attrs` [манифеста блока](./manifest.md). Ключ `attrs` связывает атрибуты с нодами и карточками.

## Где можно описывать ключ attrs

Ключ `attrs` можно задавать в нескольких местах манифеста:

1. В корне манифеста:
```php
'attrs' => [
    '.landing-block-node-text' => [
        [
            'name' => 'Настройка текст',
            'type' => 'dropdown',
            'attribute' => 'data-copy',
        ],
    ],
]
```
2. В `style.nodes`, в этом случае поле выводится в форме дизайна:
```php
'style' => [
    'nodes' => [
        '.landing-block-node-card-button' => [
            'name' => 'Button',
            'type' => ['border-color', 'button', 'animation'],
            'additional' => [
                'attrs' => [
                    [
                        'type' => 'text',
                        'name' => 'Text field',
                        'attribute' => 'data-test-card-attr',
                    ],
                ],
            ],
        ],
    ],
]
```
3. В `cards`, атрибут применяется отдельно к каждой карточке:
```php
'cards' => [
    '.landing-block-node-card-button' => [
        'name' => 'Card',
        'additional' => [
            'attrs' => [
                [
                    'type' => 'text',
                    'name' => 'Text field',
                    'attribute' => 'data-test-card-attr',
                ],
            ],
        ],
    ],
]
```

## Группировка атрибутов

Если нужно сгруппировать часть атрибутов, используется групповой контейнер `attrs`:

```php
'attrs' => [
    '' => [
        [
            'name' => 'Test group',
            'attrs' => [
                [
                    'type' => 'checkbox',
                    'selector' => 'bitrix:catalog.section',
                    'name' => '',
                    'items' => [
                        ['name' => 'Отображение товаров', 'value' => '1'],
                        ['name' => 'Отображение товаров 2', 'value' => '2'],
                    ],
                    'attribute' => 'data-checkbox',
                ],
                [
                    'type' => 'checkbox',
                    'name' => '',
                    'items' => [
                        ['name' => 'Отображение товаров 22', 'value' => '1'],
                    ],
                    'compact' => true,
                    'attribute' => 'data-checkbox2',
                ],
            ],
        ],
        [
            'type' => 'checkbox',
            'name' => '',
            'items' => [
                ['name' => 'Отображение товаров 33', 'value' => '1'],
            ],
            'attribute' => 'data-checkbox3',
        ],
    ],
]
```

В блоке `style.nodes` поддерживается либо размещение без групп, либо группировка в рамках одного селектора:

```php
'style' => [
    'nodes' => [
        '.landing-block-node-card-button' => [
            'additional' => [
                'attrs' => [
                    [
                        'name' => 'Test group',
                        'attrs' => [
                            [
                                'type' => 'text',
                                'name' => 'Test',
                                'attribute' => 'data-text',
                            ],
                            [
                                'type' => 'text',
                                'name' => 'Test 2',
                                'attribute' => 'data-text2',
                            ],
                        ],
                    ],
                ],
            ],
        ],
    ],
]
```

## Переопределение селектора

Если значение должно сохраняться не в исходный селектор, укажите `selector` у конкретного атрибута:

```php
[
    'name' => 'Текстовое поле',
    'type' => 'text',
    'attribute' => 'data-text-field',
    'selector' => '.demo-another-selector',
]
```

## Поля атрибута

У атрибута есть общие поля, которые используются у разных типов и задают базовую настройку поля в редакторе. Отдельно от них есть типозависимые поля, которые работают только для конкретных типов.

Общие поля:

- `name` — название поля в интерфейсе
- `attribute` — имя DOM-атрибута, куда сохраняется значение
- `type` — тип поля
- `items` — список вариантов
- `value` — значение по умолчанию, например строка, объект или массив
- `selector` — переопределение селектора сохранения
- `hidden` — регистрация без вывода в интерфейс редактирования
- `attrs` — группа вложенных атрибутов
- `placeholder` — подсказка для ввода
- `compact` — компактный режим отображения поля

Поля для отдельных типов:

- `textOnly` — режим простого текстового ввода без визуального редактора, для `text`
- `disableLink` — отключение редактирования ссылки, для `icon` и `image`
- `disableBlocks` — отключение выбора блоков в селекторе ссылки, для `url`
- `disableCustomURL` — отключение ручного ввода произвольного URL, для `url`
- `time` — включение выбора времени, для `date`
- `format` — формат сохранения даты и времени, для `date`
- `dimensions` — ограничения размеров изображения, для `image`
- `property` — целевое CSS-свойство, для `palette`, `color`, `position`, `sortable-list`, `catalog-view`, `filter`
- `html` — HTML-разметка фильтра, для `filter`
- `filterId` — идентификатор фильтра, для `filter`
- `hideSort` — скрытие сортировки источников, для `dynamic_source`
- `sources` — список доступных источников, для `dynamic_source`
- `title` — заголовок поля, для `dynamic_source`
- `stubText` — текст-заглушка, для `dynamic_source`
- `useLink` — включение режима ссылки, для `dynamic_source`
- `linkType` — тип ссылки, для `dynamic_source`

Обязательность полей зависит от `type` и сценария. В общем случае требуется `attribute`, для списочных типов требуется `items`. Поле `name` рекомендуется указывать для корректного отображения в интерфейсе.

Если `type` не указан, используется `text` по умолчанию.

## Типы атрибутов

Тип атрибута определяет, какой элемент управления будет в редакторе и в каком формате сохранится значение в атрибуте элемента.

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

## Пример с разными типами атрибутов

```php
$attrs = [
    // text: текстовое поле
    '.landing-block-node-text' => [
        [
            'name' => 'Подпись',
            'type' => 'text',
            'attribute' => 'data-caption',
            'placeholder' => 'Введите подпись',
            'textOnly' => true,
        ],
        // dropdown: списочный тип
        [
            'name' => 'Режим отображения',
            'type' => 'dropdown',
            'attribute' => 'data-view',
            'items' => [
                ['name' => 'Короткий', 'value' => 'short'],
                ['name' => 'Полный', 'value' => 'full'],
            ],
            'value' => 'short',
        ],
    ],

    // image: поле изображения с ограничениями
    '.landing-block-node-image' => [
        [
            'name' => 'Изображение',
            'type' => 'image',
            'attribute' => 'data-card-image',
            'dimensions' => [
                'maxWidth' => 1200,
                'maxHeight' => 1200,
            ],
        ],
    ],

    // icon: выбор иконки
    '.landing-block-node-icon' => [
        [
            'name' => 'Иконка',
            'type' => 'icon',
            'attribute' => 'data-card-icon',
            'value' => [
                'classList' => ['fa', 'fa-address-card'],
            ],
        ],
    ],

    // link: поле ссылки с текстом, href и target
    '.landing-block-node-link' => [
        [
            'name' => 'Ссылка',
            'type' => 'link',
            'attribute' => 'data-card-link',
            'value' => [
                'text' => 'Подробнее',
                'href' => '/about',
                'target' => '_self',
            ],
        ],
    ],

    // multiselect: множественный выбор, включая вложенные пункты
    '.landing-block-node-options' => [
        [
            'name' => 'Опции',
            'type' => 'multiselect',
            'attribute' => 'data-options',
            'items' => [
                ['name' => 'Опция 1', 'value' => '1', 'selected' => true],
                ['name' => 'Опция 2', 'value' => '2'],
                [
                    'name' => 'Группа',
                    'value' => 'group',
                    'items' => [
                        ['name' => 'Подопция 1', 'value' => 'group-1', 'selected' => true],
                        ['name' => 'Подопция 2', 'value' => 'group-2'],
                    ],
                ],
            ],
        ],
    ],

    // slider: выбор одного значения из шкалы
    '.landing-block-node-slider' => [
        [
            'name' => 'Количество карточек',
            'type' => 'slider',
            'attribute' => 'data-cards-count',
            'items' => [
                ['name' => '1', 'value' => 1],
                ['name' => '2', 'value' => 2],
                ['name' => '3', 'value' => 3],
                ['name' => '4', 'value' => 4],
            ],
            'value' => 2,
        ],
    ],

    // range-slider: выбор диапазона
    '.landing-block-node-range' => [
        [
            'name' => 'Диапазон значений',
            'type' => 'range-slider',
            'attribute' => 'data-range',
            'items' => [
                ['name' => '1', 'value' => 1],
                ['name' => '2', 'value' => 2],
                ['name' => '3', 'value' => 3],
                ['name' => '4', 'value' => 4],
                ['name' => '5', 'value' => 5],
            ],
            'value' => [
                'from' => 2,
                'to' => 4,
            ],
        ],
    ],

    // sortable-list: сортируемый список
    '.landing-block-node-sortable' => [
        [
            'name' => 'Порядок блоков',
            'type' => 'sortable-list',
            'attribute' => 'data-sort-order',
            'items' => [
                ['name' => 'Заголовок', 'value' => 'head'],
                ['name' => 'Свойства', 'value' => 'props'],
                ['name' => 'Действия', 'value' => 'action'],
            ],
            'value' => ['head', 'props', 'action'],
        ],
    ],

    // url: ссылка с ограничениями выбора
    '.landing-block-node-button' => [
        [
            'name' => 'Ссылка кнопки',
            'type' => 'url',
            'attribute' => 'data-button-url',
            'value' => '#landing166',
            'disableBlocks' => true,
            'disableCustomURL' => false,
        ],
    ],

    // date: дата и время с форматом хранения
    '.landing-block-node-date' => [
        [
            'name' => 'Дата публикации',
            'type' => 'date',
            'attribute' => 'data-publish-date',
            'time' => true,
            'format' => 'ms',
            'value' => 1621584180000,
        ],
    ],

    // palette: палитра с чтением цвета из CSS
    '.landing-block-node-palette' => [
        [
            'name' => 'Цвет подложки',
            'type' => 'palette',
            'attribute' => 'data-bg-color',
            'property' => 'background-color',
            // Если нужно читать цвет не из стандартных стилей
            'stylePath' => '/bitrix/templates/my-site/styles.css',
            // Если цвет задается через псевдоэлемент
            'pseudo-element' => '::after',
            // Если цвет зависит от состояния элемента
            'pseudo-class' => ':hover',
            'items' => [
                ['name' => 'g-bg-lightblue', 'value' => 'g-bg-lightblue'],
                ['name' => 'g-bg-darkblue', 'value' => 'g-bg-darkblue'],
            ],
        ],
    ],

    // position: выбор позиции
    '.landing-block-node-badge' => [
        [
            'name' => 'Позиция бейджа',
            'type' => 'position',
            'attribute' => 'data-badge-position',
            'items' => [
                'top-left' => ['content' => '', 'value' => 'top-left'],
                'top-center' => ['content' => '', 'value' => 'top-center'],
                'top-right' => ['content' => '', 'value' => 'top-right'],
            ],
            'value' => 'top-right',
        ],
    ],
];
```
