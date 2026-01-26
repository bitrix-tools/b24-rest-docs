# Получить доступные пользователю сообщения Ленты новостей log.blogpost.get

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствует ответ в случае ошибки

{% endnote %}

{% endif %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Возвращает список сообщений Ленты новостей, доступных [текущему пользователю](../../settings/how-to-call-rest-api/authorization.md).

#|
|| **Параметр** | **Описание** ||
|| **POST_ID** | Фильтрация по числовому идентификатору сообщения. ||
|| **LOG_RIGHTS** | Фильтрация по получателям, у которых есть право на просмотр сообщений. Значением фильтра может быть как строка (конкретное значение прав), так и массив. Возможные значения прав:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}

Значение по умолчанию - `['UA']` ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}

## Примеры

{% list tabs %}

- JS


    ```js
    try
    {
    	const response = await $b24.callMethod(
    		'log.blogpost.get',
    		{ POST_ID: 755 }
    	);
    	
    	const result = response.getData().result;
    	console.log(result);
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
                    'POST_ID' => 755,
                ]
            );
    
        $result = $response
            ->getResponseData()
            ->getResult();
    
        echo 'Success: ' . print_r($result, true);
    
    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error getting blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogpost.get', { POST_ID: 755 });
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Запрос

{% list tabs %}

- URL-запрос

    ```http
    https://my.bitrix24.ru/rest/log.blogpost.get.xml?auth=xxxxxxx
    ```

{% endlist %}

## Ответ:

```json
{"result":[{"ID":"4","BLOG_ID":"1","PUBLISH_STATUS":"P","TITLE":"sdfsdfsd","AUTHOR_ID":"1","ENABLE_COMMENTS":"Y","NUM_COMMENTS":"0","CODE":null,"MICRO":"Y","DETAIL_TEXT":"sdfsdfsd","DATE_PUBLISH":"21.10.2015 17:00:50","CATEGORY_ID":"","HAS_SOCNET_ALL":"Y","HAS_TAGS":"N","HAS_IMAGES":"N","HAS_PROPS":"N","HAS_COMMENT_IMAGES":null},{"ID":"3","BLOG_ID":"1","PUBLISH_STATUS":"P","TITLE":"test1","AUTHOR_ID":"1","ENABLE_COMMENTS":"Y","NUM_COMMENTS":"0","CODE":null,"MICRO":"Y","DETAIL_TEXT":"test1","DATE_PUBLISH":"31.07.2015 17:03:54","CATEGORY_ID":"","HAS_SOCNET_ALL":"Y","HAS_TAGS":"N","HAS_IMAGES":"N","HAS_PROPS":"Y","HAS_COMMENT_IMAGES":null,"UF_BLOG_POST_DOC":{"ID":"1","ENTITY_ID":"BLOG_POST","FIELD_NAME":"UF_BLOG_POST_DOC","USER_TYPE_ID":"file","XML_ID":"UF_BLOG_POST_DOC","SORT":"100","MULTIPLE":"Y","MANDATORY":"N","SHOW_FILTER":"N","SHOW_IN_LIST":"N","EDIT_IN_LIST":"Y","IS_SEARCHABLE":"Y","SETTINGS":{"SIZE":20,"LIST_WIDTH":0,"LIST_HEIGHT":0,"MAX_SHOW_SIZE":0,"MAX_ALLOWED_SIZE":0,"EXTENSIONS":[]},"EDIT_FORM_LABEL":null,"LIST_COLUMN_LABEL":null,"LIST_FILTER_LABEL":null,"ERROR_MESSAGE":null,"HELP_MESSAGE":null,"USER_TYPE":{"USER_TYPE_ID":"file","CLASS_NAME":"CUserTypeFile","DESCRIPTION":"Файл","BASE_TYPE":"file"},"VALUE":false,"ENTITY_VALUE_ID":3},"UF_GRATITUDE":{"ID":"3","ENTITY_ID":"BLOG_POST","FIELD_NAME":"UF_GRATITUDE","USER_TYPE_ID":"integer","XML_ID":"UF_GRATITUDE","SORT":"100","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"N","SHOW_IN_LIST":"N","EDIT_IN_LIST":"Y","IS_SEARCHABLE":"N","SETTINGS":{"SIZE":20,"MIN_VALUE":0,"MAX_VALUE":0,"DEFAULT_VALUE":""},"EDIT_FORM_LABEL":null,"LIST_COLUMN_LABEL":null,"LIST_FILTER_LABEL":null,"ERROR_MESSAGE":null,"HELP_MESSAGE":null,"USER_TYPE":{"USER_TYPE_ID":"integer","CLASS_NAME":"CUserTypeInteger","DESCRIPTION":"Целое число","BASE_TYPE":"int"},"VALUE":null,"ENTITY_VALUE_ID":3},"UF_BLOG_POST_FILE":{"ID":"8","ENTITY_ID":"BLOG_POST","FIELD_NAME":"UF_BLOG_POST_FILE","USER_TYPE_ID":"disk_file","XML_ID":"UF_BLOG_POST_FILE","SORT":"100","MULTIPLE":"Y","MANDATORY":"N","SHOW_FILTER":"N","SHOW_IN_LIST":"N","EDIT_IN_LIST":"Y","IS_SEARCHABLE":"Y","SETTINGS":"IBLOCK_ID":0,"SECTION_ID":0,"UF_TO_SAVE_ALLOW_EDIT":null},"EDIT_FORM_LABEL":null,"LIST_COLUMN_LABEL":null,"LIST_FILTER_LABEL":null,"ERROR_MESSAGE":null,"HELP_MESSAGE":null,"USER_TYPE":{"USER_TYPE_ID":"disk_file","CLASS_NAME":"Bitrix\\Disk\\Uf\\FileUserType","DESCRIPTION":"Файл (Диск)","BASE_TYPE":"int","TAG":["DISK FILE ID","DOCUMENT ID"]},"VALUE":false,"ENTITY_VALUE_ID":3},"UF_BLOG_POST_IMPRTNT":"ID":"18","ENTITY_ID":"BLOG_POST","FIELD_NAME":"UF_BLOG_POST_IMPRTNT","USER_TYPE_ID":"integer","XML_ID":"UF_BLOG_POST_IMPRTNT","SORT":"100","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"N","SHOW_IN_LIST":"Y","EDIT_IN_LIST":"Y","IS_SEARCHABLE":"N","SETTINGS":{"SIZE":20,"MIN_VALUE":0,"MAX_VALUE":0,"DEFAULT_VALUE":""},"EDIT_FORM_LABEL":"Важное сообщение","LIST_COLUMN_LABEL":"Важное","LIST_FILTER_LABEL":"Важное","ERROR_MESSAGE":null,"HELP_MESSAGE":null,"USER_TYPE":{"USER_TYPE_ID":"integer","CLASS_NAME":"CUserTypeInteger","DESCRIPTION":"Целое число","BASE_TYPE":"int"},"VALUE":"1","ENTITY_VALUE_ID":3},"UF_BLOG_POST_VOTE":"ID":"35","ENTITY_ID":"BLOG_POST","FIELD_NAME":"UF_BLOG_POST_VOTE","USER_TYPE_ID":"vote","XML_ID":"UF_BLOG_POST_VOTE","SORT":"100","MULTIPLE":"N","MANDATORY":"N","SHOW_FILTER":"N","SHOW_IN_LIST":"Y","EDIT_IN_LIST":"Y","IS_SEARCHABLE":"N","SETTINGS":{"CHANNEL_ID":1,"UNIQUE":13,"UNIQUE_IP_DELAY":{"DELAY":"10","DELAY_TYPE":"D"},"NOTIFY":"I"},"EDIT_FORM_LABEL":null,"LIST_COLUMN_LABEL":null,"LIST_FILTER_LABEL":null,"ERROR_MESSAGE":null,"HELP_MESSAGE":null,"USER_TYPE
```
