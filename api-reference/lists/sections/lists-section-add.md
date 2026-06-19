# Создать раздел универсального списка lists.section.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`lists`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «Изменение» для нужного списка

Метод `lists.section.add` создает раздел списка.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **IBLOCK_TYPE_ID***
[`string`](../../data-types.md) | Идентификатор типа инфоблока. Возможные значения: 
- `lists` — тип инфоблока списка 
- `bitrix_processes` — тип инфоблока процессов 
- `lists_socnet` — тип инфоблока списков групп ||
|| **IBLOCK_ID***
[`integer`](../../data-types.md) | Идентификатор инфоблока.

Идентификатор можно получить с помощью метода [lists.get](../lists/lists-get.md) ||
|| **IBLOCK_CODE*** 
[`string`](../../data-types.md) | Cимвольный код инфоблока.

Код можно получить с помощью метода [lists.get](../lists/lists-get.md)

{% note info "" %}

Необходимо указать хотя бы один из параметров: `IBLOCK_ID` или `IBLOCK_CODE`

{% endnote %} ||
|| **IBLOCK_SECTION_ID**
[`integer`](../../data-types.md) | Идентификатор родительского раздела.

Если параметр не передается, раздел создается в корне списка. Значение по умолчанию — `0`.

Идентификатор можно получить с помощью метода [lists.section.get](./lists-section-get.md) ||
|| **SECTION_CODE***
[`string`](../../data-types.md) | Символьный код раздела ||
|| **FIELDS***
[`array`](../../data-types.md) | Массив полей.

[Подробное описание](#parametr-fields) ||
|#

### Параметр FIELDS {#parametr-fields}

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NAME***
[`string`](../../data-types.md) | Название раздела ||
|| **EXTERNAL_ID**
[`string`](../../data-types.md) | Внешний идентификатор раздела ||
|| **XML_ID**
[`string`](../../data-types.md) | Внешний идентификатор (XML ID) ||
|| **SORT**
[`integer`](../../data-types.md) | Сортировка ||
|| **ACTIVE**
[`string`](../../data-types.md) | Признак активности. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **PICTURE**
[`array`](../../data-types.md) | Устаревший.

Картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Устаревший.

Описание ||
|| **DESCRIPTION_TYPE**
[`string`](../../data-types.md) | Устаревший.

Тип описания. Возможные значения:
- `text` — текст
- `html` — HTML

По умолчанию устанавливается `text` ||
|| **DETAIL_PICTURE**
[`array`](../../data-types.md) | Устаревший.

Детальная картинка. Объект в формате `{fileData: [value1, value2]}`, где `value1` — название файла картинки с расширением, `value2` — картинка в формате base64. 

Для удаления картинки используется объект в формате `{remove: 'Y'}` ||
|| **SECTION_PROPERTY**
[`array`](../../data-types.md) | Устаревший.

Пользовательские свойства ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"IBLOCK_SECTION_ID":0,"SECTION_CODE":"marketing_documents","FIELDS":{"NAME":"Документы отдела маркетинга","EXTERNAL_ID":"ext_marketing_docs_001","XML_ID":"xml_marketing_docs_001","SORT":500,"ACTIVE":"Y"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/lists.section.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"IBLOCK_TYPE_ID":"lists","IBLOCK_ID":95,"IBLOCK_SECTION_ID":0,"SECTION_CODE":"marketing_documents","FIELDS":{"NAME":"Документы отдела маркетинга","EXTERNAL_ID":"ext_marketing_docs_001","XML_ID":"xml_marketing_docs_001","SORT":500,"ACTIVE":"Y"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/lists.section.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<number>({
        method: 'lists.section.add',
        params: {
          IBLOCK_TYPE_ID: 'lists',
          IBLOCK_ID: 95,
          IBLOCK_SECTION_ID: 0,
          SECTION_CODE: 'marketing_documents',
          FIELDS: {
            NAME: 'Marketing department documents',
            EXTERNAL_ID: 'ext_marketing_docs_001',
            XML_ID: 'xml_marketing_docs_001',
            SORT: 500,
            ACTIVE: 'Y',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created section ID:', result)
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
      async function addListsSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'lists.section.add',
            params: {
              IBLOCK_TYPE_ID: 'lists',
              IBLOCK_ID: 95,
              IBLOCK_SECTION_ID: 0,
              SECTION_CODE: 'marketing_documents',
              FIELDS: {
                NAME: 'Marketing department documents',
                EXTERNAL_ID: 'ext_marketing_docs_001',
                XML_ID: 'xml_marketing_docs_001',
                SORT: 500,
                ACTIVE: 'Y',
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
          console.info('Created section ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addListsSection)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'lists.section.add',
                [
                    'IBLOCK_TYPE_ID' => 'lists',
                    'IBLOCK_ID' => 95,
                    'IBLOCK_SECTION_ID' => 0,
                    'SECTION_CODE' => 'marketing_documents',
                    'FIELDS' => [
                        'NAME' => 'Документы отдела маркетинга',
                        'EXTERNAL_ID' => 'ext_marketing_docs_001',
                        'XML_ID' => 'xml_marketing_docs_001',
                        'SORT' => 500,
                        'ACTIVE' => 'Y',
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'lists.section.add',
        {
            IBLOCK_TYPE_ID: 'lists', 
            IBLOCK_ID: 95,                              
            IBLOCK_SECTION_ID: 0,
            SECTION_CODE: 'marketing_documents',  

            FIELDS: {
                NAME: 'Документы отдела маркетинга',                     
                EXTERNAL_ID: 'ext_marketing_docs_001', 
                XML_ID: 'xml_marketing_docs_001',                                         
                SORT: 500,                         
                ACTIVE: 'Y',                                                                        
            }
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
        'lists.section.add',
        [
            'IBLOCK_TYPE_ID' => 'lists',
            'IBLOCK_ID' => 95,
            'IBLOCK_SECTION_ID' => 0,
            'SECTION_CODE' => 'marketing_documents',
            'FIELDS' => [
                'NAME' => 'Документы отдела маркетинга',
                'EXTERNAL_ID' => 'ext_marketing_docs_001',
                'XML_ID' => 'xml_marketing_docs_001',
                'SORT' => 500,
                'ACTIVE' => 'Y',
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
    "result": 169,
    "time": {
        "start": 1761554216,
        "finish": 1761554216.280577,
        "duration": 0.2805769443511963,
        "processing": 0,
        "date_start": "2025-10-27T11:36:56+03:00",
        "date_finish": "2025-10-27T11:36:56+03:00",
        "operating_reset_at": 1761554816,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного раздела ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error":"ERROR_REQUIRED_PARAMETERS_MISSING",
    "error_description":"Required parameter is missing"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `ERROR_REQUIRED_PARAMETERS_MISSING` | Required parameter `X` is missing | Обязательный параметр не передан ||
|| `ERROR_ADD_SECTION` | — | Ошибка при добавлении раздела ||
|| `ACCESS_DENIED` | Access denied | Недостаточно прав для добавления раздела ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./lists-section-update.md)
- [{#T}](./lists-section-get.md)
- [{#T}](./lists-section-delete.md)