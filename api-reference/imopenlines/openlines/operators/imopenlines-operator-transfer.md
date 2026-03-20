# Передать диалог другому оператору или в другую линию imopenlines.operator.transfer

> Scope: [`imopenlines`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правами на диалог

Метод `imopenlines.operator.transfer` передает диалог другому оператору или в очередь другой открытой линии.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CHAT_ID***
[`integer`](../../../data-types.md) | Идентификатор чата открытой линии.

Идентификатор можно получить методом [imopenlines.session.open](../sessions/imopenlines-session-open.md) или [imopenlines.dialog.get](../sessions/imopenlines-dialog-get.md) ||
|| **TRANSFER_ID**
[`string`](../../../data-types.md)\|[`integer`](../../../data-types.md) | Универсальный параметр для передачи диалога.

Допустимые форматы: `USER_ID` сотрудника или строка `queue<QUEUE_ID>`.

Идентификатор пользователя можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md), идентификатор очереди — методом [imopenlines.config.list.get](../imopenlines-config-list-get.md) ||
|| **USER_ID**
[`integer`](../../../data-types.md) | Идентификатор оператора, которому нужно передать диалог.

Идентификатор пользователя можно получить методами [user.get](../../../user/user-get.md) и [user.search](../../../user/user-search.md) ||
|| **QUEUE_ID**
[`integer`](../../../data-types.md) | Идентификатор линии, в очередь которой нужно передать диалог.

`QUEUE_ID` можно получить методом [imopenlines.config.list.get](../imopenlines-config-list-get.md) из поля `ID` ||
|#

Рекомендуется передавать только один параметр: `TRANSFER_ID`, `USER_ID` или `QUEUE_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"USER_ID":15}' \
      https://your-domain.bitrix24.ru/rest/1/webhook_key/imopenlines.operator.transfer.json
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"CHAT_ID":2043,"USER_ID":15,"auth":"<access_token>"}' \
      https://your-domain.bitrix24.ru/rest/imopenlines.operator.transfer.json
    ```

- JS

    ```js
    try {
        const response = await $b24.callMethod(
            'imopenlines.operator.transfer',
            {
                CHAT_ID: 2043,
                USER_ID: 15,
            }
        );

        const { result } = response.getData();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imopenlines.operator.transfer',
                [
                    'CHAT_ID' => 2043,
                    'USER_ID' => 15,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error transferring dialog: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.operator.transfer',
        {
            CHAT_ID: 2043,
            USER_ID: 15,
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
        'imopenlines.operator.transfer',
        [
            'CHAT_ID' => 2043,
            'USER_ID' => 15,
        ]
    );

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
    "result": true,
    "time": {
        "start": 1773663032,
        "finish": 1773663032.493037,
        "duration": 0.49303698539733887,
        "processing": 0,
        "date_start": "2026-03-16T15:10:32+03:00",
        "date_finish": "2026-03-16T15:10:32+03:00",
        "operating_reset_at": 1773663632,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true`, если диалог успешно передан ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "TRANSFER_ID_EMPTY",
    "error_description": "Queue ID or User ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CHAT_ID_EMPTY` | Chat ID can't be empty | Не передан `CHAT_ID` или передано значение `<= 0` ||
|| `400` | `USER_ID_EMPTY` | User ID can't be empty | Передан пустой или некорректный `USER_ID` ||
|| `400` | `QUEUE_ID_EMPTY` | QUEUE ID can't be empty | Передан пустой или некорректный `QUEUE_ID` ||
|| `400` | `TRANSFER_ID_EMPTY` | Queue ID or User ID can't be empty | Не переданы `TRANSFER_ID`, `USER_ID` и `QUEUE_ID` ||
|| `400` | `OPERATOR_WRONG` | You can not redirect to this operator | Целевой оператор или линия недоступны для передачи текущего диалога ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imopenlines-operator-answer.md)
- [{#T}](./imopenlines-operator-finish.md)
- [{#T}](./imopenlines-operator-another-finish.md)
- [{#T}](./imopenlines-operator-skip.md)
- [{#T}](./imopenlines-operator-spam.md)
