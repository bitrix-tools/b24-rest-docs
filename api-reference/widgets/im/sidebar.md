# Виджет для сайдбара IM_SIDEBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)

Виджет добавляет свой пункт в сайдбар чата.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `IM_SIDEBAR` | Пункт в сайдбаре чата ||
|#

### Где находится в интерфейсе

Откройте чат и нажмите кнопку сайдбара в правой части верхней панели чата. В открывшемся сайдбаре внизу есть блок *Приложения*, в котором отображается пункт приложения с `PLACEMENT=IM_SIDEBAR`.

## Что получает обработчик

Данные передаются в виде POST-запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 99c80eff6378726287350416ee5fef0
    [AUTH_ID] => 6061e72600631fcd00005a4b00000001f0f1076700000000f69dd5fc643d9ce2fdbc1
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 50e00aa340631fcd00005a4b00000001f0f1071111116580a5b83c2de639ef28c12
    [member_id] => da45a03b265ed12127f8a258d793cc5d
    [status] => F
    [PLACEMENT] => IM_SIDEBAR
    [PLACEMENT_OPTIONS] => {"dialogId":"chat1489"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `IM_SIDEBAR` в контекст передается ключ:

- `dialogId` — идентификатор текущего чата

## OPTIONS при регистрации через placement.bind

Для `IM_SIDEBAR` метод `placement.bind` поддерживает параметры `OPTIONS`.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр**
`тип` | **Описание** ||
|| **iconName***
[`string`](../../data-types.md) | Подпись пункта в интерфейсе. До 50 символов, допускаются латинские буквы, пробел и `-` ||
|| **extranet**
[`string`](../../data-types.md) | Доступ в экстранете, по умолчанию `N`.

Возможные значения:
- `N` — приложение недоступно для экстранет-пользователей
- `Y` — приложение доступно для экстранет-пользователей
||
|| **context**
[`string`](../../data-types.md) | Контекст показа, по умолчанию `ALL`. Можно передать несколько значений через `;`.

Возможные значения:
- `ALL` — все чаты
- `USER` — личные чаты пользователей, кроме чатов с ботами
- `CHAT` — групповые чаты, кроме `LINES` и `CRM`
- `LINES` — чаты открытых линий
- `CRM` — чаты, созданные в рамках CRM

Если передан `ALL` вместе с другими значениями, используется только `ALL`. Неверное значение вызывает ошибку регистрации
||
|| **role**
[`string`](../../data-types.md) | Роль пользователя, по умолчанию `USER`.

Возможные значения:
- `USER` — приложение доступно всем пользователям
- `ADMIN` — приложение доступно только администраторам портала
||
|| **color**
[`string`](../../data-types.md) | Цвет иконки из палитры IM.

Возможные значения:
- `RED` — красный
- `GREEN` — зеленый
- `MINT` — мятный
- `LIGHT_BLUE` — светло-голубой
- `DARK_BLUE` — темно-синий
- `PURPLE` — фиолетовый
- `AQUA` — аквамариновый
- `PINK` — розовый
- `LIME` — лаймовый
- `BROWN` — коричневый
- `AZURE` — лазурный
- `KHAKI` — хаки
- `SAND` — песочный
- `ORANGE` — оранжевый
- `MARENGO` — маренго
- `GRAY` — серый
- `GRAPHITE` — графитовый
||
|#

### Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "IM_SIDEBAR",
        "HANDLER": "https://your-domain.com/widgets/im-sidebar-handler.php",
        "TITLE": "Мой пункт сайдбара",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой пункт сайдбара"
          },
          "en": {
            "TITLE": "My sidebar item"
          }
        },
        "OPTIONS": {
          "iconName": "chat-tools",
          "context": "ALL",
          "role": "USER",
          "extranet": "N",
          "color": "LIGHT_BLUE"
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
          PLACEMENT: 'IM_SIDEBAR',
          HANDLER: 'https://your-domain.com/widgets/im-sidebar-handler.php',
          TITLE: 'My sidebar item',
          LANG_ALL: {
            ru: {
              TITLE: 'My sidebar item',
            },
            en: {
              TITLE: 'My sidebar item',
            },
          },
          OPTIONS: {
            iconName: 'chat-tools',
            context: 'ALL',
            role: 'USER',
            extranet: 'N',
            color: 'LIGHT_BLUE',
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
      async function bindImSidebar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'IM_SIDEBAR',
              HANDLER: 'https://your-domain.com/widgets/im-sidebar-handler.php',
              TITLE: 'My sidebar item',
              LANG_ALL: {
                ru: {
                  TITLE: 'My sidebar item',
                },
                en: {
                  TITLE: 'My sidebar item',
                },
              },
              OPTIONS: {
                iconName: 'chat-tools',
                context: 'ALL',
                role: 'USER',
                extranet: 'N',
                color: 'LIGHT_BLUE',
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

      document.addEventListener('DOMContentLoaded', bindImSidebar)
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
                    'PLACEMENT' => 'IM_SIDEBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/im-sidebar-handler.php',
                    'TITLE' => 'Мой пункт сайдбара',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой пункт сайдбара',
                        ],
                        'en' => [
                            'TITLE' => 'My sidebar item',
                        ],
                    ],
                    'OPTIONS' => [
                        'iconName' => 'chat-tools',
                        'context' => 'ALL',
                        'role' => 'USER',
                        'extranet' => 'N',
                        'color' => 'LIGHT_BLUE',
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
            PLACEMENT: 'IM_SIDEBAR',
            HANDLER: 'https://your-domain.com/widgets/im-sidebar-handler.php',
            TITLE: 'Мой пункт сайдбара',
            LANG_ALL: {
                ru: { TITLE: 'Мой пункт сайдбара' },
                en: { TITLE: 'My sidebar item' }
            },
            OPTIONS: {
                iconName: 'chat-tools',
                context: 'ALL',
                role: 'USER',
                extranet: 'N',
                color: 'LIGHT_BLUE'
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
            'PLACEMENT' => 'IM_SIDEBAR',
            'HANDLER' => 'https://your-domain.com/widgets/im-sidebar-handler.php',
            'TITLE' => 'Мой пункт сайдбара',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой пункт сайдбара',
                ],
                'en' => [
                    'TITLE' => 'My sidebar item',
                ],
            ],
            'OPTIONS' => [
                'iconName' => 'chat-tools',
                'context' => 'ALL',
                'role' => 'USER',
                'extranet' => 'N',
                'color' => 'LIGHT_BLUE',
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
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)

