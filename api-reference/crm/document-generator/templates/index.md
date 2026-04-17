# Шаблоны документов: обзор методов

Шаблон документа — файл `.docx` с плейсхолдерами, в которые при генерации подставляют данные из CRM. К шаблону обязательно привязывают нумератор и один или несколько типов CRM-объектов.

Шаблон загружают через API один раз. После этого его применяют при каждой генерации документа: в метод создания документа передают идентификатор шаблона и конкретный CRM-объект — сделку, контакт, счет или элемент смарт-процесса.

Например, шаблон коммерческого предложения можно привязать к сделкам в воронке `2_category_0` — при генерации в документ попадут данные сделки и номер из нумератора.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация:
> - [Шаблоны документов в CRM: как быстро отправлять счета и акты](https://helpdesk.bitrix24.ru/open/18089278/)
> - [Как изменить стандартный шаблон документа в CRM](https://helpdesk.bitrix24.ru/open/18127788/)
> - [Как добавить шаблон и создать документ на его основе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)
> - [Как загрузить свой шаблон документа в CRM](https://helpdesk.bitrix24.ru/open/18127800/)
> - [Как добавить пользовательское поле в шаблон документа](https://helpdesk.bitrix24.ru/open/18167706/)
> - [Как настроить табличную часть в шаблонах документов](https://helpdesk.bitrix24.ru/open/28165008/)
> - [Как настроить права доступа к документам CRM](https://helpdesk.bitrix24.ru/open/27112424/)

## Как начать работу

1. Подготовьте файл шаблона в формате `.docx` — [Как загружать файлы](../../../files/how-to-upload-files.md).
2. Создайте нумератор или возьмите идентификатор существующего — методами раздела [Нумераторы](../numerator/index.md).
3. Загрузите шаблон методом [crm.documentgenerator.template.add](./crm-document-generator-template-add.md): передайте файл, `numeratorId`, `region` и `entityTypeId`.
4. Проверьте поля шаблона методом [crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md), если нужно убедиться в правильности подстановок для конкретного объекта.
5. Создайте документ по шаблону методом [crm.documentgenerator.document.add](../documents/crm-document-generator-document-add.md), передав `templateId`, `entityTypeId` и `entityId` конкретного CRM-объекта.

## Связь с другими объектами

**Нумераторы.** Шаблон привязывают к нумератору через параметр `numeratorId`. Если создаете новый нумератор, возьмите `id` из ответа [crm.documentgenerator.numerator.add](../numerator/crm-document-generator-numerator-add.md). Если используете существующий, получите `id` методом [crm.documentgenerator.numerator.list](../numerator/crm-document-generator-numerator-list.md).

**Документы.** Шаблон служит основой для генерации документов. При создании документа методом [crm.documentgenerator.document.add](../documents/crm-document-generator-document-add.md) в метод передают `templateId`, `entityTypeId` и `entityId` конкретного CRM-объекта.

**CRM-объекты.** Шаблон привязывают к одному или нескольким типам объектов через `entityTypeId`. Типовые значения для CRM-объектов приведены в статье [Особенности передаваемых значений](../index.md), а для смарт-процессов `entityTypeId` можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Чтобы уточнить воронку, к идентификатору добавляют суффикс, например `2_category_0`.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.template.add](./crm-document-generator-template-add.md) | Добавляет новый шаблон ||
|| [crm.documentgenerator.template.update](./crm-document-generator-template-update.md) | Обновляет существующий шаблон ||
|| [crm.documentgenerator.template.get](./crm-document-generator-template-get.md) | Возвращает информацию о шаблоне по идентификатору ||
|| [crm.documentgenerator.template.list](./crm-document-generator-template-list.md) | Возвращает список шаблонов ||
|| [crm.documentgenerator.template.delete](./crm-document-generator-template-delete.md) | Удаляет шаблон ||
|| [crm.documentgenerator.template.getfields](./crm-document-generator-template-get-fields.md) | Возвращает поля шаблона для указанного CRM-объекта ||
|#
