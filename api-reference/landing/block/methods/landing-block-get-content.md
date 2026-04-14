# Получить контент блока `landing.block.getcontent`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «просмотр» сайта

Метод `landing.block.getcontent` возвращает готовый HTML блока, его ресурсы, манифест и служебные свойства блока.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../../types.md) ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы.

Идентификатор страницы можно получить методом [landing.landing.getlist](../../page/methods/landing-landing-get-list.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор блока.

Идентификатор блока можно получить методом [landing.block.getlist](./landing-block-get-list.md) ||
|| **editMode**
[`boolean`](../../../data-types.md) | Режим получения версии блока.

Возможные значения:
`true` — вернуть черновик блока со страницы,
`false` — вернуть опубликованную версию блока.

По умолчанию — `false`. При `editMode=true` метод автоматически включает возврат HTML для неактивного блока.

Если страница еще не публиковалась, вызов без `editMode` может не найти блок ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **wrapper_show**
[`boolean`](../../../data-types.md) | Возвращать ли в `result.content` внешний контейнер блока `<div class="block-wrapper">`.

Возможные значения:
`true` — вернуть HTML вместе с внешним контейнером блока, который использует редактор страниц Битрикс24,
`false` — вернуть HTML блока без контейнера. По умолчанию — `true` ||
|| **force_unactive**
[`boolean`](../../../data-types.md) | Формировать HTML даже для неактивного блока.

Возможные значения:
`true` — вернуть HTML неактивного блока,
`false` — если блок неактивен, поле `result.content` вернется пустой строкой. 

По умолчанию — `false`. При `editMode=true` этот режим включается автоматически ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 4858,
        "block": 39556,
        "editMode": true,
        "params": {
          "wrapper_show": false
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.block.getcontent.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 4858,
        "block": 39556,
        "editMode": true,
        "params": {
          "wrapper_show": false
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.block.getcontent.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.block.getcontent',
    		{
    			lid: 4858,
    			block: 39556,
    			editMode: true,
    			params: {
    				wrapper_show: false
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
                'landing.block.getcontent',
                [
                    'lid' => 4858,
                    'block' => 39556,
                    'editMode' => true,
                    'params' => [
                        'wrapper_show' => false,
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting block content: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.block.getcontent',
        {
            lid: 4858,
            block: 39556,
            editMode: true,
            params: {
                wrapper_show: false
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
        'landing.block.getcontent',
        [
            'lid' => 4858,
            'block' => 39556,
            'editMode' => true,
            'params' => [
                'wrapper_show' => false,
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
        "id": 28853,
        "sections": "tiles,news",
        "active": true,
        "access": "X",
        "anchor": "b28853",
        "php": false,
        "designed": false,
        "repoId": null,
        "content": "<div id=\"block28853\" data-id=\"28853\" class=\"block-wrapper block-18-2-two-cols-fix-img-text-button-with-cards\"><section class=\"landing-block g-pt-30 g-pb-30 g-bg-transparent\">...</section></div>",
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
                "name": "Список страниц с маленькой картинкой слева",
                "section": [
                    "tiles",
                    "news"
                ]
            },
            "cards": {
                ".landing-block-card": {
                    "name": "Карточка",
                    "label": [
                        ".landing-block-node-img",
                        ".landing-block-node-title"
                    ]
                }
            }
        },
        "dynamicParams": []
    },
    "time": {
        "start": 1774520845,
        "finish": 1774520845.380018,
        "duration": 0.3800179958343506,
        "processing": 0,
        "date_start": "2026-03-26T13:27:25+03:00",
        "date_finish": "2026-03-26T13:27:25+03:00",
        "operating_reset_at": 1774521445,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../../data-types.md) | Данные блока [(подробное описание)](#result) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result {#result}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор блока ||
|| **sections**
[`string`](../../../data-types.md) | Коды разделов блока из манифеста, объединенные в строку через запятую ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока ||
|| **access**
[`string`](../../../data-types.md) | Уровень доступа к блоку. Возможные значения:

`A` — доступ закрыт ко всем блокам,
`D` — доступ запрещен,
`V` — можно редактировать только дизайн,
`W` — можно редактировать контент и дизайн без удаления,
`X` — полный доступ. ||
|| **anchor**
[`string`](../../../data-types.md) | Локальный якорь блока.

Значение используется как HTML-атрибут `id` у внешней обертки блока и в ссылках на блок внутри страницы ||
|| **php**
[`boolean`](../../../data-types.md) | Признак того, что в исходном контенте блока есть PHP-код ||
|| **designed**
[`boolean`](../../../data-types.md) | Признак того, что блок изменен в дизайнере ||
|| **repoId**
[`integer`](../../../data-types.md) | Идентификатор REST-блока из репозитория или `null`, если блок не связан с REST-репозиторием ||
|| **content**
[`string`](../../../data-types.md) | Готовый HTML блока для вывода на странице.

Возвращается итоговый HTML после рендеринга, а не шаблон блока.

Если `params.wrapper_show=true`, в поле возвращается HTML вместе с внешним контейнером блока. Если `params.wrapper_show=false`, возвращается только HTML блока.

Если блок неактивен и `params.force_unactive=false`, поле возвращается пустой строкой ||
|| **content_ext**
[`string`](../../../data-types.md) | Дополнительный HTML-код подключаемых расширений ||
|| **css**
[`array`](../../../data-types.md) | Список CSS-ресурсов блока и зависимостей, подключенных во время рендеринга.

Если отдельных CSS-подключений нет, возвращается пустой массив ||
|| **js**
[`array`](../../../data-types.md) | Список JS-ресурсов блока и зависимостей, подключенных во время рендеринга.

Если запрашивать `editMode=true` для REST-блока, у которого `repoId` не равен `null`, собственные JS-ресурсы блока не возвращаются ||
|| **assetStrings**
[`array`](../../../data-types.md) | Строки инициализации ресурсов, которые нужно добавить на страницу ||
|| **lang**
[`array`](../../../data-types.md) \| [`object`](../../../data-types.md) | Языковые сообщения подключенных расширений в формате объекта `ключ: значение`.

Если у подключенных расширений нет языковых сообщений, возвращается пустой массив ||
|| **manifest**
[`object`](../../../data-types.md) | Манифест блока целиком. Общий формат описан в статье [Манифест блока](../manifest.md) ||
|| **dynamicParams**
[`array`](../../../data-types.md) | Параметры источника данных для динамического блока.

Для статического блока поле возвращается пустым массивом ||
|| **requiredUserAction**
[`array`](../../../data-types.md) | Дополнительное действие, которое нужно выполнить после загрузки блока.

Поле возвращается только в режиме `editMode`, если после загрузки блока требуется дополнительное действие со стороны пользователя ||
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
|| `MISSING_PARAMS` | Не передан обязательный верхнеуровневый параметр `lid` или `block` ||
|| `LANDING_NOT_EXIST` | Страница с идентификатором `lid` не найдена или недоступна текущему пользователю ||
|| `ACCESS_DENIED` | Нет доступа к разделу «Сайты и магазины» ||
|| `BLOCK_NOT_FOUND` | Блок с идентификатором `block` не найден в выбранной версии страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-block-get-content-from-repository.md)
- [{#T}](./landing-block-update-content.md)
- [{#T}](./landing-block-get-list.md)
- [{#T}](./landing-block-get-by-id.md)
- [{#T}](./landing-block-get-manifest.md)
