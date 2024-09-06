# Получить список доступных приложению мест встраивания placement.list

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужны правки под стандарт написания
- не указаны типы параметров
- не указана обязательность параметров
- отсутствуют примеры
- отсутствует ответ в случае успеха
- отсутствует ответ в случае ошибки
- не прописаны ссылки на несозданные ещё страницы.

{% endnote %}

{% endif %}

> Scope: [`в зависимости от места встройки`](../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод для получения списка доступных приложению мест встраивания.

## Параметры

#|
|| **Параметр** | **Описание** | **С версии** ||
|| **SCOPE** | Ограничение списка одним из прав доступа приложения | ||
|#

## Пример

```http
GET https://sometestportal.bitrix24.com/rest/placement.list?auth=7e623a5a0000cd710000cd5b00000001000000a8b1dbe022e2de93198634e9526b00f7 HTTP/1.1
HTTP/1.1 200 OK
{
    "result": [
        "CRM_LEAD_LIST_MENU",
        "CRM_DEAL_LIST_MENU",
        "CRM_INVOICE_LIST_MENU",
        "CRM_QUOTE_LIST_MENU",
        "CRM_CONTACT_LIST_MENU",
        "CRM_COMPANY_LIST_MENU",
        "CRM_ACTIVITY_LIST_MENU",
        "CRM_LEAD_DETAIL_TAB",
        "CRM_DEAL_DETAIL_TAB",
        "CRM_CONTACT_DETAIL_TAB",
        "CRM_COMPANY_DETAIL_TAB",
        "CRM_LEAD_DETAIL_ACTIVITY",
        "CRM_DEAL_DETAIL_ACTIVITY",
        "CRM_CONTACT_DETAIL_ACTIVITY",
        "CRM_COMPANY_DETAIL_ACTIVITY"
    ]
}
```

{% include [Сноска о примерах](../../_includes/examples.md) %}