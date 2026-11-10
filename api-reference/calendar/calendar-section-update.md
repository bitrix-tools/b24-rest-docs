# Обновить календарь calendar.section.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`calendar`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `calendar.section.update` обновляет календарь: изменяет только переданные параметры.

Объект `access` метод заменяет целиком. Календарь определяется только параметром `id`: тип и владелец берутся из сохраненного календаря, и права метод проверяет по ним. Параметры `type` и `ownerId` обязательны, но значения из запроса в обновление не попадают. Параметр `export` метод не принимает: период экспорта через этот метод не меняется, всегда `all`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **type***
[`string`](../data-types.md) | Тип календаря. Возможные значения:
- `user` — календарь пользователя
- `group` — календарь группы

Параметр обязателен, но на обновление не влияет: метод берет тип из сохраненного календаря ||
|| **ownerId**
[`integer`](../data-types.md) | Идентификатор владельца календаря.

Обязателен для всех типов календаря, кроме `user`. На обновление не влияет: метод берет владельца из сохраненного календаря ||
|| **id***
[`integer`](../data-types.md) | Идентификатор существующего календаря ||
|| **name**
[`string`](../data-types.md) | Название календаря. Пустую строку метод игнорирует и оставляет прежнее название ||
|| **description**
[`string`](../data-types.md) | Описание календаря. Пустую строку метод игнорирует: очистить описание этим методом нельзя ||
|| **color**
[`string`](../data-types.md) | Цвет календаря в формате `#RRGGBB`. Если в значении меньше шести шестнадцатеричных символов, метод сохранит цвет `#9dcf00` ||
|| **text_color**
[`string`](../data-types.md) | Цвет текста в календаре в формате `#RRGGBB`. Если в значении меньше шести шестнадцатеричных символов, метод сохранит цвет `#9dcf00` ||
|| **access**
[`object`](../data-types.md) | Объект прав доступа к календарю [(подробное описание)](#access) ||
|#

### Параметр access {#access}

Формат объекта описан в разделе [Параметр access](./calendar-section-add.md#access) метода `calendar.section.add`. Значение — тот же объект, что приходит в поле `ACCESS` ответа [calendar.section.get](./calendar-section-get.md).

Если у пользователя нет права управлять доступом к календарю, переданный объект метод молча игнорирует, а права календаря остаются прежними. Если право есть, пустой объект `{}` сбрасывает права к значениям по умолчанию.

Пример значения:

```json
{
    "access": {
        "U1": 19,
        "G2": 13
    }
}
```

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325,"type":"user","ownerId":2,"name":"Changed Section Name","description":"New description for section","color":"#9cbeaa","text_color":"#283099"}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/calendar.section.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"id":325,"type":"user","ownerId":2,"name":"Changed Section Name","description":"New description for section","color":"#9cbeaa","text_color":"#283099","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/calendar.section.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type CalendarSectionUpdateResult = number

    try {
      const response = await $b24.actions.v2.call.make<CalendarSectionUpdateResult>({
        method: 'calendar.section.update',
        params: {
          id: 325,
          type: 'user',
          ownerId: 2,
          name: 'Changed Section Name',
          description: 'New description for section',
          color: '#9cbeaa',
          text_color: '#283099',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated calendar section ID:', result)
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
      async function updateCalendarSection() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'calendar.section.update',
            params: {
              id: 325,
              type: 'user',
              ownerId: 2,
              name: 'Changed Section Name',
              description: 'New description for section',
              color: '#9cbeaa',
              text_color: '#283099',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated calendar section ID:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateCalendarSection)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.calendar.section.update(
            type="user",
            owner_id=2,
            bitrix_id=325,
            name="Changed Section Name",
            description="New description for section",
            color="#9cbeaa",
            text_color="#283099",
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
                'calendar.section.update',
                [
                    'id'          => 325,
                    'type'        => 'user',
                    'ownerId'     => 2,
                    'name'        => 'Changed Section Name',
                    'description' => 'New description for section',
                    'color'       => '#9cbeaa',
                    'text_color'  => '#283099',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        // Дальше обработайте $result в своем коде

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating calendar section: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'calendar.section.update',
        {
            id: 325,
            type: 'user',
            ownerId: 2,
            name: 'Changed Section Name',
            description: 'New description for section',
            color: '#9cbeaa',
            text_color: '#283099'
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'calendar.section.update',
        [
            'id' => 325,
            'type' => 'user',
            'ownerId' => 2,
            'name' => 'Changed Section Name',
            'description' => 'New description for section',
            'color' => '#9cbeaa',
            'text_color' => '#283099'
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "calendar.section.update", b24.Params{
    	"id":          325,
    	"type":        "user",
    	"ownerId":     2,
    	"name":        "Changed Section Name",
    	"description": "New description for section",
    	"color":       "#9cbeaa",
    	"text_color":  "#283099",
    })
    if err != nil {
    	return fmt.Errorf("calendar.section.update: %w", err)
    }

    var value b24.ID
    if err := json.Unmarshal(res.Result, &value); err != nil {
    	return fmt.Errorf("разбор ответа: %w", err)
    }
    fmt.Println("результат:", value)
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 325,
    "time": {
        "start": 1733828946.418185,
        "finish": 1733828946.650208,
        "duration": 0.23202300071716309,
        "processing": 0.0054471492767333984,
        "date_start": "2024-12-10T09:09:06+00:00",
        "date_finish": "2024-12-10T09:09:06+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор измененного календаря ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Не задан обязательный параметр \"type\" для метода \"calendar.section.update\""
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | Пустое значение | Не задан обязательный параметр "type" для метода "calendar.section.update" | Не передан обязательный параметр `type` ||
|| `400` | Пустое значение | Не задан обязательный параметр "ownerId" для метода "calendar.section.update" | Не передан обязательный параметр `ownerId` и параметр `type` не равен `user` ||
|| `400` | Пустое значение | Не задан id секции | Не передан обязательный параметр `id`. Администратор получает эту ошибку и в том случае, если календаря с указанным `id` нет ||
|| `400` | Пустое значение | Недопустимое значение параметра "name" | Передан неверный формат данных в поле `name` ||
|| `400` | Пустое значение | Недопустимое значение параметра "description" | Передан неверный формат данных в поле `description` ||
|| `400` | Пустое значение | Доступ запрещен | Нет прав на изменение календаря. Пользователь, который не является администратором, получает эту ошибку и в том случае, если календаря с указанным `id` нет ||
|| `400` | Пустое значение | При изменении секции произошла ошибка | Другая ошибка ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./index.md)
- [{#T}](./calendar-section-add.md)
- [{#T}](./calendar-section-get.md)
- [{#T}](./calendar-section-delete.md)
