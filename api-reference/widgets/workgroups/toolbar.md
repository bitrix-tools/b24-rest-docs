# Пункт меню расширений группы SONET_GROUP_TOOLBAR

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, sonet_group`](../../scopes/permissions.md)

Виджет добавляет свой пункт в меню расширений рабочей группы или проекта.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `SONET_GROUP_TOOLBAR` | Пункт меню расширений рабочей группы или проекта ||
|#

### Где находится в интерфейсе

Откройте рабочую группу, нажмите *•••* справа от названия группы и выберите *Расширения*. Пункт приложения выводится в этом подменю рядом с пунктами баз знаний и Маркетплейса.

{% note warning "" %}

Меню группы с пунктом *Расширения* есть только в классическом интерфейсе. В новом виде «Проекты AI» точка регистрируется методом `placement.bind`, но места вывода у нее нет — пункт не появится. Чтобы добавить свой пункт в меню группы в обоих случаях, используйте [{#T}](./detail-tab.md)

{% endnote %}

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 25e596577c2a1ddf98c7863421330527
    [AUTH_ID] => 5d56ba6600705a0700005a4b00000001f0f107d21c0babb82529a32836e165141a2010
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 4dd5e16600705a0700005a4b00000001f0f107a934a327935855b75f8c3686204e3bd5
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => sonet_group,task,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => SONET_GROUP_TOOLBAR
    [PLACEMENT_OPTIONS] => {"URI":"\/workgroups\/group\/10\/tasks\/"}
)
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова.

Собственных ключей у `SONET_GROUP_TOOLBAR` нет — в контекст попадает только универсальный ключ `URI`. Идентификатор группы отдельным параметром не приходит, его можно получить из пути в `URI`. Например, для значения `/workgroups/group/10/tasks/` идентификатор группы равен `10`. По нему можно получить данные группы методом [sonet_group.get](../../sonet-group/sonet-group-get.md).

Если обработчику нужен идентификатор группы в явном виде, используйте [{#T}](./detail-tab.md) или [{#T}](./robot-designer-toolbar.md) — эти точки передают его в ключе `GROUP_ID`.

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "SONET_GROUP_TOOLBAR",
        "HANDLER": "https://your-domain.com/widgets/sonet-group-toolbar-handler.php",
        "TITLE": "Мое расширение группы",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мое расширение группы"
          },
          "en": {
            "TITLE": "My group extension"
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
          PLACEMENT: 'SONET_GROUP_TOOLBAR',
          HANDLER: 'https://your-domain.com/widgets/sonet-group-toolbar-handler.php',
          TITLE: 'My group extension',
          LANG_ALL: {
            ru: {
              TITLE: 'Мое расширение группы',
            },
            en: {
              TITLE: 'My group extension',
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
      async function bindSonetGroupToolbar() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'SONET_GROUP_TOOLBAR',
              HANDLER: 'https://your-domain.com/widgets/sonet-group-toolbar-handler.php',
              TITLE: 'My group extension',
              LANG_ALL: {
                ru: {
                  TITLE: 'Мое расширение группы',
                },
                en: {
                  TITLE: 'My group extension',
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

      document.addEventListener('DOMContentLoaded', bindSonetGroupToolbar)
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
                    'PLACEMENT' => 'SONET_GROUP_TOOLBAR',
                    'HANDLER' => 'https://your-domain.com/widgets/sonet-group-toolbar-handler.php',
                    'TITLE' => 'Мое расширение группы',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мое расширение группы',
                        ],
                        'en' => [
                            'TITLE' => 'My group extension',
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
            PLACEMENT: 'SONET_GROUP_TOOLBAR',
            HANDLER: 'https://your-domain.com/widgets/sonet-group-toolbar-handler.php',
            TITLE: 'Мое расширение группы',
            LANG_ALL: {
                ru: { TITLE: 'Мое расширение группы' },
                en: { TITLE: 'My group extension' }
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
            'PLACEMENT' => 'SONET_GROUP_TOOLBAR',
            'HANDLER' => 'https://your-domain.com/widgets/sonet-group-toolbar-handler.php',
            'TITLE' => 'Мое расширение группы',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мое расширение группы',
                ],
                'en' => [
                    'TITLE' => 'My group extension',
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
    	"PLACEMENT": "SONET_GROUP_TOOLBAR",
    	"HANDLER":   "https://your-domain.com/widgets/sonet-group-toolbar-handler.php",
    	"TITLE":     "Мое расширение группы",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мое расширение группы",
    		},
    		"en": b24.Params{
    			"TITLE": "My group extension",
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
- [{#T}](./detail-tab.md)
- [{#T}](./robot-designer-toolbar.md)
- [{#T}](../placement-bind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../../settings/interactivity/index.md)
