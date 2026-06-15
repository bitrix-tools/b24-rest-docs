# Установить специальную страницу для сайта landing.syspage.set

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменение настроек» сайта

Метод `landing.syspage.set` назначает специальную страницу для сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../../data-types.md) | Идентификатор сайта.

Идентификатор сайта можно получить методом [landing.site.getList](../../site/landing-site-get-list.md) или из результата метода [landing.site.add](../../site/landing-site-add.md) ||
|| **type***
[`string`](../../../data-types.md) | Код специальной страницы.

Возможные значения:

- `mainpage` — главная страница
- `catalog` — главная страница каталога
- `personal` — персональный раздел
- `cart` — корзина
- `order` — оформление заказа
- `payment` — страница оплаты
- `compare` — страница сравнения
- `feedback` — страница обратной связи

Пробелы в начале и конце значения удаляются. Если после этого передан код вне списка, метод завершается без изменений ||
|| **lid**
[`integer`](../../../data-types.md) | Идентификатор страницы, которую нужно назначить специальной для сайта.

Параметр заполняют, если страницу нужно назначить специальной. Если параметр не передать, метод удалит текущую привязку для `type`.

Метод завершится без изменений и без ошибки в двух случаях: если привязки для пары `id` и `type` еще нет или если передана страница, которой не существует либо которая недоступна для изменения.

Значения `0`, `null` и пустая строка не считаются отсутствием параметра. Они сохраняются как `0`. Для таких значений права на страницу дополнительно не проверяются ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1390,
        "type": "personal",
        "lid": 8593
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.syspage.set.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 1390,
        "type": "personal",
        "lid": 8593,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.syspage.set.json"
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
        method: 'landing.syspage.set',
        params: {
          id: 1390,
          type: 'personal',
          lid: 8593,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('landing.syspage.set result:', result)
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
      async function setSysPage() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.syspage.set',
            params: {
              id: 1390,
              type: 'personal',
              lid: 8593,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('landing.syspage.set result:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setSysPage)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.syspage.set',
                [
                    'id' => 1390,
                    'type' => 'personal',
                    'lid' => 8593,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting special page: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.syspage.set',
        {
            id: 1390,
            type: 'personal',
            lid: 8593
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
            }
            else
            {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.syspage.set',
        [
            'id' => 1390,
            'type' => 'personal',
            'lid' => 8593,
        ]
    );

    if (isset($result['error']))
    {
        echo 'Ошибка: ' . $result['error_description'];
    }
    else
    {
        echo '<pre>';
        print_r($result['result']);
        echo '</pre>';
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1774296164,
        "finish": 1774296164.30144,
        "duration": 0.3014400005340576,
        "processing": 0,
        "date_start": "2026-03-23T23:02:44+03:00",
        "date_finish": "2026-03-23T23:02:44+03:00",
        "operating_reset_at": 1774296764,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат вызова.

Метод возвращает `true`, если вызов завершился без ошибки. Это не всегда значит, что привязка была создана, обновлена или удалена. В некоторых случаях метод может вернуть `true`, если ничего не изменилось.

Например, если `type` не поддерживается, сайт или страница недоступны, страница из `lid` не найдена или привязки для удаления еще нет||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: id"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` или `type` ||
|| `ACCESS_DENIED` | Недостаточно общих прав для вызова методов `landing` ||
|| `SYSTEM_ERROR` | Непредвиденная внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-syspage-get.md)
- [{#T}](./landing-syspage-get-special-page.md)
- [{#T}](./landing-syspage-delete-for-landing.md)
- [{#T}](./landing-syspage-delete-for-site.md)
