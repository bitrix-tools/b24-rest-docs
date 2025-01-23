# Изменить шаблон бизнес-процесса bizproc.workflow.template.update

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: администратор

Метод обновляет шаблон бизнес-процесса.

С его помощью можно обновить шаблоны, которые были созданы методом [bizproc.workflow.template.add](./bizproc-workflow-template-add.md). Эти шаблоны привязаны к приложению и могут быть обновлены только в контексте того же приложения, которым они были созданы.

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание**||
|| **ID***
[`string`](../../data-types.md) | Идентификатор шаблона, который нужно обновить ||
|| **FIELDS***
[`object`](../../data-types.md) | Объект с [полями](#parametr-fields) шаблона бизнес-процесса. 

Обновить можно поля: `NAME`, `DESCRIPTION`, `TEMPLATE_DATA`, `AUTO_EXECUTE`. При попытке обновить [другие поля](./bizproc-workflow-template-list.md#fields) шаблона, ошибок не возникнет, но эти поля обновлены не будут ||
|#

### Параметр FIELDS {#parametr-fields}

#|
|| **Название**
`тип` | **Описание**||
|| **NAME**
[`string`](../../data-types.md) | Название шаблона ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | Описание шаблона ||
|| **TEMPLATE_DATA**
[`file`](../../data-types.md) | Контент файла с шаблоном бизнес-процесса в формате `.bpt`.

Подробнее о способах передачи файлов — в статье [{#T}](../../bx24-js-sdk/how-to-call-rest-methods/files.md) ||
|| **AUTO_EXECUTE**
[`integer`](../../data-types.md) | Настройки автозапуска шаблона. Может иметь значение:

- `0` — без автозапуска
- `1` — запуск на создание
- `2` — запуск на изменение
- `3` — запуск на создание и изменение

По умолчанию — `0` ||
|#

## Примеры  кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":525,"FIELDS":{"NAME":"Вывести время","DESCRIPTION":"Шаблон показывает сообщение с локальным и серверным временем","AUTO_EXECUTE":0}}' \
    https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webbhook_here**/bizproc.workflow.template.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{"ID":525,"FIELDS":{"NAME":"Вывести время","DESCRIPTION":"Шаблон показывает сообщение с локальным и серверным временем","AUTO_EXECUTE":0},"auth":"**put_access_token_here**"}' \
    https://**put_your_bitrix24_address**/rest/bizproc.workflow.template.update
    ```

- JS

    ```js
    BX24.callMethod(
        'bizproc.workflow.template.update',
        {
            ID: 525,
            FIELDS: {
                NAME: 'Вывести время',
                DESCRIPTION: 'Шаблон показывает сообщение с локальным и серверным временем',
                AUTO_EXECUTE: 0,
            }
        },
        function(result)
        {
            if(result.error())
                alert("Error: " + result.error());
            else
                console.log(result.data());
        }
    );
    ```

- PHP

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'bizproc.workflow.template.update',
        [
            'ID' => 525,
            'FIELDS' => [
                'NAME' => 'Вывести время',
                'DESCRIPTION' => 'Шаблон показывает сообщение с локальным и серверным временем',
                'AUTO_EXECUTE' => 0
            ]
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
    "result": 525,
    "time": {
        "start": 1737534421.172673,
        "finish": 1737534421.209758,
        "duration": 0.037085056304931641,
        "processing": 0.010869026184082031,
        "date_start": "2025-01-22T11:27:01+03:00",
        "date_finish": "2025-01-22T11:27:01+03:00",
        "operating_reset_at": 1737535021,
        "operating": 0
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`object`](../../data-types.md) | Идентификатор обновленного шаблона бизнес-процесса ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**

```json
{
    "error": "ERROR_TEMPLATE_NOT_OWNER",
    "error_description": "You can update ONLY templates created by current application",
}
```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Сообщение об ошибке** | **Описание** ||
|| `ACCESS_DENIED` | Application context required | токен доступа не из приложения ||
|| `ACCESS_DENIED` | Access denied! | Метод запустил не администратор ||
|| `ERROR_TEMPLATE_VALIDATION_FAILURE` | No fields to update. | Не указаны поля для обновления ||
|| `ERROR_TEMPLATE_NOT_FOUND` | Workflow template not found. | Не найден шаблон с заданным `ID` ||
|| `ERROR_TEMPLATE_NOT_OWNER` | You can update ONLY templates created by current application | Данный шаблон нельзя редактировать через это приложение ||
|| `ERROR_TEMPLATE_VALIDATION_FAILURE` | Empty template name! | Указано пустое название шаблона ||
|| `ERROR_TEMPLATE_VALIDATION_FAILURE` | Incorrect field AUTO_EXECUTE! | Указан неверный код автозапуска ||
|| `ERROR_TEMPLATE_VALIDATION_FAILURE` | Incorrect field TEMPLATE_DATA! | Указаны неверные данные шаблона ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение 

- [{#T}](./index.md)
- [{#T}](./bizproc-workflow-template-add.md)
- [{#T}](./bizproc-workflow-template-list.md)
- [{#T}](./bizproc-workflow-template-delete.md)