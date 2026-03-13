# Удалить пункт чек-листа шаблона задачи tasks.template.checklist.delete

> Scope: [`task`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правами на изменение шаблона задачи

Метод `tasks.template.checklist.delete` удаляет пункт чек-листа шаблона задачи.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **templateId***
[`integer`](../../../data-types.md) | Идентификатор шаблона задачи.

Идентификатор шаблона задачи можно получить при [создании нового шаблона](../tasks-template-add.md) ||
|| **checkListItemId***
[`integer`](../../../data-types.md) | Идентификатор пункта чек-листа.

Идентификатор пункта чек-листа шаблона можно получить при [создании нового пункта](./tasks-template-checklist-add.md) или методом [получения списка пунктов](./tasks-template-checklist-list.md) ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "checkListItemId": 29
    }' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/tasks.template.checklist.delete
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{
      "templateId": 139,
      "checkListItemId": 29,
      "auth": "**put_access_token_here**"
    }' \
    https://**put_your_bitrix24_address**/rest/tasks.template.checklist.delete
    ```

- JS

    ```js
    try
    {
        const response = await $b24.callMethod(
            'tasks.template.checklist.delete',
            {
                templateId: 139,
                checkListItemId: 29
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
                'tasks.template.checklist.delete',
                [
                    'templateId' => 139,
                    'checkListItemId' => 29
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        print_r($result);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'tasks.template.checklist.delete',
        {
            templateId: 139,
            checkListItemId: 29
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
        'tasks.template.checklist.delete',
        [
            'templateId' => 139,
            'checkListItemId' => 29
        ]
    );

    print_r($result);
    ```

{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": true,
    "time": {
        "start": 1773233308,
        "finish": 1773233308.985028,
        "duration": 0.9850280284881592,
        "processing": 0,
        "date_start": "2026-03-11T15:48:28+03:00",
        "date_finish": "2026-03-11T15:48:28+03:00",
        "operating_reset_at": 1773233908,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../../data-types.md) | Возвращает `true` при успешном удалении пункта чек-листа ||
|| **time**
[`time`](../../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "100",
    "error_description": "Could not find value for parameter {templateId}"
}
```

{% include notitle [обработка ошибок](../../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `400` | `100` | Could not find value for parameter {templateId} | Не передан обязательный параметр `templateId` ||
|| `400` | `100` | Bitrix\Tasks\CheckList\Internals\CheckList All parameters in the constructor must have real class type | Не передан обязательный параметр `checkListItemId` ||
|| `400` | `0` | Bitrix\Tasks\CheckList\CheckListFacade::onAfterUpdate(): Argument #1 ($taskId) must be of type int, string given, called in /var/www/html/bitrix/modules/tasks/lib/checklist/checklistfacade.php on line 313 | Указан пустой или с неверным типом `templateId` ||
|| `400` | `0` | Указано некорректное значение [] для поля [ENTITY_ID] в элементе [, ] | Указан несуществующий, пустой или с неверным типом `checkListItemId` ||
|| `400` | `0` | Удаление элемента: действие недоступно | У пользователя нет прав доступа на изменение шаблона задачи ||
|#

{% include [системные ошибки](../../../../_includes/system-errors.md) %}

## Продолжить изучение

- [{#T}](./tasks-template-checklist-add.md)
- [{#T}](./tasks-template-checklist-update.md)
- [{#T}](./tasks-template-checklist-get.md)
- [{#T}](./tasks-template-checklist-list.md)
- [{#T}](./tasks-template-checklist-complete.md)
