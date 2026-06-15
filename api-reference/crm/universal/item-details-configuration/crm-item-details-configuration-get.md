# Получить параметры карточки элементов crm.item.details.configuration.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: проверка прав при выполнении метода зависит от переданных данных:
>   - Любой пользователь имеет право получить свои и общие настройки
>   - Пользователь имеет право получить чужие настройки только если он является администратором

Метод `crm.item.details.configuration.get` возвращает настройки карточки определенного объекта CRM. Может работать как с личными настройками карточки указанного пользователя, так и с общими настройками, заданными для всех пользователей.

{% include [Памятка о extras](./_includes/extras_notice.md) %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**                                                                                                                    ||
|| **entityTypeId***
[`integer`][1] | Идентификатор [системного](../../index.md) или [пользовательского типа](../user-defined-object-types/index.md) объектов CRM ||
|| **userId**
[`user`][1] | Идентификатор пользователя, чью конфигурацию вы хотите получить.

Если данный параметр не передан, то будет взят `userId` пользователя, вызывающего данный метод.

Нужен только при запросе личных настроек
||
|| **scope**
[`string`][1] | Область применения настроек. Допустимые значения:
- `'P'` — личные настройки
- `'C'` — общие настройки

По умолчанию значение равно `'P'`

||
|| **extras**
[`object`][1] | Дополнительные параметры. Возможные значения и их структура описана [ниже](#extras) ||
|#

### extras

Параметр в `extras` зависит от объекта CRM.

#|
|| **Объект CRM** | **Название** | **Описание** ||
|| **Смарт-процесс** | `categoryId` | Идентификатор воронки смарт-процессов. Можно получить с помощью [`crm.category.list`](./../category/crm-category-list.md).

Если не указано, то берется идентификатор воронки по умолчанию для данного смарт-процесса ||
|| **Сделка** | `dealCategoryId` | Идентификатор воронки сделок. Можно получить с помощью [`crm.category.list`](./../category/crm-category-list.md).

Если не указан, то берется идентификатор воронки по умолчанию для сделок ||
|| **Лид** | `leadCustomerType` | Тип лидов. 

Возможные значения:
- `1` — простые лиды
- `2` — повторные лиды
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получить общую конфигурацию карточки элементов для сделок, находящихся в воронке с `id = 9`, для пользователя с `id = 1`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"userId":1,"scope":"C","extras":{"dealCategoryId":9}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":2,"userId":1,"scope":"C","extras":{"dealCategoryId":9},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.item.details.configuration.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type SectionElement = {
          name: string
          optionFlags: string
          options?: Record<string, string>
        }

        type Section = {
          name: string
          title: string
          type: string
          elements: SectionElement[]
        }

        try {
          const response = await $b24.actions.v2.call.make<Section[] | null>({
            method: 'crm.item.details.configuration.get',
            params: {
              entityTypeId: 2,
              userId: 1,
              scope: 'C',
              extras: {
                dealCategoryId: 9,
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Sections count:', result?.length ?? 0, 'first section:', result?.[0]?.name)
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
          async function getDetailsConfiguration() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.item.details.configuration.get',
                params: {
                  entityTypeId: 2,
                  userId: 1,
                  scope: 'C',
                  extras: {
                    dealCategoryId: 9,
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
              console.info('Sections count:', result?.length ?? 0, 'first section:', result?.[0]?.name)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getDetailsConfiguration)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.details.configuration.get',
            [
                'entityTypeId' => 2,
                'userId' => 1,
                'scope' => "C",
                'extras' => [
                    'dealCategoryId' => 9,
                ]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    {% endlist %}

2. Получить личную конфигурацию карточки элементов смарт-процесса с `entityTypeId = 1032` в воронке с `id = 5`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":1032,"extras":{"categoryId":5}}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.item.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"entityTypeId":1032,"extras":{"categoryId":5},"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.item.details.configuration.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type SectionElement = {
          name: string
          optionFlags: string
          options?: Record<string, string>
        }

        type Section = {
          name: string
          title: string
          type: string
          elements: SectionElement[]
        }

        try {
          const response = await $b24.actions.v2.call.make<Section[] | null>({
            method: 'crm.item.details.configuration.get',
            params: {
              entityTypeId: 1032,
              extras: {
                categoryId: 5,
              },
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Sections count:', result?.length ?? 0, 'first section:', result?.[0]?.name)
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
          async function getDetailsConfiguration() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.item.details.configuration.get',
                params: {
                  entityTypeId: 1032,
                  extras: {
                    categoryId: 5,
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
              console.info('Sections count:', result?.length ?? 0, 'first section:', result?.[0]?.name)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getDetailsConfiguration)
        </script>
        ```

    - PHP

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'crm.item.details.configuration.get',
            [
                'entityTypeId' => 1032,
                'extras' => [
                    'categoryId' => 5,
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
    "result": [
        {
            "name": "main",
            "title": "О сделке",
            "type": "section",
            "elements": [
                {
                    "name": "TITLE",
                    "optionFlags": "0"
                },
                {
                    "name": "STAGE_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "OPPORTUNITY_WITH_CURRENCY",
                    "optionFlags": "0"
                },
                {
                    "name": "CLOSEDATE",
                    "optionFlags": "0"
                },
                {
                    "name": "CLIENT",
                    "optionFlags": "1",
                    "options": {
                        "defaultCountry": "RU"
                    }
                },
                {
                    "name": "UF_CRM_1686898039656",
                    "optionFlags": "1"
                }
            ]
        },
        {
            "name": "additional",
            "title": "Дополнительно",
            "type": "section",
            "elements": [
                {
                    "name": "TYPE_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "SOURCE_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "SOURCE_DESCRIPTION",
                    "optionFlags": "0"
                },
                {
                    "name": "BEGINDATE",
                    "optionFlags": "0"
                },
                {
                    "name": "OPENED",
                    "optionFlags": "0"
                },
                {
                    "name": "ASSIGNED_BY_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "OBSERVER",
                    "optionFlags": "0"
                },
                {
                    "name": "COMMENTS",
                    "optionFlags": "0"
                },
                {
                    "name": "UTM",
                    "optionFlags": "0"
                }
            ]
        },
        {
            "name": "products",
            "title": "Товары",
            "type": "section",
            "elements": [
                {
                    "name": "PRODUCT_ROW_SUMMARY",
                    "optionFlags": "0"
                }
            ]
        },
        {
            "name": "recurring",
            "title": "Регулярная сделка",
            "type": "section",
            "elements": [
                {
                    "name": "RECURRING",
                    "optionFlags": "0"
                }
            ]
        }
    ],
    "time": {
        "start": 1720624891.017344,
        "finish": 1720624891.405621,
        "duration": 0.3882770538330078,
        "processing": 0.02097320556640625,
        "date_start": "2024-07-10T17:21:31+02:00",
        "date_finish": "2024-07-10T17:21:31+02:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section)\|`null` | Корневой элемент ответа. Содержит конфигурацию разделов детальной карточки элемента. Возвращает `null` в случае отсутствия конфигурации ||
|| **time**
[`time`][1] | Информация о времени выполнения запроса ||
|#

#### section

Описывает отдельно взятый раздел с полями внутри карточки элемента

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`][1] | Уникальное название раздела, используемое для идентификации ||
|| **title**
[`string`][1] | Название раздела ||
|| **type**
[`string`][1] | Тип раздела ||
|| **elements**
[`section_element[]`](#section_element) | Список выводимых в карточку полей сущности с дополнительными настройками ||
|#

#### section_element

Конфигурация отдельно взятого поля внутри раздела

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`][1] | Идентификатор поля ||
|| **optionFlags**
[`string`][1] | Значения:
- `"1"` — показывать всегда
- `"0"` — показывать не всегда ||
|| **options**
[`object`][1] | Дополнительные опции поля ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Parameter 'entityTypeId' is not defined"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| Пустое значение | Parameter 'entityTypeId' is not defined | Не передан обязательный параметр `entityTypeId` ||
|| Пустое значение | The entity type '`entityTypeName`' is not supported in current context. | Метод не поддерживает данный тип сущности || 
|| Пустое значение | Access denied. | У пользователя нет административных прав ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-item-details-configuration-set.md)
- [{#T}](./crm-item-details-configuration-reset.md)
- [{#T}](./crm-item-details-configuration-forceCommonScopeForAll.md)

[1]: ../../../data-types.md
