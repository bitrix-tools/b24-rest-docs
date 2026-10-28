# Получить список событий календаря calendar.event.get

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.event.get` получает список событий календаря.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../../data-types.md) | Тип календаря: 
- `user` — календарь пользователя
- `group` — календарь группы
- `company_calendar` — календарь компании ||
|| **ownerId***
[`integer`](../../data-types.md) | Идентификатор владельца календаря.

Для календаря компании параметр `ownerId` имеет значение `0` ||
|| **from**
[`date`](../../data-types.md) | Дата начала выборки.

Значение по умолчанию — месяц до текущей даты ||
|| **to**
[`date`](../../data-types.md) | Дата окончания выборки.

Значение по умолчанию — три месяца после текущей даты ||
|| **section**
[`array`](../../data-types.md) | Массив идентификаторов календарей ||
|| **modified_since**
[`string`](../../data-types.md) | Момент, начиная с которого нужны измененные события. Формат — ISO 8601 с обязательным часовым поясом: `2026-10-13T09:00:00+03:00` или `2026-10-13T06:00:00Z`. Дробная часть секунд допускается и отбрасывается.

Метод вернет события, у которых дата изменения больше или равна переданному значению, включая удаленные. Подробнее — в разделе [Получение изменений](#modified-since).

Пустая строка равнозначна отсутствию параметра ||
|#

### Получение изменений {#modified-since}

Параметр `modified_since` позволяет синхронизировать календарь с внешней системой без повторной загрузки всех событий.

1. При первой синхронизации получите события без `modified_since` и запомните наибольшее значение поля `TIMESTAMP_X_ISO` из ответа.

2. При следующей синхронизации передайте это значение в `modified_since`. Значение из поля `TIMESTAMP_X_ISO` можно передать без преобразования.

Как работает выборка изменений:

- граница включительная, точность — одна секунда. События, измененные в ту же секунду, придут повторно, поэтому обрабатывайте их по `ID` без дублей

- ограничение по датам `from` и `to` действует и вместе с `modified_since`. Если событие находится за пределами периода выборки, его изменение не придет

- удаленные события приходят со значением `DELETED` = `Y`, а в `TIMESTAMP_X_ISO` у них — момент удаления. Без `modified_since` метод удаленные события не возвращает

- повторяющееся событие приходит отдельной записью на каждое повторение в периоде выборки, все записи с одним `ID`. Это относится и к удаленным повторяющимся событиям

- ответ участника на приглашение не меняет дату изменения события, поэтому в выборку изменений не попадает

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

1. Получить события пользователя с `id` = `1` за период с `2024-06-20` по `2024-08-20`

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":1,"from":"2024-06-20","to":"2024-08-20","section":[21,44]}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.event.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":1,"from":"2024-06-20","to":"2024-08-20","section":[21,44],"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/calendar.event.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type CalendarEventItem = {
          ID: string
          NAME: string
          DATE_FROM: string
          DATE_TO: string
          TIMESTAMP_X_ISO?: string
          DELETED: string
        }

        try {
          const response = await $b24.actions.v2.call.make<CalendarEventItem[]>({
            method: 'calendar.event.get',
            params: {
            type: 'user',
            ownerId: 1,
            from: '2024-06-20',
            to: '2024-08-20',
            section: [21, 44],
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const events = response.getData()!.result
            events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
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
          async function getCalendarEvents() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'calendar.event.get',
                params: {
                  type: 'user',
                  ownerId: 1,
                  from: '2024-06-20',
                  to: '2024-08-20',
                  section: [21, 44],
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const events = response.getData().result
              events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getCalendarEvents)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.calendar.event.get(
                type="user",
                owner_id=1,
                from_date="2024-06-20",
                to="2024-08-20",
                section=[
                    21,
                    44,
                ],
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
                    'calendar.event.get',
                    [
                        'type'    => 'user',
                        'ownerId' => 1,
                        'from'    => '2024-06-20',
                        'to'      => '2024-08-20',
                        'section' => [21, 44],
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error getting calendar events: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'calendar.event.get',
            {
                type: 'user',
                ownerId: 1,
                from: '2024-06-20',
                to: '2024-08-20',
                section: [21, 44]
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'calendar.event.get',
            [
                'type' => 'user',
                'ownerId' => 1,
                'from' => '2024-06-20',
                'to' => '2024-08-20',
                'section' => [21, 44]
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "calendar.event.get", b24.Params{
        	"type":    "user",
        	"ownerId": 1,
        	"from":    "2024-06-20",
        	"to":      "2024-08-20",
        	"section": []int{21, 44},
        }, b24.WithIdempotent())
        if err != nil {
        	return fmt.Errorf("calendar.event.get: %w", err)
        }

        // Ответ приходит как json.RawMessage — разберите его
        // в структуру под форму ответа, показанную ниже на этой странице.
        fmt.Printf("%s\n", res.Result)
        ```

    {% endlist %}

2. Получить события календаря компании.

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"company_calendar","ownerId":0}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.event.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"company_calendar","ownerId":0,"auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/calendar.event.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type CalendarEventItem = {
          ID: string
          NAME: string
          DATE_FROM: string
          DATE_TO: string
          TIMESTAMP_X_ISO?: string
          DELETED: string
        }

        try {
          const response = await $b24.actions.v2.call.make<CalendarEventItem[]>({
            method: 'calendar.event.get',
            params: {
            type: 'company_calendar',
            ownerId: 0,
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const events = response.getData()!.result
            events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
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
          async function getCalendarEvents() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'calendar.event.get',
                params: {
                  type: 'company_calendar',
                  ownerId: 0,
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const events = response.getData().result
              events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getCalendarEvents)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            bitrix_response = client.calendar.event.get(
                type="company_calendar",
                owner_id=0,
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
                    'calendar.event.get',
                    [
                        'type'    => 'company_calendar',
                        'ownerId' => 0,
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error getting calendar events: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'calendar.event.get',
            {
                type: 'company_calendar',
                ownerId: 0
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'calendar.event.get',
            [
                'type' => 'company_calendar',
                'ownerId' => 0
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "calendar.event.get", b24.Params{
        	"type":    "company_calendar",
        	"ownerId": 0,
        }, b24.WithIdempotent())
        if err != nil {
        	return fmt.Errorf("calendar.event.get: %w", err)
        }

        // Ответ приходит как json.RawMessage — разберите его
        // в структуру под форму ответа, показанную ниже на этой странице.
        fmt.Printf("%s\n", res.Result)
        ```

    {% endlist %}

3. Получить события пользователя с `id` = `1`, измененные начиная с `2026-10-13T09:00:00+03:00`, включая удаленные

    {% list tabs %}

    - cURL (Webhook)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":1,"modified_since":"2026-10-13T09:00:00+03:00"}' \
        https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.event.get
        ```

    - cURL (OAuth)

        ```bash
        curl -X POST \
        -H "Content-Type: application/json" \
        -H "Accept: application/json" \
        -d '{"type":"user","ownerId":1,"modified_since":"2026-10-13T09:00:00+03:00","auth":"**put_access_token_here**"}' \
        https://**put_your_bitrix24_address**/rest/calendar.event.get
        ```

    - JS (TS)

        ```ts
        // This snippet is an ES module: top-level await requires type="module" or a bundler.
        // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
        import { Text } from '@bitrix24/b24jssdk'
        import type { B24Frame } from '@bitrix24/b24jssdk'

        declare const $b24: B24Frame

        // Shape of the payload returned in result (match the "response handling" section of the page)
        type CalendarEventItem = {
          ID: string
          NAME: string
          DATE_FROM: string
          DATE_TO: string
          TIMESTAMP_X_ISO?: string
          DELETED: string
        }

        try {
          const response = await $b24.actions.v2.call.make<CalendarEventItem[]>({
            method: 'calendar.event.get',
            params: {
            type: 'user',
            ownerId: 1,
            modified_since: '2026-10-13T09:00:00+03:00',
            },
            requestId: Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
          } else {
            const events = response.getData()!.result
            events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
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
          async function getCalendarEvents() {
            try {
              // Initialize the SDK inside a Bitrix24 frame
              const $b24 = await B24Js.initializeB24Frame()

              const response = await $b24.actions.v2.call.make({
                method: 'calendar.event.get',
                params: {
                  type: 'user',
                  ownerId: 1,
                  modified_since: '2026-10-13T09:00:00+03:00',
                },
                requestId: B24Js.Text.getUuidRfc4122()
              })

              // The payload is available only on a successful response
              if (!response.isSuccess) {
                console.error(response.getErrorMessages().join('; '))
                return
              }

              const events = response.getData().result
              events.forEach((event) => console.info('Event:', event.ID, event.NAME, event.DATE_FROM, event.DATE_TO))
            } catch (error) {
              // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
              console.error(error)
            }
          }

          document.addEventListener('DOMContentLoaded', getCalendarEvents)
        </script>
        ```

    - Python

        ```python
        from b24pysdk.errors import BitrixAPIError, BitrixSDKException

        try:
            # У параметра modified_since нет аргумента в обертке b24pysdk, поэтому вызываем метод по имени
            bitrix_response = bitrix_token.call_method(
                "calendar.event.get",
                {
                    "type": "user",
                    "ownerId": 1,
                    "modified_since": "2026-10-13T09:00:00+03:00",
                },
            )
            result = bitrix_response["result"]
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
                    'calendar.event.get',
                    [
                        'type'           => 'user',
                        'ownerId'        => 1,
                        'modified_since' => '2026-10-13T09:00:00+03:00',
                    ]
                );

            $result = $response
                ->getResponseData()
                ->getResult();

            echo 'Success: ' . print_r($result, true);
            // Нужная вам логика обработки данных
            processData($result);

        } catch (Throwable $e) {
            error_log($e->getMessage());
            echo 'Error getting calendar events: ' . $e->getMessage();
        }
        ```

    - BX24.js

        ```js
        BX24.callMethod(
            'calendar.event.get',
            {
                type: 'user',
                ownerId: 1,
                modified_since: '2026-10-13T09:00:00+03:00'
            }
        );
        ```

    - PHP CRest

        ```php
        require_once('crest.php');

        $result = CRest::call(
            'calendar.event.get',
            [
                'type' => 'user',
                'ownerId' => 1,
                'modified_since' => '2026-10-13T09:00:00+03:00'
            ]
        );

        echo '<PRE>';
        print_r($result);
        echo '</PRE>';
        ```

    - Go

        ```go
        // client и ctx уже созданы — см. раздел «SDK для Go»
        res, err := client.Core().Call(ctx, "calendar.event.get", b24.Params{
        	"type":           "user",
        	"ownerId":        1,
        	"modified_since": "2026-10-13T09:00:00+03:00",
        }, b24.WithIdempotent())
        if err != nil {
        	return fmt.Errorf("calendar.event.get: %w", err)
        }

        // Ответ приходит как json.RawMessage — разберите его
        // в структуру под форму ответа, показанную ниже на этой странице.
        fmt.Printf("%s\n", res.Result)
        ```

    {% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": [
        {
            "ID": "1265",
            "PARENT_ID": "1265",
            "ACTIVE": "Y",
            "DELETED": "N",
            "CAL_TYPE": "user",
            "OWNER_ID": "1",
            "NAME": "Event Name",
            "DATE_FROM": "12/11/2024 05:59:00 pm",
            "DATE_TO": "12/11/2024 06:59:00 pm",
            "ORIGINAL_DATE_FROM": null,
            "TZ_FROM": "Europe/Riga",
            "TZ_TO": "Europe/Riga",
            "TZ_OFFSET_FROM": "7200",
            "TZ_OFFSET_TO": "7200",
            "DATE_FROM_TS_UTC": "1733932740",
            "DATE_TO_TS_UTC": "1733936340",
            "DT_SKIP_TIME": "N",
            "DT_LENGTH": 3600,
            "EVENT_TYPE": null,
            "CREATED_BY": "1",
            "DATE_CREATE": "12/05/2024 01:48:41 pm",
            "TIMESTAMP_X": "12/05/2024 01:48:41 pm",
            "DATE_CREATE_ISO": "2024-12-05T13:48:41+02:00",
            "TIMESTAMP_X_ISO": "2024-12-05T13:48:41+02:00",
            "DESCRIPTION": "Description for event",
            "DT_FROM": null,
            "DT_TO": null,
            "PRIVATE_EVENT": "",
            "ACCESSIBILITY": "free",
            "IMPORTANCE": "normal",
            "IS_MEETING": true,
            "MEETING_STATUS": "H",
            "MEETING_HOST": "1",
            "MEETING": {
                "HOST_NAME": "User Name",
                "NOTIFY": false,
                "REINVITE": false,
                "ALLOW_INVITE": false,
                "HIDE_GUESTS": false,
                "MEETING_CREATOR": 1,
                "LANGUAGE_ID": "ru",
                "MAIL_FROM": ""
            },
            "LOCATION": "test location",
            "REMIND": [
                {
                "type": "min",
                "count": 50
                }
            ],
            "COLOR": "#9dcf00",
            "TEXT_COLOR": "",
            "RRULE": {
                "FREQ": "WEEKLY",
                "BYDAY": {
                "MO": "MO",
                "WE": "WE"
                },
                "INTERVAL": 1,
                "UNTIL": "12/24/2024",
                "~UNTIL": "12/24/2024",
                "UNTIL_TS": 1734998400
            },
            "EXDATE": "11/28/2024;12/05/2024;12/12/2024;12/19/2024;12/26/2024",
            "DAV_XML_ID": "20241211T155900Z-534185204b362e9be7e261e92ccd9078@b24evo.lan",
            "G_EVENT_ID": "",
            "DAV_EXCH_LABEL": "",
            "CAL_DAV_LABEL": "",
            "VERSION": "1",
            "ATTENDEES_CODES": [
                "U1"
            ],
            "RECURRENCE_ID": 1272,
            "RELATIONS": {
                "ORIGINAL_RECURSION_ID": 1271,
                "COMMENT_XML_ID": "EVENT_1271_12/23/2024"
            },
            "SECTION_ID": "4",
            "SYNC_STATUS": null,
            "UF_CRM_CAL_EVENT": [
                "CO_1",
                "L_5"
            ],
            "UF_WEBDAV_CAL_EVENT": false,
            "SECTION_DAV_XML_ID": null,
            "DATE_FROM_FORMATTED": "Wed Dec 11 2024 17:59:00",
            "DATE_TO_FORMATTED": "Wed Dec 11 2024 18:59:00",
            "IS_DAYLIGHT_SAVING_TZ": "N",
            "SECT_ID": "4",
            "OPTIONS": null,
            "ATTENDEE_LIST": [
                {
                "id": 1,
                "entryId": "1265",
                "status": "H"
                }
            ],
            "COLLAB_ID": null,
            "~RRULE_DESCRIPTION": "каждую неделю по: Пн, Ср, от 12/11/2024 до 12/24/2024",
            "attendeesEntityList": [
                {
                "entityId": "user",
                "id": 1
                }
            ],
            "~DESCRIPTION": "Description for event",
            "~USER_OFFSET_FROM": 7200,
            "~USER_OFFSET_TO": 7200
        }
    ],
    "time": {
        "start": 1733412607.646361,
        "finish": 1733412607.956879,
        "duration": 0.3105177879333496,
        "processing": 0.0637059211730957,
        "date_start": "2024-12-05T15:30:07+00:00",
        "date_finish": "2024-12-05T15:30:07+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../../data-types.md) | Массив событий календаря [(подробное описание)](#event). Если в периоде выборки событий нет, массив пустой ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект события {#event}

{% include notitle [поля события календаря](.././_includes/calendar_event_fields.md) %}

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр \"type\" для метода \"calendar.event.get\""
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Не задан обязательный параметр "type" для метода "calendar.event.get" | Не передан обязательный параметр `type` ||
|| `400` | Пустое значение | Доступ запрещен | Запрещен доступ к методу для внешних пользователей ||
|| `400` | `ERROR_ARGUMENT` | Недопустимое значение параметра "modified_since" | В `modified_since` передано значение без часового пояса, без секунд, с пробелом вместо `T`, несуществующая дата или значение не строкового типа ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-event-add.md)
- [{#T}](./calendar-event-update.md)
- [{#T}](./calendar-event-get-by-id.md)
- [{#T}](./calendar-event-get-nearest.md)
- [{#T}](./calendar-event-delete.md)
