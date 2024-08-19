# Обзор методов

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нет контента
- добавить инфу из комментариев задачи? https://bitrix24.team/company/personal/user/35/tasks/task/view/493498/

{% endnote %}

{% endif %}

> Название метода:
>
> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь с правом «Просмотр каталога товаров»

Методы работы с Торговыми платформами:

#|
|| **Метод** | **Описание** ||
|| [sale.tradePlatform.getFields](./sale-trade-platform-get-fields.md) | Возвращает поля торговых платформ статусов ||
|| [sale.tradePlatform.list](./sale-trade-platform-list.md) | Метод для получения списка торговых платформ ||
|#