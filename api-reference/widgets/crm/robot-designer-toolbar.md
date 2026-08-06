# Кнопка в дизайнере роботов CRM_XXX_ROBOT_DESIGNER_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свою кнопку в дизайнер роботов, где настраивают автоматизацию объектов CRM: [лидов](../../crm/leads/index.md), [сделок](../../crm/deals/index.md), [новых счетов](../../crm/universal/invoice.md) и [пользовательских типов объектов](../../crm/universal/index.md).

Код конкретного места встройки виджета указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не будет отображаться в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CRM_LEAD_ROBOT_DESIGNER_TOOLBAR` | Кнопка в дизайнере роботов [лида](../../crm/leads/index.md) ||
|| `CRM_DEAL_ROBOT_DESIGNER_TOOLBAR` | Кнопка в дизайнере роботов [сделки](../../crm/deals/index.md) ||
|| `CRM_SMART_INVOICE_ROBOT_DESIGNER_TOOLBAR` | Кнопка в дизайнере роботов [нового счета](../../crm/universal/invoice.md) ||
|| `CRM_DYNAMIC_XXX_ROBOT_DESIGNER_TOOLBAR` | Кнопка в дизайнере роботов пользовательского типа объектов CRM. Вместо XXX необходимо указывать числовой идентификатор конкретного [пользовательского типа объектов](../../crm/universal/index.md). Например, `CRM_DYNAMIC_183_ROBOT_DESIGNER_TOOLBAR` ||
|#

### Где находится в интерфейсе

Откройте список объектов CRM и нажмите *Роботы*. Кнопка приложения выводится справа в шапке окна *Автоматизация продаж*.

Не путайте эту точку с [`TASK_ROBOT_DESIGNER_TOOLBAR`](../task/robot-designer-toolbar.md) и [`SONET_GROUP_ROBOT_DESIGNER_TOOLBAR`](../workgroups/robot-designer-toolbar.md): те относятся к автоматизации задач и требуют других scope.

![Кнопка в дизайнере роботов сделок](./_images/CRM_DEAL_ROBOT_DESIGNER_TOOLBAR.png "Кнопка в дизайнере роботов сделок")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

Пример показан для точки `CRM_DEAL_ROBOT_DESIGNER_TOOLBAR`. У остальных кодов состав данных такой же: меняется значение `PLACEMENT`.

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 5f23711fbf9257553e256254309cc1f5
    [AUTH_ID] => c3807166007e9c94001e30ba00000001f0f1076e1b0c3f84a25d97be4610c72
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => b26f9966007e9c94001e30ba00000001f0f1077ac4d15e293fb680da1c295f3
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,bizproc,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_DEAL_ROBOT_DESIGNER_TOOLBAR
    [PLACEMENT_OPTIONS] => {"URI":"\/crm\/deal\/automation\/0\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Собственных ключей у точки нет — в контекст попадает только универсальный ключ `URI`. Идентификатор воронки отдельным параметром не приходит, его можно получить из пути в `URI`. Например, для значения `/crm/deal/automation/0/` идентификатор воронки равен `0`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_DEAL_ROBOT_DESIGNER_TOOLBAR",
        "HANDLER": "https://your-domain.com/widgets/crm-robot-designer-handler.php",
        "TITLE": "Моя кнопка в дизайнере роботов",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Моя кнопка в дизайнере роботов"
          },
          "en": {
            "TITLE": "My automation designer button"
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
          PLACEMENT: 'CRM_DEAL_ROBOT_DESIGNER_TOOLBAR',
          HANDLER: 'https://your-domain.com/widgets/crm-robot-designer-handler.php',
          TITLE: 'My automation designer button',
          LANG_ALL: {
            ru: {
              TITLE: 'Моя кнопка в дизайнере роботов',
            },
            en: {
              TITLE: 'My automation designer button',
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
      async function bindCrmDealRobotDesignerToolbar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_DEAL_ROBOT_DESIGNER_TOOLBAR',
              HANDLER: 'https://your-domain.com/widgets/crm-robot-designer-handler.php',
              TITLE: 'My automation designer button',
              LANG_ALL: {
                ru: {
                  TITLE: 'Моя кнопка в дизайнере роботов',
                },
                en: {
                  TITLE: 'My automation designer button',
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

      document.addEventListener('DOMContentLoaded', bindCrmDealRobotDesignerToolbar)
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
                    'PLACEMENT' => 'CRM_DEAL_ROBOT_DESIGNER_TOOLBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-robot-designer-handler.php',
                    'TITLE' => 'Моя кнопка в дизайнере роботов',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Моя кнопка в дизайнере роботов',
                        ],
                        'en' => [
                            'TITLE' => 'My automation designer button',
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
            PLACEMENT: 'CRM_DEAL_ROBOT_DESIGNER_TOOLBAR',
            HANDLER: 'https://your-domain.com/widgets/crm-robot-designer-handler.php',
            TITLE: 'Моя кнопка в дизайнере роботов',
            LANG_ALL: {
                ru: { TITLE: 'Моя кнопка в дизайнере роботов' },
                en: { TITLE: 'My automation designer button' }
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
            'PLACEMENT' => 'CRM_DEAL_ROBOT_DESIGNER_TOOLBAR',
            'HANDLER' => 'https://your-domain.com/widgets/crm-robot-designer-handler.php',
            'TITLE' => 'Моя кнопка в дизайнере роботов',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Моя кнопка в дизайнере роботов',
                ],
                'en' => [
                    'TITLE' => 'My automation designer button',
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
    	"PLACEMENT": "CRM_DEAL_ROBOT_DESIGNER_TOOLBAR",
    	"HANDLER":   "https://your-domain.com/widgets/crm-robot-designer-handler.php",
    	"TITLE":     "Моя кнопка в дизайнере роботов",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Моя кнопка в дизайнере роботов",
    		},
    		"en": b24.Params{
    			"TITLE": "My automation designer button",
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
- [{#T}](./funnels-toolbar.md)
- [{#T}](./list-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

