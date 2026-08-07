# Пункт выпадающего меню над списком элементов CRM_XXX_LIST_TOOLBAR, CRM_DYNAMIC_XXX_LIST_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню над списком объектов CRM: [лидов](../../crm/leads/index.md), [контактов](../../crm/contacts/index.md), [компаний](../../crm/companies/index.md), [сделок](../../crm/deals/index.md), [коммерческих предложений](../../crm/quote/index.md), [новых счетов](../../crm/universal/invoice.md), [заказов](../../sale/order/index.md) и [пользовательских типов объектов](../../crm/universal/index.md).

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_LEAD_LIST_TOOLBAR` | Пункт выпадающего меню над списком [лидов](../../crm/leads/index.md) ||
|| `CRM_CONTACT_LIST_TOOLBAR` | Пункт выпадающего меню над списком [контактов](../../crm/contacts/index.md) ||
|| `CRM_COMPANY_LIST_TOOLBAR` | Пункт выпадающего меню над списком [компаний](../../crm/companies/index.md) ||
|| `CRM_DEAL_LIST_TOOLBAR` | Пункт выпадающего меню над списком [сделок](../../crm/deals/index.md) ||
|| `CRM_SMART_INVOICE_LIST_TOOLBAR` | Пункт выпадающего меню над списком [новых счетов](../../crm/universal/invoice.md) ||
|| `CRM_QUOTE_LIST_TOOLBAR` | Пункт выпадающего меню над списком [коммерческих предложений](../../crm/quote/index.md) ||
|| `CRM_ORDER_LIST_TOOLBAR` | Пункт выпадающего меню над списком [заказов интернет-магазина](../../sale/order/index.md) ||
|| `CRM_DYNAMIC_XXX_LIST_TOOLBAR` | Пункт выпадающего меню над списком элементов пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_LIST_TOOLBAR` ||
|#

### Где находится в интерфейсе

Откройте список объектов CRM и нажмите стрелку у кнопки в правой части панели над списком. Пункт приложения выводится в этом меню рядом с пунктами баз знаний и Маркетплейса.

![Пункт меню над списком сделок](./_images/CRM_DEAL_LIST_TOOLBAR.png "Пункт меню над списком сделок")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_LIST_TOOLBAR`. У остальных кодов состав данных такой же: меняется значение `PLACEMENT`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => c75986789a2a58e22f445686334804e6
    [AUTH_ID] => 4b2e7166007e9c94001e30ba00000001f0f107c93a5f28e7b04d61ca8f3e52d7
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 3a1d9966007e9c94001e30ba00000001f0f107d81b3e07f6a95c40db7e2f41c6
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_LIST_TOOLBAR
    [PLACEMENT_OPTIONS] => {"URI":"\/crm\/deal\/list\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Собственных ключей у точки нет — в контекст попадает только универсальный ключ `URI`. Идентификатор объекта отдельным параметром не приходит: виджет открывается над списком, а не над конкретным элементом.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_DEAL_LIST_TOOLBAR",
        "HANDLER": "https://your-domain.com/widgets/crm-list-toolbar-handler.php",
        "TITLE": "Мой пункт над списком сделок",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт над списком сделок"
          },
          "en": {
            "TITLE": "My deal list item"
          }
        },
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/placement.bind
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'placement.bind',
        params: {
          PLACEMENT: 'CRM_DEAL_LIST_TOOLBAR',
          HANDLER: 'https://your-domain.com/widgets/crm-list-toolbar-handler.php',
          TITLE: 'My deal list item',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой пункт над списком сделок',
            },
            en: {
              TITLE: 'My deal list item',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
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
      async function bindCrmDealListToolbar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_LIST_TOOLBAR',
              HANDLER: 'https://your-domain.com/widgets/crm-list-toolbar-handler.php',
              TITLE: 'My deal list item',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой пункт над списком сделок',
                },
                en: {
                  TITLE: 'My deal list item',
                },
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
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindCrmDealListToolbar)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'placement.bind',
                [
                    'PLACEMENT' => 'CRM_DEAL_LIST_TOOLBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-list-toolbar-handler.php',
                    'TITLE' => 'Мой пункт над списком сделок',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт над списком сделок',
                        ],
                        'en' => [
                            'TITLE' => 'My deal list item',
                        ],
                    ],
                ]
            );

        $result = $response->getResponseData()->getResult();
        if ($result->error()) {
            error_log($result->error());
        } else {
            echo 'Success: ' . print_r($result->data(), true);
        }
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error binding placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'placement.bind',
        {
            PLACEMENT: 'CRM_DEAL_LIST_TOOLBAR',
            HANDLER: 'https://your-domain.com/widgets/crm-list-toolbar-handler.php',
            TITLE: 'Мой пункт над списком сделок',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт над списком сделок' },
                en: { TITLE: 'My deal list item' }
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
        'placement.bind',
        [
            'PLACEMENT' => 'CRM_DEAL_LIST_TOOLBAR',
            'HANDLER' => 'https://your-domain.com/widgets/crm-list-toolbar-handler.php',
            'TITLE' => 'Мой пункт над списком сделок',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт над списком сделок',
                ],
                'en' => [
                    'TITLE' => 'My deal list item',
                ],
            ],
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./list-menu.md)
- [{#T}](./detail-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

