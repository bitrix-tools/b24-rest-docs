# Изменить HTML-тег элемента блока landing.block.changeNodeName

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта, в котором находится страница

Метод `landing.block.changeNodeName` изменяет HTML-тег элемента блока в черновике страницы.

Если страница уже опубликована, изменения станут видны посетителям после повторной публикации через интерфейс или методом [landing.landing.publication](../../page/methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы

Идентификатор страницы можно получить методом [landing.landing.getList](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока в черновике страницы

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) с параметром `params.edit_mode = 1`.

Используйте идентификатор именно из черновика страницы. Если передать идентификатор блока из опубликованной версии или другой версии страницы, изменения не будут применены ||
|| **data***
[`object`](../../../data-types.md) | Набор изменений для элементов блока [(подробное описание)](#data) ||
|| **preventHistory**
[`boolean`](../../../data-types.md) | Если передать `true`, метод не добавит действие в историю изменений страницы

По умолчанию `false` ||
|#

### Параметр data {#data}

Параметр `data` передается в формате:

```
{
    selector_1: tag_1,
    selector_2: tag_2,
    ...,
    selector_n: tag_n
}
```

где:
- `selector_n` — селектор элемента из манифеста блока
- `tag_n` — новое имя HTML-тега

#|
|| **Ключ**
`тип` | **Описание** ||
|| **<селектор>**
[`string`](../../../data-types.md) | Новое имя HTML-тега для элемента, который указан в ключе

Ключ должен совпадать с селектором элемента из манифеста блока

Для повторяющихся элементов после селектора можно указать позицию через `@`, например `.landing-block-node-title@1`. Позиции нумеруются с `0`

Если позицию не указать, метод изменит первый найденный элемент, то есть сработает так же, как `@0`

Если передать селектор, которого нет в манифесте блока, или указать позицию, которой нет в блоке, метод завершится без ошибки, но ничего не изменит ||
|#

### Допустимые значения тега {#tag-values}

Значение тега передается строкой. Пробелы в начале и конце значения удаляются, регистр не учитывается.

#|
|| **Значение** | **Описание** ||
|| `h1` | Заголовок первого уровня ||
|| `h2` | Заголовок второго уровня ||
|| `h3` | Заголовок третьего уровня ||
|| `h4` | Заголовок четвертого уровня ||
|| `h5` | Заголовок пятого уровня ||
|| `h6` | Заголовок шестого уровня ||
|| `div` | Блочный контейнер ||
|| `p` | Абзац ||
|| `a` | Ссылка ||
|| `span` | Строчный контейнер ||
|#

Если передать, например, ` H1 `, метод сохранит тег как `h1`. Если передать другое значение, метод использует `div`.

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": {
          ".landing-block-node-title@0": "h1",
          ".landing-block-node-text@2": "p"
        },
        "preventHistory": true
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.changeNodeName.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 311,
        "block": 6058,
        "data": {
          ".landing-block-node-title@0": "h1",
          ".landing-block-node-text@2": "p"
        },
        "preventHistory": true,
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.changeNodeName.json"
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
        method: 'landing.block.changeNodeName',
        params: {
          lid: 311,
          block: 6058,
          data: {
            '.landing-block-node-title@0': 'h1',
            '.landing-block-node-text@2': 'p',
          },
          preventHistory: true,
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Node name changed:', result)
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
      async function changeNodeName() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.block.changeNodeName',
            params: {
              lid: 311,
              block: 6058,
              data: {
                '.landing-block-node-title@0': 'h1',
                '.landing-block-node-text@2': 'p',
              },
              preventHistory: true,
            },
            requestId: B24Js.Text.getUuidRfc4122()
          })

          // The payload is available only on a successful response
          if (!response.isSuccess) {
            console.error(response.getErrorMessages().join('; '))
            return
          }

          const result = response.getData().result
          console.info('Node name changed:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', changeNodeName)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.block.changeNodeName',
                [
                    'lid' => 311,
                    'block' => 6058,
                    'data' => [
                        '.landing-block-node-title@0' => 'h1',
                        '.landing-block-node-text@2' => 'p',
                    ],
                    'preventHistory' => true,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error changing node name: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.changeNodeName',
        {
            lid: 311,
            block: 6058,
            data: {
                '.landing-block-node-title@0': 'h1',
                '.landing-block-node-text@2': 'p'
            },
            preventHistory: true
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
        'landing.block.changeNodeName',
        [
            'lid' => 311,
            'block' => 6058,
            'data' => [
                '.landing-block-node-title@0' => 'h1',
                '.landing-block-node-text@2' => 'p',
            ],
            'preventHistory' => true,
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
        "start": 1774510990,
        "finish": 1774510990.1045,
        "duration": 0.10450005531311035,
        "processing": 0,
        "date_start": "2026-03-26T10:43:10+03:00",
        "date_finish": "2026-03-26T10:43:10+03:00",
        "operating_reset_at": 1774511590,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Результат изменения тега. Если запрос выполнен успешно, метод возвращает `true` ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Выполнение операции запрещено"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `lid`, `block` или `data` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Недостаточно прав для редактирования сайта ||
|| `TYPE_ERROR` | Параметр `data` передан в неверном формате или значение тега передано не строкой ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-update-nodes.md)
- [{#T}](./landing-block-change-anchor.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-manifest.md)
