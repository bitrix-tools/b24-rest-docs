# Добавить тип плательщика sale.persontype.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод добавляет новый тип плательщика.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **fields***
[`object`](../../data-types.md) | Значения полей (подробное описание приведено [ниже](#parametr-fields)) для создания нового типа плательщика в виде структуры:

```js
fields: {
    name: 'значение',
    code: 'значение',
    sort: 'значение',
    active: 'значение',
    xmlId: 'значение'
}
```

||
|#

### Параметр fields

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **name***
[`string`](../../data-types.md) | Название типа плательщика ||
|| **code**
[`string`](../../data-types.md) | Код типа плательщика. Должен быть уникальным ||
|| **sort**
[`string`](../../data-types.md) | Сортировка. По умолчанию значение равно `150` ||
|| **active**
[`string`](../../data-types.md) | Флаг активности. Может принимать значения `Y` / `N`. По умолчанию установлено `Y` ||
|| **xmlId**
[`string`](../../data-types.md) | Внешний идентификатор.

Можно использовать для синхронизации текущего типа плательщика с аналогичной позицией во внешней системе
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Физическое лицо","sort":"100","active":"Y","code":"MY_CRM_COMPANY","xmlId":"myXmlId"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sale.persontype.add
    ```

- cURL (OAuth)

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"fields":{"name":"Физическое лицо","sort":"100","active":"Y","code":"MY_CRM_COMPANY","xmlId":"myXmlId"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sale.persontype.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PersonTypeAddResult = {
      personType: {
        active: string
        code: string
        id: number
        name: string
        sort: string
        xmlId: string
      }
    }

    try {
      const response = await $b24.actions.v2.call.make<PersonTypeAddResult>({
        method: 'sale.persontype.add',
        params: {
          fields: {
            name: 'Natural person',
            sort: '100',
            active: 'Y',
            code: 'MY_CRM_COMPANY',
            xmlId: 'myXmlId',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.personType)
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
      async function addPersonType() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'sale.persontype.add',
            params: {
              fields: {
                name: 'Natural person',
                sort: '100',
                active: 'Y',
                code: 'MY_CRM_COMPANY',
                xmlId: 'myXmlId',
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info(result.personType)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addPersonType)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'sale.persontype.add',
                [
                    'fields' => [
                        'name'   => 'Физическое лицо',
                        'sort'   => '100',
                        'active' => 'Y',
                        'code'   => 'MY_CRM_COMPANY',
                        'xmlId'  => 'myXmlId',
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
            echo 'Error: ' . $result->error();
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding person type: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'sale.persontype.add', 
        {
            fields: {
                name: 'Физическое лицо',
                sort: '100',
                active: 'Y',
                code: 'MY_CRM_COMPANY',
                xmlId: 'myXmlId'
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'sale.persontype.add',
        [
            'fields' => [
                'name' => 'Физическое лицо',
                'sort' => '100',
                'active' => 'Y',
                'code' => 'MY_CRM_COMPANY',
                'xmlId' => 'myXmlId'
            ]
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
        "personType": {
            "active": "Y",
            "code": "MY_CRM_COMPANY",
            "id": 68,
            "name": "Физическое лицо",
            "sort": "100",
            "xmlId": "myXmlId"
        }
    },
    "time": {
        "start": 1712325812.35051,
        "finish": 1712325812.58676,
        "duration": 0.236255884170532,
        "processing": 0.011207103729248,
        "date_start": "2024-04-05T16:03:32+02:00",
        "date_finish": "2024-04-05T16:03:32+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Корневой элемент ответа ||
|| **personType**
[`sale_person_type`](../data-types.md) | Объект с информацией о добавленном типе плательщика ||
|| **time**
[`time`](../../data-types.md) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": 200750000005,
    "error_description": "person type code exists"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `200750000005` | Недостаточно прав для выполнения метода ||
|| `200750000001`
`200750000006 ` | Не удалось создать новый тип плательщика ||
|| `200040300020` | Нет доступа к редактированию ||
|| `100` | Не передан обязательный параметр `fields` ||
|| `0` | Не установлены обязательные поля ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}