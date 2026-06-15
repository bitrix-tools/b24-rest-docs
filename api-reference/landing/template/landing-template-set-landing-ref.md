# Установить включаемые области для страницы landing.template.setLandingRef

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменение настроек» страницы

Метод `landing.template.setLandingRef` устанавливает привязки включаемых областей для страницы. Он работает только с привязками страницы и не изменяет привязки сайта.

Включаемые области шаблона это отдельные страницы, которые используются как части оформления, например шапка, подвал или сайдбар.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **id***
[`integer`](../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getList](../page/methods/landing-landing-get-list.md) ||
|| **data**
[`object`](../../data-types.md) \| [`array`](../../data-types.md) | Набор привязок включаемых областей страницы. [(подробное описание)](#data)

Передавайте полный итоговый набор привязок для страницы. Метод обновит существующие привязки, добавит новые и удалит те, которых нет в `data`.

Если параметр не передать, передать пустой объект `{}` или пустой массив `[]`, метод удалит все текущие привязки включаемых областей для страницы ||
|#

### Параметр data {#data}

#|
|| **Название**
`тип` | **Описание** ||
|| **<ID_ОБЛАСТИ>**
[`integer`](../../data-types.md) | Идентификатор страницы, которую нужно назначить в соответствующую включаемую область.

Ключом служит идентификатор области шаблона, значением — идентификатор страницы.

Идентификаторы областей зависят от шаблона страницы. Их можно определить по шаблону, например через метод [landing.template.getlist](./landing-template-get-list.md) и поле `CONTENT`: в разметке области обозначаются как `#AREA_1#`, `#AREA_2#` и так далее. 

В `data` нужно передавать только числовую часть такого идентификатора: `1`, `2`.

Если для сохраненной области не передать ключ в `data` или передать для нее значение `0`, пустую строку, `null` либо отрицательное число, привязка будет удалена.

Передавайте правильные идентификаторы области и страницы. Если такой области нет в шаблоне или страницы с таким идентификатором не существует, метод не сообщит об ошибке ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 557,
        "data": {
          "1": 614,
          "2": 615,
          "3": 616
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.template.setLandingRef.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "id": 557,
        "data": {
          "1": 614,
          "2": 615,
          "3": 616
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.template.setLandingRef.json"
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
        method: 'landing.template.setLandingRef',
        params: {
          id: 557,
          data: {
            1: 614,
            2: 615,
            3: 616,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info('Landing refs updated:', result)
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
      async function setLandingRef() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.template.setLandingRef',
            params: {
              id: 557,
              data: {
                1: 614,
                2: 615,
                3: 616,
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
          console.info('Landing refs updated:', result)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', setLandingRef)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.template.setLandingRef',
                [
                    'id' => 557,
                    'data' => [
                        1 => 614,
                        2 => 615,
                        3 => 616,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error setting landing refs: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.template.setLandingRef',
        {
            id: 557,
            data: {
                1: 614,
                2: 615,
                3: 616
            }
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
        'landing.template.setLandingRef',
        [
            'id' => 557,
            'data' => [
                1 => 614,
                2 => 615,
                3 => 616,
            ],
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
        "start": 1774891241,
        "finish": 1774891242.107728,
        "duration": 1.1077280044555664,
        "processing": 0,
        "date_start": "2026-03-30T20:20:41+03:00",
        "date_finish": "2026-03-30T20:20:42+03:00",
        "operating_reset_at": 1774891842,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Результат вызова.

Метод возвращает `true`, если запрос обработан без ошибки. Если для страницы уже сохранены такие же привязки, метод вернет `true`.

Если у пользователя нет права «изменение настроек» страницы, изменения не применятся. При этом метод вернет `true` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ENTITY_NOT_FOUND",
    "error_description": "Сущность не найдена"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `id` ||
|| `ENTITY_NOT_FOUND` | Страница не найдена или недоступна ||
|| `ACCESS_DENIED` | Недостаточно прав для изменения настроек страницы||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-template-get-landing-ref.md)
- [{#T}](./landing-template-get-site-ref.md)
- [{#T}](./landing-template-get-list.md)
- [{#T}](./landing-template-set-site-ref.md)
