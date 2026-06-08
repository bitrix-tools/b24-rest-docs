# Добавить календарь calendar.section.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод добавляет новый календарь.

Система добавит новый календарь только для пользователя, который выполнит метод. Администратор может создавать календари для других пользователей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря. Возможные значения: 
- `user` — календарь пользователя 
- `group` — календарь группы ||
|| **ownerId***
[`integer`](../data-types.md) | Идентификатор владельца календаря.

Для `type` со значением `user` установится идентификатор текущего пользователя, если не передать значение в `ownerId` ||
|| **name***
[`string`](../data-types.md) | Название календаря ||
|| **description**
[`string`](../data-types.md) | Описание календаря ||
|| **color**
[`string`](../data-types.md) | Цвет календаря ||
|| **text_color**
[`string`](../data-types.md) | Цвет текста в календаре ||
|| **export**
[`object`](../data-types.md) | Объект [параметров экспорта календаря](#export)
||
|#

### Параметр export {#export}

#|
|| **Название**
`тип` | **Описание** ||
|| **ALLOW**
[`boolean`](../data-types.md) | Разрешить экспорт календаря. Возможные значения:
- `true` — разрешить
- `false` — запретить ||
|| **SET**
[`string`](../data-types.md) | Период, за который производить экспорт. Возможные значения:
- `all` — за весь период
- `3_9` — 3 месяца до и 9 после
- `6_12` — 6 месяцев до и 12 после
 ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":2,"name":"New Section","description":"Description for section","color":"#9cbeee","text_color":"#283000","export":{"ALLOW":false,"SET":"3_9"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.section.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"type":"user","ownerId":2,"name":"New Section","description":"Description for section","color":"#9cbeee","text_color":"#283000","export":{"ALLOW":false,"SET":"3_9"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.section.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CalendarSectionAddResult = number

    try {
      const response = await $b24.actions.v2.call.make<CalendarSectionAddResult>({
        method: 'calendar.section.add',
        params: {
          type: 'user',
          ownerId: 2,
          name: 'New Section',
          description: 'Description for section',
          color: '#9cbeee',
          text_color: '#283000',
          export: {
            ALLOW: false,
            SET: '3_9',
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Created calendar with ID:', result)
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
      async function addCalendarSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.section.add',
            params: {
              type: 'user',
              ownerId: 2,
              name: 'New Section',
              description: 'Description for section',
              color: '#9cbeee',
              text_color: '#283000',
              export: {
                ALLOW: false,
                SET: '3_9',
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
          console.info('Created calendar with ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addCalendarSection)
    </script>
    ```

- PHP


    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'calendar.section.add',
                [
                    'type'        => 'user',
                    'ownerId'     => 2,
                    'name'        => 'New Section',
                    'description' => 'Description for section',
                    'color'       => '#9cbeee',
                    'text_color'  => '#283000',
                    'export'      => [
                        'ALLOW' => false,
                        'SET'   => '3_9',
                    ],
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
        echo 'Error adding calendar section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.section.add',
        {
            type: 'user',
            ownerId: 2,
            name: 'New Section',
            description: 'Description for section',
            color: '#9cbeee',
            text_color: '#283000',
            export: {
                ALLOW: false,
                SET: '3_9'
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.section.add',
        [
            'type' => 'user',
            'ownerId' => 2,
            'name' => 'New Section',
            'description' => 'Description for section',
            'color' => '#9cbeee',
            'text_color' => '#283000',
            'export' => [
                'ALLOW' => false,
                'SET' => '3_9'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 190,
    "time": {
        "start": 1733812564.64201,
        "finish": 1733812565.71673,
        "duration": 1.0747201442718506,
        "processing": 0.05963897705078125,
        "date_start": "2024-12-08T06:36:04+00:00",
        "date_finish": "2024-12-08T06:36:05+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор созданного календаря ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр "type" для метода "calendar.section.add""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| Пустая строка | Не задан обязательный параметр "type" для метода "calendar.section.add" | Не передан обязательный параметр `type` ||
|| Пустая строка | Не задан обязательный параметр "ownerId" для метода "calendar.section.add" | Не передан обязательный параметр `ownerId` и параметр `type` не равен `user` ||
|| Пустая строка | Недопустимое значение параметра "name" | Передан неверный формат данных в поле `name` ||
|| Пустая строка | Недопустимое значение параметра "description" | Передан неверный формат данных в поле `description` ||
|| Пустая строка | Доступ запрещен | Нет прав для создания календаря с переданным `type` ||
|| Пустая строка | При создании секции произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./calendar-section-update.md)
- [{#T}](./calendar-section-get.md)
- [{#T}](./calendar-section-delete.md)