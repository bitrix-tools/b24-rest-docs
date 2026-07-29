# Получить параметры карточки crm.lead.details.configuration.get

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

Метод `crm.lead.details.configuration.get` получает настройки карточки лидов.

{% note warning %}

Настройки карточки повторных лидов могут отличаться от настроек карточки простых лидов. Для переключения между настройками карточек лидов используйте параметр `lead.customer.type` в `extras`.

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **userId**
[`user`](../../../data-types.md) | Идентификатор пользователя, для которого нужно получить личную конфигурацию.

Если параметр не передан, будет использован `userId` пользователя, который вызывает метод.

Нужен только при запросе личных настроек ||
|| **scope**
[`string`](../../../data-types.md) | Область применения настроек. Возможные значения:
- `'P'` - личные настройки
- `'C'` - общие настройки

По умолчанию используется значение `'P'` ||
|| **extras**
[`object`](../../../data-types.md) | Дополнительные параметры. Структура описана [ниже](#extras) ||
|#

### Параметр extras {#extras}

#|
|| **Название**
`тип` | **Описание** ||
|| **lead.customer.type**
[`integer`](../../../data-types.md) | Тип лида. Возможные значения:
- `1` - простой лид
- `2` - повторный лид ||
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
        -d '{"scope":"P","userId":1}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/crm.lead.details.configuration.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"scope":"P","userId":1,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/crm.lead.details.configuration.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        type CrmLeadCardSectionElement = {
          name: string
          optionFlags: string
        }

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type CrmLeadCardSection = {
          name: string
          title: string
          type: string
          elements: CrmLeadCardSectionElement[]
        }

        try {
          const response = await $b24.actions.v2.call.make<CrmLeadCardSection[] | null>({
            method: 'crm.lead.details.configuration.get',
            params: {
              scope: 'P',
              userId: 1,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const result = response.getData()!.result
            console.info('Card sections:', result)
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
          async function getLeadCardConfiguration() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'crm.lead.details.configuration.get',
                params: {
                  scope: 'P',
                  userId: 1,
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const result = response.getData().result
              console.info('Card sections:', result)
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getLeadCardConfiguration)
        </script>
        ```

    - PHP

        ```php
        try {
            $response = $b24Service
                ->core
                ->call(
                    'crm.lead.details.configuration.get',
                    [
                        'scope' => 'P',
                        'userId' => 1
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
            'crm.lead.details.configuration.get',
            {
                scope: "P",
                userId: 1,
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
            'crm.lead.details.configuration.get',
            [
                'scope' => 'P',
                'userId' => 1
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
       ```
- `"1"` - показывать всегда
- `"0"` - показывать не всегда ||
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
|| **Код** | **Описание** | **Значение** ||
|| `-` | Access denied | Недостаточно прав для получения запрошенной конфигурации ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./crm-lead-details-configuration-reset.md)
- [{#T}](./crm-lead-details-configuration-set.md)
- [{#T}](./crm-lead-details-configuration-force-common-scope-for-all.md)





