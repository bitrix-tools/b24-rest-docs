# Вкладка в карточке элемента CRM_XXX_DETAIL_TAB, CRM_DYNAMIC_XXX_DETAIL_TAB

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свою вкладку в карточку объекта CRM: [лида](../../crm/leads/index.md), [контакта](../../crm/contacts/index.md), [компании](../../crm/companies/index.md), [сделки](../../crm/deals/index.md), [коммерческого предложения](../../crm/quote/index.md), [нового счета](../../crm/universal/invoice.md), [заказа](../../sale/order/index.md) или [пользовательского типа объектов](../../crm/universal/index.md).

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_DETAIL_TAB` | Вкладка в карточке [лида](../../crm/leads/index.md) ||
|| `CRM_DEAL_DETAIL_TAB` | Вкладка в карточке [сделки](../../crm/deals/index.md) ||
|| `CRM_CONTACT_DETAIL_TAB` | Вкладка в карточке [контакта](../../crm/contacts/index.md) ||
|| `CRM_COMPANY_DETAIL_TAB` | Вкладка в карточке [компании](../../crm/companies/index.md) ||
|| `CRM_QUOTE_DETAIL_TAB` | Вкладка в карточке [коммерческого предложения](../../crm/quote/index.md) ||
|| `CRM_SMART_INVOICE_DETAIL_TAB` | Вкладка в карточке [нового счета](../../crm/universal/invoice.md) ||
|| `CRM_ORDER_DETAIL_TAB` | Вкладка в карточке [заказа интернет-магазина](../../sale/order/index.md) ||
|| `CRM_DYNAMIC_XXX_DETAIL_TAB` | Вкладка в карточке элемента пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_DETAIL_TAB` ||
|#

### Где находится в интерфейсе

Откройте карточку объекта CRM. Вкладка приложения выводится в ряду вкладок карточки. Если вкладок больше, чем помещается в ряд, она переносится под *Еще*.

![Вкладка в карточке сделки](./_images/CRM_DEAL_DETAIL_TAB.png "Вкладка в карточке сделки")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_DETAIL_TAB`. У остальных кодов состав данных такой же: меняются значение `PLACEMENT` и идентификатор объекта в `PLACEMENT_OPTIONS`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 5552d735db7b7b4d5c16dd9c272bfe7d
    [AUTH_ID] => 9d4c7166007e9c94001e30ba00000001f0f107e28b5a4310c7f6d9b3025ea814
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 8c3b9966007e9c94001e30ba00000001f0f107f19c6b3e04d182ac5b73f9052d
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_DETAIL_TAB
    [PLACEMENT_OPTIONS] => {"ID":"8061","URI":"\/crm\/deal\/details\/8061\/?any=details%2F8061%2F&IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Кроме универсального ключа `URI` в контекст попадает идентификатор объекта.

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
 
Идентификатор типа объекта отдельным ключом не приходит. Для пользовательского типа объектов его можно взять из значения параметра `PLACEMENT`: например, у кода `CRM_DYNAMIC_183_DETAIL_TAB` идентификатор типа равен `183`

||
|#

{% note tip "Частые кейсы и сценарии" %}

- [{#T}](../../../tutorials/crm/crm-widgets/widget-as-detail-tab.md)

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_DEAL_DETAIL_TAB",
        "HANDLER": "https://your-domain.com/widgets/crm-detail-tab-handler.php",
        "TITLE": "Моя вкладка в сделке",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Моя вкладка в сделке"
          },
          "en": {
            "TITLE": "My deal tab"
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
          PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
          HANDLER: 'https://your-domain.com/widgets/crm-detail-tab-handler.php',
          TITLE: 'My deal tab',
          LANG_ALL: {
            ru: {
              TITLE: 'Моя вкладка в сделке',
            },
            en: {
              TITLE: 'My deal tab',
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
      async function bindCrmDealDetailTab() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
              HANDLER: 'https://your-domain.com/widgets/crm-detail-tab-handler.php',
              TITLE: 'My deal tab',
              LANG_ALL: {
                ru: {
                  TITLE: 'Моя вкладка в сделке',
                },
                en: {
                  TITLE: 'My deal tab',
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

      document.addEventListener('DOMContentLoaded', bindCrmDealDetailTab)
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
                    'PLACEMENT' => 'CRM_DEAL_DETAIL_TAB',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-detail-tab-handler.php',
                    'TITLE' => 'Моя вкладка в сделке',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Моя вкладка в сделке',
                        ],
                        'en' => [
                            'TITLE' => 'My deal tab',
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
            PLACEMENT: 'CRM_DEAL_DETAIL_TAB',
            HANDLER: 'https://your-domain.com/widgets/crm-detail-tab-handler.php',
            TITLE: 'Моя вкладка в сделке',
            LANG_ALL: {
                ru: { TITLE: 'Моя вкладка в сделке' },
                en: { TITLE: 'My deal tab' }
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
            'PLACEMENT' => 'CRM_DEAL_DETAIL_TAB',
            'HANDLER' => 'https://your-domain.com/widgets/crm-detail-tab-handler.php',
            'TITLE' => 'Моя вкладка в сделке',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Моя вкладка в сделке',
                ],
                'en' => [
                    'TITLE' => 'My deal tab',
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
    	"PLACEMENT": "CRM_DEAL_DETAIL_TAB",
    	"HANDLER":   "https://your-domain.com/widgets/crm-detail-tab-handler.php",
    	"TITLE":     "Моя вкладка в сделке",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Моя вкладка в сделке",
    		},
    		"en": b24.Params{
    			"TITLE": "My deal tab",
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
- [{#T}](./detail-toolbar.md)
- [{#T}](./detail-activity.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

