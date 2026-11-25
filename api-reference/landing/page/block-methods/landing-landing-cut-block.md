# Вырезать блок на странице landing.landing.cutblock

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта и полным доступом к блоку

Метод `landing.landing.cutblock` записывает в историю страницы действие «вырезать блок». Сам блок остается на странице: место освобождается только при последующей вставке методом [landing.landing.moveblock](./landing-landing-move-block.md). До вставки действие можно отменить через историю изменений страницы.

Повторный вызов для того же блока не создает дополнительный шаг истории и возвращает `true`.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, на которой находится блок.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока из версии страницы для редактирования.

Идентификатор можно получить методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметром `params.edit_mode = 1` ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"lid":351,"block":6428}' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.cutblock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{"lid":351,"block":6428,"auth":"**put_access_token_here**"}' \
      "https://**put.your-domain-here**/rest/landing.landing.cutblock.json"
    ```

- JS (TS)

    ```ts
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    try {
      const response = await $b24.actions.v2.call.make<boolean>({
        method: 'landing.landing.cutblock',
        params: { lid: 351, block: 6428 },
        requestId: Text.getUuidRfc4122()
      })
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        console.info(response.getData()!.result)
      }
    } catch (error) {
      console.error(error)
    }
    ```

- JS (UMD)

    ```html
    <script src="https://unpkg.com/@bitrix24/b24jssdk@1/dist/umd/index.min.js"></script>
    <script>
      async function cutBlock() {
        try {
          const $b24 = await B24Js.initializeB24Frame()
          const response = await $b24.actions.v2.call.make({
            method: 'landing.landing.cutblock',
            params: { lid: 351, block: 6428 },
            requestId: B24Js.Text.getUuidRfc4122()
          })
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }
          console.info(response.getData().result)
        } catch (error) {
          console.error(error)
        }
      }
      document.addEventListener('DOMContentLoaded', cutBlock)
    </script>
    ```

- Python

    У метода пока нет готовой обертки в `b24pysdk`. Вызовите его через `bitrix_token.call_method`.

    ```python
    from b24pysdk.errors import BitrixAPIError, BitrixSDKException

    try:
        response = bitrix_token.call_method(
            api_method="landing.landing.cutblock",
            params={
                "lid": 351,
                "block": 6428,
            },
        )
        print(response["result"])
    except BitrixAPIError as error:
        print(error.error, error.error_description)
    except BitrixSDKException as error:
        print(f"Ошибка Bitrix SDK: {error.message}")
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'landing.landing.cutblock',
            ['lid' => 351, 'block' => 6428]
        );
        print_r($response->getResponseData()->getResult());
    } catch (Throwable $e) {
        error_log($e->getMessage());
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.cutblock',
        { lid: 351, block: 6428 },
        function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'landing.landing.cutblock',
        ['lid' => 351, 'block' => 6428]
    );
    if (isset($result['error'])) {
        echo 'Ошибка: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```

- Go

    ```go
    // client и ctx уже созданы — см. раздел «SDK для Go»
    res, err := client.Core().Call(ctx, "landing.landing.cutblock", b24.Params{
        "lid": 351, "block": 6428,
    })
    if err != nil {
        return fmt.Errorf("landing.landing.cutblock: %w", err)
    }
    var value bool
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
    "result": true,
    "time": {
        "start": 1795591363,
        "finish": 1795591363.176229,
        "duration": 0.17622900009155273,
        "processing": 0,
        "date_start": "2026-11-25T10:22:43+03:00",
        "date_finish": "2026-11-25T10:22:43+03:00",
        "operating_reset_at": 1795591915,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | `true`, если шаг истории записан или такой шаг уже существует ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400 Bad Request**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден в лендинге"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid` или `block` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | У пользователя нет прав на вызов методов landing, нет права редактировать страницу или нет полного доступа к блоку ||
|| `BLOCK_NOT_FOUND` | Блок не найден в версии страницы `lid` для редактирования ||
|| `TYPE_ERROR` | Передан неверный тип в параметре `lid` или `block` ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-mark-deleted-block.md)
- [{#T}](./landing-landing-mark-undeleted-block.md)
