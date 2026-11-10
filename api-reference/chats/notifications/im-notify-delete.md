# Удалить уведомление im.notify.delete

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.notify.delete` удаляет уведомление по `ID` или по тегам `TAG` и `SUB_TAG`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md)
[`array`](../../data-types.md) | Идентификатор уведомления или массив идентификаторов. Идентификатор возвращают методы отправки [im.notify](./im-notify.md), [im.notify.personal.add](./im-notify-personal-add.md) и [im.notify.system.add](./im-notify-system-add.md) в поле `result`, а также метод [im.notify.get](./im-notify-get.md).

Метод удаляет только уведомления, получатель которых — текущий пользователь. Если ни одно такое уведомление не найдено, метод вернет `false` ||
|| **TAG**
[`string`](../../data-types.md) | Тег, переданный в `TAG` при отправке уведомления. Метод удаляет уведомления текущего приложения с этим тегом у всех получателей.

Уведомления, отправленные через вебхук, тегов не имеют — удаляйте их по `ID` ||
|| **SUB_TAG**
[`string`](../../data-types.md) | Тег, переданный в `SUB_TAG` при отправке уведомления. Метод удаляет уведомления текущего приложения с этим тегом у всех получателей ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Идентификатор, по которому метод вычисляет ключ приложения для удаления по `TAG` или `SUB_TAG` через вебхук. Без него вызов через вебхук без `ID` вернет ошибку `ACCESS_DENIED`.

При вызове из приложения параметр не нужен ||
|#

{% note warning "" %}

Передайте один из параметров: `ID`, `TAG` или `SUB_TAG`. Если передано несколько, метод использует первый по порядку: `ID`, затем `TAG`, затем `SUB_TAG`.

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":101}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.notify.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"ID":101,"auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.notify.delete
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
        method: 'im.notify.delete',
        params: {
          ID: 101,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Notification deleted:', result)
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
      async function deleteNotification() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'im.notify.delete',
            params: {
              ID: 101,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Notification deleted:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', deleteNotification)
    </script>
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        bitrix_response = client.im.notify.delete(
            bitrix_id=101,
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
        $response = $b24Service->core->call(
            'im.notify.delete',
            [
                'ID' => 101,
            ]
        );

        $result = $response->getResponseData()->getResult();

        print_r($result);
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.notify.delete',
        {
            ID: 101,
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
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
        'im.notify.delete',
        [
            'ID' => 101,
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "im.notify.delete", b24.Params{
    	"ID": 101,
    })
    if err != nil {
    	return fmt.Errorf("im.notify.delete: %w", err)
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
        "start": 1794317795,
        "finish": 1794317795.872754,
        "duration": 0.8727540969848633,
        "processing": 0,
        "date_start": "2026-11-10T16:36:35+03:00",
        "date_finish": "2026-11-10T16:36:35+03:00",
        "operating_reset_at": 1794318360,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат удаления. Значение зависит от способа удаления:
- по `ID` — `true`, если удалено хотя бы одно уведомление, `false`, если уведомление не найдено или его получатель — другой пользователь
- по `TAG` — всегда `true`, даже если уведомлений с таким тегом нет
- по `SUB_TAG` — `true`, если удалено хотя бы одно уведомление, `false`, если уведомлений с таким тегом нет ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Access denied! Client ID not specified"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `403` | `ACCESS_DENIED` | Access denied! Client ID not specified | Вызов через вебхук без `ID` и без `CLIENT_ID`, в том числе пустой запрос ||
|| `400` | `PARAMS_ERROR` | Incorrect params | Не передан ни один из параметров `ID`, `TAG` и `SUB_TAG`, либо запрос выполнен с сессионной авторизацией без `ID` ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-notify.md)
- [{#T}](./im-notify-personal-add.md)
- [{#T}](./im-notify-system-add.md)
- [{#T}](./im-notify-get.md)
- [{#T}](./im-notify-schema-get.md)
- [{#T}](./im-notify-read-list.md)
- [{#T}](./im-notify-read.md)
- [{#T}](./im-notify-read-all.md)
- [{#T}](./im-notify-answer.md)
- [{#T}](./im-notify-confirm.md)
- [{#T}](./im-notify-history-search.md)
