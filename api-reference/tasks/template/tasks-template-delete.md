# Удалить шаблон задачи tasks.template.delete

> Scope: [`task`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом удаления шаблона

Метод `tasks.template.delete` удаляет шаблон задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](./tasks-template-add.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 123
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 123,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.delete',
            {
                templateId: 123
            }
        );

        const result = response.getData().result;
        console.log(result);
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
                'tasks.template.delete',
                [
                    'templateId' => 123,
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);

    } catch (Throwable $e) {
        echo 'Ошибка удаления шаблона: ' . $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.delete',
        {
            templateId: 123
        },
        function(result)
        {
            if (result.error())
            {
                console.error(result.error());
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
        'tasks.template.delete',
        [
            'templateId' => 123
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": false,
    "time": {
        "start": 1773321767,
        "finish": 1773321767.317624,
        "duration": 0.3176240921020508,
        "processing": 0,
        "date_start": "2026-03-12T16:22:47+03:00",
        "date_finish": "2026-03-12T16:22:47+03:00",
        "operating_reset_at": 1773322367,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | Всегда возвращает `false`, за исключением ошибок передачи параметров. При этом система удаляет шаблон.

Если шаблон не удален, нужно проверить права доступа пользователя
||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {templateId}"
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Invalid value {} to match with parameter {templateId}. Should be value of type int. | Передан пустым или с неверным типом параметр `templateId` ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-add.md)
- [{#T}](./tasks-template-update.md)
- [{#T}](./tasks-template-get.md)
- [{#T}](./tasks-template-fields.md)
