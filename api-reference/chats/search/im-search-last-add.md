# Добавить запись в историю поиска im.search.last.add

> Scope: [`im`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `im.search.last.add` добавляет диалог в историю последнего поиска.

Метод разработан для предыдущей версии чата. В текущей версии чата М1 он работает, но результаты не отображаются в интерфейсе.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **DIALOG_ID***
[`string`](../../data-types.md) | Идентификатор объекта для сообщений: пользователь или чат.

Поддерживаемые форматы:
- `USER_ID` — идентификатор пользователя, который можно получить через [user.get](../../user/user-get.md) или [user.search](../../user/user-search.md)
- `chatXXX`, где `XXX` — идентификатор чата, который можно получить через [im.recent.get](../im-recent-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat17"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/im.search.last.add
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"DIALOG_ID":"chat17","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/im.search.last.add
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('im.search.last.add', {
        DIALOG_ID: 'chat17',
      });

      const { result } = response.getData();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service->core->call(
            'im.search.last.add',
            [
                'DIALOG_ID' => 'chat17',
            ]
        );

        $result = $response->getResponseData()->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            var_dump($result->data());
        }
    } catch (Throwable $exception) {
        echo $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'im.search.last.add',
        {
            DIALOG_ID: 'chat17',
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'im.search.last.add',
        [
            'DIALOG_ID' => 'chat17',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        var_dump($result['result']);
    }
    ```
{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
    "time": {
        "start": 1772449081,
        "finish": 1772449081.887056,
        "duration": 0.8870561122894287,
        "processing": 0,
        "date_start": "2026-03-02T13:58:01+03:00",
        "date_finish": "2026-03-02T13:58:01+03:00",
        "operating_reset_at": 1772449681,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если запись добавлена или уже существует, иначе `false` ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "DIALOG_ID_EMPTY",
    "error_description": "Dialog ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `DIALOG_ID_EMPTY` | Dialog ID can't be empty | Передан некорректный `DIALOG_ID` ||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./im-search-chat-list.md)
- [{#T}](./im-search-department-list.md)
- [{#T}](./im-search-user-list.md)
- [{#T}](./im-search-last-get.md)
- [{#T}](./im-search-last-delete.md)
