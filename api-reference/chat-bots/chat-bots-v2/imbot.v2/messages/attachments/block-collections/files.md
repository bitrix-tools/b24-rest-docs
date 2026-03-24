# Блок с файлами FILE

Блок `FILE` выводит файл как элемент вложения с названием и размером.

![Блок с файлами](./_images/files.png){width=420}

## Параметры блока

#|
|| **Название**
`тип` | **Описание** ||
|| **LINK***
[`string`](../../../../../../data-types.md) | URL файла ||
|| **NAME**
[`string`](../../../../../../data-types.md) | Отображаемое имя файла ||
|| **SIZE**
[`integer`](../../../../../../data-types.md) | Размер файла в байтах. Если поле не задано, файл отображается без корректного размера ||
|#

## Пример

{% include [Сноска о примерах](../../../../../../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    {
        FILE: [
            {
                NAME: 'mantis.jpg',
                LINK: 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                SIZE: 1500000
            }
        ]
    }
    ```

- PHP

    ```php
    [
        'FILE' => [
            [
                'NAME' => 'mantis.jpg',
                'LINK' => 'https://files.shelenkov.com/bitrix/images/mantis.jpg',
                'SIZE' => 1500000
            ]
        ]
    ]
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./images.md)
- [{#T}](../index.md)



