# Атрибуты

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания

{% endnote %}

{% endif %}

С помощью ключа **attrs** в [манифесте](./manifest.md) блока указывается список атрибутов для хранения данных, привязанных к определенным нодам. Применяется это повсеместно – от дефолтных значений полей, счетчиков до настройки карты, видео, и много чего еще. Как правило, в пару к набору атрибутов идет определенный скрипт, который умеет со всем этим работать. Либо атрибуты могут участвовать в стилизации блоков, путем указания в CSS, что карточка с определенным атрибутом имеет другой цвет (например).

Каждый атрибут описывается:

- названием,
- кодом,
- типом,
- ключом **items** (в случае списочного типа).

## Места размещения

Ключ **attrs** в манифесте может размещаться в следующих местах:

1. Непосредственно в корне, как указано в примере манифеста.
```js
'attrs':
{
    '.landing-block-node-text':
    {
        'name': 'Настройка текст',
        'type': 'dropdown',
        'attribute': 'data-copy'
    }
},
```
2. В ключе style, в этом случае атрибут выводится в форме настроек дизайна.
```js
'style':
{
    '.landing-block-node-card-button':
    {
        'name': 'Button',
        'type': ['border-color', 'button', 'animation'],
        'additional': {
            'attrs': [
                [
                    'type': 'text',
                    'name': 'Text field',
                    'attribute': 'data-test-card-attr'
                ]
            ]
        }
    },
}
```
3. В описании карточки. В таком случае атрибут применяется непосредственно к каждой карточке отдельно
```js
'cards':
{
    '.landing-block-node-card-button':
    {
        'name': 'Card',
        'additional': {
            'attrs': [
                [
                    'type': 'text',
                    'name': 'Text field',
                    'attribute': 'data-test-card-attr'
                ]
            ]
        }
    },
}
```

## Группировка атрибутов

Если требуется часть атрибутов группировать, то делается это следующим образом:

```js
// корневое размещение
'attrs' => array(
    '' => array(
        array(
            'name' => 'Test group',
            'attrs' => array(
                array(
                    "type" => "checkbox",
                    // Переопределение селектора (если нужно)
                    "selector" => "bitrix:catalog.section",
                    "name" => "",
                    "items" => array(
                        array("name" => "Отображение товаров", "value" => "1"),
                        array("name" => "Отображение товаров 2", "value" => "2"),
                        array("name" => "Отображение товаров 3", "value" => "3"),
                    ),
                    "attribute" => "data-checkbox"
                ),
                array(
                    "type" => "checkbox",
                    "name" => "",
                    "items" => array(
                        array("name" => "Отображение товаров 22", "value" => "1")
                    ),
                    "compact" => true,
                    "attribute" => "data-checkbox2"
                )
            )
        ),
        array(
            "type" => "checkbox",
            "name" => "",
            "items" => array(
                array("name" => "Отображение товаров 33", "value" => "1")
            ),
            "attribute" => "data-checkbox3"
        )
    )
)
// блок style (обратите внимание, в случае style поддерживается только либо без групп, либо группировка в рамках одного селектора)
'additional' => array(
    array(
        'name' => 'Test group',
        'attrs' => array(
            array(
                "type" => "text",
                "name" => "Test",
                "attribute" => "data-text"
            ),
            array(
                "type" => "text",
                "name" => "Test 2",
                "attribute" => "data-text2"
            )
        )
    )
)
```

## Отличающиеся селекторы

Если вы хотите, чтобы значения атрибутов сохранялись в иной селектор, то просто укажите у конкретного атрибута другой селектор. (Это может быть полезно, чтобы не добавлять лишние ноды для визуального изменения):

```js
array(
    'name' => 'Текстовое поле',
    'type' => 'text',
    'attribute' => 'data-text-field',
    'selector' => '.demo-another-selector'
)
```

## Типы атрибутов

Атрибуты - это условное хранение hidden-значений. Например, стартовые координаты карты. Естественно, атрибуты имеет смысл вводить только вкупе с неким JS-кодом, который эти атрибуты умеет использовать. Атрибуты необходимо [зарегистрировать в манифесте](./manifest.md) в ключе **attrs**.

На данный момент поддерживаются следующие типы атрибутов:

- **text** - обычная текстовая строка.
- **html** - многострочное текстовое поле
- **images** - картинка со стандартными контролами - выбор с компьютера или поиск в библиотеках.
- **icon** - иконка.
- **dropdown** - выпадающий список.
- **checkbox** - группа чекбококсов. Если вы хотите вывести одиночный чекбокс, просто укажите одно значение в items.
- **multiselect** - множественный список.
- **link** - ссылка со стандартными контролами.
- **url** - упрощенный вариант ссылки: выбор страницы/блока или произвольного URL.
- **slider** / **range-slider** - варианты слайдеров массива значений.
- **palette** - палитра.
- **sortable-list** - сортируемый список значений. Сортировка происходит посредством перетаскивания элементов мышкой.
- **position** - набор стрелок для указания положения элемента в блоке.
- **date** - выбор даты и времени.

Конкретные примеры с данными типами смотрите ниже. Там же вы сможете найти дополнительные опции вариативности.

**Дополнительно**

Помимо специфических свойств того или иного типа (смотрите пример ниже) каждый тип может обладать дополнительными свойствами:

- **hidden** - атрибут регистрируется, но не выводится на редактирование в карточке блока, удобно для регистрации блоков, когда санитайзер не пропускает не зарегистрированные атрибуты.

### Пример

```php
<?php
$attrs = array(
    ".landing-node" => array(
        array(
            "type" => "text",
            "name" => "Test attr field",
            "placeholder" => "Type your text",
            "value" => "default_value",
            "attribute" => "data-test-text",
            "textOnly" => false //если в true, то при редактировании не будет подключаться редактор
        ),
    ),
    array(
        "type" => "image",
        "name" => "Test attr image field",
        "value" => array(
            "src" => "http://bitrix24.io/bitrix/images/landing/app-store-badge.svg",
            "alt" => "test alt"
        ),
        "attribute" => "data-test-image"
    ),
    array(
        "type" => "icon",
        "name" => "Test attr icon field",
        "value" => array(
            "classList" => array("fa", "fa-address-card")
        ),
        "attribute" => "data-test-icon"
    ),
    array(
        "type" => "dropdown",
        "name" => "Test attr dropdown field",
        "items" => array(
            array("name" => "#1", "value" => 1),
            array("name" => "#2", "value" => 2),
            array("name" => "#3", "value" => 3),
            array("name" => "#4", "value" => 4)
        ),
        "value" => 3,
        "attribute" => "data-test-dropdown"
    ),
    array(
        'name' => 'Checkbox field',
        'type' => 'checkbox',
        'attribute' => 'data-test-checkbox',
        'items' => array(
            array('name' => 'Разрешить указание количества товара', 'value' => '1', 'checked' => true),
            array('name' => 'Разрешить оповещения для отсутствующих товаров', 'value' => '2', 'checked' => true),
            array('name' => 'Показывать процент скидки', 'value' => '3', 'checked' => true),
            array('name' => 'Показыать старую цену', 'value' => '4', 'checked' => true),
            array('name' => 'Разрешить сравнение товаров', 'value' => '5', 'checked' => true)
        )
    ),
    array(
        'name' => 'Multi select field',
        'type' => 'multiselect',
        'attribute' => 'data-test-multiselect',
        'items' => array(
            array('name' => 'Разрешить указание количества товара', 'value' => '1', 'selected' => true),
            array('name' => 'Разрешить оповещения для отсутствующих товаров', 'value' => '2', 'selected' => true),
            array('name' => 'Показывать процент скидки', 'value' => '3'),
            array('name' => 'Показыать старую цену', 'value' => '4', 'items' => array(
                array('name' => 'Разрешить сравнение товаров', 'value' => '41', 'selected' => true),
                array('name' => 'Разрешить указание количества товара', 'value' => '42', 'selected' => true),
                array('name' => 'Разрешить оповещения для отсутствующих товаров', 'value' => '43', 'selected' => true),
                array('name' => 'Показывать процент скидки', 'value' => '44', 'selected' => true)
            )),
            array('name' => 'Разрешить сравнение товаров', 'value' => '5'),
            array('name' => 'Разрешить указание количества товара', 'value' => '6'),
            array('name' => 'Разрешить оповещения для отсутствующих товаров', 'value' => '7', 'selected' => true)
        )
    ),
    array(
        "type" => "link",
        "name" => "Test attr link field",
        "value" => array(
            "text" => "Link anchor",
            "href" => "/test",
            "target" => "_popup"
        ),
        "attribute" => "data-test-link"
    ),
    array(
        "type" => "slider",
        "name" => "Test attr slider field",
        "items" => array(
            array("name" => "1", "value" => 1),
            array("name" => "2", "value" => 2),
            array("name" => "3", "value" => 3),
            array("name" => "4", "value" => 4),
            array("name" => "5", "value" => 5)
        ),
        "value" => 2,
        "attribute" => "data-test-slider"
    ),
    array(
        "type" => "range-slider",
        "name" => "Test attr range slider field",
        "items" => array(
            array("name" => "1", "value" => 1),
            array("name" => "2", "value" => 2),
            array("name" => "3", "value" => 3),
            array("name" => "4", "value" => 4),
            array("name" => "5", "value" => 5)
        ),
        "value" => array(
            "from" => 3,
            "to" => 5
        ),
        "attribute" => "data-test-range-slider"
    ),
    array(
        "type" => "palette",
        "name" => "Test attr palette field",
        "items" => array(
            array('name' => 'g-bg-lightblue', 'value' => 'g-bg-lightblue'),
            array('name' => 'g-bg-lightblue-opacity-0_1', 'value' => 'g-bg-lightblue-opacity-0_1'),
            array('name' => 'g-bg-lightblue-v1', 'value' => 'g-bg-lightblue-v1'),
            array('name' => 'g-bg-lightblue-v1-opacity-0_1', 'value' => 'g-bg-lightblue-v1-opacity-0_1'),
            array('name' => 'g-bg-darkblue', 'value' => 'g-bg-darkblue'),
            array('name' => 'g-bg-darkblue-opacity-0_1', 'value' => 'g-bg-darkblue-opacity-0_1'),
            array('name' => 'g-bg-indigo', 'value' => 'g-bg-indigo'),
            array('name' => 'g-bg-indigo-opacity-0_1', 'value' => 'g-bg-indigo-opacity-0_1'),
            array('name' => 'g-bg-red', 'value' => 'g-bg-red'),
            array('name' => 'g-bg-red-opacity-0_1', 'value' => 'g-bg-red-opacity-0_1'),
            array('name' => 'g-bg-red-opacity-0_2', 'value' => 'g-bg-red-opacity-0_2'),
            array('name' => 'g-bg-red-opacity-0_5', 'value' => 'g-bg-red-opacity-0_5'),
            array('name' => 'g-bg-red-opacity-0_8', 'value' => 'g-bg-red-opacity-0_8'),
            array('name' => 'g-bg-lightred', 'value' => 'g-bg-lightred'),
            array('name' => 'g-bg-lightred-opacity-0_1', 'value' => 'g-bg-lightred-opacity-0_1'),
            array('name' => 'g-bg-darkred', 'value' => 'g-bg-darkred'),
            array('name' => 'g-bg-darkred-opacity-0_1', 'value' => 'g-bg-darkred-opacity-0_1'),
            array('name' => 'g-bg-purple', 'value' => 'g-bg-purple')
        ),
        "property" => "background-color",
        "attribute" => "data-test-palette",

        // Set if tou need get color by className from css
        // "stylePath" => "/path/to/stylesheet.css",

        // Set if you need get color from styles for pseudo-element (::before, ::after)
        // "pseudo-element" => "::after",

        // Set if you need get color from styles for pseudo-class (:hover, :active, ...)
        // "pseudo-class" => ":hover"
    ),
    array(
        "type" => "sortable-list",
        "name" => "Product blocks",
        "items" => array(
            array("name" => 'head', "value" => "1"),
            array("name" => "props", "value" => "2"),
            array("name" => "tp", "value" => "3"),
            array("name" => "qant", "value" => "4"),
            array("name" => "quant2", "value" => "5"),
            array("name" => "action", "value" => "6"),
            array("name" => "comp", "value" => "7")
        ),
        "value" => array("1", "2", "3", "4", "5", "6", "7"),
        "attribute" => "data-catalog-prop-sort"
    ),
    array(
        "type" => "position",
        "name" => "position",
        "items" => array(
            "top-left" => array("content" => "", "value" => "1"),
            "top-center" => array("content" => "", "value" => "2"),
            "top-right" => array("content" => "", "value" => "3"),
            "middle-left" => array("content" => "", "value" => "4"),
            "middle-center" => array("content" => "", "value" => "5"),
            "middle-right" => array("content" => "", "value" => "6"),
            "bottom-left" => array("content" => "", "value" => "7"),
            "bottom-right" => array("content" => "", "value" => "8")
        ),
        "value" => "top-right",
        "attribute" => "data-catalog-prop-position"
    ),
    array(
        'name' => 'URL field',
        'type' => 'url',
        'value' => '#landing166',
        'attribute' => 'data-test-url',
        'disableBlocks' => true, // Отключает выбор блоков
        'disableCustomURL' => false // Отключает возможность ввести урл руками
    ),
    array(
        'name' => 'Datetime',
        'type' => 'date',
        'time' => true,//давать возможность выбора точного времени
        'format' => 'ms',//'ms' (миллисекунды) / 's' (секунды)
        'value' => 1621584180000
    )
);
```

{% include [Сноска о примерах](../../../_includes/examples.md) %}