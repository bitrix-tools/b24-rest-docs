# Отправить события в RT-канал приложения pull.application.event.add

> Scope: [`pull`](../../../api-reference/scopes/permissions.md)
>
> Кто может выполнять метод: пользователь, авторизованный в приложении

Метод `pull.application.event.add` отправляет событие в RT-канал приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../app-installation/index.md).

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **COMMAND**^*^
[`string`](../../../api-reference/data-types.md) | Команда события.

Параметр принимает произвольное значение команды, если оно соответствует формату.

Допустимые символы: `A-Z`, `a-z`, `0-9`, `_`, `:`, `\|`, `.`, `-` ||
|| **PARAMS**
[`object`](../../../api-reference/data-types.md) | Параметры события в формате:

```
{
    field_1: value_1,
    field_2: value_2,
    ...,
    field_n: value_n
}
```

где:
- `field_n` - имя параметра события
- `value_n` - значение параметра события

Параметр принимает произвольные имя и значение ||
|| **MODULE_ID**
[`string`](../../../api-reference/data-types.md) | Идентификатор модуля события.

Параметр принимает произвольное значение идентификатора, если оно соответствует формату.

Допустимые символы: `a-z`, `0-9`, `.`, `_`.

Если параметр не передан, используется `application` как идентификатор модуля события по умолчанию ||
|| **USER_ID**
[`integer`](../../../api-reference/data-types.md) \| [`integer[]`](../../../api-reference/data-types.md) | Идентификатор пользователя или массив идентификаторов пользователей.

`USER_ID` можно получить:
- методом [user.get](../../../api-reference/user/user-get.md)
- методом [user.current](../../../api-reference/user/user-current.md) для текущего пользователя

Пользователь без прав администратора может указать только свой идентификатор.

Если параметр не передан, событие отправляется в общий канал ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

Пример отправки события в общий канал приложения, где:
- `COMMAND` - команда события
- `PARAMS` - параметры события
- `MODULE_ID` - идентификатор модуля события

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "COMMAND": "test_event",
        "PARAMS": {
          "param1": "value1"
        },
        "MODULE_ID": "application",
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/pull.application.event.add.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'pull.application.event.add',
    		{
    			COMMAND: 'test_event',
    			PARAMS: {
    				param1: 'value1'
    			},
    			MODULE_ID: 'application'
    		}
    	);

    	const result = response.getData().result;
    	console.info(result);
    }
    catch (error)
    {
    	console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'pull.application.event.add',
                [
                    'COMMAND' => 'test_event',
                    'PARAMS' => [
                        'param1' => 'value1',
                    ],
                    'MODULE_ID' => 'application',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sending event: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'pull.application.event.add',
        {
            COMMAND: 'test_event',
            PARAMS: {
                param1: 'value1'
            },
            MODULE_ID: 'application'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'pull.application.event.add',
        [
            'COMMAND' => 'test_event',
            'PARAMS' => [
                'param1' => 'value1',
            ],
            'MODULE_ID' => 'application',
        ]
    );

    echo '<pre>';
    print_r($result);
    echo '</pre>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1743495945,
        "finish": 1743495945.285066,
        "duration": 0.2850658893585205,
        "processing": 0.008597135543823242,
        "date_start": "2025-04-01T11:52:25+03:00",
        "date_finish": "2025-04-01T11:52:25+03:00",
        "operating_reset_at": 1743496545,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../api-reference/data-types.md) | Признак успешной отправки события ||
|| **time**
[`time`](../../../api-reference/data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Get access to application config available only for application authorization."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `WRONG_AUTH_TYPE` | Get access to application config available only for application authorization. | Вызов метода не из контекста авторизации приложения ||
|| `400` | `USER_ID_ACCESS_ERROR` | Only admin can send notifications to other channels | Пользователь без прав администратора пытается отправить событие в чужой канал ||
|| `400` | `MODULE_ID_ERROR` | Module ID format error | Передан некорректный тип `MODULE_ID` ||
|| `400` | `COMMAND_ERROR` | Command format error | Передан некорректный тип `COMMAND` ||
|| `400` | `PARAMS_ERROR` | Params format error | Передан некорректный тип `PARAMS` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](../../interactivity/index.md)
- [{#T}](./pull-application-config-get.md)
- [{#T}](./pull-application-push-add.md)

