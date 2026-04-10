# Изменить сообщение Ленты новостей log.blogpost.update

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или автор сообщения

Метод `log.blogpost.update` изменяет сообщение Ленты новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../data-types.md) | Идентификатор сообщения.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|| **POST_MESSAGE**
[`string`](../data-types.md) | Новый текст сообщения ||
|| **POST_TITLE**
[`string`](../data-types.md) | Новый заголовок сообщения

{% note info "" %}

Если не передать ни `POST_TITLE`, ни `POST_MESSAGE`, метод завершится ошибкой `EMPTY_TITLE`. Если передать только `POST_MESSAGE`, заголовок из оригинального сообщения не сохранится 

{% endnote %} ||
|| **DEST**
[`array`](../data-types.md) | Новый список адресатов, которые получат право на просмотр сообщения.

Возможные значения:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}
||
|| **SPERM**
[`array`](../data-types.md) | Устаревший аналог `DEST` ||
|| **FILES**
[`array`](../data-types.md) | Массив файлов в формате, описанном в [работе с файлами](../files/how-to-upload-files.md). 

Чтобы удалить файл, используйте формат `{ ID: 'del' }`, где `ID` — идентификатор привязки файла в сообщении.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|| **IMPORTANT**
[`string`](../data-types.md) | Признак важного сообщения.

Возможные значения:

- `Y` — сообщение важно
- `N` — сообщение не важное ||
|| **IMPORTANT_DATE_END**
[`string`](../data-types.md) | Дата и время в формате ISO 8601, до которого сообщение будет считаться важным ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта ||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя, от имени которого редактируется сообщение. Доступно только администраторам.

Идентификатор можно получить с помощью метода [user.get](../user/user-get.md)

По умолчанию — текущий пользователь, инициировавший вызов метода ||
|| **UF_\***
[`mixed`](../data-types.md) | Пользовательские поля. Поддерживается определенный [набор полей](#uf-fields), который зависит от настроек портала ||
|#

### Пользовательские поля{#uf-fields}

#|
|| **Название**
`тип` | **Описание** ||
|| **UF_BLOG_POST_FILE**
[`array`](../data-types.md) | Альтернатива `FILES`.

Передавайте список идентификаторов файлов Диска в формате `['n<ID_файла_диска>']`.

Получить идентификатор можно с помощью методов [disk.storage.getchildren](../disk/storage/disk-storage-get-children.md) и [disk.folder.getchildren](../disk/folder/disk-folder-get-children.md).

Чтобы очистить список файлов у сообщения, передавайте `['empty']`. Физически файлы с Диска при этом не удалятся, убирается только привязка к сообщению

{% note info "" %}

При указании `FILES` параметр `UF_BLOG_POST_FILE` игнорируется

{% endnote %} ||
|| **UF_BLOG_POST_IMPRTNT**
[`integer`](../data-types.md) | Признак важного сообщения.

Заполняется автоматически при `IMPORTANT = 'Y'` ||
|| **UF_IMPRTANT_DATE_END**
[`datetime`](../data-types.md#datetime) | Срок действия важного сообщения.

Заполняется автоматически при переданном `IMPORTANT_DATE_END` ||
|| **UF_BLOG_POST_URL_PRV**
[`integer`](../data-types.md) | Превью ссылки из текста сообщения.

Заполняется автоматически при `PARSE_PREVIEW = 'Y'`, если превью удалось сформировать ||
|| **UF_GRATITUDE**
[`integer`](../data-types.md) | Данные функционала Благодарность в формате:

```js
 GRATITUDE_MEDAL: '<XML_ID_медали>',
 GRATITUDE_EMPLOYEES: [<ID_пользователя>]
```
||
|| **UF_BLOG_POST_VOTE**
[`integer`](../data-types.md) | Данные опроса в формате:

```js
UF_BLOG_POST_VOTE: 'n<ID_опроса>',
'UF_BLOG_POST_VOTE_n<ID_опроса>_DATA': {
    QUESTIONS: [
        {
            QUESTION: 'Вопрос',
            FIELD_TYPE: 0, // Тип выбора: 0 — один вариант, 1 — несколько вариантов
            ANSWERS: [
                { MESSAGE: 'Ответ 1' },
                { MESSAGE: 'Ответ 2' }
            ]
        }
    ],
    ANONYMITY: 0, // Анонимность голосования: 0 — нет, 1 — да
    OPTIONS: 0 // Переголосование: 0 — запрещено, 1 — разрешено
}
```
Получить идентификатор существующего опроса можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217,"POST_TITLE":"Новый заголовок сообщения","FILES":{"505":"del"}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217,"POST_TITLE":"Новый заголовок сообщения","FILES":{"505":"del"},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.update
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'log.blogpost.update',
            {
                POST_ID: 217,
                POST_TITLE: 'Новый заголовок сообщения',
                FILES: {
                    505: 'del'
                }
            }
        );
        
        const result = response.getData().result;
        console.log('Updated post with ID:', result);
        
        processResult(result);
    }
    catch( error )
    {
        console.error('Error:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogpost.update',
                [
                    'POST_ID' => 217,
                    'POST_TITLE' => 'Новый заголовок сообщения',
                    'FILES' => [
                        505 => 'del'
                    ]
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error updating blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.update',
        {
            POST_ID: 217,
            POST_TITLE: 'Новый заголовок сообщения',
            FILES: {
                505: 'del'
            }
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error(), result.error_description());
            }
            else
            {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogpost.update',
        [
            'POST_ID' => 217,
            'POST_TITLE' => 'Новый заголовок сообщения',
            'FILES' => [
                505 => 'del'
            ]
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 217,
    "time": {
        "start": 1773817731,
        "finish": 1773817731.902982,
        "duration": 0.9029819965362549,
        "processing": 0,
        "date_start": "2026-03-18T10:08:51+03:00",
        "date_finish": "2026-03-18T10:08:51+03:00",
        "operating_reset_at": 1773818331,
        "operating": 0.704833984375
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../data-types.md) | Идентификатор измененного сообщения ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "EMPTY_TITLE",
    "error_description": "Не указан заголовок сообщения"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_UPDATE_ERROR` | `Wrong post ID` | Некорректный `POST_ID` ||
|| `EMPTY_TITLE` | `Не указан заголовок сообщения` | Не указан ни `POST_TITLE`, ни `POST_MESSAGE` ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_UPDATE_ERROR` | `Blog module is not installed.` | Модуль `blog` не установлен ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_UPDATE_ERROR` | `No write perms` | Недостаточно прав на изменение сообщения ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_UPDATE_ERROR` | `No post found` | Сообщение не найдено ||
|| `SONET_CONTROLLER_LIVEFEED_BLOGPOST_UPDATE_ERROR` | `No blog found` | Не удалось получить блог автора сообщения ||
|| — | `Cannot update blog post` | Внутренняя ошибка при изменении сообщения ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-add.md)
- [{#T}](./log-blogpost-get.md)
- [{#T}](./log-blogpost-delete.md)
- [{#T}](./log-blogpost-share.md)
- [{#T}](./log-blogpost-getusers-important.md)
