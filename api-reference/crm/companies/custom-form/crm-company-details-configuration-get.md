# Получить параметры карточки crm.company.details.configuration.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод:
>  - любой пользователь может получать свои и общие настройки,
>  - пользователь с правом «Разрешить изменять настройки» в CRM может получать чужие настройки

{% note warning "DEPRECATED" %}

Развитие метода остановлено. Используйте [crm.item.details.configuration.get](../../universal/item-details-configuration/crm-item-details-configuration-get.md).

{% endnote %}

Метод `crm.company.details.configuration.get` получает настройки карточки компаний: читает личные настройки карточки указанного пользователя или общие настройки, заданные для всех пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

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
[`user`](../../../data-types.md) | Идентификатор пользователя, получить можно методом [user.get](../../../user/user-get.md).

Нужен только администратору при запросе чужих личных настроек. Если не указан, вернутся настройки текущего пользователя
||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

1. Получить личную конфигурацию карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":6,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.company.details.configuration.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of each section returned in result[] (result is null when no configuration exists)
        type CrmCompanyDetailsSection = {
          name: string
          title: string
          type: string
          elements: CrmCompanyDetailsSectionElement[]
        }

        type CrmCompanyDetailsSectionElement = {
          name: string
          optionFlags?: string
          options?: {
            defaultCountry?: string
            defaultAddressType?: number
          }
        }

        try {
          const response = await $b24.actions.v2.call.make<CrmCompanyDetailsSection[] | null>({
            method: 'crm.company.details.configuration.get',
            params: {
              scope: 'P',
              userId: 6,
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
          async function getCompanyDetailsConfiguration() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.company.details.configuration.get',
                params: {
                  scope: 'P',
                  userId: 6,
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

          document.addEventListener('DOMContentLoaded', getCompanyDetailsConfiguration)
        </script>
        ```

    - PHP

        ```php
        try {
            $response = $b24Service
                ->core
                ->call(
                    'crm.company.details.configuration.get',
                    [
                        'scope' => 'P',
                        'userId' => 6
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error: ' . $e->getMessage();
        }
        ```

   - BX24.js

       ```js
        BX24.callMethod(
            'crm.company.details.configuration.get',
            {
                scope: "P",
                userId: 6,
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
            'crm.company.details.configuration.get',
            [
                'scope' => 'P',
                'userId' => 6
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
       ```

    {% endlist %}

2. Получить общую конфигурацию карточки

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.company.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"C","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.company.details.configuration.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of each section returned in result[] (result is null when no configuration exists)
        type CrmCompanyDetailsSection = {
          name: string
          title: string
          type: string
          elements: CrmCompanyDetailsSectionElement[]
        }

        type CrmCompanyDetailsSectionElement = {
          name: string
          optionFlags?: string
          options?: {
            defaultCountry?: string
            defaultAddressType?: number
          }
        }

        try {
          const response = await $b24.actions.v2.call.make<CrmCompanyDetailsSection[] | null>({
            method: 'crm.company.details.configuration.get',
            params: {
              scope: 'C',
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
          async function getCompanyDetailsConfiguration() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.company.details.configuration.get',
                params: {
                  scope: 'C',
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

          document.addEventListener('DOMContentLoaded', getCompanyDetailsConfiguration)
        </script>
        ```

    - PHP

        ```php
        try {
            $response = $b24Service
                ->core
                ->call(
                    'crm.company.details.configuration.get',
                    [
                        'scope' => 'C'
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error fetching company details configuration: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'crm.company.details.configuration.get',
            {
                scope: "C",
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
            'crm.company.details.configuration.get',
            [
                'scope' => 'C'
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
            "title": "О компании",
            "type": "section",
            "elements": [
                {
                    "name": "TITLE",
                    "optionFlags": "0"
                },
                {
                    "name": "COMPANY_TYPE",
                    "optionFlags": "0"
                },
                {
                    "name": "INDUSTRY",
                    "optionFlags": "0"
                },
                {
                    "name": "REVENUE_WITH_CURRENCY",
                    "optionFlags": "0"
                },
                {
                    "name": "EMAIL",
                    "optionFlags": "0"
                },
                {
                    "name": "CONTACT",
                    "optionFlags": "0",
                    "options": {
                        "defaultCountry": "RU"
                    }
                },
                {
                    "name": "UF_CRM_1687188367",
                    "optionFlags": "1"
                },
                {
                    "name": "UF_CRM_1706178583916",
                    "optionFlags": "1"
                },
                {
                    "name": "COMMENTS",
                    "optionFlags": "1"
                },
                {
                    "name": "REQUISITES",
                    "optionFlags": "1"
                },
                {
                    "name": "PARENT_ID_164",
                    "optionFlags": "0"
                },
                {
                    "name": "LOGO",
                    "optionFlags": "1"
                },
                {
                    "name": "PHONE",
                    "optionFlags": "1",
                    "options": {
                        "defaultCountry": "RU"
                    }
                },
                {
                    "name": "ADDRESS",
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
                    "name": "EMPLOYEES",
                    "optionFlags": "0"
                },
                {
                    "name": "ASSIGNED_BY_ID",
                    "optionFlags": "0"
                },
                {
                    "name": "UTM",
                    "optionFlags": "0"
                },
                {
                    "name": "TRACKING_SOURCE_ID",
                    "optionFlags": "0"
                }
            ]
        },
        {
            "name": "user_pl047oti",
            "title": "Новый раздел",
            "type": "section",
            "elements": [
                {
                    "name": "UF_CRM_1689255858",
                    "optionFlags": "1"
                }
            ]
        }
    ],
    "time": {
        "start": 1769418250,
        "finish": 1769418250.874948,
        "duration": 0.8749480247497559,
        "processing": 0,
        "date_start": "2026-01-26T12:04:10+03:00",
        "date_finish": "2026-01-26T12:04:10+03:00",
        "operating_reset_at": 1769418850,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`section[]`](#section) | Корневой элемент ответа.

Содержит конфигурацию разделов детальной карточки компании.

Возвращает `null` в случае отсутствия конфигурации ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### section

Описывает отдельно взятый раздел с полями внутри карточки элемента

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
[`section_element[]`](#section_element) | Список выводимых в карточку полей с дополнительными настройками ||
|#

#### section_element

Конфигурация отдельно взятого поля внутри раздела

#|
|| **Название**
`тип` | **Описание** ||
|| **name**
[`string`](../../../data-types.md) | Идентификатор поля ||
|| **optionFlags**
[`boolean`](../../../data-types.md) | Показывать ли поле всегда.

Возможные значения:
- `"1"` — да
- `"0"` — нет
||
|| **options**
[`object`](../../../data-types.md) | Дополнительные опции поля.

Структура описана [ниже](#options) ||
|#

#### section_element.options {#options}

#|
|| **Название**
`тип` | **Поля, где доступна опция** | **Описание** ||
|| **defaultAddressType**
[`integer`](../../../data-types.md) | `ADDRESS` | Идентификатор типа адреса по умолчанию. Чтобы узнать возможные типы адресов, используйте [`crm.enum.addresstype`](../../auxiliary/enum/crm-enum-address-type.md) ||
|| **defaultCountry**
[`string`](../../../data-types.md) |
`PHONE`
`CLIENT`
`COMPANY`
`CONTACT`
`MYCOMPANY_ID` | Код страны для формата телефонного номера по умолчанию — строка из двух латинских букв.

Например `"RU"` ||
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
|| **Код** | **Описание** | **Значение** ||
|| `-` | `Access denied` | У пользователя нет права «Разрешить изменять настройки» для получения чужих настроек ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./crm-company-details-configuration-set.md)
- [{#T}](./crm-company-details-configuration-force-common-scope-for-all.md)
- [{#T}](./crm-company-details-configuration-reset.md)





