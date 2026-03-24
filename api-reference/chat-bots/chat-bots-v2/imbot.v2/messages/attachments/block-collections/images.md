# Блок с изображениями IMAGE

Блок `IMAGE` выводит одно или несколько изображений внутри вложения.

![Блок с изображениями](./_images/images.png){width=420}

## Параметры блока

#|
|| **Название**
`тип` | **Описание** ||
|| **LINK***
[`string`](../../../../../../data-types.md) | URL исходного изображения ||
|| **NAME**
[`string`](../../../../../../data-types.md) | Название изображения ||
|| **PREVIEW**
[`string`](../../../../../../data-types.md) | URL уменьшенной версии изображения. Если не задан, для предпросмотра используется `LINK`. Для стабильного отображения в разных клиентах рекомендуется указывать явно ||
|| **WIDTH**
[`integer`](../../../../../../data-types.md) | Ширина изображения в пикселях. Рекомендуется передавать вместе с `HEIGHT` ||
|| **HEIGHT**
[`integer`](../../../../../../data-types.md) | Высота изображения в пикселях. Рекомендуется передавать вместе с `WIDTH` ||
|#

## Пример

{% include [Сноска о примерах](../../../../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    {
        IMAGE: [
            {
                NAME: 'Это Mantis',
                LINK: 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                PREVIEW: 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                WIDTH: 1000,
                HEIGHT: 638
            }
        ]
    }
    ```

- PHP

    ```php
    [
        'IMAGE' => [
            [
                'NAME' => 'Это Mantis',
                'LINK' => 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                'PREVIEW' => 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                'WIDTH' => 1000,
                'HEIGHT' => 638
            ]
        ]
    ]
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./links.md)
- [{#T}](./files.md)



