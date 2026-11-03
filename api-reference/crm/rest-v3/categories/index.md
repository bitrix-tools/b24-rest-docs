# Воронки и стадии CRM в REST 3.0: обзор методов

Воронка — отдельный набор элементов CRM внутри типа объекта. У сделки и смарт-процесса воронка задает путь элемента по стадиям — от первой до успеха или провала. Например, у смарт-процесса заявок может быть воронка для закупок оборудования со своими стадиями: подготовка заявки, проверка договора, согласование бюджета. [Методы воронок](#categories-methods) создают и меняют воронки, а [методы стадий](#stages-methods) — стадии внутри воронки.

{% note info "" %}

Методы относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

> Быстрый переход: [все методы](#all-methods)

## Типы объектов и имена методов

#|
|| **Тип объекта** | **Воронки** | **Стадии** ||
|| Сделка | `crm.deal.category.*` | `crm.deal.category.stage.*` ||
|| Контакт | `crm.contact.category.*` | Нет ||
|| Компания | `crm.company.category.*` | Нет ||
|| Смарт-процесс | `crm.smartprocess<entityTypeId>.category.*`, если в настройках типа включены воронки | `crm.smartprocess<entityTypeId>.category.stage.*`, если включены и воронки, и стадии ||
|#

У лида, предложения, счета и моей компании методов воронок и стадий нет. Идентификаторы типов смарт-процессов возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md) в поле `entityTypeId`. Имена методов пишутся в нижнем регистре: `crm.smartprocess1038.category.list`.

## Как начать работу

1. Проверьте, какие воронки уже есть, методом [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md)
2. Создайте воронку методом [crm.<тип>.category.add](./crm-entity-category-add-rest-v3.md). У сделки, а у смарт-процесса — если в типе включены стадии, Битрикс24 сразу добавит в нее стадии по умолчанию
3. Получите стадии воронки методом [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) — понадобятся `stageId`
4. Настройте стадии по одной методами [crm.<тип>.category.stage.add](./crm-entity-category-stage-add-rest-v3.md) и [crm.<тип>.category.stage.update](./crm-entity-category-stage-update-rest-v3.md) или задайте все стадии группы `process` одним запросом методом [crm.<тип>.category.stage.replace](./crm-entity-category-stage-replace-rest-v3.md)
5. Создайте элемент сделки или смарт-процесса в воронке методом [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) с полем `categoryId`

## Воронка по умолчанию

Одна из воронок типа объекта — воронка по умолчанию, у нее `isDefault: true`. У сделки это всегда воронка с `id` `0`. У контакта и компании воронка `0` — воронка по умолчанию, пока ее не сменили. Воронку `0` нельзя удалить. У смарт-процесса воронка по умолчанию — обычная воронка со своим идентификатором, например `69`.

Сменить воронку по умолчанию у контакта, компании и смарт-процесса можно полем `isDefault: true` в методах [crm.<тип>.category.add](./crm-entity-category-add-rest-v3.md) и [crm.<тип>.category.update](./crm-entity-category-update-rest-v3.md). У сделки `isDefault` только для чтения.

{% note warning "" %}

У контакта и компании в REST 3.0 нет поля `categoryId`: методы [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) и [crm.<тип>.update](../items/crm-entity-update-rest-v3.md) не принимают его и создают элементы в воронке `0`. Воронки контактов и компаний можно создавать и настраивать, но переносить в них элементы через REST 3.0 нельзя.

{% endnote %}

## Стадии и их порядок

Стадии воронки идут в порядке `sort` и делятся на три группы — поле `semantics`:

- `process` — стадии в работе, стоят первыми
- `success` — стадия успеха, в воронке она одна
- `failure` — стадии провала, стоят после стадии успеха

Битрикс24 проверяет этот порядок при каждом изменении стадий. Если новая стадия или новый `sort` его нарушает, методы отвечают ошибкой `OPERATION_NOT_ALLOWED_FOR_STAGE`.

Первую стадию, стадию успеха и основную стадию провала Битрикс24 создает вместе с воронкой, у них `isSystem: true`. Системные стадии можно переименовать методом [crm.<тип>.category.stage.update](./crm-entity-category-stage-update-rest-v3.md), но нельзя удалить и нельзя сменить им группу.

В идентификатор стадии входит идентификатор воронки:

#|
|| **Воронка** | **Формат** | **Пример** ||
|| Воронка по умолчанию сделки | Код стадии без префикса | `NEW` ||
|| Другая воронка сделки | `C<categoryId>:<код>` | `C1:NEW` ||
|| Воронка смарт-процесса | `DT<entityTypeId>_<categoryId>:<код>` | `DT1038_127:NEW` ||
|#

## Списки воронок и стадий

Методы [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) и [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) принимают постраничную навигацию, до 100 записей на странице. Метод стадий еще требует фильтр по воронке одним условием: `"filter": ["categoryId", "=", 127]`.

Параметры `order` и `select`, а у воронок и `filter`, методы пропускают без ошибки. Записи идут по возрастанию `sort`, у каждой — все поля.

## Права

Читать воронку и ее стадии может пользователь с правом читать элементы этой воронки. Список воронок возвращает только такие воронки, а воронку без права чтения методы считают несуществующей.

Создавать, менять и удалять воронки может администратор CRM или пользователь с правом «Управление воронками» в роли доступа CRM. Для стадий нужно право «Управление стадиями». У смарт-процесса цифрового рабочего места Битрикс24 проверяет права в ролях этого рабочего места.

## Ошибки воронок и стадий

Ошибки из таблицы ниже приходят с кодом `BITRIX_REST_V3_EXCEPTION_VALIDATION_REQUESTVALIDATIONEXCEPTION`. В `field` у них стоит код ошибки, а не имя поля:

#|
|| **Код в field** | **Когда возникает** ||
|| `DEPENDENT_ITEMS_EXIST` | Удаление воронки или стадии, в которой есть элементы ||
|| `OPERATION_NOT_ALLOWED_FOR_CATEGORY` | Воронку нельзя удалить, например воронку `0` сделки, контакта или компании ||
|| `OPERATION_NOT_ALLOWED_FOR_STAGE` | Изменение нарушает порядок стадий или касается системной стадии ||
|| `STAGE_NOT_FOUND` | Стадии с переданным идентификатором нет ||
|| `FIELD_VALUE_NOT_ALLOWED` | Название из одних пробелов ||
|#

Если нет воронки, методы отвечают ошибкой `BITRIX_REST_V3_EXCEPTION_ENTITYNOTFOUNDEXCEPTION`. Если у пользователя нет права на настройку воронок или стадий, методы записи отвечают ошибкой `BITRIX_REST_V3_EXCEPTION_ACCESSDENIEDEXCEPTION`, HTTP-статус **403**. Общие ошибки REST 3.0 описаны в [обзоре REST 3.0](../../../rest-v3.md).

## Связь с другими объектами

Воронки связаны с элементами CRM, справочником групп стадий и видами карточки.

**Элементы.** Элемент сделки и смарт-процесса стоит в одной воронке и на одной ее стадии — поля `categoryId` и `stageId`. Их передают в методы [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) и [crm.<тип>.update](../items/crm-entity-update-rest-v3.md).

**Группы стадий.** Названия групп стадий возвращает метод [crm.dictionary.stagesemantic.list](../dictionaries/crm-dictionary-list-rest-v3.md). Справочник называет группы кодами `P`, `S` и `F`, а методы стадий — значениями `process`, `success` и `failure`.

**Виды карточки.** Виды карточки элемента хранятся отдельно для каждой воронки. Идентификатор воронки передают в параметр `categoryId` методов [crm.<тип>.detailpagelayout.*](../detail-page-layout/index.md).

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Воронки {#categories-methods}

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.category.add](./crm-entity-category-add-rest-v3.md) | Создает воронку ||
|| [crm.<тип>.category.update](./crm-entity-category-update-rest-v3.md) | Изменяет название, порядок или признак воронки по умолчанию ||
|| [crm.<тип>.category.get](./crm-entity-category-get-rest-v3.md) | Возвращает воронку по идентификатору ||
|| [crm.<тип>.category.list](./crm-entity-category-list-rest-v3.md) | Возвращает воронки типа объекта ||
|| [crm.<тип>.category.delete](./crm-entity-category-delete-rest-v3.md) | Удаляет пустую воронку вместе со стадиями ||
|#

### Стадии {#stages-methods}

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.category.stage.add](./crm-entity-category-stage-add-rest-v3.md) | Добавляет стадию в воронку ||
|| [crm.<тип>.category.stage.update](./crm-entity-category-stage-update-rest-v3.md) | Изменяет стадию ||
|| [crm.<тип>.category.stage.get](./crm-entity-category-stage-get-rest-v3.md) | Возвращает стадию по идентификатору ||
|| [crm.<тип>.category.stage.list](./crm-entity-category-stage-list-rest-v3.md) | Возвращает стадии воронки ||
|| [crm.<тип>.category.stage.delete](./crm-entity-category-stage-delete-rest-v3.md) | Удаляет стадию без элементов ||
|| [crm.<тип>.category.stage.replace](./crm-entity-category-stage-replace-rest-v3.md) | Задает весь набор стадий в работе одним запросом ||
|#

### Описание полей воронки и стадии

У группы есть методы `crm.<тип>.category.field.list` и `crm.<тип>.category.field.get` для полей воронки и `crm.<тип>.category.stage.field.list` и `crm.<тип>.category.stage.field.get` для полей стадии. Они возвращают описание полей с признаками обязательности и изменяемости. Формат ответа такой же, как у метода [crm.<тип>.field.list](../fields/crm-entity-field-list-rest-v3.md).
