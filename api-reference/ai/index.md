# AI в Битрикс24

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не прописаны ссылки на несозданные ещё страницы.
- из файла Сергея: описать сценарии, в которые можно встроиться

{% endnote %}

{% endif %}

{% note info "" %}

**Scope**: [`ai_admin`](../scopes/permissions.md) | **Кто может выполнять метод**: `администратор`

{% endnote %}

REST-методы, доступные при работе с модулем ai. Эти методы предоставляют возможности для работы с пользовательскими AI сервисами, включая их регистрацию, просмотр списка и удаление, а также включение и отключение логирования запросов для отладки.

#|
|| **Метод** | **Описание** ||
|| [ai.engine.register](./ai-engine-register.md) | Метод для добавления пользовательского сервиса. ||
|| [ai.engine.list](./ai-engine-list.md) | Метод для получения списка engine. ||
|| [ai.engine.unregister](./ai-engine-unregister.md) | Метод для удаления engine. ||
|#