# Вид отображения в календаре CALENDAR_GRIDVIEW

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`placement, calendar`](../scopes/permissions.md)

Виджет добавляет свой вид отображения в календарь. Пользователь переключается на него в ряду видов, и вместо сетки календаря открывается интерфейс приложения. В контексте вызова приходит диапазон дат, который календарь показывал в момент переключения.

Код точки встраивания указывается в параметре `PLACEMENT` метода [placement.bind](./placement-bind.md).

{% note info "" %}

Встройка не отображается в интерфейсе, пока установка приложения не завершена. [Проверьте установку приложения](../../settings/app-installation/installation-finish.md)

{% endnote %}

## Куда встраивается виджет

#|
|| **Код встройки** | **Место** ||
|| `CALENDAR_GRIDVIEW` | Вид отображения в ряду видов календаря ||
|#

### Где находится в интерфейсе

Откройте календарь компании по адресу `/calendar/` или личный календарь сотрудника по адресу `/company/personal/user/<ID пользователя>/calendar/`. Пункт приложения выводится в ряду видов, следом за встроенными видами *День*, *Неделя*, *Месяц* и *Расписание*.

![Вид отображения в ряду видов календаря](./_images/CALENDAR_GRIDVIEW.png "Вид отображения в ряду видов календаря")

Название пункта задается параметром `TITLE` при регистрации. Если параметр не передан, выводится название приложения.

## Что получает обработчик

Данные передаются POST-запросом: часть параметров — в query-строке адреса обработчика, остальные — в теле запроса {.b24-info}

```php
Array
(
    [DOMAIN] => xxx.bitrix24.com
    [PROTOCOL] => 1
    [LANG] => ru
    [APP_SID] => b4f4b92b5178b5a5276e181ca09d25a7
    [AUTH_ID] => be56ba6600705a0700005a4b00000001f0f107e5806d5fe9a98e02021a72e57645f86a
    [AUTH_EXPIRES] => 3600
    [REFRESH_ID] => aed5e16600705a0700005a4b00000001f0f107a80816604b24a8719792ac2a21d629b5
    [SERVER_ENDPOINT] => https://oauth.bitrix24.tech/rest/
    [APPLICATION_TOKEN] => 5b2f8c1d7e3a9046b8c5d2f1a7e3b904
    [APPLICATION_SCOPE] => calendar,placement
    [member_id] => da45a03b265edd8787f8a258d793cc5d
    [status] => L
    [PLACEMENT] => CALENDAR_GRIDVIEW
    [PLACEMENT_OPTIONS] => {"viewRangeFrom":"2026-07-26","viewRangeTo":"2026-09-06","URI":"\/calendar\/"}
)
```

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

{% include notitle [описание стандартных данных](./_includes/widget_data.md) %}

### PLACEMENT_OPTIONS

#|
|| **Ключ** | **Описание** ||
|| **viewRangeFrom**
[`date`](../data-types.md) | Начало диапазона дат, который календарь показывал в момент переключения на виджет. Формат `ГГГГ-ММ-ДД`.

Это границы сетки, а не границы периода: в виде *Месяц* в диапазон попадают и дни соседних месяцев, которые видны в первой и последней строках сетки ||
|| **viewRangeTo**
[`date`](../data-types.md) | Конец диапазона дат по тому же правилу ||
|| **URI**
[`string`](../data-types.md) | Адрес страницы календаря, с которой открыт виджет ||
|#

По диапазону из `viewRangeFrom` и `viewRangeTo` приложение получает события методом [calendar.event.get](../calendar/calendar-event/calendar-event-get.md) и рисует свою сетку.

Точка не поддерживает параметр `OPTIONS` метода [placement.bind](./placement-bind.md): переданные значения не сохраняются, [placement.get](./placement-get.md) возвращает пустой массив.

## Связь с другими объектами

**События календаря.** Диапазон дат из контекста вызова передается в фильтр метода [calendar.event.get](../calendar/calendar-event/calendar-event-get.md) — так виджет показывает те же события, что и встроенные виды календаря.

**Календарь Битрикс24.** Из открытого виджета доступны команды календаря — [BX24.placement.call](./ui-interaction/bx24-placement-call.md) открывает карточку события, форму создания и форму редактирования. В обратную сторону календарь сообщает виджету о смене периода и обновлении вида — на эти события подписываются методом [BX24.placement.bindEvent](./ui-interaction/bx24-placement-bind-event.md). Полный список команд и событий с примерами — в статье [{#T}](../calendar/calendar-grid-view.md).

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "PLACEMENT": "CALENDAR_GRIDVIEW",
        "HANDLER": "https://your-domain.com/widgets/calendar-gridview-handler.php",
        "TITLE": "Загрузка команды",
        "LANG_ALL": {
          "ru": {
            "TITLE": "Загрузка команды"
          },
          "en": {
            "TITLE": "Team workload"
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
          PLACEMENT: 'CALENDAR_GRIDVIEW',
          HANDLER: 'https://your-domain.com/widgets/calendar-gridview-handler.php',
          TITLE: 'Загрузка команды',
          LANG_ALL: {
            ru: {
              TITLE: 'Загрузка команды',
            },
            en: {
              TITLE: 'Team workload',
            },
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // Данные доступны только при успешном ответе
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Placement bound successfully:', result)
      }
    } catch (error) {
      // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <!-- Подключение SDK (UMD-сборка), глобальный объект B24Js -->
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function bindCalendarGridView() {
        try {
          // Инициализация SDK внутри фрейма Битрикс24
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CALENDAR_GRIDVIEW',
              HANDLER: 'https://your-domain.com/widgets/calendar-gridview-handler.php',
              TITLE: 'Загрузка команды',
              LANG_ALL: {
                ru: {
                  TITLE: 'Загрузка команды',
                },
                en: {
                  TITLE: 'Team workload',
                },
              },
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // Данные доступны только при успешном ответе
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Placement bound successfully:', result)
        } catch (error) {
          // Ошибки транспорта и SDK (AjaxError, SdkError и другие)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindCalendarGridView)
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
                    'PLACEMENT' => 'CALENDAR_GRIDVIEW',
                    'HANDLER' => 'https://your-domain.com/widgets/calendar-gridview-handler.php',
                    'TITLE' => 'Загрузка команды',
                    'LANG_ALL' => [
                        'ru' => [
                            'TITLE' => 'Загрузка команды',
                        ],
                        'en' => [
                            'TITLE' => 'Team workload',
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
            PLACEMENT: 'CALENDAR_GRIDVIEW',
            HANDLER: 'https://your-domain.com/widgets/calendar-gridview-handler.php',
            TITLE: 'Загрузка команды',
            LANG_ALL: {
                ru: {
                    TITLE: 'Загрузка команды'
                },
                en: {
                    TITLE: 'Team workload'
                }
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
            'PLACEMENT' => 'CALENDAR_GRIDVIEW',
            'HANDLER' => 'https://your-domain.com/widgets/calendar-gridview-handler.php',
            'TITLE' => 'Загрузка команды',
            'LANG_ALL' => [
                'ru' => [
                    'TITLE' => 'Загрузка команды',
                ],
                'en' => [
                    'TITLE' => 'Team workload',
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
    	"PLACEMENT": "CALENDAR_GRIDVIEW",
    	"HANDLER":   "https://your-domain.com/widgets/calendar-gridview-handler.php",
    	"TITLE":     "Загрузка команды",
    	"LANG_ALL": b24.Params{
    		"ru": b24.Params{
    			"TITLE": "Загрузка команды",
    		},
    		"en": b24.Params{
    			"TITLE": "Team workload",
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

- [{#T}](../calendar/calendar-grid-view.md)
- [{#T}](./placement-bind.md)
- [{#T}](./placement-list.md)
- [{#T}](./placement-unbind.md)
- [{#T}](./ui-interaction/index.md)
- [{#T}](./bx24-widget-methods.md)
- [{#T}](../calendar/index.md)
- [{#T}](../../settings/interactivity/index.md)
