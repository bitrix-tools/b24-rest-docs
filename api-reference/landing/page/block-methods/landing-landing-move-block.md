# Переместить блок на страницу `landing.landing.moveblock`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.moveblock` переносит блок на указанную страницу и возвращает идентификатор перемещенного блока. Блок можно перенести как в пределах одной страницы, так и на другую страницу.

Если страницы уже опубликованы, для посетителей изменения станут видны после команды «Опубликовать изменения» в интерфейсе или после вызова метода [landing.landing.publication](../methods/landing-landing-publication.md).

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, на которую нужно перенести блок.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md), а также из результата методов [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Идентификатор блока нужно получать методом [landing.block.getList](../../block/methods/landing-block-get-list.md) с параметром `params.edit_mode = 1`. Если блок переносится с другой страницы, запрашивайте блоки именно страницы-источника.

Блок может находиться как на другой странице, так и на той же странице `lid`. Можно перенести только существующий блок, который не помечен как удаленный ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры переноса [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **AFTER_ID**
[`integer`](../../../data-types.md) | Идентификатор блока на странице `lid`, после которого нужно разместить перемещаемый блок.

Если параметр не передан, передан `0` или указывает на блок, которого нет на странице `lid`, блок будет перемещен в конец страницы ||
|| **RETURN_CONTENT**
[`string`](../../../data-types.md) | Если передать `Y`, метод вернет объект с признаком успеха и данными перемещенного блока [(подробное описание)](#result-content). При любом другом значении метод вернет только идентификатор перемещенного блока ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 26723,
        "params": {
          "AFTER_ID": 6429,
          "RETURN_CONTENT": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.moveblock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 26723,
        "params": {
          "AFTER_ID": 6429,
          "RETURN_CONTENT": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.moveblock.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.moveblock',
            {
                lid: 351,
                block: 26723,
                params: {
                    AFTER_ID: 6429,
                    RETURN_CONTENT: 'Y'
                }
            }
        );

        const result = response.getData().result;
        console.info(result);
    }
    catch (error)
    {
        console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'landing.landing.moveblock',
                [
                    'lid' => 351,
                    'block' => 26723,
                    'params' => [
                        'AFTER_ID' => 6429,
                        'RETURN_CONTENT' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.landing.moveblock',
        {
            lid: 351,
            block: 26723,
            params: {
                AFTER_ID: 6429,
                RETURN_CONTENT: 'Y'
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
        'landing.landing.moveblock',
        [
            'lid' => 351,
            'block' => 26723,
            'params' => [
                'AFTER_ID' => 6429,
                'RETURN_CONTENT' => 'Y',
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
        "result": true,
        "content": {
            "id": 26723,
            "sections": "text_image,recommended,widgets_image",
            "active": true,
            "access": "X",
            "anchor": "b383315",
            "php": false,
            "designed": true,
            "repoId": null,
            "content": "<div id=\"block26723\" data-id=\"26723\" class=\"block-wrapper block-31-3-two-cols-text-img-fix\">...</div>",
            "content_ext": "",
            "css": [],
            "js": [
                "/bitrix/js/pull/protobuf/protobuf.js?1592315491274055",
                "/bitrix/js/pull/protobuf/model.min.js?159231549114190",
                "/bitrix/js/main/core/core_promise.min.js?17647596972494",
                "/bitrix/js/rest/client/rest.client.min.js?16015491189240",
                "/bitrix/js/pull/client/pull.client.min.js?174471771449849"
            ],
            "assetStrings": [],
            "lang": [],
            "manifest": {
                "block": {
                    "name": "Текст с картинкой справа",
                    "type": [
                        "page",
                        "store",
                        "smn",
                        "knowledge",
                        "group",
                        "mainpage"
                    ],
                    "section": [
                        "text_image",
                        "recommended",
                        "widgets_image"
                    ]
                },
                "timestamp": 1751467642,
                "namespace": "bitrix",
                "code": "31.3.two_cols_text_img_fix",
                "preview": "/bitrix/blocks/bitrix/31.3.two_cols_text_img_fix/preview.jpg"
            },
            "dynamicParams": []
        }
    },
    "time": {
        "start": 1774062200,
        "finish": 1774062200.463154,
        "duration": 0.4631540775299072,
        "processing": 0,
        "date_start": "2026-03-21T06:03:20+03:00",
        "date_finish": "2026-03-21T06:03:20+03:00",
        "operating_reset_at": 1774062800,
        "operating": 0
    }
}
```

### Пример ответа без `RETURN_CONTENT`

```json
{
    "result": 26723,
    "time": {
        "start": 1774062265,
        "finish": 1774062265.312441,
        "duration": 0.3124408721923828,
        "processing": 0,
        "date_start": "2026-03-21T06:04:25+03:00",
        "date_finish": "2026-03-21T06:04:25+03:00",
        "operating_reset_at": 1774062865,
        "operating": 0
    }
}
```
### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) \| [`object`](../../../data-types.md) | Идентификатор перемещенного блока. Если передан `params.RETURN_CONTENT = 'Y'`, метод вернет объект с признаком успеха и данными блока [(подробное описание)](#result-content) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result при `RETURN_CONTENT = 'Y'` {#result-content}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Признак успешного переноса. При успешном выполнении возвращается `true` ||
|| **content**
[`object`](../../../data-types.md) | Данные перемещенного блока [(подробное описание)](#content) ||
|#

### Объект content {#content}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор перемещенного блока ||
|| **sections**
[`string`](../../../data-types.md) | Коды разделов блока из манифеста, объединенные в одну строку через запятую ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока ||
|| **access**
[`string`](../../../data-types.md) | Уровень доступа к блоку. Возможные значения:
`A` — у текущего пользователя нет права редактировать страницу,
`D` — доступ запрещен,
`V` — можно редактировать только дизайн, для переноса блока этого недостаточно,
`W` — можно редактировать контент и дизайн без удаления,
`X` — полный доступ ||
|| **anchor**
[`string`](../../../data-types.md) | Локальный якорь блока ||
|| **php**
[`boolean`](../../../data-types.md) | Признак того, что в контенте блока есть PHP-код ||
|| **designed**
[`boolean`](../../../data-types.md) | Признак дизайнерского блока ||
|| **repoId**
[`integer`](../../../data-types.md) | Идентификатор rest-блока из репозитория или `null`, если блок не связан с rest-репозиторием ||
|| **content**
[`string`](../../../data-types.md) | Подготовленный HTML-код блока ||
|| **content_ext**
[`string`](../../../data-types.md) | Дополнительный HTML-код подключаемых расширений ||
|| **css**
[`array`](../../../data-types.md) | Список CSS-ресурсов блока. Если отдельных CSS-подключений для блока нет, возвращается пустой массив ||
|| **js**
[`array`](../../../data-types.md) | Список JS-ресурсов блока и связанных клиентских библиотек, которые нужно подключить для его работы.

Для REST-блоков вида `repo_<ID>` поле возвращается пустым массивом ||
|| **assetStrings**
[`array`](../../../data-types.md) | Строки инициализации ресурсов, которые нужно добавить на страницу ||
|| **lang**
[`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | Языковые сообщения подключенных расширений. Если сообщения есть, поле возвращается как объект вида ключ-значение. Если дополнительных сообщений нет, может вернуться пустой массив ||
|| **manifest**
[`object`](../../../data-types.md) | Манифест блока целиком. Формат описан в разделе [Манифест блока](../../block/manifest.md) ||
|| **dynamicParams**
[`array`](../../../data-types.md) | Параметры динамического блока из `SOURCE_PARAMS`.

Для обычных статических блоков поле обычно возвращается пустым массивом ||
|| **requiredUserAction**
[`array`](../../../data-types.md) | Поле содержит те же данные, что и `manifest.requiredUserAction`. Оно возвращается, когда после переноса блока пользователь должен выполнить дополнительное действие на стороне клиента ||
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
|| `ACCESS_DENIED` | Недостаточно прав для вызова метода ||
|| `BLOCK_NOT_FOUND` | Исходный блок с идентификатором `block` не найден, недоступен текущему пользователю, помечен как удаленный, передан из опубликованной версии страницы или его нельзя загрузить из страницы-источника ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-block.md)
- [{#T}](./landing-landing-copy-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-hide-block.md)
- [{#T}](./landing-landing-mark-deleted-block.md)
- [{#T}](./landing-landing-mark-undeleted-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-up-block.md)
- [{#T}](../methods/landing-landing-publication.md)
