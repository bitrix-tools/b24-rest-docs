# Структура связей объектов CRM

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- вот тут прямо нужен очень вдумчивый материал, который поможет разобраться в сложностях CRM
- Первый раздел про базовые объекты. Рассказываем про связи между ними, связанные с конвертацией из лида, а также связь между ними и делами 1 ко многим. Отмечаем, что это лишь базовая привязка дел, на самом деле, она сложнее и будет рассмотрена ниже
- Второй раздел про связи делами и объектами с помощью таблицы BINDINGS много-ко-многим
- Третий раздел про реквизиты. Сначала общая картина, потом на примере компании более подробная схема

{% endnote %}

{% endif %}

## Базовые объекты CRM

```mermaid
%%{init: { "theme": "forest" } }%%
erDiagram
    LEAD |o--|| DEAL : "DEAL.LEAD_ID - LEAD.ID" 
    LEAD |o--|| COMPANY : "COMPANY.LEAD_ID - LEAD.ID" 
    LEAD |o--|| CONTACT : "CONTACT.LEAD_ID - LEAD.ID" 
    LEAD |o--|| QUOTE : "QUOTE.LEAD_ID - LEAD.ID" 
    LEAD {
        integer ID
        string TITLE
    }
    DEAL {
        integer ID
        string TITLE
        integer LEAD_ID
    }
    CONTACT {
        integer ID
        string NAME
        string LAST_NAME
        integer LEAD_ID
    }
    COMPANY {
        integer ID
        string TITLE
        integer LEAD_ID
    }
    QUOTE {
        integer ID
        string TITLE
        integer LEAD_ID
    }
    CRM_SMART_INVOICE {
        integer ID
        string TITLE
        integer LEAD_ID
    }
    ACTIVITY ||--|| DEAL : "ACTIVITY.OWNER_ID - DEAL.ID" 
    ACTIVITY ||--|| COMPANY : "ACTIVITY.OWNER_ID - COMPANY.ID" 
    ACTIVITY ||--|| CONTACT : "ACTIVITY.OWNER_ID - CONTACT.ID" 
    ACTIVITY ||--|| LEAD : "ACTIVITY.OWNER_ID - LEAD.ID" 
    ACTIVITY ||--|| CRM_SMART_INVOICE : "ACTIVITY.OWNER_ID - CRM_SMART_INVOICE.ID" 
    ACTIVITY {
        integer ID
        integer OWNER_ID
        integer OWNER_TYPE_ID
        integer TYPE_ID
    }
```

## Множественный связи с делами

```mermaid
%%{init: { "theme": "forest" } }%%
erDiagram
    LEAD {
        integer ID
        string TITLE
    }
    DEAL {
        integer ID
        string TITLE
    }
    CONTACT {
        integer ID
        string NAME
        string LAST_NAME
    }
    COMPANY {
        integer ID
        string TITLE
    }
    CRM_SMART_INVOICE {
        integer ID
        string TITLE
    }
    BINDINGS }|--|| DEAL : "BINDINGS.ENTITY_ID - DEAL.ID" 
    BINDINGS }|--|| COMPANY : "BINDINGS.ENTITY_ID - COMPANY.ID" 
    BINDINGS }|--|| CONTACT : "BINDINGS.ENTITY_ID - CONTACT.ID" 
    BINDINGS }|--|| LEAD : "BINDINGS.ENTITY_ID - LEAD.ID" 
    BINDINGS }|--|| CRM_SMART_INVOICE : "BINDINGS.ENTITY_ID - LEAD.ID" 
    BINDINGS }|--|| ACTIVITY : "BINDINGS.ENTITY_ID - ACTIVITY.ID" 
    BINDINGS {
        integer ACTIVITY_ID
        integer ENTITY_ID
        integer ENTITY_TYPE_ID
    }
    ACTIVITY {
        integer ID
        integer OWNER_ID
        integer OWNER_TYPE_ID
        integer TYPE_ID
    }
```
