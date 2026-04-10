# Изменить папку в сайте landing.site.updateFolder

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`landing`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «редактирование» сайта

Метод `landing.site.updateFolder` обновляет параметры папки сайта.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **siteId***
[`integer`](../../data-types.md) | Идентификатор сайта, к которому относится папка.

Идентификатор сайта можно получить методом [landing.site.getList](./landing-site-get-list.md) ||
|| **folderId***
[`integer`](../../data-types.md) | Идентификатор папки, которую нужно обновить.

Идентификатор папки можно получить методом [landing.site.getFolders](./landing-site-get-folders.md) ||
|| **fields***
[`object`](../../data-types.md) | Набор полей для обновления папки [(подробное описание)](#fields) ||
|#

### Параметр fields {#fields}

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **TITLE**
[`string`](../../data-types.md) | Название папки ||
|| **CODE**
[`string`](../../data-types.md) | Символьный код папки для URL. Код не может содержать символ `/`. 

Если параметр не передан, используется текущее значение `CODE` папки ||
|| **PARENT_ID**
[`integer`](../../data-types.md) | Идентификатор родительской папки. 

Если значение `0`, `null`, пустое или параметр не передан, папка переносится в корень сайта ||
|| **INDEX_ID**
[`integer`](../../data-types.md) | Идентификатор индексной страницы папки ||
|| **ACTIVE**
[`string`](../../data-types.md) | Флаг активности папки `Y/N` ||
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
        "folderId": 736,
        "fields": {
          "TITLE": "Каталог услуг",
          "CODE": "services-catalog",
          "PARENT_ID": 0,
          "INDEX_ID": 987,
          "ACTIVE": "Y"
        }
      }' \
      "https://**put.your-domain-here**/rest/**user_id**/**webhook_code**/landing.site.updateFolder.json"
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -d '{
        "siteId": 1817,
        "folderId": 736,
        "fields": {
          "TITLE": "Каталог услуг",
          "CODE": "services-catalog",
          "PARENT_ID": 0,
          "INDEX_ID": 987,
          "ACTIVE": "Y"
        },
        "auth": "**put_access_token_here**"
      }' \
      "https://**put.your-domain-here**/rest/landing.site.updateFolder.json"
    ```

- JS

    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'landing.site.updateFolder',
    		{
    			siteId: 1817,
    			folderId: 736,
    			fields: {
    				TITLE: 'Каталог услуг',
    				CODE: 'services-catalog',
    				PARENT_ID: 0,
    				INDEX_ID: 987,
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
                'landing.site.updateFolder',
                [
                    'siteId' => 1817,
                    'folderId' => 736,
                    'fields' => [
                        'TITLE' => 'Каталог услуг',
                        'CODE' => 'services-catalog',
                        'PARENT_ID' => 0,
                        'INDEX_ID' => 987,
                        'ACTIVE' => 'Y',
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . var_export($result, true);
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating folder: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'landing.site.updateFolder',
        {
            siteId: 1817,
            folderId: 736,
            fields: {
                TITLE: 'Каталог услуг',
                CODE: 'services-catalog',
                PARENT_ID: 0,
                INDEX_ID: 987,
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
        'landing.site.updateFolder',
        [
            'siteId' => 1817,
            'folderId' => 736,
            'fields' => [
                'TITLE' => 'Каталог услуг',
                'CODE' => 'services-catalog',
                'PARENT_ID' => 0,
                'INDEX_ID' => 987,
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
    "result": true,
    "time": {
        "start": 1773291230,
        "finish": 1773291230.313858,
        "duration": 0.3138580322265625,
        "processing": 0,
        "date_start": "2026-03-12T07:53:50+03:00",
        "date_finish": "2026-03-12T07:53:50+03:00",
        "operating_reset_at": 1773291830,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если папка успешно обновлена ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ACCESS_DENIED",
    "error_description": "Сайт не найден или доступ к нему запрещен."
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** ||
|| `MISSING_PARAMS` | Не передан обязательный параметр `siteId`, `folderId` или `fields` ||
|| `ACCESS_DENIED` | Сайт не найден или доступ к нему запрещен ||
|| `FOLDER_IS_NOT_UNIQUE` | С таким именем уже определена папка ||
|| `SLASH_IS_NOT_ALLOWED` | Слеш запрещен в адресе папки ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./landing-site-add-folder.md)
- [{#T}](./landing-site-get-folders.md)
- [{#T}](./landing-site-mark-folder-delete.md)
- [{#T}](./landing-site-mark-folder-undelete.md)
- [{#T}](./landing-site-publication-folder.md)
- [{#T}](./landing-site-unpublic-folder.md)
