# Изменить открытую линию imopenlines.config.update

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом изменения открытых линий

Метод `imopenlines.config.update` изменяет открытую линию.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CONFIG_ID***
[`integer`](../../data-types.md) | Идентификатор открытой линии.

Получить идентификатор открытой линии можно при [создании открытой линии](./imopenlines-config-add.md) или методом [получения списка открытых линий](./imopenlines-config-list-get.md) ||
|| **PARAMS**
[`object`](../../data-types.md) | Объект с настройками для обновления. Набор полей соответствует параметру [PARAMS](./imopenlines-config-add.md#params) метода `imopenlines.config.add` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина (VIP)",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad"
        }
      }' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imopenlines.config.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "CONFIG_ID": 15,
        "PARAMS": {
          "LINE_NAME": "Линия поддержки интернет-магазина (VIP)",
          "QUEUE": [
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "1"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "15"
            },
            {
              "ENTITY_TYPE": "user",
              "ENTITY_ID": "23"
            }
          ],
          "QUEUE_TYPE": "strictly",
          "QUEUE_TIME": 45,
          "NO_ANSWER_TIME": 120,
          "WELCOME_MESSAGE": "Y",
          "WELCOME_MESSAGE_TEXT": "Здравствуйте! Ответим в течение пары минут",
          "WORKTIME_ENABLE": "Y",
          "WORKTIME_FROM": "09:00",
          "WORKTIME_TO": "21:00",
          "WORKTIME_TIMEZONE": "Europe/Kaliningrad"
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imopenlines.config.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'imopenlines.config.update',
            {
                CONFIG_ID: 15,
                PARAMS: {
                    LINE_NAME: 'Линия поддержки интернет-магазина (VIP)',
                    QUEUE: [
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '1'
                        },
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '15'
                        },
                        {
                            ENTITY_TYPE: 'user',
                            ENTITY_ID: '23'
                        }
                    ],
                    QUEUE_TYPE: 'strictly',
                    QUEUE_TIME: 45,
                    NO_ANSWER_TIME: 120,
                    WELCOME_MESSAGE: 'Y',
                    WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                    WORKTIME_ENABLE: 'Y',
                    WORKTIME_FROM: '09:00',
                    WORKTIME_TO: '21:00',
                    WORKTIME_TIMEZONE: 'Europe/Kaliningrad'
                }
            }
        );

        const result = response.getData().result;
        console.log(result);
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
                'imopenlines.config.update',
                [
                    'CONFIG_ID' => 15,
                    'PARAMS' => [
                        'LINE_NAME' => 'Линия поддержки интернет-магазина (VIP)',
                        'QUEUE' => [
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '1',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '15',
                            ],
                            [
                                'ENTITY_TYPE' => 'user',
                                'ENTITY_ID' => '23',
                            ],
                        ],
                        'QUEUE_TYPE' => 'strictly',
                        'QUEUE_TIME' => 45,
                        'NO_ANSWER_TIME' => 120,
                        'WELCOME_MESSAGE' => 'Y',
                        'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                        'WORKTIME_ENABLE' => 'Y',
                        'WORKTIME_FROM' => '09:00',
                        'WORKTIME_TO' => '21:00',
                        'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imopenlines.config.update',
        {
            CONFIG_ID: 15,
            PARAMS: {
                LINE_NAME: 'Линия поддержки интернет-магазина (VIP)',
                QUEUE: [
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '1'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '15'
                    },
                    {
                        ENTITY_TYPE: 'user',
                        ENTITY_ID: '23'
                    }
                ],
                QUEUE_TYPE: 'strictly',
                QUEUE_TIME: 45,
                NO_ANSWER_TIME: 120,
                WELCOME_MESSAGE: 'Y',
                WELCOME_MESSAGE_TEXT: 'Здравствуйте! Ответим в течение пары минут',
                WORKTIME_ENABLE: 'Y',
                WORKTIME_FROM: '09:00',
                WORKTIME_TO: '21:00',
                WORKTIME_TIMEZONE: 'Europe/Kaliningrad'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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

    $result = CRest::call(
        'imopenlines.config.update',
        [
            'CONFIG_ID' => 15,
            'PARAMS' => [
                'LINE_NAME' => 'Линия поддержки интернет-магазина (VIP)',
                'QUEUE' => [
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '1',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '15',
                    ],
                    [
                        'ENTITY_TYPE' => 'user',
                        'ENTITY_ID' => '23',
                    ],
                ],
                'QUEUE_TYPE' => 'strictly',
                'QUEUE_TIME' => 45,
                'NO_ANSWER_TIME' => 120,
                'WELCOME_MESSAGE' => 'Y',
                'WELCOME_MESSAGE_TEXT' => 'Здравствуйте! Ответим в течение пары минут',
                'WORKTIME_ENABLE' => 'Y',
                'WORKTIME_FROM' => '09:00',
                'WORKTIME_TO' => '21:00',
                'WORKTIME_TIMEZONE' => 'Europe/Kaliningrad',
            ],
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773667094,
        "finish": 1773667094.239236,
        "duration": 0.23923611640930176,
        "processing": 0,
        "date_start": "2026-03-16T16:18:14+03:00",
        "date_finish": "2026-03-16T16:18:14+03:00",
        "operating_reset_at": 1773667694,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает:
- `true` — если линия успешно обновлена
- `false` — если линия с указанным `CONFIG_ID` не существует ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "CONFIG_ID_EMPTY",
    "error_description": "Config ID can't be empty"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `CONFIG_ID_EMPTY` | Config ID can't be empty | Параметр `CONFIG_ID` не передан или передан некорректно ||
|| `403` | `CONFIG_WRONG_USER_PERMISSION` | Permission denied | Недостаточно прав для изменения линии ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./imopenlines-config-add.md)
- [{#T}](./imopenlines-config-get.md)
- [{#T}](./imopenlines-config-list-get.md)
- [{#T}](./imopenlines-config-delete.md)
- [{#T}](./imopenlines-config-path-get.md)
