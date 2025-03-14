# Получить задачу по идентификатору tasks.task.get

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры (должно быть три примера - **curl, js, php)
- отсутствует ответ в случае ошибки
- отсутствует ответ в случае успеха
 
{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Scope: [`task`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `tasks.task.get` возвращает информацию о конкретной задаче.

{% note warning %}

Необходимо указать поля в `select`, т.к. поля по умолчанию могут быть изменены в будущем.

{% endnote %}

#|
|| **Параметр** / **Тип** | **Описание** ||
|| **taskId**
[`unknown`](../data-types.md) | Идентификатор задачи. ||
|| **select**
[`unknown`](../data-types.md) | Массив полей записей, которые будут возвращены методом. Можно указать только те поля, которые необходимы. 

Поле может принимать значения: 
- **ID** — идентификатор задачи; 
- **PARENT_ID** — идентификатор родительской задачи; 
- **TITLE** — название задачи; 
- **DESCRIPTION** — описание; 
- **MARK** — оценка; 
- **PRIORITY** — приоритет:
    - **0** — низкий;
    - **1** — средний;
    - **2** — высокий;
- **STATUS** — статус; 
- **MULTITASK** — множественная задача; 
- **NOT_VIEWED** — непросмотренная задача; 
- **REPLICATE** — повторяемая задача; 
- **GROUP_ID** — рабочая группа; 
- **STAGE_ID** — стадия; 
- **CREATED_BY** — постановщик; 
- **CREATED_DATE** — дата создания; 
- **RESPONSIBLE_ID** — исполнитель; 
- **ACCOMPLICE** — идентификатор соисполнителя; 
- **AUDITOR** — идентификатор наблюдателя; 
- **CHANGED_BY** — кем изменена задача; 
- **CHANGED_DATE** — дата изменения; 
- **STATUS_CHANGED_DATE** — кто изменил статус; 
- **CLOSED_BY** — кто закрыл задачу; 
- **CLOSED_DATE** — дата закрытия задачи; 
- **DATE_START** — дата начала; 
- **DEADLINE** — крайний срок; 
- **START_DATE_PLAN** — плановое начало; 
- **END_DATE_PLAN** —  плановое завершение; 
- **GUID** — GUID (статистически уникальный 128-битный идентификатор); 
- **XML_ID** — внешний код; 
- **COMMENTS_COUNT** — количество комментариев; 
- **NEW_COMMENTS_COUNT** — количество новых комментариев; 
- **TASK_CONTROL** — принять в работу; 
- **ADD_IN_REPORT** — добавить в отчет; 
- **FORKED_BY_TEMPLATE_ID** — создано автоматически из шаблона; 
- **TIME_ESTIMATE** — время, выделенное на задачу; 
- **TIME_SPENT_IN_LOGS** — затраченное время из истории изменений; 
- **MATCH_WORK_TIME** — пропустить выходные дни; 
- **FORUM_TOPIC_ID** — идентификатор темы форума; 
- **FORUM_ID** — идентификатор форума; 
- **SITE_ID** — идентификатор сайта; 
- **SUBORDINATE** — задача подчиненного; 
- **FAVORITE** — Избранное; 
- **VIEWED_DATE** — дата последнего просмотра; 
- **SORTING** — индекс сортировки; 
- **DURATION_PLAN** — затрачено (план); 
- **DURATION_FACT** — затрачено (фактически); 
- **DURATION_TYPE** — тип продолжительности:
    - **0** — секунды
    - **1** — минуты
    - **2** — часы
    - **3** — дни
    - **4** — недели
    - **5** — месяцы
    - **6** — года
- **UF_CRM_TASK** — привязка к элементам CRM.

По умолчанию будут возвращены все невычисляемые поля основной таблицы запроса.

Для получения пользовательских полей и поля привязки к CRM сущностям (`UF_CRM_TASK`), их нужно будет напрямую указать в `SELECT`. Список полей можно уточнить, отправив запрос [tasks.task.getFields](./tasks-task-get-fields.md). ||
|#

## Примеры

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.get',
        {taskId:1, select:['ID','TITLE']},
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

Для получения тэгов конкретной задачи:

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.get',
        {taskId:1367, select:['TAGS']},
        function(res){console.log(res.answer.result);}
    );
    ```

{% endlist %}

Синтаксис для выборки всех полей:

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.get',
        {taskId:1367, select:['*']},
        function(res){console.log(res.answer.result);}
    )
    ```

{% endlist %}

## Продолжить изучение

- [{#T}](../../tutorials/tasks/how-to-create-task-with-file.md)
- [{#T}](../../tutorials/tasks/how-to-connect-task-to-spa.md)

{% include [Сноска о примерах](../../_includes/examples.md) %}