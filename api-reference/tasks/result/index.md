# О результатах выполнения задачи 

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- написать вводную статью: что такое результат выполнения, как отображается

{% endnote %}

{% endif %}

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% note info "tasks.task.result.*" %}

**Scope**: [`task`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

{% endnote %}

#|
|| **Метод** | **Описание** ||
|| [tasks.task.result.list](./tasks-task-result-list.md) | Просмотр списка результатов к задаче. ||
|| [tasks.task.result.addFromCommentt](./tasks-task-result-add-from-comment.md) | Создание результата задачи из комментария. ||
|| [tasks.task.result.deleteFromComment](./tasks-task-result-delete-from-comment.md) | Удаление результата задачи по комментарию, из которого он был создан. ||
|#