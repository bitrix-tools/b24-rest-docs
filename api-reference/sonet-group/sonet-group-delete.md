# Удалить группу или проект sonet_group.delete

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: администратор или владелец группы или проекта

Метод `sonet_group.delete` удаляет рабочую группу или проект.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **GROUP_ID***
[`integer`](../data-types.md) | Идентификатор группы или проекта для удаления.

Идентификатор можно получить методом [sonet_group.get](./sonet-group-get.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"GROUP_ID":77,"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.delete',
            {
                GROUP_ID: 77
            }
        );
        
        const result = response.getData().result;
        console.log('Deleted group:', result);
        
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
                'sonet_group.delete',
                [
                    'GROUP_ID' => 77
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error deleting group: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.delete',
        {
            GROUP_ID: 77
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
        'sonet_group.delete',
        [
            'GROUP_ID' => 77
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
        "start": 1773931621,
        "finish": 1773931622.233361,
        "duration": 1.233361005783081,
        "processing": 1,
        "date_start": "2026-03-19T17:47:01+03:00",
        "date_finish": "2026-03-19T17:47:02+03:00",
        "operating_reset_at": 1773932221,
        "operating": 0.4352729320526123
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../data-types.md) | `true`, если группа или проект удалены ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "",
    "error_description": "User has no permissions to delete group"
}
```

{% include notitle [обработка ошибок](../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| — | `Wrong group ID` | Передан некорректный `GROUP_ID` ||
|| — | `Socialnetwork group not found` | Группа или проект не найдены ||
|| — | `User has no permissions to delete group` | Недостаточно прав для удаления группы ||
|| — | `Cannot delete group` | Не удалось удалить группу ||
|#

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-create.md)
- [{#T}](./sonet-group-update.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./sonet-group-get.md)
