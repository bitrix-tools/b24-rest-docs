# Пункт навигации мессенджера IM_NAVIGATION

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню навигации мессенджера — в тот же ряд, где находятся *Чаты*, *Каналы* и *Маркетплейс*. При нажатии приложение открывается во всей рабочей области мессенджера, вместо списка чатов и переписки.

Точка подходит приложениям, которые работают с мессенджером целиком, а не с конкретным чатом или сообщением: сводкам по переписке, отчетам, собственным спискам диалогов.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `IM_NAVIGATION` | Пункт в меню навигации мессенджера ||
|#

### Где находится в интерфейсе

Откройте мессенджер и посмотрите на ряд пунктов навигации в верхней части экрана. Пункт приложения выводится в этом ряду с названием из параметра `TITLE`.

Если пунктов больше, чем помещается в ряд, часть из них уезжает под кнопку *Еще*. Пункт приложения добавляется последним, поэтому чаще всего он оказывается именно там.

![Пункт приложения в меню навигации мессенджера](./_images/IM_NAVIGATION.png "Пункт приложения в меню навигации мессенджера")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => c14d1f3266fe7ba3cd098e2d04dccda3
    [AUTH_ID] => 83fd7166007e9c94001e30ba00000001f0f107a52e6ad7ef9a1b8c3d5e2f4061
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 737c9966007e9c94001e30ba00000001f0f1072b8d4e6f01a3c57d9e8b2f4160
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => ec1b2074a9d3f5c81b6e40d27a95cf38
    [APPLICATION_SCOPE] => im,placement
    [member_id] => d897063e1ce7c5eb9f04b9751eef5915
    [status] => L
    [PLACEMENT] => IM_NAVIGATION
    [PLACEMENT_OPTIONS] => {"URI":"\/online\/"}
)

```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Собственных ключей у точки нет: виджет открывается для мессенджера целиком, а не для конкретного чата. В контекст попадает только универсальный ключ `URI` с адресом страницы мессенджера.

Если приложению нужен идентификатор чата, используйте точки, которые вызываются из самого чата: [IM_SIDEBAR](./sidebar.md), [IM_TEXTAREA](./textarea.md) или [IM_CONTEXT_MENU](./context-menu.md).

## OPTIONS при регистрации через placement.bind

Для `IM_NAVIGATION` метод `placement.bind` поддерживает параметры `OPTIONS`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **iconName***
[`string`](../../data-types.md) | Имя иконки Font Awesome 4, например `fa-rocket`. Класс набора `fa` Битрикс24 подставляет сам. До 50 символов, значение должно содержать латинские буквы, пробел или `-`.

Параметр обязателен: без него `placement.bind` возвращает ошибку `ERROR_ARGUMENT`. В текущем интерфейсе мессенджера пункт навигации выводится текстом, иконка используется в других точках раздела
||
|| **extranet**
[`string`](../../data-types.md) | Доступ в экстранете, по умолчанию `N`.

Возможные значения:
- `N` — приложение недоступно для экстранет-пользователей
- `Y` — приложение доступно для экстранет-пользователей
||
|| **role**
[`string`](../../data-types.md) | Роль пользователя, по умолчанию `USER`.

Возможные значения:
- `USER` — приложение доступно всем пользователям
- `ADMIN` — приложение доступно только администраторам портала
||
|#

Параметр `context`, который ограничивает показ по типу чата, для этой точки не применяется: пункт навигации не привязан к чату.

### Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "IM_NAVIGATION",
        "HANDLER": "https://your-domain.com/widgets/im-navigation-handler.php",
        "TITLE": "Мой раздел",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой раздел"
          },
          "en": {
            "TITLE": "My section"
          }
        },
        "OPTIONS": {
          "iconName": "fa-rocket",
          "role": "USER",
          "extranet": "N"
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
          PLACEMENT: 'IM_NAVIGATION',
          HANDLER: 'https://your-domain.com/widgets/im-navigation-handler.php',
          TITLE: 'My section',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой раздел',
            },
            en: {
              TITLE: 'My section',
            },
          },
          OPTIONS: {
            iconName: 'fa-rocket',
            role: 'USER',
            extranet: 'N',
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
      async function bindImNavigation() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'IM_NAVIGATION',
              HANDLER: 'https://your-domain.com/widgets/im-navigation-handler.php',
              TITLE: 'My section',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой раздел',
                },
                en: {
                  TITLE: 'My section',
                },
              },
              OPTIONS: {
                iconName: 'fa-rocket',
                role: 'USER',
                extranet: 'N',
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

      document.addEventListener('DOMContentLoaded', bindImNavigation)
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
                    'PLACEMENT' => 'IM_NAVIGATION',
                    'HANDLER' => 'https://your-domain.com/widgets/im-navigation-handler.php',
                    'TITLE' => 'Мой раздел',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой раздел',
                        ],
                        'en' => [
                            'TITLE' => 'My section',
                        ],
                    ],
                    'OPTIONS' => [
                        'iconName' => 'fa-rocket',
                        'role' => 'USER',
                        'extranet' => 'N',
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
            PLACEMENT: 'IM_NAVIGATION',
            HANDLER: 'https://your-domain.com/widgets/im-navigation-handler.php',
            TITLE: 'Мой раздел',
            LANG_ALL: {
                ru: { TITLE: 'Мой раздел' },
                en: { TITLE: 'My section' }
            },
            OPTIONS: {
                iconName: 'fa-rocket',
                role: 'USER',
                extranet: 'N'
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
            'PLACEMENT' => 'IM_NAVIGATION',
            'HANDLER' => 'https://your-domain.com/widgets/im-navigation-handler.php',
            'TITLE' => 'Мой раздел',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой раздел',
                ],
                'en' => [
                    'TITLE' => 'My section',
                ],
            ],
            'OPTIONS' => [
                'iconName' => 'fa-rocket',
                'role' => 'USER',
                'extranet' => 'N',
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
- [{#T}](./sidebar.md)
- [{#T}](./textarea.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
