# Копировать блок на страницу `landing.landing.copyblock`

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.landing.copyblock` копирует блок на указанную страницу и возвращает идентификатор созданной копии блока. Можно копировать блок как с другой страницы, так и в пределах той же страницы. Вместе с блоком копируются его HTML-содержимое.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **lid***
[`integer`](../../../data-types.md) | Идентификатор страницы, на которую нужно скопировать блок.

Идентификатор страницы можно получить методом [landing.landing.getList](../methods/landing-landing-get-list.md), а также из результата методов [landing.landing.add](../methods/landing-landing-add.md), [landing.landing.addByTemplate](../methods/landing-landing-add-by-template.md) и [landing.landing.copy](../methods/landing-landing-copy.md) ||
|| **block***
[`integer`](../../../data-types.md) | Идентификатор исходного блока.

Идентификатор блока можно получить методом [landing.block.getList](../../block/methods/landing-block-get-list.md). Блок может находиться как на другой странице, так и на той же странице `lid`.

Можно копировать только существующий блок, который не помечен как удаленный. Если блок удален, метод вернет ошибку ||
|| **params**
[`object`](../../../data-types.md) | Дополнительные параметры копирования [(подробное описание)](#params) ||
|#

### Параметр params {#params}

#|
|| **Название**
`тип` | **Описание** ||
|| **AFTER_ID**
[`integer`](../../../data-types.md) | Идентификатор блока на странице `lid`, после которого нужно вставить копию

Если передать идентификатор существующего блока на странице `lid`, копия будет вставлена сразу после него. Если параметр не передавать, передать `0` или указать идентификатор блока, которого нет на странице `lid`, копия будет добавлена в конец страницы ||
|| **RETURN_CONTENT**
[`string`](../../../data-types.md) | Если передать `Y`, метод вернет объект с признаком успеха и данными созданной копии блока [(подробное описание)](#result-content). При любом другом значении метод вернет только идентификатор созданной копии блока ||
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
        "block": 6428,
        "params": {
          "AFTER_ID": 6429,
          "RETURN_CONTENT": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.landing.copyblock.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "lid": 351,
        "block": 6428,
        "params": {
          "AFTER_ID": 6429,
          "RETURN_CONTENT": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.landing.copyblock.json"
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'landing.landing.copyblock',
            {
                lid: 351,
                block: 6428,
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
                'landing.landing.copyblock',
                [
                    'lid' => 351,
                    'block' => 6428,
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
        'landing.landing.copyblock',
        {
            lid: 351,
            block: 6428,
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
        'landing.landing.copyblock',
        [
            'lid' => 351,
            'block' => 6428,
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
    "result": 28607,
    "time": {
        "start": 1773932480,
        "finish": 1773932480.485875,
        "duration": 0.48587489128112793,
        "processing": 0,
        "date_start": "2026-03-19T18:01:20+03:00",
        "date_finish": "2026-03-19T18:01:20+03:00",
        "operating_reset_at": 1773933080,
        "operating": 0
    }
}
```

Если передан `params.RETURN_CONTENT = 'Y'`, вместо идентификатора блока метод вернет объект с признаком успеха и данными созданной копии блока.

### Пример ответа при `RETURN_CONTENT = 'Y'`

```json
{
    "result": {
        "result": true,
        "content": {
            "id": 28607,
            "sections": "text_image,about",
            "active": true,
            "access": "X",
            "anchor": "b28607",
            "php": false,
            "designed": false,
            "repoId": null,
            "content": "<div id=\"block28607\" data-id=\"28607\" class=\"block-wrapper block-19-2-features-with-img\">...</div>",
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
                    "name": "Текст с пунктами-иконками и картинкой слева",
                    "section": [
                        "text_image",
                        "about"
                    ]
                },
                "timestamp": 1751467642,
                "namespace": "bitrix",
                "code": "19.2.features_with_img",
                "preview": "/bitrix/blocks/bitrix/19.2.features_with_img/preview.jpg"
            },
            "dynamicParams": []
        }
    },
    "time": {
        "start": 1773933164,
        "finish": 1773933164.48191,
        "duration": 0.48190999031066895,
        "processing": 0,
        "date_start": "2026-03-19T18:12:44+03:00",
        "date_finish": "2026-03-19T18:12:44+03:00",
        "operating_reset_at": 1773933764,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../../data-types.md) \| [`object`](../../../data-types.md) | Идентификатор созданной копии блока. Если передан `params.RETURN_CONTENT = 'Y'`, метод вернет объект с признаком успеха и данными блока [(подробное описание)](#result-content) ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

### Объект result при `RETURN_CONTENT = 'Y'` {#result-content}

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Признак успешного копирования. При успешном выполнении возвращается `true` ||
|| **content**
[`object`](../../../data-types.md) | Данные созданной копии блока [(подробное описание)](#content) ||
|#

### Объект content {#content}

#|
|| **Название**
`тип` | **Описание** ||
|| **id**
[`integer`](../../../data-types.md) | Идентификатор созданной копии блока ||
|| **sections**
[`string`](../../../data-types.md) | Коды разделов блока из манифеста, объединенные в одну строку через запятую ||
|| **active**
[`boolean`](../../../data-types.md) | Признак активности блока ||
|| **access**
[`string`](../../../data-types.md) | Уровень доступа к блоку. Возможные значения: 
`A` — доступ закрыт ко всем блокам, 
`D` — доступ запрещен, 
`V` — можно редактировать только дизайн, 
`W` — можно редактировать контент и дизайн без удаления, 
`X` — полный доступ ||
|| **anchor**
[`string`](../../../data-types.md) | Локальный якорь блока. Новый блок всегда получает якорь вида `b<ID>`, например `b28607` ||
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
[`array`](../../../data-types.md) | Поле содержит те же данные, что и `manifest.requiredUserAction`. Оно возвращается только тогда, когда после копирования блока пользователь должен выполнить дополнительное действие на стороне клиента ||
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
|| `ACCESS_DENIED` | У пользователя нет прав на вызов методов landing или нет права редактировать страницу `lid` ||
|| `BLOCK_NOT_FOUND` | Исходный блок с идентификатором `block` не найден, недоступен текущему пользователю, помечен как удаленный или его нельзя загрузить из исходной страницы ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-landing-add-block.md)
- [{#T}](./landing-landing-delete-block.md)
- [{#T}](./landing-landing-down-block.md)
- [{#T}](./landing-landing-move-block.md)
- [{#T}](./landing-landing-show-block.md)
- [{#T}](./landing-landing-up-block.md)
- [{#T}](../methods/landing-landing-publication.md)
