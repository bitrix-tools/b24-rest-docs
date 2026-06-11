# Завершить звонок и зафиксировать его в статистике telephony.externalCall.finish

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalCall.finish` завершает внешний звонок, сохраняет его в статистике и в CRM-деле.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **CALL_ID***
[`string`](../data-types.md) | Идентификатор звонка из метода [telephony.externalCall.register](./telephony-external-call-register.md) ||
|| **USER_ID***
[`integer`](../data-types.md) | Идентификатор пользователя, который завершает звонок.

Пользователь также назначается ответственным за CRM-объекты, которые были автоматически созданы в рамках звонка. Для ранее существовавших CRM-объектов ответственный не изменяется.

Идентификатор можно получить методом [user.get](../user/user-get.md) ||
|| **USER_PHONE_INNER***
[`string`](../data-types.md) | Внутренний номер пользователя.

Внутренний номер можно получить методом [user.get](../user/user-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `USER_ID` или `USER_PHONE_INNER`

{% endnote %} ||
|| **DURATION**
[`integer`](../data-types.md) | Длительность звонка в секундах.

По умолчанию — `0` ||
|| **COST**
[`double`](../data-types.md) | Стоимость звонка.

По умолчанию — `0` ||
|| **COST_CURRENCY**
[`string`](../data-types.md) | Валюта стоимости звонка.

Список валют можно получить методом [crm.currency.list](../crm/currency/crm-currency-list.md).

По умолчанию — пустая строка ||
|| **STATUS_CODE**
[`string`](../data-types.md) | Код результата звонка.

Возможные значения:
- `200` — успешный звонок
- `304` — пропущенный звонок
- `603` — отклонено
- `603-S` — вызов отменен
- `403` — запрещено
- `404` — неверный номер
- `486` — занято
- `484` — направление недоступно
- `503` — направление недоступно
- `480` — временно недоступен
- `402` — недостаточно средств
- `423` — заблокировано
- `OTHER` — не определено

По умолчанию:
- `200`, если `DURATION > 0`
- `304`, если `DURATION = 0` ||
|| **FAILED_REASON**
[`string`](../data-types.md) | Текст причины несостоявшегося звонка.

По умолчанию — пустая строка ||
|| **RECORD_URL**
[`string`](../data-types.md) | URL записи звонка.

Параметр устарел и оставлен для обратной совместимости. Рекомендуется использовать [telephony.externalCall.attachRecord](./telephony-external-call-attach-record.md) ||
|| **VOTE**
[`integer`](../data-types.md) | Оценка звонка.

Возможные значения:
- `1`, `2`, `3`, `4`, `5`

Если оценка отсутствует — `0` или `null` ||
|| **ADD_TO_CHAT**
[`integer`](../data-types.md) | Добавлять сообщение о звонке в чат сотрудника.

Возможные значения:
- `0` — не добавлять
- `1` — добавлять

По умолчанию — `1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"CALL_ID":"externalCall.716f1cb73def9700a23842adf9c4c568.1773130779","USER_ID":1269,"DURATION":95,"STATUS_CODE":"200","VOTE":5,"ADD_TO_CHAT":0,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalCall.finish
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame, ISODate } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ExternalCallFinishResult = {
      ID: number
      CALL_ID: string
      EXTERNAL_CALL_ID: string | null
      PORTAL_USER_ID: number
      PHONE_NUMBER: string
      PORTAL_NUMBER: string
      INCOMING: string
      CALL_DURATION: number
      CALL_START_DATE: ISODate | null
      CALL_STATUS: number
      CALL_VOTE: number
      COST: number
      COST_CURRENCY: string
      CALL_FAILED_CODE: string
      CALL_FAILED_REASON: string
      REST_APP_ID: string
      REST_APP_NAME: string
      CRM_ACTIVITY_ID: number
      COMMENT: string | null
      CRM_ENTITY_TYPE: string
      CRM_ENTITY_ID: number
    }

    try {
      const response = await $b24.actions.v2.call.make<ExternalCallFinishResult>({
        method: 'telephony.externalCall.finish',
        params: {
          CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
          USER_ID: 1269,
          DURATION: 95,
          STATUS_CODE: '200',
          VOTE: 5,
          ADD_TO_CHAT: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Call finished, ID:', result.ID, 'status:', result.CALL_STATUS, 'duration:', result.CALL_DURATION)
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
      async function finishExternalCall() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalCall.finish',
            params: {
              CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
              USER_ID: 1269,
              DURATION: 95,
              STATUS_CODE: '200',
              VOTE: 5,
              ADD_TO_CHAT: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Call finished, ID:', result.ID, 'status:', result.CALL_STATUS, 'duration:', result.CALL_DURATION)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', finishExternalCall)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalCall.finish',
                [
                    'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
                    'USER_ID' => 1269,
                    'DURATION' => 95,
                    'STATUS_CODE' => '200',
                    'VOTE' => 5,
                    'ADD_TO_CHAT' => 0
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error finishing call: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalCall.finish",
        {
            CALL_ID: 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            USER_ID: 1269,
            DURATION: 95,
            STATUS_CODE: '200',
            VOTE: 5,
            ADD_TO_CHAT: 0
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
        'telephony.externalCall.finish',
        [
            'CALL_ID' => 'externalCall.716f1cb73def9700a23842adf9c4c568.1773130779',
            'USER_ID' => 1269,
            'DURATION' => 95,
            'STATUS_CODE' => '200',
            'VOTE' => 5,
            'ADD_TO_CHAT' => 0
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
        "CALL_ID": "externalCall.716f1cb73def9700a23842adf9c4c568.1773130779",
        "EXTERNAL_CALL_ID": null,
        "PORTAL_USER_ID": 1269,
        "PHONE_NUMBER": "79062195047",
        "PORTAL_NUMBER": "3",
        "INCOMING": "2",
        "CALL_DURATION": 95,
        "CALL_START_DATE": {},
        "CALL_STATUS": 1,
        "CALL_VOTE": 5,
        "COST": 0,
        "COST_CURRENCY": "",
        "CALL_FAILED_CODE": "200",
        "CALL_FAILED_REASON": "",
        "REST_APP_ID": "3",
        "REST_APP_NAME": "Документация по REST API",
        "CRM_ACTIVITY_ID": 7943,
        "COMMENT": null,
        "CRM_ENTITY_TYPE": "CONTACT",
        "CRM_ENTITY_ID": 797,
        "ID": 7
    },
    "time": {
        "start": 1773132478,
        "finish": 1773132480.301376,
        "duration": 2.3013761043548584,
        "processing": 2,
        "date_start": "2026-03-10T11:47:58+03:00",
        "date_finish": "2026-03-10T11:48:00+03:00",
        "operating_reset_at": 1773133078,
        "operating": 1.4118058681488037
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Данные сохраненной записи звонка ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор записи в статистике ||
|| **CALL_ID**
[`string`](../data-types.md) | Идентификатор звонка ||
|| **EXTERNAL_CALL_ID**
[`string`](../data-types.md) | Внешний идентификатор звонка на стороне интеграции ||
|| **PORTAL_USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя Битрикс24, от имени которого завершен звонок ||
|| **PHONE_NUMBER**
[`string`](../data-types.md) | Номер абонента ||
|| **PORTAL_NUMBER**
[`string`](../data-types.md) | Номер линии, через который проходил звонок ||
|| **INCOMING**
[`string`](../data-types.md) | Тип звонка.

Возможные значения:
- `1` — исходящий
- `2` — входящий
- `3` — входящий с перенаправлением
- `4` — обратный звонок
- `5` — информационный звонок ||
|| **CALL_DURATION**
[`integer`](../data-types.md) | Длительность звонка в секундах ||
|| **CALL_START_DATE**
[`datetime`](../data-types.md) | Дата и время начала звонка ||
|| **CALL_STATUS**
[`integer`](../data-types.md) | Статус завершения.

Возможные значения:
- `1` — успешный разговор
- `0` — неуспешный/пропущенный ||
|| **CALL_VOTE**
[`integer`](../data-types.md) | Оценка звонка ||
|| **COST**
[`double`](../data-types.md) | Стоимость звонка ||
|| **COST_CURRENCY**
[`string`](../data-types.md) | Валюта стоимости ||
|| **CALL_FAILED_CODE**
[`string`](../data-types.md) | Код завершения звонка.

Возможные значения:
- `200` — успешный звонок
- `304` — пропущенный звонок
- `603` — отклонено
- `603-S` — вызов отменен
- `403` — запрещено
- `404` — неверный номер
- `486` — занято
- `484` — направление недоступно
- `503` — направление недоступно
- `480` — временно недоступен
- `402` — недостаточно средств
- `423` — заблокировано
- `OTHER` — не определено ||
|| **CALL_FAILED_REASON**
[`string`](../data-types.md) | Текстовая причина завершения звонка ||
|| **REST_APP_ID**
[`integer`](../data-types.md) | Идентификатор приложения ||
|| **REST_APP_NAME**
[`string`](../data-types.md) | Название приложения ||
|| **CRM_ACTIVITY_ID**
[`integer`](../data-types.md) | Идентификатор CRM-дела звонка ||
|| **COMMENT**
[`string`](../data-types.md) | Комментарий к звонку ||
|| **CRM_ENTITY_TYPE**
[`string`](../data-types.md) | Тип объекта CRM, связанного со звонком ||
|| **CRM_ENTITY_ID**
[`integer`](../data-types.md) | Идентификатор объекта CRM, связанного со звонком ||
|| **ERRORS**
[`object`](../data-types.md) | Дополнительные ошибки обработки (если возникли) ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "INVALID_ARGUMENT",
    "error_description": "CALL_ID must be a string"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван вне контекста приложения ||
|| `INVALID_ARGUMENT` | CALL_ID must be a string | Параметр `CALL_ID` должен быть строкой ||
|| `ERROR_CORE` | USER_ID or USER_PHONE_INNER should be set | Не переданы `USER_ID` и `USER_PHONE_INNER` ||
|| `ERROR_CORE` | Call is not found (call should be registered prior to finishing | Звонок не найден, перед завершением его нужно зарегистрировать методом `telephony.externalCall.register` ||
|| `ERROR_CORE` | User is not found or is not active | Пользователь не найден или неактивен ||
|| `ERROR_CORE` | Unexpected database error | Ошибка сохранения статистики ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-call-register.md)
- [{#T}](./telephony-external-call-attach-record.md)
- [{#T}](./telephony-external-call-show.md)
- [{#T}](./telephony-external-call-hide.md)
