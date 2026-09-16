# Атрибуты

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Атрибут — это дополнительная настройка блока, значение которой сохраняется в DOM-атрибут элемента, например `data-view="short"`. Из атрибута значение читают скрипты блока и CSS, а в редакторе Битрикс24 для него выводится поле нужного вида: список, чекбокс, палитра или выбор изображения.

Атрибуты описывают в ключе `attrs` [манифеста блока](./manifest.md). Ключ связывает настройку с [нодой](./node-types.md) или [карточкой](./extended-description.md) по CSS-селектору.

Атрибуты используют, когда настройку нельзя выразить контентом ноды:

- параметры поведения блока, например режим отображения, количество карточек или адрес формы
- параметры для JS-логики блока: слайдера, галереи, счетчика обратного отсчета
- значения, по которым блок оформляется условно, например цвет подложки или позиция бейджа

Границы темы:

- атрибуты не заменяют ноды. Текст, изображение или ссылку внутри элемента описывают в ключе `nodes`, а оформление — в ключе `style`
- статья описывает, как настройка объявляется в манифесте. Значения атрибутов у блока, который уже стоит на странице, меняет метод [landing.block.updateattrs](./methods/landing-block-update-attrs.md)

## Где описывается ключ attrs

Место описания определяет, где появится поле в редакторе и к чему применится значение:

#|
|| **Где описан `attrs`** | **Где поле в редакторе** | **К чему применяется значение** ||
|| В корне манифеста | В форме настроек блока | К элементам блока по указанному селектору ||
|| В `style.nodes.<селектор>.additional` | В форме дизайна рядом со стилевыми настройками элемента | К элементу, для которого заданы стили ||
|| В `style.block.additional` | В форме дизайна блока целиком | К обертке блока ||
|| В `cards.<селектор>.additional` | В форме настроек карточки | Отдельно к каждой карточке этого селектора ||
|#

В значении селектора передают массив атрибутов. Если атрибут один, его можно описать объектом без массива — так сделано в примере на странице [Формы поиска](./special/search-forms.md).

Примеры для трех самых частых мест:

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

Если нужно сгруппировать часть атрибутов, используется групповой контейнер `attrs`. В примере ниже ключом выступает пустая строка: группа настроек относится к блоку в целом. Элемент, в который сохранится значение, задают полем `selector` у конкретного атрибута.

```php
'attrs' => [
    '' => [
        [
            'name' => 'Test group',
            'attrs' => [
                [
                    'type' => 'checkbox',
                    'selector' => '.landing-block-node-catalog',
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

## Поля атрибута {#attribute-fields}

У атрибута есть общие поля, которые используются у разных типов и задают базовую настройку поля в редакторе. Отдельно от них есть типозависимые поля, которые работают только для конкретных типов.

Общие поля:

- `name` — название поля в интерфейсе
- `attribute` — имя DOM-атрибута, куда сохраняется значение
- `type` — тип поля
- `items` — список вариантов. Вариант описывают парой `name` и `value`
- `value` — значение по умолчанию, например строка, объект или массив
- `selector` — переопределение селектора сохранения
- `hidden` — регистрация без вывода в интерфейс редактирования
- `attrs` — группа вложенных атрибутов

Поля для отдельных типов:

#|
|| **Поле** | **Для каких типов** | **Что задает** ||
|| `textOnly` | `text` | Режим простого текстового ввода. Поле всегда работает в этом режиме: значение `false` визуальный редактор не включает ||
|| `disableLink` | `icon`, `image` | Отключение редактирования ссылки ||
|| `disableBlocks` | `url` | Отключение выбора блоков в селекторе ссылки ||
|| `disableCustomURL` | `url` | Отключение ручного ввода произвольного URL ||
|| `disallowType` | `url` | Отключение смены типа ссылки в селекторе ||
|| `allowedTypes` | `url` | Список разрешенных типов ссылки, например `landing` для страниц сайта ||
|| `time` | `date` | Включение выбора времени ||
|| `format` | `date` | Формат сохранения даты и времени ||
|| `dimensions` | `image` | Ограничения размеров изображения ||
|| `html` | `filter` | HTML-разметку фильтра ||
|| `filterId` | `filter` | Идентификатор фильтра ||
|| `selected` внутри варианта | `multiselect` | Признак пункта, выбранного по умолчанию. Задается у элемента списка `items`, а не у самого поля. У остальных списочных типов значение по умолчанию задают полем `value` ||
|| `items` внутри варианта | `multiselect` | Группу вложенных пунктов ||
|| `placeholder` | `text`, `html`, `date` | Подсказку для ввода ||
|| `compact` | `checkbox`, `radio` | Компактный режим отображения поля ||
|| `property` | `palette`, `position`, `sortable-list`, `checkbox`, `radio`, `multiselect`, `catalog-view`, `filter` | Целевое CSS-свойство ||
|| `hideSort` | `dynamic_source` | Скрытие сортировки источников ||
|| `sources` | `dynamic_source` | Список доступных источников ||
|| `title` | `dynamic_source` | Заголовок поля ||
|| `stubText` | `dynamic_source` | Текст-заглушку ||
|| `useLink` | `dynamic_source` | Включение режима ссылки ||
|| `linkType` | `dynamic_source` | Тип ссылки ||
|#

Обязательность полей зависит от `type` и сценария. В общем случае требуется `attribute`, для списочных типов требуется `items`. Поле `name` рекомендуется указывать для корректного отображения в интерфейсе. Значение `name` участвует в переводе манифеста, подробнее: [Какие подписи участвуют в переводе](./localization.md#translatable-keys).

Поле `type` указывайте всегда. В корне `attrs` описание без `type` полем не становится: система считает его группой и ждет `name` с вложенным `attrs`. Внутри групп и в `additional` описание без `type` выводится как выпадающий список.

## Типы атрибутов {#attribute-types}

Тип атрибута определяет, какой элемент управления будет в редакторе и в каком формате сохранится значение в атрибуте элемента.

#|
|| **Тип** | **Элемент управления в редакторе** | **Нужен список `items`** ||
|| `text` | Однострочное текстовое поле | Нет ||
|| `html` | Многострочное текстовое поле | Нет ||
|| `date` | Выбор даты и времени | Нет ||
|| `dropdown` | Выпадающий список. То же самое делает значение `list` | Да ||
|| `radio` | Выбор одного варианта из списка | Да ||
|| `checkbox` | Чекбокс или группа чекбоксов | Да ||
|| `multiselect` | Множественный выбор | Да ||
|| `image` | Выбор изображения | Нет ||
|| `icon` | Выбор иконки | Нет ||
|| `link` | Ссылка с текстом, адресом и режимом открытия | Нет ||
|| `url` | Упрощенное поле ссылки: только адрес, без текста и режима открытия | Нет ||
|| `slider` | Шкала выбора одного значения | Да ||
|| `range-slider` | Шкала выбора диапазона | Да ||
|| `palette` | Выбор из палитры: набор заранее заданных вариантов в `items` | Да ||
|| `color` | Выбор произвольного цвета, без заданного набора вариантов | Нет ||
|| `sortable-list` | Сортируемый список значений | Да ||
|| `position` | Выбор позиции или направления элемента | Да ||
|| `catalog-view` | Настройки отображения каталожных данных | Нет ||
|| `filter` | Настройки фильтра | Нет ||
|| `user-select` | Выбор пользователя | Нет ||
|| `dynamic_source` | Выбор динамического источника данных. Работает в блоке с динамическими карточками, подробнее: [Результаты поиска](./special/search.md) | Нет ||
|#

Формат значения зависит от типа:

- строка — у текстовых типов и у списочных, где значения в `items` заданы строками, а также у `url`, `palette`, `color` и `position`
- число — у `date` при `format` со значением `ms` и у `slider`, если значения в `items` числовые
- объект — у `link`, `icon` и `range-slider`
- массив — у `sortable-list` и `multiselect`

Примеры для основных типов приведены ниже.

## Пример с разными типами атрибутов

{% cut "Текст, списки, изображения и ссылки" %}

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

];
```

{% endcut %}

{% cut "Множественный выбор, шкалы и сортировка" %}

```php
$attrs = [
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

];
```

{% endcut %}

{% cut "Ссылка, дата, палитра и позиция" %}

```php
$attrs = [
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

    // palette: палитра значений
    '.landing-block-node-palette' => [
        [
            'name' => 'Цвет подложки',
            'type' => 'palette',
            'attribute' => 'data-bg-color',
            'property' => 'background-color',
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

{% endcut %}

## Как изменить значение атрибута через REST

1. Получите манифест блока методом [landing.block.getmanifest](./methods/landing-block-get-manifest.md) и найдите нужный селектор в ключе `attrs`.
2. Передайте новое значение методом [landing.block.updateattrs](./methods/landing-block-update-attrs.md). Ключ в параметре `data` — селектор элемента, значение — набор атрибутов и их значений:

   ```json
   {
       "data": {
           ".landing-block-node-text": {
               "data-view": "full"
           }
       }
   }
   ```

3. Опубликуйте страницу методом [landing.landing.publication](../page/methods/landing-landing-publication.md), чтобы изменение появилось на сайте.

## Права и ограничения

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

Ограничения:

- разрешенные селекторы и атрибуты метод [landing.block.updateattrs](./methods/landing-block-update-attrs.md) берет из разделов `attrs`, `style.nodes`, `style.block` и `cards` манифеста. Селектор или атрибут, которого там нет, метод игнорирует без ошибки
- поле `attribute` обязательно: без него настройку некуда сохранить
- значение атрибута с типом `url` проходит проверку схемы при сохранении. Адрес с недопустимой схемой вырезается молча, без ошибки
- состав атрибутов меняется только в собственном блоке: манифест передают при регистрации методом [landing.repo.register](../user-blocks/landing-repo-register.md). У штатных блоков Битрикс24 через REST меняются значения атрибутов, а не их состав

## Продолжите изучение

- [{#T}](./manifest.md)
- [{#T}](./node-types.md)
- [{#T}](./extended-description.md)
- [{#T}](./localization.md)
- [{#T}](./methods/landing-block-update-attrs.md)
- [{#T}](./methods/landing-block-get-manifest.md)
