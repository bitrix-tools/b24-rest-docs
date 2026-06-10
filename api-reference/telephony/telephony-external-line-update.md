# Изменить внешнюю линию telephony.externalLine.update

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalLine.update` изменяет параметры внешней линии приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NUMBER***
[`string`](../data-types.md) | Номер внешней линии.

Номер можно получить методом [telephony.externalLine.get](./telephony-external-line-get.md) ||
|| **NAME**
[`string`](../data-types.md) | Новое название внешней линии ||
|| **CRM_AUTO_CREATE**
[`string`](../data-types.md) | Автосоздание объекта CRM при исходящих звонках.

Возможные значения:

 `Y` — включено
 `N` — выключено ||
|#

{% note info "" %}

Нужно передать хотя бы одно поле для изменения: `NAME` или `CRM_AUTO_CREATE`. Иначе получите ошибку `ERROR_CORE`

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NUMBER":"74951234567","NAME":"Линия поддержки","CRM_AUTO_CREATE":"N","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalLine.update
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ExternalLineUpdateResult = {
      ID: string
    }

    try {
      const response = await $b24.actions.v2.call.make<ExternalLineUpdateResult>({
        method: 'telephony.externalLine.update',
        params: {
          NUMBER: '74951234567',
          NAME: 'Support line',
          CRM_AUTO_CREATE: 'N',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Updated external line ID:', result.ID)
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
      async function updateExternalLine() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalLine.update',
            params: {
              NUMBER: '74951234567',
              NAME: 'Support line',
              CRM_AUTO_CREATE: 'N',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Updated external line ID:', result.ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', updateExternalLine)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalLine.update',
                [
                    'NUMBER' => '74951234567',
                    'NAME' => 'Линия поддержки',
                    'CRM_AUTO_CREATE' => 'N'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating external line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalLine.update",
        {
            NUMBER: '74951234567',
            NAME: 'Линия поддержки',
            CRM_AUTO_CREATE: 'N'
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'telephony.externalLine.update',
        [
            'NUMBER' => '74951234567',
            'NAME' => 'Линия поддержки',
            'CRM_AUTO_CREATE' => 'N'
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
    "result": {
        "ID": "7"
    },
    "time": {
        "start": 1772806119,
        "finish": 1772806120.006578,
        "duration": 1.006577968597412,
        "processing": 1,
        "date_start": "2026-03-06T17:08:39+03:00",
        "date_finish": "2026-03-06T17:08:40+03:00",
        "operating_reset_at": 1772806719,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../data-types.md) | Корневой элемент ответа ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор обновленной внешней линии ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "WRONG_AUTH_TYPE",
    "error_description": "Current authorization type is denied for this method"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `WRONG_AUTH_TYPE` | Current authorization type is denied for this method | Метод вызван вне контекста приложения ||
|| `ERROR_CORE` | There are no fields to update | Не переданы поля для изменения `NAME` или `CRM_AUTO_CREATE` ||
|| `ERROR_CORE` | NUMBER should not be empty | Не передан обязательный параметр `NUMBER` ||
|| `ERROR_CORE` | Could not find line with number {NUMBER} | Линия с указанным номером не найдена ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-line-add.md)
- [{#T}](./telephony-external-line-get.md)
- [{#T}](./telephony-external-line-delete.md)
- [{#T}](./telephony-external-call-register.md)
