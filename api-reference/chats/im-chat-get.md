# Получить идентификатор чата im.chat.get

> Scope: [`im`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.chat.get` получает идентификатор чата.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ENTITY_TYPE***
[`string`](../data-types.md) | Тип объекта для связи чата с внешним контекстом. Передается строкой.

Возможные значения:
- `VIDEOCONF` — чат видеоконференции
- `AI_ASSISTANT_PRIVATE` — приватный чат с AI-ассистентом
- `LINES` — чат открытой линии со стороны оператора
- `LIVECHAT` — чат открытой линии со стороны клиента
- `ANNOUNCEMENT` — чат объявлений
- `CALENDAR` — чат, связанный с событием календаря
- `MAIL` — чат, связанный с почтовой перепиской
- `CRM` — системный чат «для обсуждения» CRM-элемента. Метод не вернет идентификаторы других чатов, связанных с элементом CRM
- `SONET_GROUP` — чат группы социальной сети
- `TASKS_TASK` — чат задачи в [новой карточке задач](../tasks/tasks-new.md)
- `TASKS` — системный чат задачи в старой карточке задач
- `CALL` — чат, связанный со звонком
||
|| **ENTITY_ID***
[`string`](../data-types.md) | Идентификатор объекта в рамках `ENTITY_TYPE`.

Передается строкой. Формат зависит от выбранного `ENTITY_TYPE`.

Поддерживаемые форматы для распространенных типов:
- `CRM` — `<CRM_TYPE>`\|`<ID>`, например `LEAD`\|`13`, `DEAL`\|`1663`, `CONTACT`\|`25`, `COMPANY`\|`7`
- `LINES` — `<connectorId>`\|`<lineId>`\|`<connectorChatId>`\|`<connectorUserId>`, например `telegrambot`\|`2`\|`209607941`\|`744`
- `LIVECHAT` — `<connectorId>`\|`<lineId>`
- `TASKS`, `TASKS_TASK` — идентификатор задачи, например `8293`
- `CALENDAR` — идентификатор события календаря
- `SONET_GROUP` — идентификатор группы

Для остальных `ENTITY_TYPE` формат определяется модулем или интеграцией. Может быть произвольной строкой.

При [создании чата](./im-chat-add.md) можно передать произвольную пару `ENTITY_TYPE` и `ENTITY_ID`. Метод `im.chat.get` вернет чат, если вызвать его с той же парой значений ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.chat.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ENTITY_TYPE":"CRM","ENTITY_ID":"DEAL|1663","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.chat.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'im.chat.get',
            {
                ENTITY_TYPE: 'CRM',
                ENTITY_ID: 'DEAL|1663'
            }
        );

        console.log(response.getData().result);
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
                'im.chat.get',
                [
                    'ENTITY_TYPE' => 'CRM',
                    'ENTITY_ID' => 'DEAL|1663',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'CHAT_ID: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.chat.get',
        {
            ENTITY_TYPE: 'CRM',
            ENTITY_ID: 'DEAL|1663',
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
        'im.chat.get',
        [
            'ENTITY_TYPE' => 'CRM',
            'ENTITY_ID' => 'DEAL|1663',
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
        "ID": 1437
    },
    "time": {
        "start": 1772028217,
        "finish": 1772028217.949613,
        "duration": 0.949613094329834,
        "processing": 0,
        "date_start": "2026-02-25T17:03:37+03:00",
        "date_finish": "2026-02-25T17:03:37+03:00",
        "operating_reset_at": 1772028817,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Возвращает объект с идентификатором чата `ID`. 

Метод вернет `null`:
- если чат не найден
- не указаны обязательные параметры
- параметры заполнены неверно
||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-chat-add.md)
- [{#T}](./im-dialog-get.md)
- [{#T}](./chat-update/index.md)
- [{#T}](./im-recent-get.md)
- [{#T}](./im-recent-list.md)
