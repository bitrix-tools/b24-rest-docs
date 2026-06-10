# Найти клиента в CRM по номеру телефона telephony.externalCall.searchCrmEntities

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.searchCrmEntities` возвращает CRM-объекты по номеру телефона клиента и данные ответственного сотрудника.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **PHONE_NUMBER***
[`string`](../data-types.md) | Номер телефона клиента ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PHONE_NUMBER":"79062195047"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/telephony.externalCall.searchCrmEntities
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"PHONE_NUMBER":"79062195047","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.searchCrmEntities
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each CRM entity returned in result[]
    type CrmEntityResult = {
      CRM_ENTITY_TYPE: string
      CRM_ENTITY_ID: number
      ASSIGNED_BY_ID: number
      NAME: string
      ASSIGNED_BY: {
        ID: string
        TIMEMAN_STATUS: string
        USER_PHONE_INNER: string | null
        WORK_PHONE: string | null
        PERSONAL_PHONE: string | null
        PERSONAL_MOBILE: string | null
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmEntityResult[]>({
        method: 'telephony.externalCall.searchCrmEntities',
        params: {
          PHONE_NUMBER: '79062195047',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('CRM entities found:', result.length, result)
      }
    } catch (error) {
      // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Load the SDK (UMD build); it is exposed as the global B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function searchCrmEntities() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalCall.searchCrmEntities',
            params: {
              PHONE_NUMBER: '79062195047',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('CRM entities found:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', searchCrmEntities)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalCall.searchCrmEntities',
                [
                    'PHONE_NUMBER' => '79062195047'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error searching CRM entities: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.searchCrmEntities",
        {
            PHONE_NUMBER: '79062195047'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
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
        'telephony.externalCall.searchCrmEntities',
        [
            'PHONE_NUMBER' => '79062195047'
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
    "result": [
        {
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 651,
        "ASSIGNED_BY_ID": 99,
        "NAME": "Иван Иванов",
        "ASSIGNED_BY": {
            "ID": "99",
            "TIMEMAN_STATUS": "CLOSED",
            "USER_PHONE_INNER": null,
            "WORK_PHONE": null,
            "PERSONAL_PHONE": null,
            "PERSONAL_MOBILE": "79062195047"
        }
        },
        {
        "CRM_ENTITY_TYPE": "COMPANY",
        "CRM_ENTITY_ID": 643,
        "ASSIGNED_BY_ID": 99,
        "NAME": "ООО Ромашка",
        "ASSIGNED_BY": {
            "ID": "99",
            "TIMEMAN_STATUS": "CLOSED",
            "USER_PHONE_INNER": null,
            "WORK_PHONE": null,
            "PERSONAL_PHONE": null,
            "PERSONAL_MOBILE": "79062195047"
        }
        }
    ],
    "time": {
        "start": 1772808159,
        "finish": 1772808159.397228,
        "duration": 0.3972280025482178,
        "processing": 0,
        "date_start": "2026-03-06T17:42:39+03:00",
        "date_finish": "2026-03-06T17:42:39+03:00",
        "operating_reset_at": 1772808759,
        "operating": 0.25037074089050293
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив найденных объектов CRM ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM.

Возможные значения:
- `CONTACT` — контакт
- `LEAD` — лид
- `COMPANY` — компания ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM ||
|| **ASSIGNED_BY_ID**
[`integer`](../data-types.md) | Идентификатор ответственного сотрудника ||
|| **NAME**
[`string`](../data-types.md) | Название или ФИО найденного объекта CRM ||
|| **ASSIGNED_BY**
[`object`](../data-types.md) | Данные [ответственного сотрудника](#result-assigned-by) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект ASSIGNED_BY {#result-assigned-by}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сотрудника ||
|| **TIMEMAN_STATUS**
[`string`](../data-types.md) | Статус рабочего времени сотрудника.

Возможные значения:
- `OPENED` — рабочий день начат
- `CLOSED` — рабочий день завершен
- `PAUSED` — перерыв
- `EXPIRED` — рабочий день истек
- `UNAVAILABLE` — учет рабочего времени отключен у сотрудника
- `NOT_INSTALLED` — модуль учета рабочего времени не установлен ||
|| **USER_PHONE_INNER**
[`string`](../data-types.md) | Внутренний номер сотрудника ||
|| **WORK_PHONE**
[`string`](../data-types.md) | Рабочий телефон сотрудника ||
|| **PERSONAL_PHONE**
[`string`](../data-types.md) | Личный телефон сотрудника ||
|| **PERSONAL_MOBILE**
[`string`](../data-types.md) | Мобильный телефон сотрудника ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_CORE",
    "error_description": "PHONE_NUMBER is empty"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_CORE` | PHONE_NUMBER is empty | Не передан обязательный параметр `PHONE_NUMBER` ||
|| `ERROR_CORE` | CRM is not installed. | На портале не установлен модуль CRM ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-show.md)
- [{#T}](./telephony-external-call-hide.md)
- [{#T}](./telephony-external-call-finish.md)