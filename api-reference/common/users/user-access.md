# Определение набора прав пользователя

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- более развернутый пример с получением результата на js
- примеры на других языках
- вообще непонятно, какие именно права проверяются-то, пример не дает ответа на этот вопрос. Нужен перечень возможных типов прав со пояснением, что есть что
- пример успешного ответа нужен более информативный - какой он будет, если одно из прав у пользователя есть, а другого нет?
- нужны коды возможных ошибок

{% endnote %}

{% endif %}

{% note info "user.access" %}

**Scope**: [`базовый`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

Метод `user.access` сообщает, обладает ли текущий пользователь хотя бы одним из указанных прав.

#|
|| **Параметр** | **Описание** ||
|| **ACCESS**
[`integer`](../../data-types.md) или [`array`](../../data-types.md) | Идентификатор или список идентификаторов прав, доступ к которым нужно проверить. ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}


## Примеры

{% list tabs %}

- cURL

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "ACCESS": "[U22, U33"], "auth": "d161f25928c3184678924ec127edd29a" }' \
    user.access.json
    ```

- JS

    ```js
    BX24.callMethod('user.access', {ACCESS:['U22','U33']});
    // нужен более внятный пример с обработкой получения результата

    ```

- PHP

    ```php
    // нужен пример
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "result": false,
    "time": {
        "start": 1705764932.998683,
        "finish": 1705764937.173995,
        "duration": 4.1753120422363281,
        "processing": 3.3076529502868652,
        "date_start": "2024-01-20T18:35:32+03:00",
        "date_finish": "2024-01-20T18:35:37+03:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Значение** / **Тип** | **Описание** ||
|| **result**
[`boolean`](../../data-types.md)| true или false в зависимости от наличия запрошенных прав ||
|| **time**
[`array`](../../data-types.md) | Информация о времени выполнения запроса ||
|| **start**
[`double`](../../data-types.md) | Timestamp момента инициализации запроса ||
|| **finish**
[`double`](../../data-types.md) | Timestamp момента завершения выполнения запроса ||
|| **duration**
[`double`](../../data-types.md) | Как долго в миллисекундах выполнялся запрос (finish - start) ||
|| **date_start**
[`string`](../../data-types.md) | Строковое представление даты и времени момента инициализации запроса ||
|| **date_finish**
[`double`](../../data-types.md) | Строковое представление даты и времени момента завершения запроса ||
|| **operating_reset_at**
[`timestamp`](../../data-types.md) | Timestamp момента, когда будет сброшен лимит на ресурсы REST API. Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|| **operating**
[`double`](../../data-types.md) | Через сколько миллисекунд будет сброшен лимит на ресурсы REST API? Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|#

## Ответ в случае ошибки

> 200, 50x Error

```json
{
    "error": "TITLE_EMPTY",
    "error_description": "The deal title is required"
}
```

### Возможные коды ошибок

#|
|| **Code** | **Description** ||
|| **TITLE_EMPTY** | The required field values are not set || 
|| **WRONG_REQUEST** | The parameters of the request were unable to interpret || 
|#