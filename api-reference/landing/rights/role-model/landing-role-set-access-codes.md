# Установить коды доступа для роли landing.role.setAccessCodes

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или пользователь с правом «полный доступ» к разделу «Сайты и магазины»

Метод `landing.role.setAccessCodes` задает, кому назначена роль: пользователям, группам или отделам. После вызова метод заново применяет уже сохраненные права этой роли для сайтов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор роли. Получить идентификатор можно с помощью метода [landing.role.getList](./landing-role-get-list.md) ||
|| **codes**
[`string[]`](../../../data-types.md) | Итоговый список кодов доступа для роли.

Метод полностью заменяет ранее сохраненный список и не объединяет его с текущим.

Варианты кодов доступа:
- `U<ID>` — пользователь
- `G<ID>` — группа пользователей
- `DR<ID>` — отдел вместе с подотделами
- `AU` — все авторизованные пользователи
- `SG<ID>` — рабочая группа

Подробнее о кодах доступа и правилах их использования рассказано в описании метода [landing.site.setRights](../extended-model/landing-site-set-rights.md)

Метод не проверяет каждый код доступа по отдельности. Если в списке есть неподдерживаемый или несуществующий код, отдельной ошибки не будет

Если параметр `codes` не передать, список кодов роли будет очищен. При этом сохраненные права роли по сайтам не исчезают автоматически, поэтому после вызова доступ может сохраниться у большего числа пользователей, чем ожидалось

После изменения кодов доступа система пересчитывает не только права по сайтам, но и дополнительные права роли: возможность создавать сайты, видеть раздел «Сайты и магазины» в меню и администрировать раздел

Получить сохраненный список кодов доступа через REST нельзя. Метод [landing.role.getList](./landing-role-get-list.md) возвращает только идентификатор, название и `XML_ID` роли, а [landing.role.getRights](./landing-role-get-rights.md) показывает только права роли по сайтам

Если передать параметр `codes` не в формате массива, метод вернет ошибку `ERROR_ARGUMENT` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 11,
        "codes": [
          "U45",
          "DR7",
          "SG3_A"
        ]
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.role.setAccessCodes.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 11,
        "codes": [
          "U45",
          "DR7",
          "SG3_A"
        ],
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.role.setAccessCodes.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.role.setAccessCodes',
            {
                id: 11,
                codes: [
                    'U45',
                    'DR7',
                    'SG3_A'
                ]
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
                'landing.role.setAccessCodes',
                [
                    'id' => 11,
                    'codes' => [
                        'U45',
                        'DR7',
                        'SG3_A',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting role access codes: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.role.setAccessCodes',
        {
            id: 11,
            codes: [
                'U45',
                'DR7',
                'SG3_A'
            ]
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
    require_once('crest.php');

    $result = CRest::call(
        'landing.role.setAccessCodes',
        [
            'id' => 11,
            'codes' => [
                'U45',
                'DR7',
                'SG3_A',
            ],
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1775067129,
        "finish": 1775067129.196438,
        "duration": 0.19643807411193848,
        "processing": 0,
        "date_start": "2026-04-01T21:12:09+03:00",
        "date_finish": "2026-04-01T21:12:09+03:00",
        "operating_reset_at": 1775067729,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат вызова

Метод возвращает `true`, если запрос завершился без ошибки доступа или системной ошибки.

Значение `true` само по себе не подтверждает, что роль с таким `id` существует или что список кодов был изменен.

После вызова проверьте результат в интерфейсе. Через REST можно дополнительно проверить, какие права роли применяются к сайтам, методом [landing.role.getRights](./landing-role-get-rights.md), но итоговый список кодов доступа этот метод не возвращает ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `ACCESS_DENIED` | Недостаточно прав для работы с разделом «Сайты и магазины» ||
|| `IS_NOT_ADMIN` | Для метода нужны права администратора или право «полный доступ» к разделу «Сайты и магазины» ||
|| `FEATURE_NOT_AVAIL` | Управление правами в разделе «Сайты и магазины» недоступно на текущем тарифе ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ERROR_ARGUMENT` | Параметр `codes` передан не в формате массива ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-role-get-list.md)
- [{#T}](./landing-role-get-rights.md)
- [{#T}](./landing-role-set-rights.md)
