# Документы: обзор методов

Документы в генераторе документов Битрикс24 создают по шаблону для CRM-объекта или загружают как готовый файл и прикрепляют к CRM-объекту.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Документы в CRM: как создать и отправить за пару минут](https://helpdesk.bitrix24.ru/open/19098306/)

## Как начать работу

1. Подготовьте шаблон документа и получите `templateId` в разделе [Шаблоны документов](../templates/index.md)
2. Определите `entityTypeId` CRM-объекта, для которого нужен документ
3. Получите `entityId` нужного CRM-объекта
4. Если нужно проверить доступные поля документа, используйте метод [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md)
5. Создайте документ по шаблону методом [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) или загрузите готовый файл методом [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md)
6. Если знаете `id` документа и хотите получить его данные, используйте метод [crm.documentgenerator.document.get](./crm-document-generator-document-get.md)
7. Если нужно получить список документов, используйте метод [crm.documentgenerator.document.list](./crm-document-generator-document-list.md)
8. Чтобы изменить документ, используйте метод [crm.documentgenerator.document.update](./crm-document-generator-document-update.md)
9. Если нужна публичная ссылка на документ, используйте метод [crm.documentgenerator.document.enablepublicurl](./crm-document-generator-document-enable-public-url.md)
10. Удалите ненужный документ методом [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md)

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить шаблон и создать документ на его основе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

{% endnote %}

## Что важно учитывать

Ссылки `pdfUrl` и `imageUrl` могут отсутствовать сразу после создания или обновления документа, так как конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос методом [crm.documentgenerator.document.get](./crm-document-generator-document-get.md) через 30-40 секунд.

## Связь с другими объектами

**Шаблоны документов.** Для создания документа по шаблону передают `templateId` в метод [crm.documentgenerator.document.add](./crm-document-generator-document-add.md). Возьмите `templateId` из ответа [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md) или получите из списка методом [crm.documentgenerator.template.list](../templates/crm-document-generator-template-list.md).

**CRM-объекты.** Для создания или загрузки документа передают `entityTypeId` и `entityId`. Типовые значения `entityTypeId` для CRM-объектов приведены в статье [Особенности передаваемых значений](../index.md). Для смарт-процессов `entityTypeId` можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Идентификатор нужного объекта `entityId` получают универсальным методом [crm.item.list](../../universal/crm-item-list.md).

**Нумераторы.** При создании документа номер обычно формируется по нумератору, который привязан к шаблону. Если создаете новый нумератор, возьмите `id` из ответа [crm.documentgenerator.numerator.add](../numerator/crm-document-generator-numerator-add.md). Если используете существующий, получите `id` методом [crm.documentgenerator.numerator.list](../numerator/crm-document-generator-numerator-list.md).

**Файлы.** В метод [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) передают содержимое файла в Base64. Формат загрузки описан в статье [Как загружать файлы](../../../files/how-to-upload-files.md).

## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) | Создает документ по шаблону ||
    || [crm.documentgenerator.document.update](./crm-document-generator-document-update.md) | Обновляет документ ||
    || [crm.documentgenerator.document.get](./crm-document-generator-document-get.md) | Возвращает информацию о документе ||
    || [crm.documentgenerator.document.list](./crm-document-generator-document-list.md) | Возвращает список документов ||
    || [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md) | Удаляет документ ||
    || [crm.documentgenerator.document.enablepublicurl](./crm-document-generator-document-enable-public-url.md) | Включает или выключает публичную ссылку ||
    || [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) | Загружает готовый документ и прикрепляет его к CRM-объекту ||
    || [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md) | Возвращает поля созданного документа ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDocumentGeneratorDocumentAdd](./events/on-crm-document-generator-document-add.md) | При генерации документа вручную или методом [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) ||
    || [onCrmDocumentGeneratorDocumentUpdate](./events/on-crm-document-generator-document-update.md) | При изменении документа вручную или методом [crm.documentgenerator.document.update](./crm-document-generator-document-update.md) ||
    || [onCrmDocumentGeneratorDocumentDelete](./events/on-crm-document-generator-document-delete.md) | При удалении документа вручную или методом [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md) ||
    |#

{% endlist %}
