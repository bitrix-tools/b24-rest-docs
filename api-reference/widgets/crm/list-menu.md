# Пункт контекстного меню в списке элементов CRM_XXX_LIST_MENU, CRM_DYNAMIC_XXX_LIST_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свой пункт в контекстное меню элемента в списке объектов CRM: [лидов](../../crm/leads/index.md), [контактов](../../crm/contacts/index.md), [компаний](../../crm/companies/index.md), [сделок](../../crm/deals/index.md), [коммерческих предложений](../../crm/quote/index.md), [новых счетов](../../crm/universal/invoice.md), [дел](../../crm/timeline/activities/index.md) и [пользовательских типов объектов](../../crm/universal/index.md).

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_LIST_MENU` | Пункт контекстного меню [лида](../../crm/leads/index.md) ||
|| `CRM_CONTACT_LIST_MENU` | Пункт контекстного меню [контакта](../../crm/contacts/index.md) ||
|| `CRM_COMPANY_LIST_MENU` | Пункт контекстного меню [компании](../../crm/companies/index.md) ||
|| `CRM_DEAL_LIST_MENU` | Пункт контекстного меню [сделки](../../crm/deals/index.md) ||
|| `CRM_SMART_INVOICE_LIST_MENU` | Пункт контекстного меню [нового счета](../../crm/universal/invoice.md) ||
|| `CRM_QUOTE_LIST_MENU` | Пункт контекстного меню [коммерческого предложения](../../crm/quote/index.md) ||
|| `CRM_ACTIVITY_LIST_MENU` | Пункт контекстного меню [дела](../../crm/timeline/activities/index.md) ||
|| `CRM_DYNAMIC_XXX_LIST_MENU` | Пункт контекстного меню пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_LIST_MENU` || 
|#

### Где находится в интерфейсе

Откройте раздел объектов CRM в режиме списка, нажмите кнопку меню слева от элемента и наведите курсор на пункт *Маркетплейс*. Пункт приложения выводится в этом подменю.

![Пункт контекстного меню в списке сделок](./_images/CRM_DEAL_LIST_MENU.png "Пункт контекстного меню в списке сделок")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_LIST_MENU`. У остальных кодов состав данных такой же: меняются значение `PLACEMENT` и идентификатор объекта в `PLACEMENT_OPTIONS`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => da79481fc89aea5a929b58815fbca926
    [AUTH_ID] => 83fd7166007e9c94001e30ba00000001f0f107a52e6ad7ef9a1b8c3d5e2f4061
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 737c9966007e9c94001e30ba00000001f0f1072b8d4e6f01a3c57d9e8b2f4160
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_LIST_MENU
    [PLACEMENT_OPTIONS] => {"ID":"8061","URI":"\/crm\/deal\/list\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Кроме универсального ключа `URI` в контекст попадает собственный ключ точки.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Идентификатор объекта CRM, для которого был открыт виджет.

Может быть использован для получения дополнительной информации с помощью соответствующих методов:

- любой тип объекта [crm.item.get](../../crm/universal/crm-item-get.md) с указанием entityTypeId = '1' для лидов, '2' для сделок и [так далее](../../crm/data-types.md#object_type)
- лид [crm.lead.get](../../crm/leads/crm-lead-get.md)
- сделка [crm.deal.get](../../crm/deals/crm-deal-get.md)
- контакт [crm.contact.get](../../crm/contacts/crm-contact-get.md)
- компания [crm.company.get](../../crm/companies/crm-company-get.md)
- коммерческое предложение [crm.quote.get](../../crm/quote/crm-quote-get.md)
- дело [crm.activity.get](../../crm/timeline/activities/activity-base/crm-activity-get.md)

Идентификатор типа объекта отдельным ключом не приходит. Для пользовательского типа объектов его можно взять из значения параметра `PLACEMENT`: например, у кода `CRM_DYNAMIC_183_LIST_MENU` идентификатор типа равен `183`

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_DEAL_LIST_MENU",
        "HANDLER": "https://your-domain.com/widgets/crm-list-menu-handler.php",
        "TITLE": "Мой пункт меню сделки",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт меню сделки"
          },
          "en": {
            "TITLE": "My deal menu item"
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
          PLACEMENT: 'CRM_DEAL_LIST_MENU',
          HANDLER: 'https://your-domain.com/widgets/crm-list-menu-handler.php',
          TITLE: 'My deal menu item',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой пункт меню сделки',
            },
            en: {
              TITLE: 'My deal menu item',
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
      async function bindCrmDealListMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_LIST_MENU',
              HANDLER: 'https://your-domain.com/widgets/crm-list-menu-handler.php',
              TITLE: 'My deal menu item',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой пункт меню сделки',
                },
                en: {
                  TITLE: 'My deal menu item',
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

      document.addEventListener('DOMContentLoaded', bindCrmDealListMenu)
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
                    'PLACEMENT' => 'CRM_DEAL_LIST_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-list-menu-handler.php',
                    'TITLE' => 'Мой пункт меню сделки',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт меню сделки',
                        ],
                        'en' => [
                            'TITLE' => 'My deal menu item',
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
            PLACEMENT: 'CRM_DEAL_LIST_MENU',
            HANDLER: 'https://your-domain.com/widgets/crm-list-menu-handler.php',
            TITLE: 'Мой пункт меню сделки',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт меню сделки' },
                en: { TITLE: 'My deal menu item' }
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
            'PLACEMENT' => 'CRM_DEAL_LIST_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/crm-list-menu-handler.php',
            'TITLE' => 'Мой пункт меню сделки',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт меню сделки',
                ],
                'en' => [
                    'TITLE' => 'My deal menu item',
                ],
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
    res, err := client.Core().Call(ctx, "placement.bind", b24.Params{
    	"PLACEMENT": "CRM_DEAL_LIST_MENU",
    	"HANDLER":   "https://your-domain.com/widgets/crm-list-menu-handler.php",
    	"TITLE":     "Мой пункт меню сделки",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мой пункт меню сделки",
    		},
    		"en": b24.Params{
    			"TITLE": "My deal menu item",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его
    // в структуру под форму ответа, показанную ниже на этой странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./list-toolbar.md)
- [{#T}](./detail-tab.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

