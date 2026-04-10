# Добавить получателей в сообщение Ленты новостей log.blogpost.share

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`log`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или автор сообщения

Метод `log.blogpost.share` добавляет новых получателей к сообщению Ленты новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../data-types.md) | Идентификатор сообщения.

Получить идентификатор можно с помощью метода [log.blogpost.get](./log-blogpost-get.md) ||
|| **DEST***
[`array`](../data-types.md) | Список новых адресатов, которым будет выдано право на просмотр сообщения. 

Возможные значения:

{% include notitle [адресаты сообщения](./_includes/log-recepients.md) %}
||
|| **USER_ID**
[`integer`](../data-types.md) | Идентификатор пользователя, от имени которого редактируется сообщение. Доступно только администраторам.

Идентификатор можно получить с помощью метода [user.get](../user/user-get.md)

По умолчанию — текущий пользователь, инициировавший вызов метода 
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217,"DEST":["SG69","DR4"]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogpost.share
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":217,"DEST":["SG69","DR4"],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogpost.share
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'log.blogpost.share',
            {
                POST_ID: 217,
                DEST: ['SG69', 'DR4'],
            }
        );
        
        const result = response.getData().result;
        console.log(result);
        
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
                'log.blogpost.share',
                [
                    'POST_ID' => 217,
                    'DEST' => ['SG69', 'DR4']
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error sharing blog post: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'log.blogpost.share',
        {
            POST_ID: 217,
            DEST: ['SG69', 'DR4']
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
        'log.blogpost.share',
        [
            'POST_ID' => 217,
            'DEST' => ['SG69', 'DR4']
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
    "result": true,
    "time": {
        "start": 1773814878,
        "finish": 1773814878.602921,
        "duration": 0.6029210090637207,
        "processing": 0,
        "date_start": "2026-03-18T09:21:18+03:00",
        "date_finish": "2026-03-18T09:21:18+03:00",
        "operating_reset_at": 1773815478,
        "operating": 0.284437894821167
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если получатели добавлены ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "Wrong destinations"
}
```

{% include notitle [Обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong post ID` | Некорректный `POST_ID` ||
|| — | `Blog module not installed` | Модуль `blog` не установлен ||
|| — | `Wrong destinations` | Некорректный список адресатов `DEST` ||
|| — | `No read perms` | Недостаточно прав для чтения сообщения ||
|| — | Нет доступа к одному или нескольким адресатам сообщения | Нет прав на одного или нескольких получателей из `DEST` ||
|#

{% include [Системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogpost-add.md)
- [{#T}](./log-blogpost-update.md)
- [{#T}](./log-blogpost-get.md)
- [{#T}](./log-blogpost-delete.md)
- [{#T}](./log-blogpost-getusers-important.md)
