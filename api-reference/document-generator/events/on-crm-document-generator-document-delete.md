# На удаление документа

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- не указаны типы полей
- не указана обязательность полей
- отсутствуют примеры

{% endnote %}

{% endif %}

{% note info "onCrmDocumentGeneratorDocumentDelete" %}

**Scope**: [`documentgenerator`](../../scopes/permissions.md) | **Кто может подписаться**: `любой пользователь`

{% endnote %}

Событие `onCrmDocumentGeneratorDocumentDelete` – удаление документа.

В обработчик события придут данные в следующем виде:

```php
[
    'FIELDS' => [
        'ID' => $documentId,
        'ENTITY_TYPE_ID' => $entityTypeId,
        'ENTITY_ID' => $entityId,
    ],
]
```
#|
|| **Поле** | **Описание** ||
|| **$documentId** | Идентификатор документа. ||
|| **$entityTypeId** | Идентификатор типа CRM. ||
|| **$entityId** | Идентификатор элемента. ||
|#