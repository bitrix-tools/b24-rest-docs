# Получить папки сайта landing.site.getFolders

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «просмотр» сайта

Метод `landing.site.getFolders` возвращает список папок сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **scope**
[`string`](../../data-types.md) | Внутренний скоуп лендингов. Он не связан с REST-скоупом `landing` в названии метода.

Значение `scope` должно соответствовать типу сайта [(подробное описание)](../types.md) ||
|| **siteId***
[`integer`](../../data-types.md) | Идентификатор сайта, для которого запрашиваются папки.

Идентификатор сайта можно получить с помощью метода [landing.site.getList](./landing-site-get-list.md) или из результата метода [landing.site.add](./landing-site-add.md) ||
|| **filter**
[`object`](../../data-types.md) | Фильтр по полям папки [(подробное описание)](#filter) ||
|#

### Параметр filter {#filter}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | Идентификатор папки ||
|| **PARENT_ID**
[`integer`](../../data-types.md) \| `null` | Идентификатор родительской папки. Если передать `0`, `null`, `false` или пустую строку, значение будет приведено к `null`, это выборка папок верхнего уровня ||
|| **INDEX_ID**
[`integer`](../../data-types.md) | Идентификатор индексной страницы папки ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности `Y/N` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления `Y/N` ||
|| **=DELETED**
[`string`](../../data-types.md) | Точное сравнение флага удаления. Если в запросе нет `DELETED` и `=DELETED`, метод автоматически добавляет `=DELETED: "N"` ||
|| **TITLE**
[`string`](../../data-types.md) | Название папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки ||
|| **CREATED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего папку ||
|| **MODIFIED_BY_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, изменившего папку ||
|| **DATE_CREATE**
[`datetime`](../../data-types.md) | Дата и время создания папки ||
|| **DATE_MODIFY**
[`datetime`](../../data-types.md) | Дата и время изменения папки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "filter": {
          "PARENT_ID": 0,
          "=DELETED": "N",
          "ACTIVE": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.getFolders.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "filter": {
          "PARENT_ID": 0,
          "=DELETED": "N",
          "ACTIVE": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.getFolders.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.getFolders',
    		{
    			siteId: 1817,
    			filter: {
    				PARENT_ID: 0,
    				'=DELETED': 'N',
    				ACTIVE: 'Y'
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
                'landing.site.getFolders',
                [
                    'siteId' => 1817,
                    'filter' => [
                        'PARENT_ID' => 0,
                        '=DELETED' => 'N',
                        'ACTIVE' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting folders: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.getFolders',
        {
            siteId: 1817,
            filter: {
                PARENT_ID: 0,
                '=DELETED': 'N',
                ACTIVE: 'Y'
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
        'landing.site.getFolders',
        [
            'siteId' => 1817,
            'filter' => [
                'PARENT_ID' => 0,
                '=DELETED' => 'N',
                'ACTIVE' => 'Y',
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
    "result": [
        {
            "ID": "1",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": "9",
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "тест переноса страниц",
            "CODE": "change",
            "CREATED_BY_ID": "1",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "11/12/2021 08:39:53 pm",
            "DATE_MODIFY": "12/28/2021 03:04:04 pm"
        },
        {
            "ID": "33",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": null,
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "mobile",
            "CODE": "mobile",
            "CREATED_BY_ID": "29",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "12/08/2021 10:23:37 am",
            "DATE_MODIFY": "12/08/2021 10:24:48 am"
        },
        {
            "ID": "3",
            "PARENT_ID": null,
            "SITE_ID": "3",
            "INDEX_ID": "45",
            "ACTIVE": "Y",
            "DELETED": "N",
            "TITLE": "вложение 1",
            "CODE": "vlozhenie1",
            "CREATED_BY_ID": "1",
            "MODIFIED_BY_ID": "29",
            "DATE_CREATE": "11/12/2021 08:39:53 pm",
            "DATE_MODIFY": "12/03/2021 08:10:21 am"
        }
    ],
    "time": {
        "start": 1773257990,
        "finish": 1773257990.091689,
        "duration": 0.0916891098022461,
        "processing": 0,
        "date_start": "2026-03-11T22:39:50+03:00",
        "date_finish": "2026-03-11T22:39:50+03:00",
        "operating_reset_at": 1773258590,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object[]`](../../data-types.md) | Список папок сайта [(подробное описание)](#folder). Метод может вернуть `result: []` без ошибки, если в сайте нет папок или у пользователя нет права «просмотр» для указанного сайта ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект folder {#folder}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`string`](../../data-types.md) | Идентификатор папки ||
|| **PARENT_ID**
[`string`](../../data-types.md) \| `null` | Идентификатор родительской папки ||
|| **SITE_ID**
[`string`](../../data-types.md) | Идентификатор сайта ||
|| **INDEX_ID**
[`string`](../../data-types.md) \| `null` | Идентификатор индексной страницы папки ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности `Y/N` ||
|| **DELETED**
[`string`](../../data-types.md) | Флаг удаления `Y/N` ||
|| **TITLE**
[`string`](../../data-types.md) | Название папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки ||
|| **CREATED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, создавшего папку ||
|| **MODIFIED_BY_ID**
[`string`](../../data-types.md) | Идентификатор пользователя, изменившего папку ||
|| **DATE_CREATE**
[`string`](../../data-types.md) | Дата и время создания в строковом формате ||
|| **DATE_MODIFY**
[`string`](../../data-types.md) | Дата и время изменения в строковом формате ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "MISSING_PARAMS",
    "error_description": "Недостаточно параметров вызова, пропущены: siteId"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `siteId` ||
|| `ACCESS_DENIED` | Недостаточно общих прав для вызова методов landing ||
|| `TYPE_ERROR` | Ошибка типа данных в параметрах вызова метода ||
|| `SYSTEM_ERROR` | Внутренняя ошибка при выполнении метода ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add-folder.md)
- [{#T}](./landing-site-update-folder.md)
- [{#T}](./landing-site-mark-folder-delete.md)
- [{#T}](./landing-site-mark-folder-undelete.md)
- [{#T}](./landing-site-publication-folder.md)
- [{#T}](./landing-site-unpublic-folder.md)
