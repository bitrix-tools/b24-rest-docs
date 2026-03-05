# Прочитать или вернуть непрочитанным уведомление im.notify.read

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.read` отмечает уведомление или все уведомления с указанного как прочитанные или непрочитанные.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор уведомления. При `ID >= 0` выполняется изменение статуса, при отсутствии `ID` метод вернет `true` без изменений ||
|| **ACTION**
[`string`](../../data-types.md) | Действие над уведомлениями:
- `Y` — отметить как прочитанные
- `N` — отметить как непрочитанные

Значение по умолчанию — `Y` ||
|| **ONLY_CURRENT**
[`string`](../../data-types.md) | Значение `Y` изменяет уведомление только с указанным `ID`. Любое другое значение изменяет уведомления, идентификаторы которых равны или больше этого `ID` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":101,"ACTION":"Y","ONLY_CURRENT":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.read
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":101,"ACTION":"Y","ONLY_CURRENT":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.read
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.notify.read', {
        ID: 101,
        ACTION: 'Y',
        ONLY_CURRENT: 'Y',
      });

      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.notify.read',
            [
                'ID' => 101,
                'ACTION' => 'Y',
                'ONLY_CURRENT' => 'Y',
            ]
        );

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
    BX24.callMethod(
        'im.notify.read',
        {
            ID: 101,
            ACTION: 'Y',
            ONLY_CURRENT: 'Y',
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
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
        'im.notify.read',
        [
            'ID' => 101,
            'ACTION' => 'Y',
            'ONLY_CURRENT' => 'Y',
        ]
    );

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
    "result": true,
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.1,
        "duration": 0.1,
        "processing": 0.04,
        "date_start": "2026-03-02T09:30:00+03:00",
        "date_finish": "2026-03-02T09:30:00+03:00",
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
[`boolean`](../../data-types.md) | Возвращает `true` после выполнения метода ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-delete.md)
- [{#T}](./im-notify-history-search.md)
