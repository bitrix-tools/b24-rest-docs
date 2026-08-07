# Пункт левого меню CRM-аналитики CRM_ANALYTICS_MENU

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, crm`](../../scopes/permissions.md)

Виджет добавляет свой пункт в левое меню раздела CRM-аналитики. По нажатию на пункт открывается отчет приложения.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `CRM_ANALYTICS_MENU` | Пункт в левом меню CRM-аналитики ||
|#

### Где находится в интерфейсе

Откройте раздел *CRM-аналитика* и раскройте пункт *Приложения* в левом меню раздела. Пункт приложения выводится в нем рядом с пунктом *Маркетплейс*.

![Пункт левого меню CRM-аналитики](./_images/CRM_ANALYTICS_MENU.png "Пункт левого меню CRM-аналитики")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 2a5e9d2644326ced11f4fc7fd4fa0c4b
    [AUTH_ID] => e5a27166007e9c94001e30ba00000001f0f107a03d2e51f6b84c97de6132a05
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => d4919966007e9c94001e30ba00000001f0f1079ce6f37a418bd2c50fa374e16
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => crm,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => CRM_ANALYTICS_MENU
    [PLACEMENT_OPTIONS] => {"URI":"\/report\/analytics\/?IFRAME=Y&IFRAME_TYPE=SIDE_SLIDER"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Собственных ключей у точки нет — в контекст попадает только универсальный ключ `URI`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CRM_ANALYTICS_MENU",
        "HANDLER": "https://your-domain.com/widgets/crm-analytics-menu-handler.php",
        "TITLE": "Мой отчет в CRM-аналитике",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой отчет в CRM-аналитике"
          },
          "en": {
            "TITLE": "My CRM analytics report"
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
          PLACEMENT: 'CRM_ANALYTICS_MENU',
          HANDLER: 'https://your-domain.com/widgets/crm-analytics-menu-handler.php',
          TITLE: 'My CRM analytics report',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой отчет в CRM-аналитике',
            },
            en: {
              TITLE: 'My CRM analytics report',
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
      async function bindCrmAnalyticsMenu() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CRM_ANALYTICS_MENU',
              HANDLER: 'https://your-domain.com/widgets/crm-analytics-menu-handler.php',
              TITLE: 'My CRM analytics report',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой отчет в CRM-аналитике',
                },
                en: {
                  TITLE: 'My CRM analytics report',
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

      document.addEventListener('DOMContentLoaded', bindCrmAnalyticsMenu)
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
                    'PLACEMENT' => 'CRM_ANALYTICS_MENU',
                    'HANDLER' => 'https://your-domain.com/widgets/crm-analytics-menu-handler.php',
                    'TITLE' => 'Мой отчет в CRM-аналитике',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой отчет в CRM-аналитике',
                        ],
                        'en' => [
                            'TITLE' => 'My CRM analytics report',
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
            PLACEMENT: 'CRM_ANALYTICS_MENU',
            HANDLER: 'https://your-domain.com/widgets/crm-analytics-menu-handler.php',
            TITLE: 'Мой отчет в CRM-аналитике',
            LANG_ALL: {
                ru: { TITLE: 'Мой отчет в CRM-аналитике' },
                en: { TITLE: 'My CRM analytics report' }
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
            'PLACEMENT' => 'CRM_ANALYTICS_MENU',
            'HANDLER' => 'https://your-domain.com/widgets/crm-analytics-menu-handler.php',
            'TITLE' => 'Мой отчет в CRM-аналитике',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой отчет в CRM-аналитике',
                ],
                'en' => [
                    'TITLE' => 'My CRM analytics report',
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
- [{#T}](./analytics-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)

