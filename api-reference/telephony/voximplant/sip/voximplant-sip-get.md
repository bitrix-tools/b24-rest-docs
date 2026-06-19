# Получить SIP-линии приложения voximplant.sip.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом Управление номерами — изменение

Метод `voximplant.sip.get` возвращает список SIP-линий, созданных текущим приложением.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **FILTER**
[`object`](../../../data-types.md) | Объект для фильтрации в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Смотрите ниже [список доступных полей для фильтрации](#filterable).

Поддерживаемые операторы в ключе фильтра:
- `!` — не равно
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `><` — между (диапазон, включительно)
- `!><` — не между (вне диапазона)
- `?` — поиск по строке
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `%` — LIKE, поиск по подстроке
- `!%` — NOT LIKE, поиск по подстроке

По умолчанию — без фильтрации.

Метод всегда добавляет системный фильтр по `APP_ID` текущего приложения ||
|| **SORT**
[`string`](../../../data-types.md) | Поле сортировки.

Используются поля из [списка полей для фильтрации](#filterable).

По умолчанию — без сортировки ||
|| **ORDER**
[`string`](../../../data-types.md) | Направление сортировки.

Возможные значения:
- `ASC` — сортировка по возрастанию
- `DESC` — сортировка по убыванию

По умолчанию — без сортировки ||
|| **start**
[`integer`](../../../data-types.md) | Параметр постраничной навигации.

Размер страницы результатов — 50 записей.

Чтобы получить вторую страницу, передайте `50`; третью — `100` и так далее.

Формула:

`start = (N - 1) * 50`, где `N` — номер страницы ||
|#

### Доступные поля для фильтрации {#filterable}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Внутренний идентификатор записи SIP-линии.

В ответе метода поле не возвращается ||
|| **TYPE**
[`string`](../../../data-types.md) | Тип АТС.

Возможные значения:

- `cloud` — облачная АТС
- `office` — офисная АТС ||
|| **TITLE**
[`string`](../../../data-types.md) | Название подключения ||
|| **CONFIG_ID**
[`integer`](../../../data-types.md) | Идентификатор настройки SIP-линии ||
|| **REG_ID**
[`integer`](../../../data-types.md) | Идентификатор SIP-регистрации.

Актуально для облачной АТС ||
|| **APP_ID**
[`string`](../../../data-types.md) | Идентификатор приложения.

Фильтр по этому полю принудительно ограничивается текущим приложением ||
|| **SERVER**
[`string`](../../../data-types.md) | Адрес сервера SIP-регистрации ||
|| **LOGIN**
[`string`](../../../data-types.md) | Логин для подключения к серверу ||
|| **PASSWORD**
[`string`](../../../data-types.md) | Пароль для подключения к серверу ||
|| **INCOMING_SERVER**
[`string`](../../../data-types.md) | Адрес сервера для входящих звонков.

Актуально для офисной АТС ||
|| **INCOMING_LOGIN**
[`string`](../../../data-types.md) | Логин для входящих звонков.

Актуально для офисной АТС ||
|| **INCOMING_PASSWORD**
[`string`](../../../data-types.md) | Пароль для входящих звонков.

Актуально для офисной АТС ||
|| **AUTH_USER**
[`string`](../../../data-types.md) | Имя пользователя для авторизации ||
|| **OUTBOUND_PROXY**
[`string`](../../../data-types.md) | Адрес SIP-прокси для исходящего подключения к оператору или АТС ||
|| **DETECT_LINE_NUMBER**
[`string`](../../../data-types.md) | Признак определения номера линии.

Возможные значения:

- `Y` — определение номера линии включено
- `N` — определение номера линии выключено ||
|| **LINE_DETECT_HEADER_ORDER**
[`string`](../../../data-types.md) | Порядок заголовков для определения номера линии ||
|| **REGISTRATION_STATUS_CODE**
[`integer`](../../../data-types.md) | Код статуса SIP-регистрации ||
|| **REGISTRATION_ERROR_MESSAGE**
[`string`](../../../data-types.md) | Текст ошибки SIP-регистрации ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"CONFIG_ID":[3,7,9]},"SORT":"CONFIG_ID","ORDER":"ASC"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/voximplant.sip.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"FILTER":{"CONFIG_ID":[3,7,9]},"SORT":"CONFIG_ID","ORDER":"ASC","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/voximplant.sip.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each SIP line item returned in result[]
    type SipLineItem = {
      TYPE: string
      CONFIG_ID: string
      TITLE: string
      REG_ID?: string
      SERVER: string
      LOGIN: string
      PASSWORD: string
      INCOMING_SERVER?: string
      INCOMING_LOGIN?: string
      INCOMING_PASSWORD?: string
      AUTH_USER: string | null
      OUTBOUND_PROXY: string | null
      DETECT_LINE_NUMBER: string
      LINE_DETECT_HEADER_ORDER: string
      REGISTRATION_STATUS_CODE: string
      REGISTRATION_ERROR_MESSAGE: string | null
    }

    try {
      // voximplant.sip.get returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<SipLineItem[]>({
        method: 'voximplant.sip.get',
        params: {
          FILTER: {
            CONFIG_ID: [3, 7, 9],
          },
          SORT: 'CONFIG_ID',
          ORDER: 'ASC',
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('SIP lines fetched:', result.length, result)
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
      async function fetchSipLines() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // voximplant.sip.get returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'voximplant.sip.get',
            params: {
              FILTER: {
                CONFIG_ID: [3, 7, 9],
              },
              SORT: 'CONFIG_ID',
              ORDER: 'ASC',
              start: 0,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('SIP lines fetched:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchSipLines)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'voximplant.sip.get',
                [
                    'FILTER' => [
                        'CONFIG_ID' => [3, 7, 9]
                    ],
                    'SORT' => 'CONFIG_ID',
                    'ORDER' => 'ASC'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching SIP data: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'voximplant.sip.get',
        {
            FILTER: {
                CONFIG_ID: [3, 7, 9]
            },
            SORT: 'CONFIG_ID',
            ORDER: 'ASC'
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
        'voximplant.sip.get',
        [
            'FILTER' => [
                'CONFIG_ID' => [3, 7, 9]
            ],
            'SORT' => 'CONFIG_ID',
            'ORDER' => 'ASC'
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
        "TYPE": "cloud",
        "CONFIG_ID": "3",
        "REG_ID": "150907",
        "SERVER": "sipnet.ru",
        "LOGIN": "0045281811",
        "PASSWORD": "N7K4mCG9",
        "AUTH_USER": "",
        "OUTBOUND_PROXY": "",
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "200",
        "REGISTRATION_ERROR_MESSAGE": "",
        "TITLE": "SIP line"
        },
        {
        "TYPE": "office",
        "CONFIG_ID": "7",
        "SERVER": "office.provider.local",
        "LOGIN": "office_user",
        "PASSWORD": "secret",
        "INCOMING_SERVER": "ip.b24-6068-1537535782.bitrixphone.com",
        "INCOMING_LOGIN": "sip7",
        "INCOMING_PASSWORD": "71747523265mb091225eb31996a4a225",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "0",
        "REGISTRATION_ERROR_MESSAGE": null,
        "TITLE": "Office PBX 1"
        },
        {
        "TYPE": "cloud",
        "CONFIG_ID": "9",
        "REG_ID": "151083",
        "SERVER": "sip.provider.com",
        "LOGIN": "sip_user",
        "PASSWORD": "secret",
        "AUTH_USER": null,
        "OUTBOUND_PROXY": null,
        "DETECT_LINE_NUMBER": "N",
        "LINE_DETECT_HEADER_ORDER": "diversion;to",
        "REGISTRATION_STATUS_CODE": "502",
        "REGISTRATION_ERROR_MESSAGE": "Unable to resolve hostname",
        "TITLE": ""
        }
    ],
    "total": 3,
    "time": {
        "start": 1773662224,
        "finish": 1773662224.187874,
        "duration": 0.18787407875061035,
        "processing": 0,
        "date_start": "2026-03-16T14:57:04+03:00",
        "date_finish": "2026-03-16T14:57:04+03:00",
        "operating_reset_at": 1773662824,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../../data-types.md) | Массив записей SIP-линий, созданных текущим приложением. Состав записей зависит от условий `FILTER`.

Пустой массив означает, что записи, соответствующие условиям `FILTER`, отсутствуют ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество записей в выборке ||
|| **next**
[`integer`](../../../data-types.md) | Смещение следующей страницы (если есть) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#


## Обработка ошибок

HTTP-статус: **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied!"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ACCESS_DENIED` | `Access denied!` | Недостаточно прав для получения списка SIP-линий ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./voximplant-sip-add.md)
- [{#T}](./voximplant-sip-update.md)
- [{#T}](./voximplant-sip-get.md)
- [{#T}](./voximplant-sip-delete.md)
- [{#T}](./voximplant-sip-status.md)
- [{#T}](./voximplant-sip-connector-status.md)
