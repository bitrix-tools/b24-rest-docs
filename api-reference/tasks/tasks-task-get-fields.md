# Получить список полей tasks.task.getFields

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не хватает примеров (должно быть три примера - curl, js, php)
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

Метод `tasks.task.getFields` возвращает все доступные поля.

Без параметров.

## Пример

{% list tabs %}

- JS

    ```js
    BX24.callMethod(
        'tasks.task.getFields',
        {},
        function(result)
        {
            console.info(result.data());
            console.log(result);
        }
    );
    ```

{% endlist %}

{% include [Сноска о примерах](../../_includes/examples.md) %}

## Список полей

#|
|| **Поле** / **Тип** | **Описание** | Значение ||
|| **ID**
[`integer`](../data-types.md) | Идентификатор задачи | ||
|| **PARENT_ID**
[`integer`](../data-types.md) | ID родительской задачи | По умолчанию - 0 ||
|| **TITLE^*^**
[`string`](../data-types.md) | Название. Длина поля TITLE не должна превышать 460 символов. В противном случае название задачи без предупреждения будет обрезано с конца | ||
|| **DESCRIPTION**
[`string`](../data-types.md) | Описание | ||
|| **MARK**
[`enum`](../data-types.md) | Оценка | N - Отрицательная,
P - Положительная.
По умолчанию - null ||
|| **PRIORITY**
[`enum`](../data-types.md) | Приоритет | 2 - Высокий,
1 - Средний,
0 - Низкий.
По умолчанию - 1 ||
|| **STATUS**
[`enum`](../data-types.md) | Статус | 2 - Ждет выполнения,
3 - Выполняется,
4 - Ожидает контроля,
5 - Завершена,
6 - Отложена.
По умолчанию - 2 ||
|| **MULTITASK**
[`enum`](../data-types.md) | Множественная задача | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **NOT_VIEWED**
[`enum`](../data-types.md) | NOT_VIEWED | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **REPLICATE**
[`enum`](../data-types.md) | Повторяемая задача | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **GROUP_ID**
[`integer`](../data-types.md) | Группа или проект | По умолчанию - 0 ||
|| **FLOW_ID**
[`integer`](../data-types.md) | Поток | null ||
|| **STAGE_ID**
[`integer`](../data-types.md) | Стадия | По умолчанию - 0 ||
|| **CREATED_BY^*^**
[`integer`](../data-types.md) | Постановщик | ||
|| **CREATED_DATE**
[`datetime`](../data-types.md) | Дата создания | ||
|| **RESPONSIBLE_ID^*^**
[`integer`](../data-types.md) | Исполнитель | ||
|| **ACCOMPLICES**
[`array`](../data-types.md) | Соисполнители | ||
|| **AUDITORS**
[`array`](../data-types.md) | Наблюдатели | ||
|| **CHANGED_BY**
[`integer`](../data-types.md) | Изменил | ||
|| **CHANGED_DATE**
[`integer`](../data-types.md) | Дата изменения | ||
|| **STATUS_CHANGED_BY**
[`integer`](../data-types.md) | Изменил статус | ||
|| **CLOSED_BY**
[`integer`](../data-types.md) | Закрыл задачу | ||
|| **CLOSED_DATE**
[`datetime`](../data-types.md) | Дата закрытия | ||
|| **DATE_START**
[`datetime`](../data-types.md) | Дата начала | null ||
|| **DEADLINE**
[`datetime`](../data-types.md) | Крайний срок | null ||
|| **START_DATE_PLAN**
[`datetime`](../data-types.md) | Плановое начало | null ||
|| **END_DATE_PLAN**
[`datetime`](../data-types.md) | Плановое завершение | null ||
|| **GUID**
[`string`](../data-types.md) | GUID | null ||
|| **XML_ID**
[`string`](../data-types.md) | XML_ID | null ||
|| **COMMENTS_COUNT**
[`integer`](../data-types.md) | Кол-во комментариев | ||
|| **NEW_COMMENTS_COUNT**
[`integer`](../data-types.md) | Кол-во новых комментариев | ||
|| **ALLOW_CHANGE_DEADLINE**
[`enum`](../data-types.md) | Разрешить менять сроки | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **ALLOW_TIME_TRACKING**
[`enum`](../data-types.md) | Разрешить учет времени для задачи | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **TASK_CONTROL**
[`enum`](../data-types.md) | Принять работу | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **ADD_IN_REPORT**
[`enum`](../data-types.md) | Добавить в отчёт | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **FORKED_BY_TEMPLATE_ID**
[`enum`](../data-types.md) | Создано из шаблона | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **TIME_ESTIMATE**
[`integer`](../data-types.md) | Время, выделенное на задачу. | ||
|| **TIME_SPENT_IN_LOGS**
[`integer`](../data-types.md) | Затраченное время из истории изменений | ||
|| **MATCH_WORK_TIME**
[`integer`](../data-types.md) | Пропустить выходные дни | ||
|| **FORUM_TOPIC_ID**
[`integer`](../data-types.md) | Идентификатор темы форума | ||
|| **FORUM_ID**
[`integer`](../data-types.md) | Идентификатор форума | ||
|| **SITE_ID**
[`string`](../data-types.md) | Идентификатор сайта | ||
|| **SUBORDINATE**
[`enum`](../data-types.md) | Задача подчиненного | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **FAVORITE**
[`enum`](../data-types.md) | Добавлен в Избранное | ||
|| **EXCHANGE_MODIFIED**
[`datetime`](../data-types.md) | EXCHANGE_MODIFIED | null ||
|| **EXCHANGE_ID**
[`integer`](../data-types.md) | EXCHANGE_ID | null ||
|| **OUTLOOK_VERSION**
[`integer`](../data-types.md) | OUTLOOK_VERSION | null ||
|| **VIEWED_DATE**
[`datetime`](../data-types.md) | Дата последнего просмотра | ||
|| **SORTING**
[`double`](../data-types.md) | Индекс сортировки | ||
|| **DURATION_PLAN**
[`integer`](../data-types.md) | Затрачено (план) | ||
|| **DURATION_FACT**
[`integer`](../data-types.md) | Затрачено (фактически) | ||
|| **CHECKLIST**
[`array`](../data-types.md) | Чеклист | ||
|| **DURATION_TYPE**
[`enum`](../data-types.md) | DURATION_TYPE | \[0\] => secs
\[1\] => mins
\[2\] => hours
\[3\] => days
\[4\] => weeks
\[5\] => monts
\[6\] => years.
По умолчанию - 3 ||
|| **UF_CRM_TASK**
[`crm`](../data-types.md) | Привязка к элементам CRM. Значение состоит из 
[Краткого символьного кода типа](../crm/data-types.md#object_type) и ID элемента | L_XX -  лид,
C_XX - контакт,
D_XX - сделка, 
TXX_XX - смарт-процесс ||
|| **UF_TASK_WEBDAV_FILES**
[`disk_file`](../data-types.md) | Файл (Диск) | ||
|| **UF_MAIL_MESSAGE**
[`mail_message`](../data-types.md) | Письмо (email) | ||
|| **IS_MUTED**
[`enum`](../data-types.md) | Уведомления | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **IS_PINNED**
[`enum`](../data-types.md) | Закреплён | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **IS_PINNED_IN_GROUP**
[`enum`](../data-types.md) | Закреплён в группе | Y - Да,
N - Нет.
По умолчанию - Нет. ||
|| **SERVICE_COMMENTS_COUNT**
[`integer`](../data-types.md) | SERVICE_COMMENTS_COUNT | ||
|#

{% include [Сноска о параметрах](../../_includes/required.md) %}