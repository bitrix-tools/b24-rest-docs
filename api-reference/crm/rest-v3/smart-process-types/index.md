# Типы смарт-процессов в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "" %}

Методы относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Тип смарт-процесса — это настраиваемый объект CRM со своими элементами, например «Заявки поставщикам» или «Договоры». Методы группы создают типы, меняют их настройки и возвращают список типов с идентификаторами `entityTypeId`. Идентификатор `entityTypeId` входит в имя методов элементов: элементы типа `1038` создает метод [crm.smartprocess1038.add](../items/crm-entity-add-rest-v3.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Смарт-процессы в CRM](https://helpdesk.bitrix24.ru/open/18913880/)

## Как начать работу

Пример: приложение ведет заявки поставщикам в своем смарт-процессе.

1. Проверьте, есть ли нужный тип, методом [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) с фильтром по `code` или `title`. Если тип есть, возьмите его `entityTypeId` и переходите к шагу 3
2. Создайте тип методом [crm.smartprocess.add](./crm-smart-process-add-rest-v3.md). Передайте название `title`, символьный код `code`, чтобы потом находить тип по нему, и включите нужные возможности, например воронки и стадии `isCategoriesEnabled` и `isStagesEnabled`. Метод вернет `entityTypeId` нового типа
3. Добавьте типу пользовательские поля методом [crm.smartprocess<entityTypeId>.field.custom.add](../fields/crm-entity-field-custom-add-rest-v3.md). Типы полей, которые можно создать, возвращает метод [crm.dictionary.customfieldtype.list](../dictionaries/crm-dictionary-list-rest-v3.md#custom-field-types)
4. Настройте воронки и стадии методами [crm.smartprocess<entityTypeId>.category.*](../categories/index.md)
5. Создавайте элементы методом [crm.smartprocess<entityTypeId>.add](../items/crm-entity-add-rest-v3.md)
6. Меняйте настройки типа методом [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md). Метод меняет только переданные поля

## Особенности {#limits}

**Идентификатор типа.** Методы группы находят тип по `entityTypeId`, а не по `id` из метода прошлой версии [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Значение `entityTypeId` Битрикс24 назначает сам при создании типа, задать его нельзя.

**Системные типы.** Методы работают только с типами смарт-процессов. Сделка, счет, документы и другие системные типы в ответ [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) не попадают, а [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) отвечает на их `entityTypeId` ошибкой «не найдена». Идентификаторы системных типов возвращает метод [crm.dictionary.entitytype.list](../dictionaries/crm-dictionary-list-rest-v3.md#entity-types).

**Доступ.** Читать тип может администратор CRM, администратор этого смарт-процесса, пользователь с правом на чтение элементов типа или с правом управлять смарт-процессами. Типы без доступа метод [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) пропускает. Создавать и изменять типы может администратор CRM или пользователь с правом управлять смарт-процессами.

**Что задают методы записи.** Методы [crm.smartprocess.add](./crm-smart-process-add-rest-v3.md) и [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md) меняют название, код, описание, срок завершения элементов и признаки возможностей типа. Связи `relations`, привязки к пользовательским полям `linkedUserFields`, признак приема платежей `isPaymentsEnabled` и цифровые рабочие места эти методы не меняют. Связи и привязки настраивает метод прошлой версии [crm.type.update](../../universal/user-defined-object-types/crm-type-update.md), цифровые рабочие места — методы [crm.automatedsolution.*](../../automated-solution/index.md).

**Удаление.** Метода удаления типа в REST 3.0 нет. Тип удаляет метод прошлой версии [crm.type.delete](../../universal/user-defined-object-types/crm-type-delete.md): ему нужен `id` типа из [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md), а не `entityTypeId`.

**Имена методов.** Имена пишутся в нижнем регистре: `crm.smartprocess.list`. На `crm.smartProcess.list` Битрикс24 отвечает ошибкой «Метод не найден».

## Связь с другими объектами

Тип смарт-процесса связан с элементами, полями, воронками и другими типами CRM.

**Элементы.** Элементы типа создают, получают и меняют методы [crm.smartprocess<entityTypeId>.*](../items/index.md). Состав полей элемента зависит от настроек типа: например, без `isCategoriesEnabled` у элементов нет поля `categoryId`. Что зависит от каждой настройки, показано на странице [полей смарт-процесса](../items/fields-smart-process.md).

**Поля.** Описание полей элемента возвращает метод [crm.smartprocess<entityTypeId>.field.list](../fields/crm-entity-field-list-rest-v3.md), пользовательские поля создает метод [crm.smartprocess<entityTypeId>.field.custom.add](../fields/crm-entity-field-custom-add-rest-v3.md). Не путайте их с методами [crm.smartprocess.field.list](./crm-smart-process-field-list-rest-v3.md) и [crm.smartprocess.field.get](./crm-smart-process-field-get-rest-v3.md): они описывают поля самого типа.

**Воронки и стадии.** Если в типе включены `isCategoriesEnabled` и `isStagesEnabled`, воронками и стадиями управляют методы [crm.smartprocess<entityTypeId>.category.*](../categories/index.md).

**Другие типы CRM.** Объект `relations` в ответе [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md#relations) показывает, к каким типам можно привязать элемент смарт-процесса и какие элементы можно привязать к нему.

**Цифровые рабочие места.** Поля `customSectionId`, `additionalCustomSectionIds` и `customSections` показывают, в каких цифровых рабочих местах размещен тип. Рабочими местами управляют методы [crm.automatedsolution.*](../../automated-solution/index.md).

## Методы прошлой версии

По адресу `/rest/` с типами смарт-процессов работают методы [crm.type.*](../../universal/user-defined-object-types/index.md). В REST 3.0 признаки передаются как `true` и `false`, а не `Y` и `N`, тип находят по `entityTypeId`, а `select`, `filter`, `order` и `pagination` записываются в формате [REST 3.0](../../../rest-v3.md). Методы прошлой версии по-прежнему нужны, чтобы удалить тип, изменить его связи и привязки к пользовательским полям или узнать `id` типа: он входит в имена пользовательских полей вида `UF_CRM_<id>_<код>`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Типы смарт-процессов

#|
|| **Метод** | **Описание** ||
|| [crm.smartprocess.add](./crm-smart-process-add-rest-v3.md) | Создает тип смарт-процесса ||
|| [crm.smartprocess.update](./crm-smart-process-update-rest-v3.md) | Изменяет настройки типа смарт-процесса ||
|| [crm.smartprocess.get](./crm-smart-process-get-rest-v3.md) | Возвращает настройки типа смарт-процесса по `entityTypeId` ||
|| [crm.smartprocess.list](./crm-smart-process-list-rest-v3.md) | Возвращает типы смарт-процессов с фильтром, сортировкой и постраничной навигацией ||
|#

### Описание полей типа

#|
|| **Метод** | **Описание** ||
|| [crm.smartprocess.field.get](./crm-smart-process-field-get-rest-v3.md) | Возвращает описание поля типа смарт-процесса по имени ||
|| [crm.smartprocess.field.list](./crm-smart-process-field-list-rest-v3.md) | Возвращает описание полей типа смарт-процесса ||
|#
