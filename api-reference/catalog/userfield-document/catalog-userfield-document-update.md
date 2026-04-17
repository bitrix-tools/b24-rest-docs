# Изменить значения пользовательских полей документов складского учета catalog.userfield.document.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`catalog`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Создание и редактирование» на нужный тип документа

Метод `catalog.userfield.document.update` обновляет значения пользовательских полей документа складского учета.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentId***
[`catalog_document.id`](../data-types.md#catalog_document) | Идентификатор документа складского учета. Идентификатор можно получить методом [catalog.document.list](../document/catalog-document-list.md) ||
|| **fields***
[`object`](#fields) | Поля для обновления ([подробное описание](#fields)) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **documentType***
[`string`](../../data-types.md) | Тип документа складского учета.

Допустимые значения: [типы документов складского учета](../enum/catalog-enum-get-store-document-types.md) ||
|| **fieldN**
[`mixed`](../../data-types.md) | Значение пользовательского поля, где `N` — идентификатор пользовательского поля, например `field287`.

Идентификаторы и настройки пользовательских полей можно получить методом [userfieldconfig.list](../../crm/universal/userfieldconfig/userfieldconfig-list.md) ||
|#


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":81,"fields":{"documentType":"A","field7097":"Тестовое поле"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/catalog.userfield.document.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"documentId":81,"fields":{"documentType":"A","field7097":"Тестовое поле"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/catalog.userfield.document.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'catalog.userfield.document.update',
            {
                documentId: 81,
                fields: {
                    documentType: 'A',
                    field7097: 'Тестовое поле',
                }
            }
        );

        const result = response.getData().result;
        console.log(result.document);
    }
    catch (error)
    {
        console.error('Error updating document user fields:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'catalog.userfield.document.update',
                [
                    'documentId' => 81,
                    'fields' => [
                        'documentType' => 'A',
                        'field7097' => 'Тестовое поле',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result['document']);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating document user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'catalog.userfield.document.update',
        {
            documentId: 81,
            fields: {
                documentType: 'A',
                field7097: 'Тестовое поле'
            }
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'catalog.userfield.document.update',
        [
            'documentId' => 81,
            'fields' => [
                'documentType' => 'A',
                'field7097' => 'Тестовое поле',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result['result']['document']);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "document": {
            "documentId": 81,
            "documentType": "A",
            "field7097": "Тестовое поле"
        }
    },
    "time": {
        "start": 1774341924,
        "finish": 1774341924.459929,
        "duration": 0.4599289894104004,
        "processing": 0,
        "date_start": "2026-03-24T11:45:24+03:00",
        "date_finish": "2026-03-24T11:45:24+03:00",
        "operating_reset_at": 1774342524,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **document**
[`catalog_userfield_document`](../data-types.md#catalog_userfield_document) | Объект с обновленными значениями пользовательских полей документа ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

HTTP-код: **400**

```json
{
    "error": "0",
    "error_description": "The specified document does not exist"
}
```

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `0` | The specified document does not exist | Документ с указанным `documentId` не найден ||
|| `0` | Access Denied | Недостаточно прав для изменения документа выбранного типа ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./catalog-userfield-document-list.md)
- [{#T}](../enum/catalog-enum-get-store-document-types.md)
- [{#T}](../../crm/universal/userfieldconfig/userfieldconfig-list.md)
