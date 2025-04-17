# Удалить действие bizproc.activity.delete

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод удаляет действие для бизнес-процессов, добавленное приложением.

Работает только в контексте [приложения](../../app-installation/index.md).

При удалении или обновлении приложения связанные с ним действия удаляются из списка действий в дизайнере бизнес-процессов. Если действие используется в бизнес-процессе, оно блокируется и может быть только удалено из схемы. При повторной установке приложения действие снова становится доступным.

## Параметры метода

#|
|| **Название**
`тип` | **Описание**||
|| **CODE***
[`string`](../../data-types.md) | Символьный идентификатор действия приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"code":"md5_action","auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.activity.delete
    ```

- JS

    ```js
    BX24.callMethod(
        'bizproc.activity.delete',
        {
            code: 'md5_action'
        },
        function(result) {
            if(result.error())
                alert('Error: ' + result.error());
            else
                alert("Success: " + result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.activity.delete',
        [
            'code' => 'md5_action'
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
        "start": 1738150149.8462,
        "finish": 1738150149.8894911,
        "duration": 0.043291091918945312,
        "processing": 0.0053689479827880859,
        "date_start": "2025-01-29T14:29:09+03:00",
        "date_finish": "2025-01-29T14:29:09+03:00",
        "operating_reset_at": 1738150749,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Возвращает `true`, если действие успешно удалено ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_ACTIVITY_NOT_FOUND",
    "error_description": "Activity or Robot not found!"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | Необходим контекст приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод выполнил не администратор ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Empty activity code! | Не указан код действия ||
|| `ERROR_ACTIVITY_VALIDATION_FAILURE` | Wrong activity code! | Некорректный код действия ||
|| `ERROR_ACTIVITY_NOT_FOUND` | Activity or Robot not found! | Действие или робот не найдены ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-activity-add.md)
- [{#T}](./bizproc-activity-update.md)
- [{#T}](./bizproc-activity-list.md)
- [{#T}](./bizproc-activity-log.md)