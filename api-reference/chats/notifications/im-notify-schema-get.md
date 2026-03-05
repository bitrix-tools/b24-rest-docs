# Получить схему типов уведомлений im.notify.schema.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.schema.get` возвращает схему доступных типов уведомлений по модулям.

## Параметры метода

Без параметров

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.schema.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.schema.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.notify.schema.get', {});
      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call('im.notify.schema.get', []);
        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('im.notify.schema.get', {}, function(result) {
        if (result.error()) {
            console.error(result.error().ex);
        } else {
            console.log(result.data());
        }
    });
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('im.notify.schema.get', []);

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": {
        "tasks": {
            "name": "Задачи",
            "module_id": "tasks",
            "list": [
                {
                    "id": "tasks|task_update",
                    "name": "Изменения задач"
                }
            ]
        }
    },
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.1,
        "duration": 0.1,
        "processing": 0.04,
        "date_start": "2026-03-03T10:00:00+03:00",
        "date_finish": "2026-03-03T10:00:00+03:00",
        "operating_reset_at": 1760030000,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Объект схемы уведомлений, ключ верхнего уровня — `MODULE_ID`. 

Структура объекта модуля подробно описана [ниже](#module-object) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект \{MODULE_ID\} {#module-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **NAME**
[`string`](../../data-types.md) | Название модуля ||
|| **MODULE_ID**
[`string`](../../data-types.md) | Идентификатор модуля ||
|| **LIST**
[`array`](../../data-types.md) | Список типов уведомлений модуля. 

Структура элемента подробно описана [ниже](#list-item-object) ||
|#

### Элемент LIST {#list-item-object}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор типа уведомления в формате ```MODULE|EVENT``` ||
|| **NAME**
[`string`](../../data-types.md) | Название типа уведомления ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
