# Получить список заданий бизнес-процесса bizproc.task.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- надо проверить типы полей
- нужен пример массива Fields в параметре PARAMETERS. ну или расписать, что там может быть
- совершенно непонятен смысл сноски про Fields под таблицей полей
- нет примеров curl, php
- нужна структура ответа
- нужны описания ошибок
- заполнить реальными данными блоки tutorials, смотри также и связанные методы. или удалить их

{% endnote %}

{% endif %}

> Scope: [`bizproc`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод возвращает список заданий бизнес-процессов. Метод доступен не только для администраторов. Обычный пользователь может запросить задания свои или своего подчиненного. Для запроса своих заданий не-администратору не указывать фильтр по `USER_ID`.

#|
|| **Параметр** | **Описание** ||
|| **SELECT** | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. Перечень доступных полей см. ниже ||
|| **FILTER** | Массив вида `{"фильтруемое_поле": "значение фильтра" [, ...]}`. Список фильтруемых полей такой же, как для параметра `SELECT`. Если в фильтре присутствует `USER_ID`, то проверяется субординация пользователей. Начальник может запросить список заданий своих подчиненных. Администратор может запрашивать все задания без ограничений. ||
|| **ORDER** | Массив для сортировки результата. Массив вида `{"поле_сортировки": 'направление сортировки' [, ...]}`. Список полей для сортировки такой же, как для параметра `SELECT`.`{'ID': 'desc'}` ||
|| **START** | Порядковый номер элемента списка, начиная с которого необходимо возвращать следующие элементы при вызове текущего метода. Подробности в статье [{#T}](../../how-to-call-rest-api/list-methods-pecularities.md) ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

## Поля, доступные в SELECT, FILTER и ORDER

#|
|| **Поле** | **Описание** ||
|| **ID**
[`integer`](../../data-types.md) | идентификатор задания ||
|| **WORKFLOW_ID**
[`integer`](../../data-types.md) | идентификатор бизнес-процесса ||
|| **DOCUMENT_NAME**
[`string`](../../data-types.md) | название документа ||
|| **DESCRIPTION**
[`string`](../../data-types.md) | описание задания ||
|| **NAME**
[`string`](../../data-types.md) | название задания ||
|| **MODIFIED**
[`datetime`](../../data-types.md) | дата изменения ||
|| **WORKFLOW_STARTED**
[`datatime`](../../data-types.md) | дата запуска бизнес-процесса ||
|| **WORKFLOW_STARTED_BY**
[`user`](../../data-types.md) | кем запущен бизнес-процесс ||
|| **OVERDUE_DATE**
[`datetime`](../../data-types.md) | крайний срок ||
|| **WORKFLOW_TEMPLATE_ID**
[`integer`](../../data-types.md) | идентификатор шаблона бизнес-процесса ||
|| **WORKFLOW_TEMPLATE_NAME**
[`string`](../../data-types.md) | название шаблона бизнес-процесса ||
|| **WORKFLOW_STATE**
[`string`](../../data-types.md) | статус бизнес-процесса ||
|| **STATUS**
[`integer`](../../data-types.md) | Статус задания. Возможные значения:

- `0` - выполняется;
- `1` - утверждено (ответ `Да`);
- `2` - отклонено (ответ `Нет`);
- `3` - выполнено (ответ `Ок`);
- `4` - таймаут (истек срок выполнения задания). ||

|| **USER_ID**
[`user`](../../data-types.md) | идентификатор пользователя ||
|| **USER_STATUS**
[`integer`](../../data-types.md) | Ответ пользователя. Возможные значения:

- `0` - ожидание ответа;
- `1` - да (утвердил);
- `2` - нет (отклонил);
- `3` - ок (выполнил). ||

|| **MODULE_ID**
[`string`](../../data-types.md) | идентификатор модуля (по документу) ||
|| **ENTITY**
[`string`](../../data-types.md) | идентификатор сущности (по документу) ||
|| **DOCUMENT_ID**
[`integer`](../../data-types.md) | идентификатор документа ||
|| **ACTIVITY**
[`string`](../../data-types.md) | Идентификатор типа задания. Возможные значения:

- `ApproveActivity` - Утверждение документа
- `ReviewActivity` - Ознакомление с документом
- `RequestInformationActivity` - Запрос дополнительной информации
- `RequestInformationOptionalActivity` - Запрос дополнительной информации (с отклонением) ||
|| **ACTIVITY_NAME**
[`string`](../../data-types.md) | идентификатор действия в шаблоне ||
|| **PARAMETERS**
[`array`](../../data-types.md) | параметры задания, массив. Ключи массива:

- CommentLabelMessage - Название поля "Комментарий";
- CommentRequired - Обязательность комментария. Допустимые значения:
  - 'N' (нет),
  - 'Y' (да),
  - 'YA' (да при утверждении),
  - 'YR' (да при отrлонении);
- `ShowComment` - Показывать комментарий. Допустимые значения:
  - 'N' (нет),
  - 'Y' (да),
- `TaskButtonMessage` - текст кнопки "Ознакомлен";
- `TaskButton1Message` - текст кнопки "Утвердить";
- `TaskButton2Message` - текст кнопки "Отклонить";
- `Fields` - массив с описанием полей ||
|#

{% include [Сноска о параметрах](../../../_includes/required.md) %}

{% note info "Изменения" %}

С версии **20.0.800** модуля Бизнес-процессы появилась возможность выполнять задания **Запрос доп.информации** через rest метод `bizrpoc.task.complete`. Для того, чтобы понять, какие поля нужно заполнить, в метод `bizproc.task.list` в PARAMETERS добавлено новое свойство `Fields`.

{% endnote %}

## Примеры

{% list tabs %}

- cURL

    ```http
    curl -X POST \
    -H "Content-Type: application/json" \
    -H "Accept: application/json" \
    -d '{ "title": "New Deal" }' \
    вот тут нужен нормальный вызов
    ```

- JS

    ```js
    BX24.callMethod(
        'bizproc.task.list',
        {
            select: [
                'ID',
                'WORKFLOW_ID',
                'DOCUMENT_NAME',
                'DESCRIPTION',
                'NAME',
                'MODIFIED',
                'WORKFLOW_STARTED',
                'WORKFLOW_STARTED_BY',
                'OVERDUE_DATE',
                'WORKFLOW_TEMPLATE_ID',
                'WORKFLOW_TEMPLATE_NAME',
                'WORKFLOW_STATE',
                'STATUS',
                'USER_ID',
                'USER_STATUS',
                'MODULE_ID',
                'ENTITY',
                'DOCUMENT_ID'
            ],
            order: {ID: 'DESC'},
            filter: {'USER_ID': 1}
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
    // нужен пример
    ```

{% endlist %}

{% include [Сноска о примерах](../../../_includes/examples.md) %}

## Ответ в случае успеха

> 200 OK

```json
{
    "result": 3465,
    "time": {
        "start": 1705764932.998683,
        "finish": 1705764937.173995,
        "duration": 4.1753120422363281,
        "processing": 3.3076529502868652,
        "date_start": "2024-01-20T18:35:32+03:00",
        "date_finish": "2024-01-20T18:35:37+03:00",
        "operating_reset_at": 1705765533,
        "operating": 3.3076241016387939
    }
}
```

### Возвращаемые данные

#|
|| **Значение** / **Тип** | **Описание** ||
|| **result**
`integer`| Identifier of a new deal ||
|| **time**
[`array`](../../data-types.md) | Информация о времени выполнения запроса ||
|| **start**
[`double`](../../data-types.md) | Timestamp момента инициализации запроса ||
|| **finish**
[`double`](../../data-types.md) | Timestamp момента завершения выполнения запроса ||
|| **duration**
[`double`](../../data-types.md) | Как долго в миллисекундах выполнялся запрос (finish - start) ||
|| **date_start**
[`string`](../../data-types.md) | Строковое представление даты и времени момента инициализации запроса ||
|| **date_finish**
[`double`](../../data-types.md) | Строковое представление даты и времени момента завершения запроса ||
|| **operating_reset_at**
[`timestamp`](../../data-types.md) | Timestamp момента, когда будет сброшен лимит на ресурсы REST API. Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|| **operating**
[`double`](../../data-types.md) | Через сколько миллисекунд будет сброшен лимит на ресурсы REST API? Читайте подробности в статье [лимит на операции](../../../limits.md) ||
|#

## Ответ в случае ошибки

> 40x, 50x Error

```json
{
    "error": "TITLE_EMPTY",
    "error_description": "The deal title is required"
}
```

### Возможные коды ошибок

#|
|| **Code** | **Description** ||
|| TITLE_EMPTY | The required field values are not set || 
|| WRONG_REQUEST | The parameters of the request were unable to interpret || 
|#

## Туториалы

- [How to add a deal specifying the details of an existing company or contact](/tutorials/adding-deal-with-existing-company-or-contact.html)
- [How to add a deal with goods, applying discounts and taxes](/tutorials/adding-deal-with-goods.html)
- [Obtaining a funnel of a given funnel with the semantics of each stage of the deal](/tutorials/getting-funnel-stages-of-deal.html)

## Смотри также

- [Using OAuth 2.0 tokens for executing REST API](/oauth.html)
- [Using Incoming webhooks for executing REST API](/local_webhooks.html)

{% note tip "Связанные методы и темы" %}

пусто пока

{% endnote %}
