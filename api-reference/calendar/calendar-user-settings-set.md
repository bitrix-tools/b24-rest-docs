# Установить пользовательские настройки календаря calendar.user.settings.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.user.settings.set` устанавливает пользовательские настройки календаря для текущего пользователя.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **settings***
[`object`](../data-types.md) | Объект со значениями пользовательских настроек календаря [(подробное описание)](#settings) ||
|#

### Параметр settings {#settings}

Все поля объекта `settings` необязательны. Поля верхнего уровня, которые не передали, метод оставляет без изменений. Если передать `defaultSections` или `defaultReminders`, сохраненное значение заменяется целиком: вложенные ключи, которых нет в новом значении, удаляются.

Поля `timezoneName`, `timezoneOffsetUTC`, `timezoneDefaultName`, `work_time_start` и `work_time_end` этот метод не устанавливает — их возвращает [calendar.user.settings.get](./calendar-user-settings-get.md), а меняет сотрудник в интерфейсе календаря.

Метод сохраняет значения без проверки: неизвестные ключи игнорирует, а недопустимое значение известного ключа записывает как есть. Например, `view: "zzz"` сохранится и вернется в `calendar.user.settings.get`. Проверяйте значения на своей стороне.

#|
|| **Название**
`тип` | **Описание** ||
|| **view**
[`string`](../data-types.md) | Стандартное представление для календаря. Возможные значения:
- `day` — день
- `week` — неделя
- `month` — месяц
- `list` — список ||
|| **meetSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря для приглашений. По умолчанию `false` ||
|| **crmSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря для CRM. По умолчанию `false` ||
|| **showDeclined**
[`boolean`](../data-types.md) | Показывать события, в которых пользователь отказался принять участие ||
|| **denyBusyInvitation**
[`boolean`](../data-types.md) | Запрещать приглашать в событие, если время занято ||
|| **CalendarSelCont**
[```string|boolean```](../data-types.md) | Служебное поле интерфейса календаря. По умолчанию `false` ||
|| **SPCalendarSelCont**
[```string|boolean```](../data-types.md) | Служебное поле интерфейса календаря. По умолчанию `false` ||
|| **collapseOffHours**
[`string`](../data-types.md) | Скрывать нерабочее время в календаре в недельном и дневном представлении. Возможные значения:
- `Y` — скрывать
- `N` — не скрывать ||
|| **showWeekNumbers**
[`string`](../data-types.md) | Показывать номера недель. Возможные значения:
- `Y` — показывать
- `N` — не показывать ||
|| **showTasks**
[`string`](../data-types.md) | Отображать задачи в календаре. Возможные значения:
- `Y` — отображать
- `N` — не отображать ||
|| **syncTasks**
[`string`](../data-types.md) | Синхронизировать календарь задач. Возможные значения:
- `Y` — да
- `N` — нет ||
|| **showCompletedTasks**
[`string`](../data-types.md) | Отображать завершенные задачи. Возможные значения:
- `Y` — отображать
- `N` — не отображать ||
|| **lastUsedSection**
[```string|boolean```](../data-types.md) | Идентификатор календаря, который используется при создании событий, если в параметрах не передан идентификатор календаря.

По умолчанию `false` — календарь не выбран ||
|| **sendFromEmail**
[`string`](../data-types.md) | E-mail для отправки почтовых приглашений ||
|| **defaultSections**
[`object`](../data-types.md) | Настройки предустановленных календарей.

Ключом объекта настроек может быть:
- `user[id]` — тип Календарь пользователя с идентификатором пользователя. Например, `user12` соответствует календарю пользователя с идентификатором `12`
- `group[id]` — тип Календарь группы с идентификатором группы. Например, `group36` соответствует календарю группы с идентификатором `36`

Значение — идентификатор календаря ||
|| **syncPeriodPast**
[```string|integer```](../data-types.md) | Количество месяцев для синхронизации в прошлом периоде. По умолчанию `3` ||
|| **syncPeriodFuture**
[```string|integer```](../data-types.md) | Количество месяцев для синхронизации в будущем периоде. По умолчанию `12` ||
|| **defaultReminders**
[`object`](../data-types.md) | Объект со стандартными настройками напоминаний о событии [(подробное описание)](#defaultReminders) ||
|#

### Объект defaultReminders {#defaultReminders}

#|
|| **Название**
`тип` | **Описание** ||
|| **fullDay**
[```object|array```](../data-types.md) | Настройки напоминаний для целодневных событий: один объект или массив объектов [(подробное описание)](#reminder-settings) ||
|| **withTime**
[```object|array```](../data-types.md) | Настройки напоминаний для событий с указанием времени: один объект или массив объектов [(подробное описание)](#reminder-settings) ||
|#

Значение `defaultReminders` перезаписывается целиком: чтобы изменить одно напоминание, передайте оба поля объекта в нужном виде.

### Объект настроек напоминания {#reminder-settings}

#|
|| **Название**
`тип` | **Описание** ||
|| **type**
[`string`](../data-types.md) | Временной тип напоминания. Возможные значения:
- `min` — минуты
- `hour` — часы
- `day` — дни
- `daybefore` — напоминание в заданное время дня события ||
|| **count**
[```integer|string```](../data-types.md) | Числовое значение временного промежутка. Используется с типами `min`, `hour` и `day`. Можно передать числом или строкой ||
|| **before**
[`integer`](../data-types.md) | Сдвиг напоминания в днях до дня события. Используется с типом `daybefore`. При `0` напоминание приходит в день события ||
|| **time**
[`integer`](../data-types.md) | Время напоминания в минутах от начала дня. Используется с типом `daybefore`. При `before: 0` и `time: 480` напоминание приходит в день события в 08:00 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"settings":{"view":"month","meetSection":"4","crmSection":"4","showDeclined":true,"denyBusyInvitation":false,"collapseOffHours":"N","showWeekNumbers":"N","showTasks":"Y","syncTasks":"N","showCompletedTasks":"N","lastUsedSection":"false","sendFromEmail":"","defaultSections":{"user1":"4","group6":"49"},"syncPeriodPast":"3","syncPeriodFuture":"12","defaultReminders":{"fullDay":[{"type":"min","count":15}],"withTime":[{"type":"min","count":50}]}}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.user.settings.set
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"settings":{"view":"month","meetSection":"4","crmSection":"4","showDeclined":true,"denyBusyInvitation":false,"collapseOffHours":"N","showWeekNumbers":"N","showTasks":"Y","syncTasks":"N","showCompletedTasks":"N","lastUsedSection":"false","sendFromEmail":"","defaultSections":{"user1":"4","group6":"49"},"syncPeriodPast":"3","syncPeriodFuture":"12","defaultReminders":{"fullDay":[{"type":"min","count":15}],"withTime":[{"type":"min","count":50}]}},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.user.settings.set
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CalendarUserSettingsSetResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<CalendarUserSettingsSetResult>({
        method: 'calendar.user.settings.set',
        params: {
          settings: {
            view: 'month',
            meetSection: '4',
            crmSection: '4',
            showDeclined: true,
            denyBusyInvitation: false,
            collapseOffHours: 'N',
            showWeekNumbers: 'N',
            showTasks: 'Y',
            syncTasks: 'N',
            showCompletedTasks: 'N',
            lastUsedSection: 'false',
            sendFromEmail: '',
            defaultSections: {
              user1: '4',
              group6: '49',
            },
            syncPeriodPast: '3',
            syncPeriodFuture: '12',
            defaultReminders: {
              fullDay: [
                {
                  type: 'min',
                  count: 15,
                },
              ],
              withTime: [
                {
                  type: 'min',
                  count: 50,
                },
              ],
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
        console.info('Settings saved:', result)
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
      async function setCalendarUserSettings() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.user.settings.set',
            params: {
              settings: {
                view: 'month',
                meetSection: '4',
                crmSection: '4',
                showDeclined: true,
                denyBusyInvitation: false,
                collapseOffHours: 'N',
                showWeekNumbers: 'N',
                showTasks: 'Y',
                syncTasks: 'N',
                showCompletedTasks: 'N',
                lastUsedSection: 'false',
                sendFromEmail: '',
                defaultSections: {
                  user1: '4',
                  group6: '49',
                },
                syncPeriodPast: '3',
                syncPeriodFuture: '12',
                defaultReminders: {
                  fullDay: [
                    {
                      type: 'min',
                      count: 15,
                    },
                  ],
                  withTime: [
                    {
                      type: 'min',
                      count: 50,
                    },
                  ],
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
          console.info('Settings saved:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setCalendarUserSettings)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.user.settings.set(
            settings={
                "view": "month",
                "meetSection": "4",
                "crmSection": "4",
                "showDeclined": True,
                "denyBusyInvitation": False,
                "collapseOffHours": "N",
                "showWeekNumbers": "N",
                "showTasks": "Y",
                "syncTasks": "N",
                "showCompletedTasks": "N",
                "lastUsedSection": "false",
                "sendFromEmail": "",
                "defaultSections": {
                    "user1": "4",
                    "group6": "49",
                },
                "syncPeriodPast": "3",
                "syncPeriodFuture": "12",
                "defaultReminders": {
                    "fullDay": [
                        {
                            "type": "min",
                            "count": 15,
                        },
                    ],
                    "withTime": [
                        {
                            "type": "min",
                            "count": 50,
                        },
                    ],
                },
            },
        ).response
        result = bitrix_response.result
        print(result)
    except BitrixAPIError as error:
        print(
            "Ошибка Bitrix API",
            f"error: {error.error}",
            f"error_description: {error.error_description}",
            sep="\n",
        )
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    except Exception as error:
        print(f"Непредвиденная ошибка: {error}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.user.settings.set',
                [
                    'settings' => [
                        'view'              => 'month',
                        'meetSection'       => '4',
                        'crmSection'        => '4',
                        'showDeclined'      => true,
                        'denyBusyInvitation' => false,
                        'collapseOffHours'  => 'N',
                        'showWeekNumbers'   => 'N',
                        'showTasks'         => 'Y',
                        'syncTasks'         => 'N',
                        'showCompletedTasks' => 'N',
                        'lastUsedSection'   => 'false',
                        'sendFromEmail'     => '',
                        'defaultSections'   => [
                            'user1'  => '4',
                            'group6' => '49'
                        ],
                        'syncPeriodPast'    => '3',
                        'syncPeriodFuture'  => '12',
                        'defaultReminders'  => [
                            'fullDay'  => [
                                [
                                    'type'  => 'min',
                                    'count' => 15
                                ]
                            ],
                            'withTime' => [
                                [
                                    'type'  => 'min',
                                    'count' => 50
                                ]
                            ]
                        ]
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Дальше обработайте $result в своем коде

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting user calendar settings: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.user.settings.set',
        {
            settings: {
                view: 'month',
                meetSection: '4',
                crmSection: '4',
                showDeclined: true,
                denyBusyInvitation: false,
                collapseOffHours: 'N',
                showWeekNumbers: 'N',
                showTasks: 'Y',
                syncTasks: 'N',
                showCompletedTasks: 'N',
                lastUsedSection: 'false',
                sendFromEmail: '',
                defaultSections: {
                    user1: '4',
                    group6: '49'
                },
                syncPeriodPast: '3',
                syncPeriodFuture: '12',
                defaultReminders: {
                    fullDay: [
                        {
                            type: 'min',
                            count: 15
                        }
                    ],
                    withTime: [
                        {
                            type: 'min',
                            count: 50
                        }
                    ]
                }
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.user.settings.set',
        [
            'settings' => [
                'view' => 'month',
                'meetSection' => '4',
                'crmSection' => '4',
                'showDeclined' => true,
                'denyBusyInvitation' => false,
                'collapseOffHours' => 'N',
                'showWeekNumbers' => 'N',
                'showTasks' => 'Y',
                'syncTasks' => 'N',
                'showCompletedTasks' => 'N',
                'lastUsedSection' => 'false',
                'sendFromEmail' => '',
                'defaultSections' => [
                    'user1' => '4',
                    'group6' => '49'
                ],
                'syncPeriodPast' => '3',
                'syncPeriodFuture' => '12',
                'defaultReminders' => [
                    'fullDay' => [
                        [
                            'type' => 'min',
                            'count' => 15
                        ]
                    ],
                    'withTime' => [
                        [
                            'type' => 'min',
                            'count' => 50
                        ]
                    ]
                ]
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "calendar.user.settings.set", b24.Params{
    	"settings": b24.Params{
    		"view":               "month",
    		"meetSection":        "4",
    		"crmSection":         "4",
    		"showDeclined":       true,
    		"denyBusyInvitation": false,
    		"collapseOffHours":   "N",
    		"showWeekNumbers":    "N",
    		"showTasks":          "Y",
    		"syncTasks":          "N",
    		"showCompletedTasks": "N",
    		"lastUsedSection":    "false",
    		"sendFromEmail":      "",
    		"defaultSections": b24.Params{
    			"user1":  "4",
    			"group6": "49",
    		},
    		"syncPeriodPast":   "3",
    		"syncPeriodFuture": "12",
    		"defaultReminders": b24.Params{
    			"fullDay": []b24.Params{
    				{
    					"type":  "min",
    					"count": 15,
    				},
    			},
    			"withTime": []b24.Params{
    				{
    					"type":  "min",
    					"count": 50,
    				},
    			},
    		},
    	},
    })
    if err != nil {
    	return fmt.Errorf("calendar.user.settings.set: %w", err)
    }

    var ok bool
    if err := json.Unmarshal(res.Result, &ok); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("выполнено:", ok)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1733318565.183275,
        "finish": 1733318565.695058,
        "duration": 0.5117831230163574,
        "processing": 0.29406094551086426,
        "date_start": "2024-12-04T13:22:45+00:00",
        "date_finish": "2024-12-04T13:22:45+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | Возвращает `true` при успешном выполнении ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр \"settings\" для метода \"calendar.user.settings.set\""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Не задан обязательный параметр "settings" для метода "calendar.user.settings.set" | Не передан обязательный параметр `settings` ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-settings-get.md)
- [{#T}](./calendar-user-settings-get.md)
