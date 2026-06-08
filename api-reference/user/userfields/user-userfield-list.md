# Получить список пользовательских полей user.userfield.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`user.userfield`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод `user.userfield.list` получает список пользовательских полей по фильтру.

## Параметры метода

#|
|| **Название**
`тип` | **Описание** ||
|| **order**
[`string`](../../data-types.md)\|[`array`](../../data-types.md) | Сортировка выбранных пользовательских полей в формате `{"field_1": "order_1", ... "field_N": "order_N"}`.

Возможные значения для `field_N`:

- `ID` — идентификатор пользовательского поля
- `FIELD_NAME` — название поля
- `USER_TYPE_ID` — тип данных поля
- `XML_ID` — внешний код
- `SORT` — порядок сортировки поля
- `MULTIPLE` — возможность ввода нескольких значений
- `MANDATORY` — обязательность заполнения
- `SHOW_FILTER` — показ поля в фильтре списка пользователей
- `SHOW_IN_LIST` — показ поля в списке пользователей
- `EDIT_IN_LIST` — возможность редактирования поля в списке пользователей
- `IS_SEARCHABLE` — возможность поиска по полю

Возможные значения для `order_N`:

- `asc` — в порядке возрастания
- `desc` — в порядке убывания
 ||
|| **filter** 
[`array`](../../data-types.md)| Фильтр выбранных пользовательских полей в формате `{"field_1": "value_1", ... "field_N": "value_N"}`.

Возможные значения для `field_N` аналогичны полям в сортировке.

Ключу может быть задан дополнительный префикс, уточняющий поведение фильтра. Возможные значения префикса:
- `>=` — больше либо равно
- `>` — больше
- `<=` — меньше либо равно
- `<` — меньше
- `@` — IN (в качестве значения передается массив)
- `!@` — NOT IN (в качестве значения передается массив)
- `%` — LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск ищет подстроку в любой позиции строки.
- `=%` — LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения начинающиеся с «мол»
  - `"%мол"` — ищем значения заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где «мол» может быть в любой позиции
- `%=` — LIKE (аналогично `=%`)
- `!%` — NOT LIKE, поиск по подстроке. Символ `%` в значении фильтра передавать не нужно. Поиск идет с обоих сторон.
- `!=%` — NOT LIKE, поиск по подстроке. Символ `%` нужно передавать в значении. Примеры:
  - `"мол%"` — ищем значения не начинающиеся с «мол»
  - `"%мол"` — ищем значения не заканчивающиеся на «мол»
  - `"%мол%"` — ищем значения, где подстроки «мол» нет в любой позиции
- `!%=` — NOT LIKE (аналогично `!=%`)
- `=` — равно, точное совпадение (используется по умолчанию)
- `!=` — не равно
- `!` — не равно
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"id":"desc"},"filter":{"id":13}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/user.userfield.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"order":{"id":"desc"},"filter":{"id":13},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/user.userfield.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each user field returned in result[]
    type UserUserfieldItem = {
      ID: string
      ENTITY_ID: string
      FIELD_NAME: string
      USER_TYPE_ID: string
      XML_ID: string | null
      SORT: string
      MULTIPLE: 'Y' | 'N'
      MANDATORY: 'Y' | 'N'
      SHOW_FILTER: string
      SHOW_IN_LIST: 'Y' | 'N'
      EDIT_IN_LIST: 'Y' | 'N'
      IS_SEARCHABLE: 'Y' | 'N'
      SETTINGS: Record<string, unknown>
      LIST?: Array<{ ID: string; SORT: string; VALUE: string; DEF: 'Y' | 'N'; XML_ID: string }>
    }

    // user.userfield.list returns a single page (max 50 records). For the whole result set
    // use a list helper: $b24.actions.v2.callList.make() returns every record as one
    // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
    // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
    // passing it is a TS error) — keep this call.make + `start` variant when sort matters.

    try {
      const response = await $b24.actions.v2.call.make<UserUserfieldItem[]>({
        method: 'user.userfield.list',
        params: {
          order: { id: 'desc' },
          filter: { id: 13 },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Loaded user fields:', result.length, result)
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
      async function listUserUserfields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // user.userfield.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.

          const response = await $b24.actions.v2.call.make({
            method: 'user.userfield.list',
            params: {
              order: { id: 'desc' },
              filter: { id: 13 },
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
          console.info('Loaded user fields:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listUserUserfields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'user.userfield.list',
                [
                    'order' => [
                        'id' => 'desc',
                    ],
                    'filter' => [
                        'id' => 13
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
        // Нужная вам логика обработки данных
        processData($result);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching user fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "user.userfield.list",
        {
            order: {
                id: 'desc',
            },
            filter: {
                id: 13
            },
        },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'user.userfield.list',
        [
            'order' => [
                'id' => 'desc',
            ]
            'filter' => [
                'id' => 13,
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Python

    Пример

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    order = {
        "ID": "desc",
        "SORT": "asc",
    }
    filter = {
        "USER_TYPE_ID": "string",
        "SHOW_IN_LIST": "Y",
    }

    try:
        bitrix_response = client.user.userfield.list(
            order=order,
            filter=filter,
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print("Bitrix SDK error", error.message, sep="\n")
    except Exception as error:
        print("Unexpected error", error, sep="\n")
    ```

    Пример `as_list`

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    order = {
        "ID": "desc",
    }
    filter = {
        "SHOW_IN_LIST": "Y",
    }

    try:
        bitrix_response = client.user.userfield.list(
            order=order,
            filter=filter,
        ).as_list().response
        result = bitrix_response.result
        for item in result:
            print(item)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print("Bitrix SDK error", error.message, sep="\n")
    except Exception as error:
        print("Unexpected error", error, sep="\n")
    ```

    Пример `as_list_fast`

    ```python
    from b24pysdk.client import BaseClient
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    order = {
        "ID": "desc",
    }
    filter = {
        "SHOW_IN_LIST": "Y",
    }

    try:
        bitrix_response = client.user.userfield.list(
            order=order,
            filter=filter,
        ).as_list_fast(descending=True).response
        result = bitrix_response.result
        for item in result:
            print(item)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print("Bitrix SDK error", error.message, sep="\n")
    except Exception as error:
        print("Unexpected error", error, sep="\n")
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result":[
        {
            "ID":"176",
            "ENTITY_ID":"USER",
            "FIELD_NAME":"UF_USR_1724228142162",
            "USER_TYPE_ID":"enumeration",
            "XML_ID":null,
            "SORT":"100",
            "MULTIPLE":"Y",
            "MANDATORY":"N",
            "SHOW_FILTER":"E",
            "SHOW_IN_LIST":"Y",
            "EDIT_IN_LIST":"Y",
            "IS_SEARCHABLE":"N",
            "SETTINGS":{
                "DISPLAY":"UI",
                "LIST_HEIGHT":1,
                "CAPTION_NO_VALUE":"",
                "SHOW_NO_VALUE":"Y"
            },
            "LIST":[
                {
                    "ID":"26",
                    "SORT":"0",
                    "VALUE":"1",
                    "DEF":"N",
                    "XML_ID":"2a53ce08b86a6aba152b1b19204fdef2"
                },
                {
                    "ID":"27",
                    "SORT":"100",
                    "VALUE":"2",
                    "DEF":"N",
                    "XML_ID":"292df2be1171ed6ab038996deac29ac8"
                },
                {
                    "ID":"28",
                    "SORT":"200",
                    "VALUE":"3",
                    "DEF":"N",
                    "XML_ID":"3c5af70eafbba79a6cf52e299ed75123"
                }
            ]
        },
        {
            "ID":"177",
            "ENTITY_ID":"USER",
            "FIELD_NAME":"UF_USR_MONEY",
            "USER_TYPE_ID":"money",
            "XML_ID":null,
            "SORT":"100",
            "MULTIPLE":"N",
            "MANDATORY":"N",
            "SHOW_FILTER":"N",
            "SHOW_IN_LIST":"Y",
            "EDIT_IN_LIST":"Y",
            "IS_SEARCHABLE":"N",
            "SETTINGS":{
                "DEFAULT_VALUE":""
            }
        }
    ],
    "total":2,
    "time":{
        "start":1747313326.788124,
        "finish":1747313328.641663,
        "duration":1.853538990020752,
        "processing":0.011211156845092773,
        "date_start":"2025-05-15T14:48:46+02:00",
        "date_finish":"2025-05-15T14:48:48+02:00",
        "operating":0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **total**
[`integer`](../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{	
   "error":"",
   "error_description":"Access denied."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустая строка | Access denied. | Поле с таким `id` не существует или доступ запрещен ||
|| Пустая строка | ID is not defined or invalid | Не задан или введен неверный `id` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./user-userfield-add.md)
- [{#T}](./user-userfield-update.md)
- [{#T}](./user-userfield-delete.md)