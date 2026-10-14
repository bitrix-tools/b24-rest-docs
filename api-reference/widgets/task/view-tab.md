# Виджет в карточке задачи TASK_VIEW_TAB

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, task`](../../scopes/permissions.md)

Виджет добавляет интерфейс приложения в карточку задачи. До версии модуля `tasks` 25.700.0 он выводился отдельной вкладкой, в [новой карточке](../../tasks/tasks-new.md) — строкой в блоке *Приложения*.

Точку выбирают, когда приложению нужен свой экран внутри задачи: данные из внешнего сервиса, отчет или форма рядом с полями задачи.

Если приложение зарегистрирует несколько точек карточки, в блоке появится по строке на каждую. Для новой интеграции достаточно одной точки.

Вывод виджета можно ограничить задачами конкретных проектов параметром подключения `groupId` — см. [OPTIONS при регистрации](#options).

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](../placement-bind.md).

{% note info "" %}

Виджет не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код точки встраивания** | **Место** ||
|| `TASK_VIEW_TAB` | Строка в блоке *Приложения* карточки задачи ||
|#

### Где находится в интерфейсе

Откройте задачу. Строка приложения выводится под полями задачи в блоке *Приложения*. Название строки — значение `TITLE`, переданное при регистрации.

![Строка в блоке «Приложения» карточки задачи](./_images/TASK_VIEW_TAB.png "Строка в блоке «Приложения» карточки задачи")

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php

Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => 0063a02ba25315469678f946ece50010
    [AUTH_ID] => 9c52ba6600705a0700005a4b00000001f0f107e81691773d119eb941ad045e36
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => 8cd1e16600705a0700005a4b00000001f0f1070aef2cbe270a6f27bcaf791e45
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 3f0a7c19e5b84d2196c8ad470e5f2b31
    [APPLICATION_SCOPE] => task,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => TASK_VIEW_TAB
    [PLACEMENT_OPTIONS] => {"taskId":"3957","URI":"\/company\/personal\/user\/1\/tasks\/task\/view\/3957\/"}
)

```

Строка `PLACEMENT_OPTIONS` из этого примера после разбора выглядит так:

```json
{
    "taskId": "3957",
    "URI": "/company/personal/user/1/tasks/task/view/3957/"
}
```

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

{% include notitle [описание стандартных данных](../_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

Значение `PLACEMENT_OPTIONS` передается как JSON-строка с контекстом вызова. Кроме универсального ключа `URI` в контекст попадает собственный ключ точки.

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Параметр** | **Описание** ||
|| **taskId***
[`string`](../../data-types.md) | Идентификатор задачи, из карточки которой открыт виджет.

Данные задачи возвращает метод [tasks.task.get](../../tasks/tasks-task-get.md)

||
|| **URI**
[`string`](../../data-types.md) | Адрес страницы Битрикс24, с которой открыт виджет ||
|#

## OPTIONS при регистрации через placement.bind {#options}

Параметры подключения передаются в `OPTIONS` метода [placement.bind](../placement-bind.md) при регистрации обработчика. Это не те данные, которые Битрикс24 передает обработчику при вызове точки: они описаны в разделе «Что получает обработчик».

#|
|| **Параметр** | **Описание** ||
|| **groupId**
[`string`](../../data-types.md) | Ограничивает вывод виджета задачами перечисленных проектов. Значение — идентификаторы проектов через запятую, например `129,130`.

Если параметр не передан или пуст, виджет выводится во всех задачах. Если параметр заполнен, виджет выводится только в задачах перечисленных проектов и не выводится в задачах без проекта

||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

В примерах передан параметр `OPTIONS` с идентификаторами проектов `129,130`. Удалите его, если виджет должен выводиться во всех задачах.

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "TASK_VIEW_TAB",
        "HANDLER": "https://your-domain.com/widgets/task-view-tab-handler.php",
        "TITLE": "Мой виджет в задаче",
        "OPTIONS": {
          "groupId": "129,130"
        },
        "LANG_ALL": {
          "ru": {
            "TITLE": "Мой виджет в задаче"
          },
          "en": {
            "TITLE": "My task widget"
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
          PLACEMENT: 'TASK_VIEW_TAB',
          HANDLER: 'https://your-domain.com/widgets/task-view-tab-handler.php',
          TITLE: 'My task widget',
          OPTIONS: {
            groupId: '129,130',
          },
          LANG_ALL: {
            ru: {
              TITLE: 'Мой виджет в задаче',
            },
            en: {
              TITLE: 'My task widget',
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
      async function bindTaskViewTab() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'TASK_VIEW_TAB',
              HANDLER: 'https://your-domain.com/widgets/task-view-tab-handler.php',
              TITLE: 'My task widget',
              OPTIONS: {
                groupId: '129,130',
              },
              LANG_ALL: {
                ru: {
                  TITLE: 'Мой виджет в задаче',
                },
                en: {
                  TITLE: 'My task widget',
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

      document.addEventListener('DOMContentLoaded', bindTaskViewTab)
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
                    'PLACEMENT' => 'TASK_VIEW_TAB',
                    'HANDLER' => 'https://your-domain.com/widgets/task-view-tab-handler.php',
                    'TITLE' => 'Мой виджет в задаче',
                    'OPTIONS' => [
                        'groupId' => '129,130',
                    ],
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Мой виджет в задаче',
                        ],
                        'en' => [
                            'TITLE' => 'My task widget',
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
            PLACEMENT: 'TASK_VIEW_TAB',
            HANDLER: 'https://your-domain.com/widgets/task-view-tab-handler.php',
            TITLE: 'Мой виджет в задаче',
            OPTIONS: {
                groupId: '129,130'
            },
            LANG_ALL: {
                ru: { TITLE: 'Мой виджет в задаче' },
                en: { TITLE: 'My task widget' }
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
            'PLACEMENT' => 'TASK_VIEW_TAB',
            'HANDLER' => 'https://your-domain.com/widgets/task-view-tab-handler.php',
            'TITLE' => 'Мой виджет в задаче',
            'OPTIONS' => [
                'groupId' => '129,130',
            ],
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Мой виджет в задаче',
                ],
                'en' => [
                    'TITLE' => 'My task widget',
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
    	"PLACEMENT": "TASK_VIEW_TAB",
    	"HANDLER":   "https://your-domain.com/widgets/task-view-tab-handler.php",
    	"TITLE":     "Мой виджет в задаче",
    	"OPTIONS": b24.Params{
    		"groupId": "129,130",
    	},
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Мой виджет в задаче",
    		},
    		"en": b24.Params{
    			"TITLE": "My task widget",
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("placement.bind: %w", err)
    }

    // Ответ приходит как json.RawMessage — разберите его по форме ответа
    // метода placement.bind, см. раздел «Обработка ответа» на его странице.
    fmt.Printf("%s\n", res.Result)
    ```

{% endlist %}

## Типовые ошибки

#|
|| **Ошибка** | **Как решить** ||
|| `placement.bind` возвращает `WRONG_AUTH_TYPE` с описанием `Application context required` | Регистрируйте точку от имени приложения. Вебхуком точку не привязать ||
|| Виджет появился не во всех задачах | Проверьте `groupId`: виджет выводится только в задачах перечисленных в нем проектов — см. [OPTIONS при регистрации](#options) ||
|| Обработчик не находит идентификатор задачи | Читайте идентификатор из ключа `taskId`. Ключ `ID` приходит у точки [TASK_LIST_CONTEXT_MENU](./list-context-menu.md) в контекстном меню списка ||
|#

Другие коды ошибок регистрации перечислены в разделе «Возможные коды ошибок» страницы [placement.bind](../placement-bind.md).

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./view-sidebar.md)
- [{#T}](./view-top-panel.md)
- [{#T}](../placement-bind.md)
- [{#T}](../placement-get.md)
- [{#T}](../placement-unbind.md)
- [{#T}](../ui-interaction/index.md)
- [{#T}](../../../settings/interactivity/index.md)
- [{#T}](../bx24-widget-methods.md)
- [{#T}](../../tasks/tasks-new.md)
