# Поля CRM в REST 3.0: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note info "" %}

Методы относятся к REST 3.0. Особенности вызова и формат ответа новой версии API описаны в [обзоре REST 3.0](../../../rest-v3.md).

{% endnote %}

Поля хранят данные карточки CRM, например название и сумму сделки. Методы группы показывают, какие поля есть у элементов, и помогают добавить свои. Например, можно создать в сделках поле «Номер договора» и сделать его обязательным на стадии согласования. Заполнить это поле можно при создании сделки методом [crm.deal.add](../items/crm-entity-add-rest-v3.md) или позже методом [crm.deal.update](../items/crm-entity-update-rest-v3.md).

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Пользовательские поля в CRM](https://helpdesk.bitrix24.ru/open/22048980/)

## Типы объектов

Тип объекта входит в имя метода: [crm.deal.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) создает поле сделки, [crm.smartprocess1038.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) — поле смарт-процесса с идентификатором типа `1038`.

#|
|| **Тип объекта** | **Сегмент в имени метода** | **Поля** ||
|| Сделка | `deal` | [Поля сделки](../items/fields-deal.md) ||
|| Лид | `lead` | [Поля лида](../items/fields-lead.md) ||
|| Контакт | `contact` | [Поля контакта](../items/fields-contact.md) ||
|| Компания | `company` | [Поля компании](../items/fields-company.md) ||
|| Предложение | `quote` | [Поля предложения](../items/fields-quote.md) ||
|| Счет | `smartinvoice` | [Поля счета](../items/fields-smart-invoice.md) ||
|| Моя компания | `mycompany` | [Поля моей компании](../items/fields-my-company.md) ||
|| Смарт-процесс | `smartprocess<entityTypeId>` | [Поля смарт-процесса](../items/fields-smart-process.md) ||
|#

У моей компании есть только методы описания полей: [crm.mycompany.field.get](./crm-entity-field-get-rest-v3.md) и [crm.mycompany.field.list](./crm-entity-field-list-rest-v3.md). Методов пользовательских полей, вариантов полей-списков и обязательности у нее нет.

Идентификатор типа своего смарт-процесса `entityTypeId` возвращает метод [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Методы полей есть у смарт-процесса при любых настройках типа, например если в типе выключены воронки и стадии.

Имя метода пишется в нижнем регистре: `crm.smartinvoice.field.list`, а не `crm.smartInvoice.field.list`.

## Как начать работу

1. Получите поля типа объекта методом [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md). Метод покажет, какие поля можно изменять, фильтровать и сортировать
2. Создайте пользовательское поле методом [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md). Метод вернет описание поля с его `id` и именем `name`
3. Передайте значение нового поля в `fields` методов [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) и [crm.<тип>.update](../items/crm-entity-update-rest-v3.md), ключ — имя поля. Чтобы получить значение, укажите имя поля в `select` метода [crm.<тип>.get](../items/crm-entity-get-rest-v3.md)
4. Если поле должно быть заполнено на определенных стадиях, настройте это методом [crm.<тип>.field.required.set](./crm-entity-field-required-set-rest-v3.md)
5. Измените настройки поля методом [crm.<тип>.field.custom.update](./crm-entity-field-custom-update-rest-v3.md) или удалите поле методом [crm.<тип>.field.custom.delete](./crm-entity-field-custom-delete-rest-v3.md)

## Поля-списки

Поле-список хранит набор вариантов, например приоритет «Высокий», «Средний», «Низкий». Метод [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) поле-список, тип `enumeration`, не создает. Создать его можно, например, в интерфейсе Битрикс24 или методом [userfieldconfig.add](../../universal/userfieldconfig/userfieldconfig-add.md), а добавлять, менять и удалять варианты — методами [crm.<тип>.field.custom.enum.*](./crm-entity-field-custom-enum-list-rest-v3.md).

Метод [crm.<тип>.field.custom.enum.list](./crm-entity-field-custom-enum-list-rest-v3.md) возвращает варианты одного поля: фильтр по `fieldId` в нем обязателен.

## Обязательность полей

Поле можно сделать обязательным двумя способами:

- признаком `isMandatory` пользовательского поля в методах [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) и [crm.<тип>.field.custom.update](./crm-entity-field-custom-update-rest-v3.md) — поле обязательно во всех воронках
- методом [crm.<тип>.field.required.set](./crm-entity-field-required-set-rest-v3.md) — поле обязательно в выбранной воронке целиком или на выбранных ее стадиях. У лида и предложения обязательность действует во всем типе объекта. Этим методом можно настроить и стандартные поля, например `opportunity`

Обязательность проверяет карточка элемента в Битрикс24: без обязательного поля сотрудник не сохранит элемент и не переведет его на стадию. Методы элементов REST 3.0 по умолчанию обязательность не проверяют: [crm.<тип>.add](../items/crm-entity-add-rest-v3.md) создаст элемент без такого поля, а [crm.<тип>.update](../items/crm-entity-update-rest-v3.md) переведет его на стадию, где поле обязательно. Чтобы методы ее проверяли, включите в настройках CRM опцию «Проверять обязательные пользовательские поля в REST».

## Права

Описание полей и варианты полей-списков может получить пользователь с правом на чтение элементов этого типа объекта: методы [crm.<тип>.field.get](./crm-entity-field-get-rest-v3.md), [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md), [crm.<тип>.field.custom.enum.get](./crm-entity-field-custom-enum-get-rest-v3.md) и [crm.<тип>.field.custom.enum.list](./crm-entity-field-custom-enum-list-rest-v3.md).

Остальным методам группы нужно право «Разрешить изменять настройки» в CRM. Это касается и чтения пользовательских полей методами [crm.<тип>.field.custom.get](./crm-entity-field-custom-get-rest-v3.md) и [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md).

## Связь с другими объектами

Поля связаны с элементами, воронками и стадиями.

**Элементы.** Значения полей хранятся в элементах CRM. Методы группы [crm.<тип>.*](../items/index.md) передают и возвращают их по имени поля: стандартного — в camelCase, например `title`, пользовательского — например `UF_CRM_CONTRACT_NUMBER`.

**Воронки и стадии.** Метод [crm.<тип>.field.required.set](./crm-entity-field-required-set-rest-v3.md) задает обязательность отдельно для каждой воронки и ее стадий. Идентификаторы воронок и стадий сделки и смарт-процесса возвращают методы [crm.<тип>.category.list](../categories/crm-entity-category-list-rest-v3.md) и [crm.<тип>.category.stage.list](../categories/crm-entity-category-stage-list-rest-v3.md). Где взять воронки и стадии счета, лида и предложения, описано на странице [crm.<тип>.field.required.set](./crm-entity-field-required-set-rest-v3.md#category-id).

## Методы предыдущей версии

По адресу `/rest/` с полями работают методы нескольких групп:

- пользовательские поля лида, сделки, контакта, компании и предложения — методы `crm.<тип>.userfield.*`, например [crm.deal.userfield.*](../../deals/user-defined-fields/index.md)
- пользовательские поля любого объекта — методы [userfieldconfig.*](../../universal/userfieldconfig/index.md), объект задают параметры `moduleId` и `entityId`
- описание полей элемента — метод [crm.item.fields](../../universal/crm-item-fields.md), тип объекта задает параметр `entityTypeId`

В REST 3.0 эти задачи решают методы одной группы `crm.<тип>.field.*`, а тип объекта входит в имя метода.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: в зависимости от метода

### Описание полей

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.field.get](./crm-entity-field-get-rest-v3.md) | Возвращает описание поля по имени ||
|| [crm.<тип>.field.list](./crm-entity-field-list-rest-v3.md) | Возвращает поля типа объекта и признаки: можно ли поле изменять, фильтровать и сортировать ||
|#

### Пользовательские поля

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.field.custom.add](./crm-entity-field-custom-add-rest-v3.md) | Создает пользовательское поле ||
|| [crm.<тип>.field.custom.update](./crm-entity-field-custom-update-rest-v3.md) | Изменяет настройки пользовательского поля ||
|| [crm.<тип>.field.custom.get](./crm-entity-field-custom-get-rest-v3.md) | Возвращает пользовательское поле по идентификатору или имени ||
|| [crm.<тип>.field.custom.list](./crm-entity-field-custom-list-rest-v3.md) | Возвращает список пользовательских полей ||
|| [crm.<тип>.field.custom.delete](./crm-entity-field-custom-delete-rest-v3.md) | Удаляет пользовательское поле вместе со значениями ||
|#

### Варианты полей-списков

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.field.custom.enum.add](./crm-entity-field-custom-enum-add-rest-v3.md) | Добавляет вариант в поле-список ||
|| [crm.<тип>.field.custom.enum.update](./crm-entity-field-custom-enum-update-rest-v3.md) | Изменяет вариант поля-списка ||
|| [crm.<тип>.field.custom.enum.get](./crm-entity-field-custom-enum-get-rest-v3.md) | Возвращает вариант по идентификатору ||
|| [crm.<тип>.field.custom.enum.list](./crm-entity-field-custom-enum-list-rest-v3.md) | Возвращает варианты поля-списка ||
|| [crm.<тип>.field.custom.enum.delete](./crm-entity-field-custom-enum-delete-rest-v3.md) | Удаляет вариант из поля-списка ||
|#

### Обязательность полей

#|
|| **Метод** | **Описание** ||
|| [crm.<тип>.field.required.get](./crm-entity-field-required-get-rest-v3.md) | Возвращает обязательность поля в воронке ||
|| [crm.<тип>.field.required.set](./crm-entity-field-required-set-rest-v3.md) | Делает поле обязательным в воронке или на стадиях ||
|| [crm.<тип>.field.required.clear](./crm-entity-field-required-clear-rest-v3.md) | Снимает обязательность поля в воронке ||
|#
