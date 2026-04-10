# Установить статус пользователя im.user.status.set

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.user.status.set` устанавливает пользовательский статус текущего пользователя.

Чтобы узнать текущий статус, используйте метод [im.user.status.get](./im-user-status-get.md).

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **STATUS***
[`string`](../../data-types.md) | Новый статус пользователя. Значение чувствительно к регистру и должно передаваться в нижнем регистре.

Допустимые значения: 
- `online` — в сети, пользователь получает все уведомления
- `dnd` — не беспокоить, статус отключает уведомления
- `away` — отсутствую
- `break` — перерыв ||
|#

{% note info "" %}

В интерфейсе нового мессенджера отображается только статус `online`. Статусы `dnd`, `away`, `break` можно установить методом `im.user.status.set`, но в интерфейсе они не показываются.

[Битрикс24 Чат: новый мессенджер](https://helpdesk.bitrix24.ru/open/19071750/)

{% endnote %}


## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"STATUS":"dnd"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.user.status.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"STATUS":"dnd","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.user.status.set
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.user.status.set', {
        STATUS: 'dnd',
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
            'im.user.status.set',
            [
                'STATUS' => 'dnd',
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
        'im.user.status.set',
        {
            STATUS: 'dnd',
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
        'im.user.status.set',
        [
            'STATUS' => 'dnd',
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
[`boolean`](../../data-types.md) | Возвращает `true`, если статус установлен ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "STATUS_ERROR",
    "error_description": "Status is not available"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `STATUS_ERROR` | Status is not available | Передано значение `STATUS`, которого нет в списке доступных статусов ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-user-get.md)
- [{#T}](./im-user-list-get.md)
- [{#T}](./im-user-status-get.md)
- [{#T}](./im-user-status-idle-start.md)
- [{#T}](./im-user-status-idle-end.md)
