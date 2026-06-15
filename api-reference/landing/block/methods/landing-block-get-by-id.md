# Получить блок по идентификатору `landing.block.getbyid`

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайтов

Метод `landing.block.getbyid` возвращает один блок страницы по его идентификатору.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры чтения блока [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **edit_mode**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод читает черновик страницы вместо опубликованной версии.

По умолчанию — `false` ||
|| **deleted**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, метод ищет блоки, помеченные как удаленные.

По умолчанию — `false`. Чтобы получить удаленный блок, нужно передать `deleted: true` вместе с `edit_mode: true` ||
|| **get_content**
[`boolean`](../../../data-types.md) \| [`integer`](../../../data-types.md) | Если значение приводится к `true`, в `result` дополнительно возвращаются поля `content`, `css` и `js`.

По умолчанию — `false`. Поле `content` содержит уже подготовленный HTML блока вместе с системным контейнером блока, а не исходное сохраненное содержимое ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "params": {
          "edit_mode": true,
          "get_content": true
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getbyid.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "block": 39556,
        "params": {
          "edit_mode": true,
          "get_content": true
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getbyid.json"
    ```

- JS (TS)

    ```ts
    // This snippet is an ES module: top-level await requires type="module" or a bundler.
    // $b24 is an already-initialized SDK instance (see the SDK "Get started" guide).
    import { Text } from '@bitrix24/b24jssdk'
    import type { B24Frame } from '@bitrix24/b24jssdk'

    declare const $b24: B24Frame

    // Shape of the payload returned in result (match the "response handling" section of the page)
    type BlockByIdResult = {
      id: number
      lid: number
      code: string
      name: string
      active: boolean
      meta: {
        LID: string
        FAVORITE_META: string
        CREATED_BY_ID: string
        DATE_CREATE: string
        MODIFIED_BY_ID: string
        DATE_MODIFY: string
        SITE_TYPE: string
        LANDING_TITLE: string
        LANDING_TPL_CODE: string
        SITE_TPL_CODE: string
        XML_ID: string
        DESIGNER_MODE: string
      }
      content?: string
      css?: string[]
      js?: string[]
    }

    try {
      const response = await $b24.actions.v2.call.make<BlockByIdResult>({
        method: 'landing.block.getbyid',
        params: {
          block: 39556,
          params: {
            edit_mode: true,
            get_content: true,
          },
        },
        requestId: Text.getUuidRfc4122()
      })

      // The payload is available only on a successful response
      if (!response.isSuccess) {
        console.error(response.getErrorMessages().join('; '))
      } else {
        const result = response.getData()!.result
        console.info(result.id, result.name, result.active, result.content)
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
      async function getBlockById() {
        try {
          // Initialize the SDK inside a Bitrix24 frame
          const $b24 = await B24Js.initializeB24Frame()

          const response = await $b24.actions.v2.call.make({
            method: 'landing.block.getbyid',
            params: {
              block: 39556,
              params: {
                edit_mode: true,
                get_content: true,
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
          console.info(result.id, result.name, result.active, result.content)
        } catch (error) {
          // Thrown on transport or SDK failures (AjaxError, SdkError, etc.)
          console.error(error)
        }
      }

      document.addEventListener('DOMContentLoaded', getBlockById)
    </script>
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.block.getbyid',
                [
                    'block' => 39556,
                    'params' => [
                        'edit_mode' => true,
                        'get_content' => true,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block by ID: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getbyid',
        {
            block: 39556,
            params: {
                edit_mode: true,
                get_content: true
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
        'landing.block.getbyid',
        [
            'block' => 39556,
            'params' => [
                'edit_mode' => true,
                'get_content' => true,
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
    "result": {
        "id": 39556,
        "lid": 4858,
        "code": "01.big_with_text",
        "name": "Блок с текстом и изображением",
        "active": true,
        "meta": {
            "LID": "2215",
            "FAVORITE_META": "Array",
            "CREATED_BY_ID": "1295",
            "DATE_CREATE": "03/26/2026 11:27:24 am",
            "MODIFIED_BY_ID": "1295",
            "DATE_MODIFY": "03/26/2026 12:23:02 pm",
            "SITE_TYPE": "PAGE",
            "LANDING_TITLE": "",
            "LANDING_TPL_CODE": "bitrix.krayt_otdykh_na_prirode",
            "SITE_TPL_CODE": "empty",
            "XML_ID": "",
            "DESIGNER_MODE": ""
        },
        "content": "<div id=\"b28853\" class=\"block-wrapper block-18-2-two-cols-fix-img-text-button-with-cards\"><section class=\"landing-block g-pt-30 g-pb-30 g-bg-transparent\">...</section></div>",
        "css": [],
        "js": []
    },
    "time": {
        "start": 1774521156,
        "finish": 1774521157.330784,
        "duration": 1.3307840824127197,
        "processing": 1,
        "date_start": "2026-03-26T13:32:36+03:00",
        "date_finish": "2026-03-26T13:32:37+03:00",
        "operating_reset_at": 1774521756,
        "operating": 0.3684520721435547
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные найденного блока [(подробное описание)](#result)

Метод не возвращает `result: []`. Если блок не найден в выбранной версии страницы, метод завершается ошибкой ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор блока ||
|| **lid**
[`integer`](../../../data-types.md) | Идентификатор страницы, к которой относится блок ||
|| **code**
[`string`](../../../data-types.md) | Символьный код блока из библиотеки, например `01.big_with_text` ||
|| **name**
[`string`](../../../data-types.md) | Название блока из его манифеста ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока.

Активный блок отображается на странице. Неактивный блок скрыт ||
|| **meta**
[`object`](../../../data-types.md) | Служебные данные блока и страницы [(подробное описание)](#meta).

Все значения внутри `meta` метод возвращает строками. Формат строковых дат зависит от языковых настроек Битрикс24 ||
|| **content**
[`string`](../../../data-types.md) | Подготовленный HTML блока. Поле возвращается только если включен `params.get_content` ||
|| **css**
[`string[]`](../../../data-types.md) | Пути к CSS-файлам блока, которые нужны для его отображения.

Поле возвращается только если включен `params.get_content`. Если отдельных CSS-ресурсов нет, вернется пустой массив ||
|| **js**
[`string[]`](../../../data-types.md) | Пути к JS-файлам блока, которые нужны для его работы. Поле возвращается только если включен `params.get_content`.

Если отдельных JS-ресурсов нет, вернется пустой массив ||
|#

### Объект meta {#meta}

#|
|| **Название**
`тип` | **Описание** ||
|| **LID**
[`string`](../../../data-types.md) | Идентификатор страницы блока в строковом виде.

Дублирует поле `lid` ||
|| **CREATED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который создал блок ||
|| **DATE_CREATE**
[`string`](../../../data-types.md) | Дата создания блока ||
|| **MODIFIED_BY_ID**
[`string`](../../../data-types.md) | Идентификатор пользователя, который последним изменил блок ||
|| **DATE_MODIFY**
[`string`](../../../data-types.md) | Дата последнего изменения блока ||
|| **SITE_TYPE**
[`string`](../../../data-types.md) | Тип сайта, которому принадлежит страница, например `PAGE` или `STORE` ||
|| **LANDING_TITLE**
[`string`](../../../data-types.md) | Название страницы, которой принадлежит блок.

Если название не заполнено, вернется пустая строка ||
|| **LANDING_TPL_CODE**
[`string`](../../../data-types.md) | Код шаблона страницы ||
|| **SITE_TPL_CODE**
[`string`](../../../data-types.md) | Код шаблона сайта ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний идентификатор блока.

Если он не задан, вернется пустая строка ||
|| **DESIGNER_MODE**
[`string`](../../../data-types.md) | Служебное поле режима дизайнера.

В методе `landing.block.getbyid` возвращается пустой строкой ||
|| **FAVORITE_META**
[`string`](../../../data-types.md) | Служебные данные о сохранении блока в избранные шаблоны пользователя.

Если таких данных нет, вернется пустая строка. Если данные есть, в этом методе значение может прийти как строка `"Array"` ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "BLOCK_NOT_FOUND",
    "error_description": "Блок не найден"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Недостаточно параметров вызова, пропущены: `block` ||
|| `ACCESS_DENIED` | У пользователя нет доступа к разделу «Сайты и магазины» ||
|| `BLOCK_NOT_FOUND` | Блок не найден в выбранной версии страницы, недоступен текущему пользователю или удален ||
|| `TYPE_ERROR` | Внутренняя ошибка несоответствия типов при вызове метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-manifest.md)
- [{#T}](./landing-block-get-manifest-file.md)
