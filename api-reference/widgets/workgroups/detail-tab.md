# Пункт меню группы SONET_GROUP_DETAIL_TAB

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`sonet_group`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню рабочей группы или проекта.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `SONET_GROUP_DETAIL_TAB` | Пункт меню рабочей группы или проекта ||
|#

### Где находится в интерфейсе

Место пункта зависит от версии интерфейса. Классический вид сейчас работает в большинстве Битрикс24, новый вид «Проекты AI» включается постепенно.

В классическом интерфейсе откройте рабочую группу и нажмите *Еще* в ряду вкладок группы. Пункт приложения выводится в конце списка.

В интерфейсе «Проекты AI» откройте проект, нажмите *•••* в карточке проекта и выберите *Приложения*. На скриншоте показан этот вариант.

![Пункт меню рабочей группы или проекта](./_images/SONET_GROUP_DETAIL_TAB.png "Пункт меню рабочей группы или проекта")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 3c900e588b941b81eef07608e4253159
    [AUTH_ID] => 1a55ba6600705a0700005a4b00000001f0f107db29f044c6ff24e984d378967134de83
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 0ad4e16600705a0700005a4b00000001f0f10731fce9fa3219163d545a088b217cc2d4
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => sonet_group,task,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => SONET_GROUP_DETAIL_TAB
    [PLACEMENT_OPTIONS] => {"GROUP_ID":"10","URI":"\/workgroups\/group\/10\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Для `SONET_GROUP_DETAIL_TAB` в контекст передается ключ:

- `GROUP_ID` — идентификатор рабочей группы или проекта, из которого открыт виджет. По нему можно получить данные группы методом [sonet_group.get](../../sonet-group/sonet-group-get.md)

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "SONET_GROUP_DETAIL_TAB",
        "HANDLER": "https://your-domain.com/widgets/sonet-group-detail-tab-handler.php",
        "TITLE": "Мой раздел группы",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой раздел группы"
          },
          "en": {
            "TITLE": "My group section"
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
          PLACEMENT: 'SONET_GROUP_DETAIL_TAB',
          HANDLER: 'https://your-domain.com/widgets/sonet-group-detail-tab-handler.php',
          TITLE: 'My group section',
          LANG_ALL: {
            ru: {
              TITLE: 'Мой раздел группы',
            },
            en: {
              TITLE: 'My group section',
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
      async function bindSonetGroupDetailTab() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'SONET_GROUP_DETAIL_TAB',
              HANDLER: 'https://your-domain.com/widgets/sonet-group-detail-tab-handler.php',
              TITLE: 'My group section',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой раздел группы',
                },
                en: {
                  TITLE: 'My group section',
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

      document.addEventListener('DOMContentLoaded', bindSonetGroupDetailTab)
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
                    'PLACEMENT' => 'SONET_GROUP_DETAIL_TAB',
                    'HANDLER' => 'https://your-domain.com/widgets/sonet-group-detail-tab-handler.php',
                    'TITLE' => 'Мой раздел группы',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой раздел группы',
                        ],
                        'en' => [
                            'TITLE' => 'My group section',
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
            PLACEMENT: 'SONET_GROUP_DETAIL_TAB',
            HANDLER: 'https://your-domain.com/widgets/sonet-group-detail-tab-handler.php',
            TITLE: 'Мой раздел группы',
            LANG_ALL: {
                ru: { TITLE: 'Мой раздел группы' },
                en: { TITLE: 'My group section' }
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
            'PLACEMENT' => 'SONET_GROUP_DETAIL_TAB',
            'HANDLER' => 'https://your-domain.com/widgets/sonet-group-detail-tab-handler.php',
            'TITLE' => 'Мой раздел группы',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой раздел группы',
                ],
                'en' => [
                    'TITLE' => 'My group section',
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
- [{#T}](./toolbar.md)
- [{#T}](./robot-designer-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
