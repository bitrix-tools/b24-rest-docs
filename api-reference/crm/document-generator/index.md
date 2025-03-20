# Генератор документов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

{% if build == 'dev' %}

{% note alert "TO-DO _не выгружается на prod_" %}

- нужно вступление, соответствующее заголовку

{% endnote %}

{% endif %}

{% note info "Права" %}

**Scope**: [`crm.documentgenerator`](../../scopes/permissions.md) | **Кто может выполнять метод**: `любой пользователь`

> Быстрый переход: [все методы](#all-methods) 

{% endnote %}

REST-методы CRM для документов реализованы через аякс-контроллеры. При этом сами контроллеры и их экшны реализованы в модуле [Генератор документов](../document-generator/index.md), а в модуле CRM только обвязка для них. Эта обвязка преобразует входные и выходные параметры в соответствии с новым стандартом REST, а также учитывая особенности модуля CRM.

При работе с методами документов через скоуп CRM есть возможность работать только с шаблонами / документами, привязанными к модулю CRM.

## Особенности передаваемых значений

### Провайдеры

Модуль **Генератор документов** в качестве идентификатора провайдера данных использует полное наименование класса. Т.к. в модуле CRM используется именованные / числовые идентификаторы для идентификации сущностей, в RESTе для документов был использован аналогичный синтаксис. Если входной параметр называется *entityTypeId*, то он принимает числовой индекс сущностей CRM. На данный момент есть следующие идентификаторы:

- 1 - лид
- 2 - сделка
- 3 - контакт
- 4 - компания
- 5 - счет
- 7 - предложение
- 14 - заказ
- 31 - новые счета

Также предусмотрена возможность использования смарт-процессов: их *entityTypeId* также поддерживаются в Генераторе документов.

### Фильтрация по направлениям сделок

Методы REST не учитывают настройку привязки шаблона к провайдерам. Т.е. если был отправлен запрос на генерацию документа по шаблону с провайдером, к которому этот шаблон не привязан, ошибки не будет. Отсюда же следует, что не учитывается привязка шаблона к определенному направлению сделок. Если вы хотите указать сделку в качестве провайдера, всегда указывается только числовой идентификатор (2).

### Список регионов

Каждый шаблон привязан к определенной стране. Список стран фиксирован и на данный момент состоит из:

- ru - Россия
- by - Беларусь
- kz - Казахстан
- ua - Украина
- br - Бразилия
- mx - Мексика
- de - Германия
- uk - Великобритания
- pl - Польша

Управление регионами осуществляется в разделе [documentgenerator](../../document-generator/region/index.md).

## Обзор методов {#all-methods}

### Документы

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.document.getfields](./documents/crm-document-generator-document-get-fields.md) | Поля документа. ||
|| [crm.documentgenerator.document.add](./documents/crm-document-generator-document-add.md) | Создание нового документа. ||
|| [crm.documentgenerator.document.update](./documents/crm-document-generator-document-update.md) | Изменение документа. ||
|| [crm.documentgenerator.document.get](./documents/crm-document-generator-document-get.md) | Получение информации о документе по Id. ||
|| [crm.documentgenerator.document.list](./documents/crm-document-generator-document-list.md) | Получение списка документов. ||
|| [crm.documentgenerator.document.enablepublicurl](./documents/crm-document-generator-document-enable-public-url.md) | Включение и выключение публичной ссылки на документ. ||
|| [crm.documentgenerator.document.upload](./documents/crm-document-generator-document-upload.md) | Загрузка сформированного документа и прикрепление его к указанной сущности. ||
|| [crm.documentgenerator.document.delete](./documents/crm-document-generator-document-delete.md) | Удаление документа. ||
|#

### Нумератор

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.numerator.add](./numerator/crm-document-generator-numerator-add.md) | Добавление нового нумератора. ||
|| [crm.documentgenerator.numerator.update](./numerator/crm-document-generator-numerator-update.md) | Изменение существующего нумератора. ||
|| [crm.documentgenerator.numerator.get](./numerator/crm-document-generator-numerator-get.md) | Получение информацию о нумераторе по Id. ||
|| [crm.documentgenerator.numerator.list](./numerator/crm-document-generator-numerator-list.md) | Получение списка нумераторов. ||
|| [crm.documentgenerator.numerator.delete](./numerator/crm-document-generator-numerator-delete.md) | Удаление нумератора. ||
|#

### Шаблоны документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.template.getfields](./templates/crm-document-generator-template-get-fields.md) | Поля шаблона документа. ||
|| [crm.documentgenerator.template.add](./templates/crm-document-generator-template-add.md) | Добавление нового шаблона. ||
|| [crm.documentgenerator.template.update](./templates/crm-document-generator-template-update.md) | Изменение существующего шаблона документа. ||
|| [crm.documentgenerator.template.get](./templates/crm-document-generator-template-get.md) | Получение информации о шаблоне документа по Id. ||
|| [crm.documentgenerator.template.list](./templates/crm-document-generator-template-list.md) | Получение списка шаблонов документов. ||
|| [crm.documentgenerator.template.delete](./templates/crm-document-generator-template-delete.md) | Удаление шаблона документа. ||
|#