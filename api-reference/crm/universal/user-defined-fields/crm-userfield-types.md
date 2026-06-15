# Получить список типов пользовательских полей crm.userfield.types

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `crm.userfield.types` получает доступные типы пользовательских полей.

Возвращаются типы:
- `string` — строка
- `integer` — целое число
- `double` — число
- `boolean` — да/нет
- `datetime` — дата и время
- `enumeration` — список
- `iblock_section` — привязка к разделам инф. блоков
- `iblock_element` — привязка к элементам инфоблоков
- `employee` — привязка к сотруднику
- `crm_status` — привязка к справочнику CRM
- `crm` — привязка к элементам CRM
- `address` — адрес Google карты
- `money` — деньги
- `url` — ссылка

Также метод возвращает [пользовательские типы](./userfield-type.md), зарегистрированные текущим приложением.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.userfield.types
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.userfield.types
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each item returned in result[]
    type UserfieldTypeItem = {
      ID: string
      title: string
    }

    try {
      const response = await $b24.actions.v2.call.make<UserfieldTypeItem[]>({
        method: 'crm.userfield.types',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Field types:', result.length, result.map(t => t.ID))
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
      async function getUserfieldTypes() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.userfield.types',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Field types:', result.length, result.map(t => t.ID))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getUserfieldTypes)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.userfield.types',
                []
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
        "crm.userfield.types",
        {},
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
        'crm.userfield.types',
        []
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "string",
            "title": "Строка"
        },
        {
            "ID": "integer",
            "title": "Целое число"
        },
        {
            "ID": "double",
            "title": "Число"
        },
        {
            "ID": "boolean",
            "title": "Да/Нет"
        },
        {
            "ID": "enumeration",
            "title": "Список"
        },
        {
            "ID": "datetime",
            "title": "Дата/Время"
        },
        {
            "ID": "date",
            "title": "Дата"
        },
        {
            "ID": "money",
            "title": "Деньги"
        },
        {
            "ID": "url",
            "title": "Ссылка"
        },
        {
            "ID": "address",
            "title": "Адрес Google карты"
        },
        {
            "ID": "file",
            "title": "Файл"
        },
        {
            "ID": "employee",
            "title": "Привязка к пользователю"
        },
        {
            "ID": "crm_status",
            "title": "Привязка к справочникам CRM"
        },
        {
            "ID": "iblock_section",
            "title": "Привязка к разделам инф. блоков"
        },
        {
            "ID": "iblock_element",
            "title": "Привязка к элементам инфоблоков"
        },
        {
            "ID": "crm",
            "title": "Привязка к элементам CRM"
        }
    ],
    "time": {
        "start": 1773992560,
        "finish": 1773992560.044522,
        "duration": 0.04452204704284668,
        "processing": 0,
        "date_start": "2026-03-20T10:42:40+03:00",
        "date_finish": "2026-03-20T10:42:40+03:00",
        "operating_reset_at": 1773993160,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив объектов с поддерживаемыми типами [(подробное описание)](#result) ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Код типа пользовательского поля ||
|| **title**
[`string`](../../data-types.md) | Название типа пользовательского поля ||
|#

## Обработка ошибок

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-userfield-fields.md)
- [{#T}](./crm-userfield-settings-fields.md)
- [{#T}](./crm-userfield-enumeration-fields.md)
