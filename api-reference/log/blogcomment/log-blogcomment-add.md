# Добавить комментарий к сообщению log.blogcomment.add

> Scope: [`log`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `log.blogcomment.add` добавляет комментарий к сообщению Ленты новостей.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **POST_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения Ленты новостей.

Идентификатор сообщения можно получить с помощью метода [log.blogpost.get](../log-blogpost-get.md) ||
|| **TEXT***
[`string`](../../data-types.md) | Текст комментария. Учитывается при проверке на дублирование и сохраняется в поле `POST_TEXT` ||
|| **FILES**
[`array`](../../data-types.md) | Массив файлов, который описан по правилам [работы с файлами](../../files/how-to-upload-files.md). Файлы будут загружены на Диск пользователя и привязаны к комментарию ||
|| **USER_ID**
[`integer`](../../data-types.md) | Идентификатор пользователя, от имени которого публикуется комментарий. Доступно только администраторам. По умолчанию используется текущий пользователь, инициировавший вызов метода.

Идентификатор пользователя можно получить с помощью метода [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":403,"TEXT":"Комментарий к посту","USER_ID":27,"FILES":[["example.txt","SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg=="]]}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/log.blogcomment.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"POST_ID":403,"TEXT":"Комментарий к посту","USER_ID":27,"FILES":[["example.txt","SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg=="]],"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/log.blogcomment.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod(
        'log.blogcomment.add',
        {
          POST_ID: 403,
          TEXT: 'Комментарий к посту',
          USER_ID: 27,
          FILES: [
            [
              'example.txt',
              'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
            ],
          ],
        }
      );

      const { result } = response.getData();
      console.log('Created comment:', result);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'log.blogcomment.add',
                [
                    'POST_ID' => 403,
                    'TEXT'    => 'Комментарий к посту',
                    'USER_ID' => 27,
                    'FILES'   => [
                        [
                            'example.txt',
                            'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
                        ],
                    ],
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Created comment ID: ' . $result->data();
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error adding blog comment: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('log.blogcomment.add', {
        POST_ID: 403,
        TEXT: 'Комментарий к посту',
        USER_ID: 27,
        FILES: [
            [
                'example.txt',
                'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
            ],
        ]
    }, 
    function(result) {
            if (result.error()) {
                console.error(result.error());
            } else {
                console.info(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'log.blogcomment.add',
        [
            'POST_ID' => 403,
            'TEXT'    => 'Комментарий к посту',
            'USER_ID' => 27,
            'FILES'   => [
                [
                    'example.txt',
                    'SXQncyBhIHRlc3QgZmlsZSBmb3IgQml0cml4IFJlc3QgQVBJLg==',
                ],
            ],
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Created comment ID: ' . $result['result'];
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": 312,
    "time": {
        "start": 1728904800.123456,
        "finish": 1728904800.398112,
        "duration": 0.2746560573577881,
        "processing": 0.10234594345092773,
        "date_start": "2025-10-14T12:40:00+03:00",
        "date_finish": "2025-10-14T12:40:00+03:00",
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`integer`](../../data-types.md) | Идентификатор созданного комментария ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "No blog module installed"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные ошибки

#|
|| **Код** | **Описание** | **Значение** ||
|| `-` | `No blog module installed` | Модуль `blog` не установлен ||
|| `-` | `No post found` | Сообщение Ленты новостей с переданным `POST_ID` не найдено или недоступно ||
|| `-` | `No blog found` | Не удалось получить блог, к которому относится сообщение ||
|| `-` | `Duplicate comment` | Аналогичный комментарий уже был опубликован, проверяется только для записей без вложений ||
|| `-` | `No permissions` | У пользователя нет прав на добавление комментария к сообщению ||
|| `-` | `Blog comment hasn't been added` | Внутренняя ошибка при сохранении комментария ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./log-blogcomment-delete.md)
- [{#T}](./log-blogcomment-user-get.md)