# Добавить внешнюю линию telephony.externalLine.add

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`telephony`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `telephony.externalLine.add` добавляет внешнюю линию приложения.

{% note info "" %}

Метод работает только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **NUMBER***
[`string`](../data-types.md) | Номер внешней линии ||
|| **NAME**
[`string`](../data-types.md) | Название внешней линии ||
|| **CRM_AUTO_CREATE**
[`string`](../data-types.md) | Автосоздание объекта CRM при исходящих звонках.

Возможные значения:

 `Y` — включено
 `N` — выключено
 
По умолчанию — `Y` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"NUMBER":"74951234567","NAME":"Основная внешняя линия","CRM_AUTO_CREATE":"Y","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/telephony.externalLine.add
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type ExternalLineAddResult = {
      ID: number
    }

    try {
      const response = await $b24.actions.v2.call.make<ExternalLineAddResult>({
        method: 'telephony.externalLine.add',
        params: {
          NUMBER: '74951234567',
          NAME: 'Main external line',
          CRM_AUTO_CREATE: 'Y',
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Added external line with ID:', result.ID)
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
      async function addExternalLine() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'telephony.externalLine.add',
            params: {
              NUMBER: '74951234567',
              NAME: 'Main external line',
              CRM_AUTO_CREATE: 'Y',
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Added external line with ID:', result.ID)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', addExternalLine)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'telephony.externalLine.add',
                [
                    'NUMBER' => '74951234567',
                    'NAME' => 'Основная внешняя линия',
                    'CRM_AUTO_CREATE' => 'Y'
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error adding external line: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        "telephony.externalLine.add",
        {
            NUMBER: '74951234567',
            NAME: 'Основная внешняя линия',
            CRM_AUTO_CREATE: 'Y'
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
        'telephony.externalLine.add',
        [
            'NUMBER' => '74951234567',
            'NAME' => 'Основная внешняя линия',
            'CRM_AUTO_CREATE' => 'Y'
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
        "ID": 7
    },
    "time": {
        "start": 1772801648,
        "finish": 1772801648.420551,
        "duration": 0.420551061630249,
        "processing": 0,
        "date_start": "2026-03-06T15:54:08+03:00",
        "date_finish": "2026-03-06T15:54:08+03:00",
        "operating_reset_at": 1772802248,
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
[`integer`](../data-types.md) | Идентификатор созданной внешней линии ||
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
|| `ERROR_CORE` | NUMBER should not be empty | Не передан обязательный параметр `NUMBER` ||
|| `ERROR_CORE` | Line already exists | Линия с указанным номером уже существует ||
|| `ERROR_CORE` | DB error | Ошибка базы данных при добавлении линии ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./telephony-external-line-update.md)
- [{#T}](./telephony-external-line-get.md)
- [{#T}](./telephony-external-line-delete.md)
- [{#T}](./telephony-external-call-register.md)

