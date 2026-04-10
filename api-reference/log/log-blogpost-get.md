# Получить доступные пользователю сообщения Ленты новостей log.blogpost.get

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogpost.get` возвращает сообщения Ленты новостей, доступные текущему пользователю.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID**
[`integer`](../data-types.md) | Фильтрация по идентификатору сообщения.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|| **LOG_RIGHTS**
[`array`](../data-types.md) | Фильтрация по получателям, у которых есть право на просмотр сообщения.

Возможные значения:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}
||
|| **start**
[`integer`](../data-types.md) | Параметр используется для управления постраничной навигацией.

Размер страницы результатов всегда статичный — 50 записей.

Чтобы выбрать вторую страницу результатов, необходимо передавать значение `50`. Чтобы выбрать третью страницу результатов — значение `100` и так далее.

Формула расчета значения параметра `start`:

`start = (N - 1) * 50`, где `N` — номер нужной страницы ||
|#

{% note info "" %}

Если параметры `POST_ID` и `LOG_RIGHTS` не указаны, возвращаются все сообщения, доступные текущему пользователю. Параметры являются взаимоисключающими: при указании `POST_ID` фильтрация по `LOG_RIGHTS` игнорируется

{% endnote %}

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.get
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.get
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'log.blogpost.get',
            {
                POST_ID: 217
            }
        );
        
        const result = response.getData().result;
        console.log('Blog post data:', result);
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
                'log.blogpost.get',
                [
                    'POST_ID' => 217
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.get',
        {
            POST_ID: 217
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
        'log.blogpost.get',
        [
            'POST_ID' => 217
        ]
    );

    echo '<PRE>';
    print_r($result);
    echo '</PRE>';
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

Пример ответа:

```json
{
    "result": [
        {
        "ID": "217",
        "BLOG_ID": "299",
        "PUBLISH_STATUS": "P",
        "TITLE": "Новый регламент",
        "AUTHOR_ID": "1269",
        "ENABLE_COMMENTS": "Y",
        "NUM_COMMENTS": "0",
        "CODE": null,
        "MICRO": "N",
        "DETAIL_TEXT": "С 1 ноября обновляется процесс согласования.",
        "DATE_PUBLISH": "2026-03-17T15:29:15+03:00",
        "CATEGORY_ID": "9,11,13",
        "HAS_SOCNET_ALL": "N",
        "HAS_TAGS": "Y",
        "HAS_IMAGES": "N",
        "HAS_PROPS": "Y",
        "HAS_COMMENT_IMAGES": null,
        "UF_BLOG_POST_DOC": {
            "ID": "1",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_BLOG_POST_DOC",
            "USER_TYPE_ID": "file",
            "XML_ID": "UF_BLOG_POST_DOC",
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "Y",
            "SETTINGS": {
            "SIZE": 20,
            "LIST_WIDTH": 0,
            "LIST_HEIGHT": 0,
            "MAX_SHOW_SIZE": 0,
            "MAX_ALLOWED_SIZE": 0,
            "EXTENSIONS": [],
            "TARGET_BLANK": "Y",
            "DEFAULT_VIEW": null
            },
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "file",
            "CLASS_NAME": "Bitrix\Main\UserField\Types\FileType",
            "EDIT_CALLBACK": ["Bitrix\Main\UserField\Types\FileType", "renderEdit"],
            "VIEW_CALLBACK": ["Bitrix\Main\UserField\Types\FileType", "renderView"],
            "USE_FIELD_COMPONENT": true,
            "DESCRIPTION": "Файл",
            "BASE_TYPE": "file"
            },
            "VALUE": false,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_BLOG_POST_URL_PRV": {
            "ID": "5",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_BLOG_POST_URL_PRV",
            "USER_TYPE_ID": "url_preview",
            "XML_ID": "UF_BLOG_POST_URL_PRV",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "Y",
            "SETTINGS": [],
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "url_preview",
            "CLASS_NAME": "Bitrix\Main\UrlPreview\UrlPreviewUserType",
            "DESCRIPTION": "Содержимое ссылки",
            "BASE_TYPE": "int"
            },
            "VALUE": null,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_GRATITUDE": {
            "ID": "9",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_GRATITUDE",
            "USER_TYPE_ID": "integer",
            "XML_ID": "UF_GRATITUDE",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
            "SIZE": 20,
            "MIN_VALUE": 0,
            "MAX_VALUE": 0,
            "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "integer",
            "CLASS_NAME": "Bitrix\Main\UserField\Types\IntegerType",
            "EDIT_CALLBACK": ["Bitrix\Main\UserField\Types\IntegerType", "renderEdit"],
            "VIEW_CALLBACK": ["Bitrix\Main\UserField\Types\IntegerType", "renderView"],
            "USE_FIELD_COMPONENT": true,
            "DESCRIPTION": "Целое число",
            "BASE_TYPE": "int"
            },
            "VALUE": null,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_BLOG_POST_FILE": {
            "ID": "19",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_BLOG_POST_FILE",
            "USER_TYPE_ID": "disk_file",
            "XML_ID": "UF_BLOG_POST_FILE",
            "SORT": "100",
            "MULTIPLE": "Y",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "Y",
            "SETTINGS": {
            "IBLOCK_ID": null,
            "SECTION_ID": null,
            "UF_TO_SAVE_ALLOW_EDIT": false
            },
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "disk_file",
            "CLASS_NAME": "Bitrix\Disk\Uf\FileUserType",
            "DESCRIPTION": "Файл (Диск)",
            "BASE_TYPE": "int",
            "TAG": ["DISK FILE ID", "DOCUMENT ID"]
            },
            "VALUE": [505],
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": "a:1:{i:0;i:505;}",
            "CUSTOM_DATA": {
            "PHOTO_TEMPLATE": "gallery"
            }
        },
        "UF_BLOG_POST_IMPRTNT": {
            "ID": "83",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_BLOG_POST_IMPRTNT",
            "USER_TYPE_ID": "integer",
            "XML_ID": "UF_BLOG_POST_IMPRTNT",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
            "SIZE": 20,
            "MIN_VALUE": 0,
            "MAX_VALUE": 0,
            "DEFAULT_VALUE": null
            },
            "EDIT_FORM_LABEL": "Важное сообщение",
            "LIST_COLUMN_LABEL": "Важное",
            "LIST_FILTER_LABEL": "Важное",
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "integer",
            "CLASS_NAME": "Bitrix\Main\UserField\Types\IntegerType",
            "EDIT_CALLBACK": ["Bitrix\Main\UserField\Types\IntegerType", "renderEdit"],
            "VIEW_CALLBACK": ["Bitrix\Main\UserField\Types\IntegerType", "renderView"],
            "USE_FIELD_COMPONENT": true,
            "DESCRIPTION": "Целое число",
            "BASE_TYPE": "int"
            },
            "VALUE": null,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_IMPRTANT_DATE_END": {
            "ID": "85",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_IMPRTANT_DATE_END",
            "USER_TYPE_ID": "datetime",
            "XML_ID": "UF_IMPRTANT_DATE_END",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
            "DEFAULT_VALUE": {
                "TYPE": "NONE",
                "VALUE": ""
            },
            "USE_SECOND": "Y",
            "USE_TIMEZONE": "N"
            },
            "EDIT_FORM_LABEL": "Срок действия",
            "LIST_COLUMN_LABEL": "Срок",
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "datetime",
            "CLASS_NAME": "Bitrix\Main\UserField\Types\DateTimeType",
            "EDIT_CALLBACK": ["Bitrix\Main\UserField\Types\DateTimeType", "renderEdit"],
            "VIEW_CALLBACK": ["Bitrix\Main\UserField\Types\DateTimeType", "renderView"],
            "USE_FIELD_COMPONENT": true,
            "DESCRIPTION": "Дата со временем",
            "BASE_TYPE": "datetime"
            },
            "VALUE": "",
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_BLOG_POST_VOTE": {
            "ID": "131",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_BLOG_POST_VOTE",
            "USER_TYPE_ID": "vote",
            "XML_ID": "UF_BLOG_POST_VOTE",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "Y",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": {
            "CHANNEL_ID": 1,
            "UNIQUE": 8,
            "UNIQUE_IP_DELAY": {
                "DELAY": "10",
                "DELAY_TYPE": "D"
            },
            "NOTIFY": "I"
            },
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "vote",
            "CLASS_NAME": "Bitrix\Vote\Uf\VoteUserType",
            "DESCRIPTION": "Опрос",
            "BASE_TYPE": "int"
            },
            "VALUE": null,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "UF_MAIL_MESSAGE": {
            "ID": "439",
            "ENTITY_ID": "BLOG_POST",
            "FIELD_NAME": "UF_MAIL_MESSAGE",
            "USER_TYPE_ID": "mail_message",
            "XML_ID": "",
            "SORT": "100",
            "MULTIPLE": "N",
            "MANDATORY": "N",
            "SHOW_FILTER": "N",
            "SHOW_IN_LIST": "N",
            "EDIT_IN_LIST": "Y",
            "IS_SEARCHABLE": "N",
            "SETTINGS": null,
            "EDIT_FORM_LABEL": null,
            "LIST_COLUMN_LABEL": null,
            "LIST_FILTER_LABEL": null,
            "ERROR_MESSAGE": null,
            "HELP_MESSAGE": null,
            "USER_TYPE": {
            "USER_TYPE_ID": "mail_message",
            "CLASS_NAME": "Bitrix\Mail\MessageUserType",
            "DESCRIPTION": "Письмо (email)",
            "BASE_TYPE": "int",
            "VIEW_CALLBACK": ["Bitrix\Mail\MessageUserType", "getPublicView"],
            "EDIT_CALLBACK": ["Bitrix\Mail\MessageUserType", "getPublicEdit"],
            "onBeforeSave": ["Bitrix\Mail\MessageUserType", "onBeforeSave"],
            "onDelete": ["Bitrix\Mail\MessageUserType", "onDelete"]
            },
            "VALUE": null,
            "ENTITY_VALUE_ID": 217,
            "VALUE_EXISTS": true,
            "VALUE_RAW": null,
            "CUSTOM_DATA": []
        },
        "FILES": [505]
        }
    ],
    "total": 1,
    "time": {
        "start": 1773754540,
        "finish": 1773754540.902101,
        "duration": 0.9021010398864746,
        "processing": 0,
        "date_start": "2026-03-17T16:35:40+03:00",
        "date_finish": "2026-03-17T16:35:40+03:00",
        "operating_reset_at": 1773755140,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Параметры сообщения или список сообщений Ленты новостей.

Пустой массив означает, что нет записей, удовлетворяющих фильтру ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор сообщения ||
|| **BLOG_ID**
[`integer`](../data-types.md) | Идентификатор блога, к которому относится сообщение ||
|| **PUBLISH_STATUS**
[`string`](../data-types.md) | Статус публикации сообщения ||
|| **TITLE**
[`string`](../data-types.md) | Заголовок сообщения ||
|| **AUTHOR_ID**
[`integer`](../data-types.md) | Идентификатор автора сообщения ||
|| **ENABLE_COMMENTS**
[`string`](../data-types.md) | Разрешены ли комментарии ||
|| **NUM_COMMENTS**
[`integer`](../data-types.md) | Количество комментариев ||
|| **CODE**
[`string`](../data-types.md) | Символьный код сообщения ||
|| **MICRO**
[`string`](../data-types.md) | Признак микросообщения ||
|| **DETAIL_TEXT**
[`string`](../data-types.md) | Текст сообщения ||
|| **DATE_PUBLISH**
[`datetime`](../data-types.md#datetime) | Дата и время публикации ||
|| **CATEGORY_ID**
[`string`](../data-types.md) | Идентификаторы тегов (категорий) через запятую ||
|| **HAS_SOCNET_ALL**
[`string`](../data-types.md) | Признак публикации для всех авторизованных пользователей ||
|| **HAS_TAGS**
[`string`](../data-types.md) | Признак наличия тегов ||
|| **HAS_IMAGES**
[`string`](../data-types.md) | Признак наличия изображений  ||
|| **HAS_PROPS**
[`string`](../data-types.md) | Признак наличия пользовательских полей ||
|| **HAS_COMMENT_IMAGES**
[`string`](../data-types.md) | Признак наличия изображений в комментариях ||
|| **UF_\***
[`object`](../data-types.md) | Пользовательские поля сообщения. Набор полей зависит от настроек портала. Формат каждого поля описан [ниже](#result-uf-object) ||
|| **UF_BLOG_POST_DOC**
[`object`](../data-types.md) | Дополнительное поле с файлами ||
|| **UF_BLOG_POST_URL_PRV**
[`object`](../data-types.md) | Данные превью ссылки из текста сообщения, если превью удалось сформировать ||
|| **UF_GRATITUDE**
[`object`](../data-types.md) | Служебное поле для функционала Благодарность ||
|| **UF_BLOG_POST_FILE**
[`object`](../data-types.md) | Файлы Диска, прикрепленные к сообщению ||
|| **UF_BLOG_POST_IMPRTNT**
[`object`](../data-types.md) | Признак важного сообщения ||
|| **UF_IMPRTANT_DATE_END**
[`object`](../data-types.md) | Дата и время, до которых сообщение считается важным ||
|| **UF_BLOG_POST_VOTE**
[`object`](../data-types.md) | Данные опроса, если к сообщению прикреплен опрос ||
|| **UF_MAIL_MESSAGE**
[`object`](../data-types.md) | Связь сообщения с почтой ||
|| **FILES**
[`array`](../data-types.md) | Массив ID файлов из `UF_BLOG_POST_FILE` ||
|| **next**
[`integer`](../data-types.md) | Значение для постраничной навигации (если есть) ||
|| **total**
[`integer`](../data-types.md) | Общее количество найденных элементов ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

#### Объект UF_* {#result-uf-object}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор пользовательского поля ||
|| **ENTITY_ID**
[`string`](../data-types.md) | Объект поля ||
|| **FIELD_NAME**
[`string`](../data-types.md) | Код пользовательского поля ||
|| **USER_TYPE_ID**
[`string`](../data-types.md) | Тип пользовательского поля ||
|| **XML_ID**
[`string`](../data-types.md) | Внешний код поля ||
|| **SORT**
[`integer`](../data-types.md) | Порядок сортировки поля ||
|| **MULTIPLE**
[`string`](../data-types.md) | Признак множественного поля ||
|| **MANDATORY**
[`string`](../data-types.md) | Признак обязательности ||
|| **SHOW_FILTER**
[`string`](../data-types.md) | Признак отображения поля в фильтре ||
|| **SHOW_IN_LIST**
[`string`](../data-types.md) | Признак отображения поля в списках ||
|| **EDIT_IN_LIST**
[`string`](../data-types.md) | Признак редактирования поля в списках ||
|| **IS_SEARCHABLE**
[`string`](../data-types.md) | Признак участия поля в поиске ||
|| **SETTINGS**
[`object`](../data-types.md) | Настройки поля в зависимости от типа ||
|| **EDIT_FORM_LABEL**
[`string`](../data-types.md) | Подпись поля в форме редактирования ||
|| **LIST_COLUMN_LABEL**
[`string`](../data-types.md) | Подпись поля в колонках списка ||
|| **LIST_FILTER_LABEL**
[`string`](../data-types.md) | Подпись поля в фильтре ||
|| **ERROR_MESSAGE**
[`string`](../data-types.md) | Текст ошибки поля ||
|| **HELP_MESSAGE**
[`string`](../data-types.md) | Подсказка для поля ||
|| **USER_TYPE**
[`object`](../data-types.md) | Описание [типа пользовательского поля](#result-uf-user-type) ||
|| **VALUE**
[`string`](../data-types.md) | Значение поля ||
|| **ENTITY_VALUE_ID**
[`integer`](../data-types.md) | Идентификатор сообщения, к которому относится значение поля ||
|| **VALUE_EXISTS**
[`boolean`](../data-types.md) | Признак наличия значения поля ||
|| **VALUE_RAW**
[`string`](../data-types.md) | Сырое значение поля ||
|| **CUSTOM_DATA**
[`object`](../data-types.md) | Дополнительные данные поля ||
|#

#### Объект USER_TYPE {#result-uf-user-type}

#|
|| **Название**
`тип` | **Описание** ||
|| **USER_TYPE_ID**
[`string`](../data-types.md) | Идентификатор типа пользовательского поля ||
|| **CLASS_NAME**
[`string`](../data-types.md) | PHP-класс обработчика типа поля ||
|| **EDIT_CALLBACK**
[`array`](../data-types.md) | Обработчик, который формирует интерфейс редактирования поля ||
|| **VIEW_CALLBACK**
[`array`](../data-types.md) | Обработчик, который формирует отображение поля в интерфейсе просмотра ||
|| **USE_FIELD_COMPONENT**
[`boolean`](../data-types.md) | Признак использования стандартного компонента поля ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Название типа поля ||
|| **BASE_TYPE**
[`string`](../data-types.md) | Базовый тип значения ||
|| **TAG**
[`array`](../data-types.md) | Дополнительные теги типа поля ||
|#

## Обработка ошибок

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-add.md)
- [{#T}](./log-blogpost-update.md)
- [{#T}](./log-blogpost-delete.md)
- [{#T}](./log-blogpost-share.md)
- [{#T}](./log-blogpost-getusers-important.md)
