# Получить параметры карточки сделки crm.deal.details.configuration.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
> - пользователь может получать свои и общие настройки
> - получить личные настройки другого пользователя можно при наличии прав на редактирование персонального вида для пользователя

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md).

{% endnote %}

Метод `crm.deal.details.configuration.get` получает настройки карточки сделки. Метод читает личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

{% note info %}

Настройки карточки сделок в разных воронках могут отличаться. Для выбора воронки используйте параметр `extras.dealCategoryId`.

{% endnote %}

## Параметры метода

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек.

Возможные значения:
- `P` — личные настройки
- `C` — общие настройки

По умолчанию — `P`
||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя. Нужен только при запросе личных настроек другого пользователя.

Если не задан, берется текущий
||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры [(подробное описание)](#parameter-extras) ||
|#

### Параметр extras {#parameter-extras}

{% include [Сноска о параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **dealCategoryId**
[`integer`](../../../data-types.md) | Идентификатор воронки сделок. Можно получить с помощью [crm.category.list](../../universal/category/crm-category-list.md)

Если не указан, используется воронка по умолчанию для сделок
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

Пример получения общей конфигурации карточки сделки для воронки с `id = 32`.

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"C","extras":{"dealCategoryId":32}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.deal.details.configuration.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"scope":"C","extras":{"dealCategoryId":32},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/crm.deal.details.configuration.get
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each section returned in result[]
    type CrmDealDetailsSection = {
      name: string
      title: string
      type: string
      elements: CrmDealDetailsSectionElement[]
    }

    type CrmDealDetailsSectionElement = {
      name: string
      optionFlags?: string
      options?: Record<string, unknown>
    }

    try {
      const response = await $b24.actions.v2.call.make<CrmDealDetailsSection[] | null>({
        method: 'crm.deal.details.configuration.get',
        params: {
          scope: 'C',
          extras: {
            dealCategoryId: 32,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Card sections:', result?.length ?? 0, result)
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
      async function getDealCardConfiguration() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'crm.deal.details.configuration.get',
            params: {
              scope: 'C',
              extras: {
                dealCategoryId: 32,
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
          console.info('Card sections:', result?.length ?? 0, result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getDealCardConfiguration)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'crm.deal.details.configuration.get',
                [
                    'scope' => 'C',
                    'extras' => [
                        'dealCategoryId' => 32,
                    ],
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Data: ' . print_r($result->data(), true);
        }
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting deal details configuration: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'crm.deal.details.configuration.get',
        {
            scope: "C",
            extras: {
                dealCategoryId: 32,
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
        'crm.deal.details.configuration.get',
        [
            'scope' => 'C',
            'extras' => [
                'dealCategoryId' => 32,
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

    client: BaseClient

    try:
        bitrix_response = client.crm.deal.details.configuration.get(
            scope="P",
            user_id=1,
            extras={"dealCategoryId": 0},
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
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "name": "main",
            "title": "О сделке",
            "type": "section",
            "elements": [
                {
                    "name": "TITLE"
                },
                {
                    "name": "OPPORTUNITY_WITH_CURRENCY"
                },
                {
                    "name": "STAGE_ID"
                },
                {
                    "name": "CLOSEDATE"
                },
                {
                    "name": "CLIENT"
                }
            ]
        },
        {
            "name": "additional",
            "title": "Дополнительно",
            "type": "section",
            "elements": [
                {
                    "name": "TYPE_ID"
                },
                {
                    "name": "SOURCE_ID",
                    "optionFlags": "1"
                },
                {
                    "name": "SOURCE_DESCRIPTION"
                },
                {
                    "name": "BEGINDATE"
                },
                {
                    "name": "OPENED"
                },
                {
                    "name": "ASSIGNED_BY_ID"
                },
                {
                    "name": "OBSERVER"
                },
                {
                    "name": "COMMENTS"
                },
                {
                    "name": "UTM"
                }
            ]
        },
        {
            "name": "products",
            "title": "Товары",
            "type": "section",
            "elements": [
                {
                    "name": "PRODUCT_ROW_SUMMARY"
                }
            ]
        },
        {
            "name": "recurring",
            "title": "Регулярная сделка",
            "type": "section",
            "elements": [
                {
                    "name": "RECURRING"
                }
            ]
        }
    ],
    "time": {
        "start": 1773240673,
        "finish": 1773240673.91616,
        "duration": 0.9161601066589355,
        "processing": 0,
        "date_start": "2026-03-11T17:51:13+03:00",
        "date_finish": "2026-03-11T17:51:13+03:00",
        "operating_reset_at": 1773241273,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section)\|`null` | Корневой элемент ответа. Содержит конфигурацию разделов детальной карточки сделки. Возвращает `null` в случае отсутствия конфигурации ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Параметр section {#section}

Описывает отдельный раздел с полями внутри карточки сделки

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Уникальное название раздела, используемое для идентификации ||
|| **title**
[`string`](../../../data-types.md) | Название раздела ||
|| **type**
[`string`](../../../data-types.md) | Тип раздела ||
|| **elements**
[`section_element[]`](#section_element) | Список выводимых в карточке полей с дополнительными настройками ||
|#

### Параметр section_element {#section_element}

Конфигурация отдельного поля внутри раздела

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Идентификатор поля ||
|| **optionFlags**
[`string`](../../../data-types.md) | Значения:
- `"1"` — показывать всегда
- `"0"` — показывать не всегда
||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Access denied."
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Access denied | Нет прав на получение настроек карточки сделки ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-deal-details-configuration-set.md)
- [{#T}](./crm-deal-details-configuration-reset.md)
- [{#T}](./crm-deal-details-configuration-force-common-scope-for-all.md)





