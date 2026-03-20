# Получить список групп текущего пользователя sonet_group.user.groups

> Scope: [`sonet`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `sonet_group.user.groups` возвращает группы и проекты, в которых состоит текущий пользователь.

## Параметры метода

Без параметров.

## Примеры кода

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/sonet_group.user.groups
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/sonet_group.user.groups
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'sonet_group.user.groups',
            {}
        );
        
        const result = response.getData().result;
        console.log('Retrieved user groups:', result);
        
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
                'sonet_group.user.groups',
                []
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        echo 'Success: ' . print_r($result, true);
        processData($result);

    } catch (Throwable $e) {
        error_log($e->getMessage());
        echo 'Error retrieving user groups: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod('sonet_group.user.groups',
        {}, 
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
        'sonet_group.user.groups',
        []
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
    "result": [
        {
        "GROUP_ID": "77",
        "GROUP_NAME": "Новый заголовок проекта",
        "ROLE": "K",
        "GROUP_IMAGE_ID": null,
        "GROUP_IMAGE": ""
        },
        {
        "GROUP_ID": "79",
        "GROUP_NAME": "Скрам-проект",
        "ROLE": "A",
        "GROUP_IMAGE_ID": null,
        "GROUP_IMAGE": ""
        }
    ],
    "time": {
        "start": 1773927027,
        "finish": 1773927028.025164,
        "duration": 1.0251638889312744,
        "processing": 1,
        "date_start": "2026-03-19T16:30:27+03:00",
        "date_finish": "2026-03-19T16:30:28+03:00",
        "operating_reset_at": 1773927627,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`array`](../data-types.md) | Массив групп текущего пользователя.

Пустой массив означает, что пользователь не состоит ни в одной группе или проекте ||
|| **GROUP_ID**
[`integer`](../data-types.md) | Идентификатор группы ||
|| **GROUP_NAME**
[`string`](../data-types.md) | Название группы ||
|| **ROLE**
[`string`](../data-types.md) | Роль текущего пользователя.

Возможные значения:
- `A` — владелец
- `E` — модератор
- `K` — участник ||
|| **GROUP_IMAGE_ID**
[`string`](../data-types.md) | Идентификатор аватара группы ||
|| **GROUP_IMAGE**
[`string`](../data-types.md) | URL аватара группы ||
|| **IS_EXTRANET**
[`string`](../data-types.md) | Признак экстранет-группы.

Поле возвращается только для экстранет-групп:
- `Y` — экстранет-группа ||
|| **time**
[`time`](../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

{% include [системные ошибки](../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./sonet-group-get.md)
- [{#T}](./socialnetwork-api-workgroup-list.md)
- [{#T}](./socialnetwork-api-workgroup-get.md)
- [{#T}](./members/index.md)
