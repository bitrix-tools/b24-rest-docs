# Получить поля шаблона документа crm.documentgenerator.template.getfields

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов, правом на изменение указанного шаблона и доступом к данным указанного CRM-элемента

Метод `crm.documentgenerator.template.getfields` возвращает карточку полей шаблона: какие поля доступны, их текущие значения, значения по умолчанию и служебные признаки.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**^*^
[`integer`](../../../data-types.md) | Идентификатор шаблона ||
|| **entityTypeId**^*^
[`integer`](../../../data-types.md) | Идентификатор типа CRM-элемента. Нужен для выбора провайдера данных ||
|| **entityId**
[`integer`](../../../data-types.md) | Идентификатор CRM-элемента, данные которого будут использованы для вычисления значений полей. Если параметр не передан, используется `null` ||
|| **values**
[`object`](../../../data-types.md) | Дополнительные значения для вычисления полей без изменения данных CRM [(подробное описание)](#parameter-values-fields). Влияние значения зависит от поля и логики провайдера. По умолчанию — пустой объект ||
|#

### Параметр values {#parameter-values-fields}

Ключи `values` — коды полей шаблона, а значения — дополнительные данные для вычисления этих полей. Состав полей зависит от шаблона и выбранного CRM-элемента. Например: `{"DocumentNumber": "2026-001"}`.

Метод берет данные по `entityTypeId` и `entityId` и вычисляет поля шаблона с учетом `values` и логики провайдера. Если `values` не передан, используются исходные данные CRM и логика шаблона.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения полей шаблона документа, где:
- идентификатор шаблона — `1`
- идентификатор типа CRM-элемента — `2` (сделка)
- идентификатор CRM-элемента — `123`
- значение поля `DocumentNumber` — `2026-001`

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"entityTypeId":2,"entityId":123,"values":{"DocumentNumber":"2026-001"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.documentgenerator.template.getfields
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":1,"entityTypeId":2,"entityId":123,"values":{"DocumentNumber":"2026-001"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.documentgenerator.template.getfields
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type GetFieldsResult = {
      templateFields: Record<string, TemplateField>
    }

    type TemplateField = {
      title?: string
      value: string | string[] | Array<{ value: string; title: string; selected: boolean }> | null
      default?: string | null
      required?: string
      type?: string
      group?: string[]
      chain?: string
    }

    try {
      const response = await $b24.actions.v2.call.make<GetFieldsResult>({
        method: 'crm.documentgenerator.template.getfields',
        params: {
          id: 1,
          entityTypeId: 2,
          entityId: 123,
          values: {
            DocumentNumber: '2026-001',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Template fields:', Object.keys(result.templateFields))
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
      async function getTemplateFields() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.documentgenerator.template.getfields',
            params: {
              id: 1,
              entityTypeId: 2,
              entityId: 123,
              values: {
                DocumentNumber: '2026-001',
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
          console.info('Template fields:', Object.keys(result.templateFields))
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getTemplateFields)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.crm.documentgenerator.template.getfields(
            bitrix_id=1,
            entity_type_id=2,
            entity_id=123,
            values={
                "DocumentNumber": "2026-001",
            },
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
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.documentgenerator.template.getfields',
                [
                    'id' => 1,
                    'entityTypeId' => 2,
                    'entityId' => 123,
                    'values' => [
                        'DocumentNumber' => '2026-001',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo '<pre>';
        print_r($result);
        echo '</pre>';

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting template fields: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.documentgenerator.template.getfields',
        {
            id: 1,
            entityTypeId: 2,
            entityId: 123,
            values: {
                DocumentNumber: '2026-001',
            },
        },
        (result) => {
            result.error()
                ? console.error(result.error())
                : console.info(result.data())
            ;
        },
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'crm.documentgenerator.template.getfields',
        [
            'id' => 1,
            'entityTypeId' => 2,
            'entityId' => 123,
            'values' => [
                'DocumentNumber' => '2026-001',
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "crm.documentgenerator.template.getfields", b24.Params{
    	"id":           1,
    	"entityTypeId": 2,
    	"entityId":     123,
    	"values": b24.Params{
    		"DocumentNumber": "2026-001",
    	},
    }, b24.WithIdempotent())
    if err != nil {
    	return fmt.Errorf("crm.documentgenerator.template.getfields: %w", err)
    }

    // Метод заворачивает ответ в объект с ключом "templateFields".
    raw, ok := b24.Unwrap(res.Result, "templateFields")
    if !ok {
    	return fmt.Errorf("в ответе нет ключа templateFields")
    }

    fmt.Printf("%s\n", raw)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример ответа сокращен: состав и количество полей зависят от шаблона.

```json
{
    "result": {
        "templateFields": {
            "DocumentNumber": {
                "title": "Номер",
                "value": "2026-001",
                "required": "Y",
                "group": [
                    "Документ"
                ],
                "chain": "this.DOCUMENT.DOCUMENT_NUMBER",
                "default": "2026-001"
            },
            "MyCompanyUfLogo": {
                "title": "Логотип",
                "value": null,
                "type": "IMAGE",
                "group": [
                    "Документ",
                    "Моя компания"
                ],
                "chain": "this.SOURCE.MY_COMPANY.UF_LOGO",
                "default": null
            },
            "MY_COMPANY": {
                "title": "Моя компания",
                "value": [
                    {
                        "value": "340",
                        "title": "Колесо Фортуны",
                        "selected": true
                    },
                    {
                        "value": "358",
                        "title": "Битрикс-Разработка",
                        "selected": false
                    }
                ],
                "group": [
                    "Документ",
                    "Моя компания"
                ]
            }
        }
    },
    "time": {
        "start": 1773821944,
        "finish": 1773821944.196063,
        "duration": 0.19606304168701172,
        "processing": 0,
        "date_start": "2026-03-18T11:19:04+03:00",
        "date_finish": "2026-03-18T11:19:04+03:00",
        "operating_reset_at": 1773822544,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Корневой элемент ответа. Содержит объект [`templateFields`](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Тип result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateFields**
[`object`](../../../data-types.md) | Объект полей шаблона, где ключом является код поля, а значением — структура [`templateField`](#templatefield) ||
|#

#### Тип templateField {#templatefield}

Набор свойств зависит от поля. Например, `title` и `group` могут отсутствовать.

#|
|| **Название**
`тип` | **Описание** ||
|| **title**
[`string`](../../../data-types.md) | Название поля ||
|| **value**
```string | array | null``` | Текущее значение поля. Для поля выбора массив может содержать [объекты вариантов значения](#choice-value) ||
|| **default**
```string | null``` | Значение поля по умолчанию ||
|| **required**
[`char`](../../../data-types.md) | Признак обязательности поля: `Y` или `N` ||
|| **type**
[`string`](../../../data-types.md) | Тип поля, например `IMAGE` ||
|| **group**
[`array`](../../../data-types.md) | Группы, к которым относится поле ||
|| **chain**
[`string`](../../../data-types.md) | Путь поля в провайдере данных, например `this.SOURCE.MY_COMPANY.UF_LOGO` ||
|#

#### Вариант значения поля выбора {#choice-value}

#|
|| **Название**
`тип` | **Описание** ||
|| **value**
[`string`](../../../data-types.md) | Значение варианта ||
|| **title**
[`string`](../../../data-types.md) | Название варианта ||
|| **selected**
[`boolean`](../../../data-types.md) | Выбран ли вариант ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DOCGEN_ACCESS_ERROR",
    "error_description": "Access denied"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {entityTypeId} | Не передан идентификатор типа CRM-элемента ||
|| `400` | `DOCGEN_ACCESS_ERROR` | Access denied | Нет доступа к данным CRM-элемента ||
|| `400` | `0` | Шаблон не найден | Шаблон с указанным `id` не найден ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан идентификатор шаблона ||
|| `400` | `0` | Cannot get fields from deleted template | Нельзя получить поля удаленного шаблона ||
|| `400` | `0` | You do not have permissions to modify templates | Недостаточно прав для изменения шаблонов генератора документов ||
|| `400` | `0` | Module documentgenerator is not installed | Модуль `documentgenerator` недоступен ||
|| `400` | `0` | You do not have permissions to modify this template | Недостаточно прав для изменения указанного шаблона ||
|| `400` | `0` | No provider for entityTypeId | Для указанного `entityTypeId` не найден провайдер данных ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./crm-document-generator-template-add.md)
- [{#T}](./crm-document-generator-template-update.md)
- [{#T}](./crm-document-generator-template-get.md)
- [{#T}](./crm-document-generator-template-list.md)
- [{#T}](./crm-document-generator-template-delete.md)
- [{#T}](../documents/crm-document-generator-document-get-fields.md)
- [{#T}](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
