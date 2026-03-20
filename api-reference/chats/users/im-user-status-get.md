# Получить статус пользователя im.user.status.get

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.status.get` возвращает статус текущего пользователя.

{% note info "" %}

Метод возвращает статус, который был установлен методом [im.user.status.set](./im-user-status-set.md).

{% endnote %}

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.user.status.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.user.status.get
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.user.status.get', {});
      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call('im.user.status.get', []);

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
    BX24.callMethod('im.user.status.get', {}, function(result) {
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

    $result = CRest::call('im.user.status.get', []);

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
    "result": "dnd",
    "time": {
        "start": 1760000000.0,
        "finish": 1760000000.05,
        "duration": 0.05,
        "processing": 0.02,
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
[`string`](../../data-types.md) 
[`boolean`](../../data-types.md) | Текущий статус пользователя. 

Допустимые значения: 
- `online` — в сети
- `dnd` — не беспокоить
- `away` — отсутствую
- `break` — перерыв

Если статус не найден, возвращается `false` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

{% note info "" %}

В интерфейсе нового мессенджера отображается только статус `online`. Статусы `dnd`, `away`, `break` можно установить методом, но в интерфейсе они не показываются.

[Битрикс24 Чат: новый мессенджер](https://helpdesk.bitrix24.ru/open/19071750/)

{% endnote %}

## Обработка ошибок

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-user-get.md)
- [{#T}](./im-user-list-get.md)
- [{#T}](./im-user-status-set.md)
- [{#T}](./im-user-status-idle-start.md)
- [{#T}](./im-user-status-idle-end.md)
