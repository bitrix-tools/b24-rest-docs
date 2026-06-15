# Получить список реквизитов по фильтру crm.requisite.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод получает список реквизитов по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **select**
[`array`](../../../data-types.md) | Массив содержит список полей, которые необходимо выбрать (смотрите [поля реквизита](./index.md#fields)).

Если не передан или передан пустой массив, то будут выбраны все доступные поля реквизитов ||
|| **filter**
[`object`](../../../data-types.md) | Объект для фильтрации выбранных реквизитов в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field` соответствуют [полям реквизита](./index.md#fields).

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:

- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передаётся массив)
- `!@`— NOT IN (в качестве значения передаётся массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
   - "мол%" — ищем значения, начинающиеся с «мол»
   - "%мол" — ищем значения, заканчивающиеся на «мол»
   - "%мол%" — ищем значения, где «мол» может быть в любой позиции

- `%=` — LIKE (см. описание выше)

- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.

- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
   - "мол%" — ищем значения, не начинающиеся с «мол»
   - "%мол" — ищем значения, не заканчивающиеся на «мол»
   - "%мол%" — ищем значения, где подстроки «мол» нет в любой позиции

- `!%=` — NOT LIKE (см. описание выше)

- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно ||
  || **order**
  [`object`](../../../data-types.md) | Объект для сортировки выбранных реквизитов в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field` соответствуют [полям реквизита](./index.md#fields).

Возможные значения для `order`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
  ||
  || **start**
  [`integer`](../../../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный: 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов значение — `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N-1) * 50`, где `N` — номер нужной страницы
||
|#

## Пример кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получение реквизитов по идентификатору шаблона

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"PRESET_ID":"1"},"select":["ENTITY_TYPE_ID","ENTITY_ID","ID","NAME"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{"DATE_CREATE":"ASC"},"filter":{"PRESET_ID":"1"},"select":["ENTITY_TYPE_ID","ENTITY_ID","ID","NAME"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.requisite.list
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of each RequisiteResult returned in result[]
        type RequisiteResult = {
          ENTITY_TYPE_ID: string
          ENTITY_ID: string
          ID: string
          NAME: string
        }

        try {
          // crm.requisite.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make<RequisiteResult[]>({
            method: 'crm.requisite.list',
            params: {
              order: { DATE_CREATE: 'ASC' },
              filter: { PRESET_ID: '1' },
              select: ['ENTITY_TYPE_ID', 'ENTITY_ID', 'ID', 'NAME'],
              start: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Requisites:', result.length, result)
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
          async function getRequisiteList() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              // crm.requisite.list returns a single page (max 50 records). For the whole result set
              // use a list helper: $b24.actions.v2.callList.make() returns every record as one
              // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
              // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
              // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
              const response = await $b24.actions.v2.call.make({
                method: 'crm.requisite.list',
                params: {
                  order: { DATE_CREATE: 'ASC' },
                  filter: { PRESET_ID: '1' },
                  select: ['ENTITY_TYPE_ID', 'ENTITY_ID', 'ID', 'NAME'],
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
              console.info('Requisites:', result.length, result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getRequisiteList)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.requisite.list',
            [
                'order' => ["DATE_CREATE" => "ASC"],
                'filter' => ["PRESET_ID" => "1"],
                'select' => ["ENTITY_TYPE_ID", "ENTITY_ID", "ID", "NAME"]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получение значения пользовательского поля в реквизитах

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{},"filter":{"ID":"51"},"select":["UF_CRM_1707997209"]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.list
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"order":{},"filter":{"ID":"51"},"select":["UF_CRM_1707997209"],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.requisite.list
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of each RequisiteUserField returned in result[]
        type RequisiteUserField = {
          UF_CRM_1707997209: string
        }

        try {
          // crm.requisite.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make<RequisiteUserField[]>({
            method: 'crm.requisite.list',
            params: {
              order: {},
              filter: { ID: '51' }, // Requisite ID
              select: ['UF_CRM_1707997209'], // User-defined field ID
              start: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('User field value:', result[0]?.UF_CRM_1707997209)
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
          async function getRequisiteUserField() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              // crm.requisite.list returns a single page (max 50 records). For the whole result set
              // use a list helper: $b24.actions.v2.callList.make() returns every record as one
              // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
              // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
              // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
              const response = await $b24.actions.v2.call.make({
                method: 'crm.requisite.list',
                params: {
                  order: {},
                  filter: { ID: '51' }, // Requisite ID
                  select: ['UF_CRM_1707997209'], // User-defined field ID
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
              console.info('User field value:', result[0]?.UF_CRM_1707997209)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getRequisiteUserField)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.requisite.list',
            [
                'order' => [],
                'filter' => ['ID' => '51'],
                'select' => ['UF_CRM_1707997209']
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

## Ответ в случае успеха

HTTP-статус: **200**

1. Ответ из примера 1:

    ```json
    {
    "result": [
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3027",
        "ID": "40",
        "NAME": "Организация"
        },
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3028",
        "ID": "41",
        "NAME": "Реквизиты головного офиса"
        },
        {
        "ENTITY_TYPE_ID": "4",
        "ENTITY_ID": "3028",
        "ID": "42",
        "NAME": "Филиал в г. Черняховск"
        }
    ],
    "total": 3,
    "time": {
        "start": 1717150154.197056,
        "finish": 1717150154.505106,
        "duration": 0.30804991722106934,
        "processing": 0.030454158782958984,
        "date_start": "2024-05-31T12:09:14+02:00",
        "date_finish": "2024-05-31T12:09:14+02:00",
        "operating": 0
    }
    }
    ```

2. Ответ из примера 2:

    ```json
    {
        "result": [
            {
                "UF_CRM_1707997209": "45"
            }
        ],
        "total": 1,
        "time": {
            "start": 1717151052.551011,
            "finish": 1717151052.94743,
            "duration": 0.39641880989074707,
            "processing": 0.028468847274780273,
            "date_start": "2024-05-31T12:24:12+02:00",
            "date_finish": "2024-05-31T12:24:12+02:00",
            "operating": 0
        }
    }
    ```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../data-types.md)| Массив объектов с информацией из выбранных реквизитов. Каждый элемент содержит выбранные [поля реквизита](./index.md#fields) ||
|| **total**
[`integer`](../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Ответ в случае ошибки

HTTP-статус: **400**

```json
{
    "error": 0,
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные ошибки

#|  
|| **Код** | **Текст ошибки** | **Описание** ||
|| `0` | Access denied. | Недостаточно прав доступа для получения списка реквизитов ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-requisite-add.md)
- [{#T}](./crm-requisite-update.md)
- [{#T}](./crm-requisite-get.md)
- [{#T}](./crm-requisite-delete.md)
- [{#T}](./crm-requisite-fields.md)
