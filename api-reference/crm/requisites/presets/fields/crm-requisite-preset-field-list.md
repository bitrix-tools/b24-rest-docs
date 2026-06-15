# Получить список всех настраиваемых полей заданного шаблона реквизитов crm.requisite.preset.field.list

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список всех настраиваемых полей для определенного шаблона реквизитов.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **preset***
[`object`](../../../../data-types.md) | Объект, содержащий значение идентификатора шаблона, из которого извлекается список настраиваемых полей (например, `{"ID": 27}`). Идентификаторы шаблонов можно получить с помощью метода [crm.requisite.preset.list](../crm-requisite-preset-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.requisite.preset.field.list
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"preset":{"ID":27},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.requisite.preset.field.list
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each item returned in result[]
    type PresetFieldItem = {
      ID: number
      FIELD_NAME: string
      FIELD_TITLE: string
      IN_SHORT_LIST: string
      SORT: number
    }

    try {
      // crm.requisite.preset.field.list returns a single page (max 50 records). For the whole result set
      // use a list helper: $b24.actions.v2.callList.make() returns every record as one
      // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
      // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
      // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
      const response = await $b24.actions.v2.call.make<PresetFieldItem[]>({
        method: 'crm.requisite.preset.field.list',
        params: {
          preset: {
            ID: 27,
          },
          start: 0,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Preset fields:', result.length, result)
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
      async function listPresetFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          // crm.requisite.preset.field.list returns a single page (max 50 records). For the whole result set
          // use a list helper: $b24.actions.v2.callList.make() returns every record as one
          // array, $b24.actions.v2.fetchList.make() yields them in chunks (async generator).
          // NOTE: the list helpers do not accept `order` (it is excluded from their params, so
          // passing it is a TS error) — keep this call.make + `start` variant when sort matters.
          const response = await $b24.actions.v2.call.make({
            method: 'crm.requisite.preset.field.list',
            params: {
              preset: {
                ID: 27,
              },
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
          console.info('Preset fields:', result.length, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', listPresetFields)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.requisite.preset.field.list',
                [
                    'preset' => [
                        'ID' => 27
                    ]
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error fetching preset field list: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "crm.requisite.preset.field.list",
        {
            preset:
            {
                "ID": 27
            }
        },
        function(result)
        {
            if(result.error())
                console.error(result.error());
            else
                console.dir(result.data());
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.requisite.preset.field.list',
        [
            'preset' => ['ID' => 27]
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
            "ID": 1,
            "FIELD_NAME": "RQ_INN",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 510
        },
        {
            "ID": 2,
            "FIELD_NAME": "RQ_COMPANY_NAME",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 520
        },
        {
            "ID": 3,
            "FIELD_NAME": "RQ_COMPANY_FULL_NAME",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 530
        },
        {
            "ID": 4,
            "FIELD_NAME": "RQ_OGRN",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 540
        },
        {
            "ID": 5,
            "FIELD_NAME": "RQ_KPP",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 550
        },
        {
            "ID": 6,
            "FIELD_NAME": "RQ_COMPANY_REG_DATE",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 560
        },
        {
            "ID": 7,
            "FIELD_NAME": "RQ_OKPO",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 570
        },
        {
            "ID": 8,
            "FIELD_NAME": "RQ_OKTMO",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 580
        },
        {
            "ID": 9,
            "FIELD_NAME": "RQ_DIRECTOR",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 590
        },
        {
            "ID": 10,
            "FIELD_NAME": "RQ_ACCOUNTANT",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 600
        },
        {
            "ID": 11,
            "FIELD_NAME": "RQ_ADDR",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 610
        },
        {
            "ID": 12,
            "FIELD_NAME": "RQ_SIGNATURE",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 620
        },
        {
            "ID": 13,
            "FIELD_NAME": "RQ_STAMP",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "N",
            "SORT": 630
        },
        {
            "ID": 14,
            "FIELD_NAME": "UF_CRM_1703689889",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 640
        },
        {
            "ID": 15,
            "FIELD_NAME": "UF_CRM_1703690003",
            "FIELD_TITLE": "",
            "IN_SHORT_LIST": "Y",
            "SORT": 650
        }
    ],
    "time": {
        "start": 1716895759.934609,
        "finish": 1716895760.407579,
        "duration": 0.47297000885009766,
        "processing": 0.023286104202270508,
        "date_start": "2024-05-28T13:29:19+02:00",
        "date_finish": "2024-05-28T13:29:20+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../../../data-types.md)| Массив объектов, описывающих настраиваемые поля шаблона реквизитов. Каждый элемент содержит [поля](#fields) настраиваемого поля шаблона ||
|| **total**
[`integer`](../../../../data-types.md) | Общее количество найденных записей ||
|| **time**
[`time`](../../../../data-types.md) | Информация о времени выполнения запроса ||
|#

### Поля, описывающие настраиваемое поле шаблона реквизитов {#fields}

#|
||  **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../../data-types.md) | Идентификатор поля. Создается автоматически и уникален в рамках шаблона ||
|| **FIELD_NAME**
[`string`](../../../../data-types.md) | Название поля ||
|| **FIELD_TITLE**
[`string`](../../../../data-types.md) | Альтернативное название поля для реквизита.

Альтернативное название отображается в различных формах для заполнения реквизитов. В зависимости от конкретной формы альтернативное название может использоваться или нет 
||
|| **SORT**
[`integer`](../../../../data-types.md) | Сортировка. Порядок в списке полей шаблона || 
|| **IN_SHORT_LIST**
[`char`](../../../../data-types.md) | Показывать в кратком списке. Устаревшее поле, сейчас не используется. Оставлено для обратной совместимости. Может принимать значения `Y` или `N` ||
|#

## Обработка ошибок

HTTP-статус: **40x**, **50x**

```json
{
    "error": "",
    "error_description": "The Preset with ID '27' is not found"
}
```

{% include notitle [обработка ошибок](../../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|  
|| **Код** | **Описание** ||
|| `The Preset with ID '27' is not found` | Шаблон с указанным идентификатором не найден ||
|| `Access denied` | Недостаточно прав доступа для получения списка настраиваемых полей шаблона ||
|#

{% include [системные ошибки](../../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-requisite-preset-field-add.md)
- [{#T}](./crm-requisite-preset-field-update.md)
- [{#T}](./crm-requisite-preset-field-available-to-add.md)
- [{#T}](./crm-requisite-preset-field-get.md)
- [{#T}](./crm-requisite-preset-field-delete.md)
- [{#T}](./crm-requisite-preset-field-fields.md)