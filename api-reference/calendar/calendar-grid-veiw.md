# Как встроить приложение в календарь CALENDAR_GRIDVIEW

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

В календарь можно встроить приложение. В верхней части календаря в списке видов отображения есть место для встройки `CALENDAR_GRIDVIEW`, куда можно добавить свой пункт. 

Подробнее о виджете — в статье [Виджет в календаре](../widgets/calendar.md).

## Как привязать приложение к календарю

Исспользуйте метод [placement.bind](../widgets/placement-bind.md), чтобы связать приложение с календарем. Параметры `PLACEMENT`, `HANDLER` и `TITLE` определяют, где и как будет отображаться ваше приложение.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type PlacementBindResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<PlacementBindResult>({
        method: 'placement.bind',
        params: {
          PLACEMENT: 'CALENDAR_GRIDVIEW',
          HANDLER: 'http://your_site/handler.php',
          TITLE: 'Custom tab',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('placement.bind result:', result)
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
      async function bindCalendarPlacement() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.bind',
            params: {
              PLACEMENT: 'CALENDAR_GRIDVIEW',
              HANDLER: 'http://your_site/handler.php',
              TITLE: 'Custom tab',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('placement.bind result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', bindCalendarPlacement)
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
                    'HANDLER'   => 'http://your_site/handler.php',
                    'TITLE'     => 'Custom tab',
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
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
            PLACEMENT:'CALENDAR_GRIDVIEW',
            HANDLER: 'http://your_site/handler.php',
            TITLE: 'Custom tab'
        },
        (result) => {console.log(result)}
    );
    ```

{% endlist %}

Если в приложении вывести все параметры, которые передаются в запросе к приложению:

{% list tabs %}

- PHP CRest

    ```php
    echo "<pre>";
    print_r($_REQUEST);
    echo "</pre>";
    ```

{% endlist %}

Можно увидеть, что передаются определенные параметры, например диапазон дат, который отображается в календаре:

{% list tabs %}

- PHP CRest

    ```php
    [PLACEMENT_OPTIONS] => {
        "viewRangeFrom":"2018-09-30",
        "viewRangeTo":"2018-11-04"
    }
    ```

{% endlist %}

Эти параметры можно использовать для настройки отображения вашего приложения.

## JS методы

### Получить события

Метод `getEvents` получает события календаря.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of each event returned in result[]
    type PlacementEvent = {
      id: string
    }

    try {
      const dateFrom = new Date()
      const dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000) // Multiply by 1000 to convert seconds to milliseconds
      dateFrom.setHours(0, 0, 0, 0)
      dateTo.setHours(0, 0, 0, 0)

      const response = await $b24.actions.v2.call.make<PlacementEvent[]>({
        method: 'placement.getEvents',
        params: {
          dateFrom: dateFrom,
          dateTo: dateTo,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('getEvents response:', result)
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

          const dateFrom = new Date()
          const dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000) // Multiply by 1000 to convert seconds to milliseconds
          dateFrom.setHours(0, 0, 0, 0)
          dateTo.setHours(0, 0, 0, 0)

          const response = await $b24.actions.v2.call.make({
            method: 'placement.getEvents',
            params: {
              dateFrom: dateFrom,
              dateTo: dateTo,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('getEvents response:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getCalendarEvents)
    </script>
    ```

- PHP


    ```php
    try {
        $dateFrom = new DateTime();
        $dateTo = new DateTime($dateFrom->getTimestamp() + 86400 * 30 * 1000);
        $dateFrom->setTime(0, 0, 0, 0);
        $dateTo->setTime(0, 0, 0, 0);
    
        $response = $b24Service
            ->placement
            ->call(
                'getEvents',
                [
                    'dateFrom' => $dateFrom,
                    'dateTo' => $dateTo
                ]
            );
    
        $events = $response
            ->getResponseData()
            ->getResult();
    
        echo 'getEvents response:';
        print_r($events);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting events: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    var dateFrom = new Date();
    var dateTo = new Date(dateFrom.getTime() + 86400 * 30 * 1000); // Умножаем на 1000, чтобы преобразовать секунды в миллисекунды
    dateFrom.setHours(0, 0, 0, 0);
    dateTo.setHours(0, 0, 0, 0);

    BX24.placement.call(
        'getEvents',
        {
            dateFrom: dateFrom,
            dateTo: dateTo
        },
        function(events) {
            console.log('getEvents response:');
            console.dir(events);
        }
    );
    ```

{% endlist %}

### Открыть карточку и просмотреть событие

Метод `viewEvent` открывает карточку для просмотра события.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ViewEventResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<ViewEventResult>({
        method: 'placement.call',
        params: {
          id: '1431170', // event identifier
          dateFrom: '11.07.2018', // event date; optional but important for recurring events
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('placement.call viewEvent result:', result)
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
      async function viewCalendarEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.call',
            params: {
              id: '1431170', // event identifier
              dateFrom: '11.07.2018', // event date; optional but important for recurring events
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('placement.call viewEvent result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', viewCalendarEvent)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'viewEvent',
                [
                    'id'      => "1431170", // идентификатор события
                    'dateFrom' => "11.07.2018" // дата события. Не обязательна, но важна для регулярных событий
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        // Не требуется никакой логики обработки данных
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling viewEvent placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'viewEvent',
        {
            id: "1431170", // идентификатор события
            dateFrom: "11.07.2018" // дата события. Не обязательна, но важна для регулярных событий
        },
        function(){}
    );
    ```

{% endlist %}

### Добавить новое событие

Метод `addEvent` открывает карточку для добавления нового события.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type AddEventResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<AddEventResult>({
        method: 'placement.addEvent',
        params: {},
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('placement.addEvent result:', result)
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
      async function addCalendarEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.addEvent',
            params: {},
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('placement.addEvent result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCalendarEvent)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call('addEvent', []);
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling addEvent: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'addEvent',
        function(){}
    );
    ```

{% endlist %}

### Обновить событие

Метод `editEvent` открывает карточку для редактирования события.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type EditEventResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<EditEventResult>({
        method: 'placement.call',
        params: {
          placement: 'editEvent',
          params: {
            uid: '1431171|19.07.2018',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('placement.call editEvent result:', result)
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
      async function editCalendarEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.call',
            params: {
              placement: 'editEvent',
              params: {
                uid: '1431171|19.07.2018',
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
          console.info('placement.call editEvent result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', editCalendarEvent)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'editEvent',
                [
                    'uid' => "1431171|19.07.2018"
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling editEvent placement: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'editEvent',
        {
            uid: "1431171|19.07.2018"
        },
        function(){}
    );
    ```

{% endlist %}

### Удалить событие

Метод `deleteEvent` удаляет событие.

{% list tabs %}

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type DeleteEventResult = boolean

    try {
      const response = await $b24.actions.v2.call.make<DeleteEventResult>({
        method: 'placement.deleteEvent',
        params: {
          id: '1431169',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('placement.deleteEvent result:', result)
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
      async function deleteCalendarEvent() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'placement.deleteEvent',
            params: {
              id: '1431169',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('placement.deleteEvent result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteCalendarEvent)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->placement
            ->call(
                'deleteEvent',
                [
                    'id' => "1431169"
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error calling deleteEvent: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.placement.call(
        'deleteEvent',
        {
            id: "1431169"
        },
        function(){}
    );
    ```

{% endlist %}

## События

События, которые можно отслеживать в месте встройки:

#|
|| **Событие** | **Описание** ||
|| `Calendar.customView:refreshEntries` | Обновление событий ||
|| `Calendar.customView:decreaseViewRangeDate` | Нажатие на стрелочку назад, то есть открытие календаря за предыдущие даты ||
|| `Calendar.customView:increaseViewRangeDate` | Нажатие на стрелочку вперед, то есть открытие календаря на следующие даты ||
|| `Calendar.customView:adjustToDate` | Переход к конкретной дате ||
|#

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](../widgets/index.md)
- [{#T}](../widgets/calendar.md)
- [{#T}](../widgets/user-field/index.md)
- [{#T}](../../local-integrations/local-apps.md)
