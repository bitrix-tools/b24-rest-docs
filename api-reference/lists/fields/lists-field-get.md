# Получить параметры поля или список полей универсального списка lists.field.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Чтение» для нужного списка

Метод `lists.field.get` возвращает данные о поле или список полей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп 
  
Идентификатор можно получить с помощью метода [lists.get.iblock.type.id](../lists/lists-get-iblock-type-id.md) ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **FIELD_ID**
[`string`](../../data-types.md) | Идентификатор поля. Для пользовательского поля имеет вид `PROPERTY_PropertyId`. Для системного поля является его символьным кодом.

Если не указать, возвращаются все поля списка ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/lists.field.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":"123","FIELD_ID":"PROPERTY_1151","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.field.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type FieldsGetResult = Record<string, FieldItem>

    type FieldItem = {
      FIELD_ID: string
      SORT: number
      NAME: string
      IS_REQUIRED: string
      MULTIPLE: string
      DEFAULT_VALUE: string
      TYPE: string
      PROPERTY_TYPE: string
      PROPERTY_USER_TYPE: boolean | null
      CODE: string
      ID: string
      LINK_IBLOCK_ID: string | null
      ROW_COUNT: string
      COL_COUNT: string
      USER_TYPE_SETTINGS: unknown | null
      SETTINGS: Record<string, string>
      DISPLAY_VALUES_FORM: Record<string, string>
    }

    try {
      const response = await $b24.actions.v2.call.make<FieldsGetResult>({
        method: 'lists.field.get',
        params: {
          IBLOCK_TYPE_ID: 'lists',
          IBLOCK_ID: '123',
          FIELD_ID: 'PROPERTY_1151',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(Object.keys(result).map(key => `${key}: ${result[key].NAME}`))
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
      async function fetchFieldData() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'lists.field.get',
            params: {
              IBLOCK_TYPE_ID: 'lists',
              IBLOCK_ID: '123',
              FIELD_ID: 'PROPERTY_1151',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(Object.keys(result).map(key => `${key}: ${result[key].NAME}`))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', fetchFieldData)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.field.get',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => '123',
                    'FIELD_ID' => 'PROPERTY_1151'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching field: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.field.get',
        {
            'IBLOCK_TYPE_ID': 'lists', 
            'IBLOCK_ID': '123',        
            'FIELD_ID': 'PROPERTY_1151'
        },
        function(result) { 
            if (result.error()) {
                console.error(result.error());
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
        'lists.field.get',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => '123',
            'FIELD_ID' => 'PROPERTY_1151'
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
        "L": {
        "FIELD_ID": "PROPERTY_1151",
        "SORT": 50,
        "NAME": "Статус задачи",
        "IS_REQUIRED": "N",
        "MULTIPLE": "N",
        "DEFAULT_VALUE": "1685",
        "TYPE": "L",
        "PROPERTY_TYPE": "L",
        "PROPERTY_USER_TYPE": false,
        "CODE": "PROJECT",
        "ID": "1151",
        "LINK_IBLOCK_ID": null,
        "ROW_COUNT": "1",
        "COL_COUNT": "30",
        "USER_TYPE_SETTINGS": null,
        "SETTINGS": {
            "SHOW_ADD_FORM": "Y",
            "SHOW_EDIT_FORM": "Y",
            "ADD_READ_ONLY_FIELD": "N",
            "EDIT_READ_ONLY_FIELD": "Y",
            "SHOW_FIELD_PREVIEW": "N"
        },
        "DISPLAY_VALUES_FORM": {
            "1669": "Планирование",
            "1671": "В активной работе",
            "1673": "Тестирование",
            "1675": "Завершен",
            "1677": "Отложен",
            "1679": "Архив"
        }
        }
    },
    "time": {
        "start": 1765375929,
        "finish": 1765375929.696936,
        "duration": 0.6969358921051025,
        "processing": 0,
        "date_start": "2025-12-10T12:12:09+03:00",
        "date_finish": "2025-12-10T12:12:09+03:00",
        "operating_reset_at": 1765376529,
        "operating": 0
    }
    }
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Данные поля или массив полей.

Пустой массив означает, что в списке нет полей с указанным `FIELD_ID` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter `X` is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_IBLOCK_NOT_FOUND` | Iblock not found | Инфоблок не найден ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для чтения ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-field-add.md)
- [{#T}](./lists-field-update.md)
- [{#T}](./lists-field-delete.md)
- [{#T}](./lists-field-type-get.md)