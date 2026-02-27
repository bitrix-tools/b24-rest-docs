# Получить ревизии API im.revision.get

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.revision.get` возвращает ревизии API [модуля IM](../../settings/cloud-and-on-premise/on-premise/versions.md) для текущего Битрикс24.

Значения ревизий используйте для проверки совместимости клиента с сервером Битрикс24, в первую очередь на коробочных порталах, где версия модуля может отличаться от актуальной.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.revision.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.revision.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod('im.revision.get', {});

        const result = response.getData().result;
        console.log('IM revisions:', result);
    }
    catch (error)
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call('im.revision.get', []);

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.revision.get',
        {},
        function(result)
        {
            if (result.error())
            {
                console.error(result.error().ex);
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call('im.revision.get', []);

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Success: ' . print_r($result['result'], true);
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "rest": 32,
        "web": 130,
        "mobile": 22,
        "desktop": 6,
        "im_revision_mobile": 22
    },
    "time": {
        "start": 1771599789,
        "finish": 1771599789.521072,
        "duration": 0.5210719108581543,
        "processing": 0,
        "date_start": "2026-02-20T18:03:09+03:00",
        "date_finish": "2026-02-20T18:03:09+03:00",
        "operating_reset_at": 1771600389,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой объект с ревизиями API ||
|| **result.rest**
[`integer`](../data-types.md) | Ревизия REST API IM ||
|| **result.web**
[`integer`](../data-types.md) | Ревизия web API IM ||
|| **result.mobile**
[`integer`](../data-types.md) | Ревизия mobile API IM ||
|| **result.desktop**
[`integer`](../data-types.md) | Ревизия desktop API IM ||
|| **result.im_revision_mobile**
[`integer`](../data-types.md) | Дополнительное поле совместимости, дублирует `result.mobile` ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

Специальных бизнес-ошибок у метода нет.

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [im.counters.get](./im-counters-get.md)
- [im.recent.get](./im-recent-get.md)
- [im.dialog.get](./im-dialog-get.md)
