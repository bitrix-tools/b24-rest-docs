# Генератор документов: обзор методов и событий

Генератор документов в CRM позволяет подготовить шаблон, настроить нумератор, создать документ по шаблону или загрузить готовый файл. Поддерживает сделки, лиды, контакты, компании, счета, коммерческие предложения и элементы смарт-процессов.

Раздел состоит из трех основных частей. В [Нумераторах](./numerator/index.md) настраивают шаблон номера и счетчик. В [Шаблонах документов](./templates/index.md) загружают файл `.docx`, привязывают его к нумератору, региону и типам CRM-объектов. В [Документах](./documents/index.md) создают документ по шаблону или загружают готовый файл, получают ссылки на файл, включают публичную ссылку, изменяют или удаляют документ.

Например, можно создать нумератор для сделок, привязать его к шаблону сделки и затем создавать документы для конкретных сделок.

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация:
> - [Документы в CRM: как создать и отправить за пару минут](https://helpdesk.bitrix24.ru/open/19098306/)
> - [Шаблоны документов в CRM: как быстро отправлять счета и акты](https://helpdesk.bitrix24.ru/open/18089278/)
> - [Как создать и настроить нумератор документов в CRM](https://helpdesk.bitrix24.ru/open/26643774/)

## Как начать работу

1. Создайте нумератор методом [crm.documentgenerator.numerator.add](./numerator/crm-document-generator-numerator-add.md) — он задает шаблон номера для документов
2. Подготовьте файл шаблона `.docx` в формате Base64 — [Как загружать файлы](../../files/how-to-upload-files.md)
3. Определите `entityTypeId` нужного CRM-объекта — типовые значения приведены в статье [Особенности передаваемых значений](../index.md)
4. Загрузите шаблон методом [crm.documentgenerator.template.add](./templates/crm-document-generator-template-add.md): передайте название, файл, `numeratorId`, `entityTypeId` и `region`
5. Получите `entityId` нужного CRM-объекта методом [crm.item.list](../universal/crm-item-list.md)
6. Выберите способ работы с документом:
   - чтобы создать документ по шаблону, используйте [crm.documentgenerator.document.add](./documents/crm-document-generator-document-add.md)
   - чтобы загрузить готовый файл, используйте [crm.documentgenerator.document.upload](./documents/crm-document-generator-document-upload.md)

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить шаблон и создать документ на его основе](../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

{% endnote %}

## Что важно учитывать

- При создании документа по шаблону привязка шаблона к воронке сделки автоматически не проверяется — документ создается, даже если шаблон настроен для другой воронки
- Ссылки `pdfUrl` и `imageUrl` могут отсутствовать сразу после создания или обновления документа, так как конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос методом [crm.documentgenerator.document.get](./documents/crm-document-generator-document-get.md) через 30-40 секунд.

## Связь с другими объектами

**Нумераторы.** Нумератор задает шаблон номера и счетчик документов. Шаблон документа использует его через параметр `numeratorId`. Если создаете новый нумератор, возьмите `id` из ответа [crm.documentgenerator.numerator.add](./numerator/crm-document-generator-numerator-add.md). Если используете существующий, получите `id` методом [crm.documentgenerator.numerator.list](./numerator/crm-document-generator-numerator-list.md).

**Шаблоны документов.** Шаблон хранит файл `.docx`, регион, привязку к типам CRM-объектов и связь с нумератором. Для создания документа нужен `templateId` — возьмите `id` из ответа [crm.documentgenerator.template.add](./templates/crm-document-generator-template-add.md) или `id` нужного шаблона из ответа [crm.documentgenerator.template.list](./templates/crm-document-generator-template-list.md).

**Документы.** Документ создают по шаблону методом [crm.documentgenerator.document.add](./documents/crm-document-generator-document-add.md) или загружают готовый файл методом [crm.documentgenerator.document.upload](./documents/crm-document-generator-document-upload.md) — в обоих случаях документ прикрепляют к CRM-объекту.

**CRM-объекты.** Шаблоны и документы используют `entityTypeId` и `entityId`. Типовые значения `entityTypeId` для CRM-объектов приведены в статье [Особенности передаваемых значений](../index.md). Для смарт-процессов `entityTypeId` можно получить методом [crm.type.list](../universal/user-defined-object-types/crm-type-list.md). Идентификатор нужного объекта `entityId` получают методом [crm.item.list](../universal/crm-item-list.md).

**Регионы.** Шаблон привязывают к стране через параметр `region`. Значение `region` передают в методе [crm.documentgenerator.template.add](./templates/crm-document-generator-template-add.md), например `ru`. Список доступных регионов можно получить методом [documentgenerator.region.list](../../document-generator/region/document-generator-region-list.md).

**Файлы.** В шаблонах используют файл `.docx`, а в методе [crm.documentgenerator.document.upload](./documents/crm-document-generator-document-upload.md) передают содержимое готового DOCX-файла в Base64. Формат загрузки описан в статье [Как загружать файлы](../../files/how-to-upload-files.md).


## Обзор методов и событий {#all-methods}

> Scope: [`crm`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

### Нумераторы

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.numerator.add](./numerator/crm-document-generator-numerator-add.md) | Добавляет новый нумератор ||
|| [crm.documentgenerator.numerator.update](./numerator/crm-document-generator-numerator-update.md) | Обновляет существующий нумератор ||
|| [crm.documentgenerator.numerator.get](./numerator/crm-document-generator-numerator-get.md) | Возвращает информацию о нумераторе по идентификатору ||
|| [crm.documentgenerator.numerator.list](./numerator/crm-document-generator-numerator-list.md) | Возвращает список нумераторов ||
|| [crm.documentgenerator.numerator.delete](./numerator/crm-document-generator-numerator-delete.md) | Удаляет нумератор ||
|#

### Шаблоны документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.template.add](./templates/crm-document-generator-template-add.md) | Добавляет новый шаблон ||
|| [crm.documentgenerator.template.update](./templates/crm-document-generator-template-update.md) | Обновляет существующий шаблон ||
|| [crm.documentgenerator.template.get](./templates/crm-document-generator-template-get.md) | Возвращает информацию о шаблоне по идентификатору ||
|| [crm.documentgenerator.template.list](./templates/crm-document-generator-template-list.md) | Возвращает список шаблонов ||
|| [crm.documentgenerator.template.delete](./templates/crm-document-generator-template-delete.md) | Удаляет шаблон ||
|| [crm.documentgenerator.template.getfields](./templates/crm-document-generator-template-get-fields.md) | Возвращает поля шаблона для указанного CRM-объекта ||
|#

### Документы

{% list tabs %}

- Методы

    #|
    || **Метод** | **Описание** ||
    || [crm.documentgenerator.document.add](./documents/crm-document-generator-document-add.md) | Создает документ по шаблону ||
    || [crm.documentgenerator.document.update](./documents/crm-document-generator-document-update.md) | Обновляет документ ||
    || [crm.documentgenerator.document.get](./documents/crm-document-generator-document-get.md) | Возвращает информацию о документе ||
    || [crm.documentgenerator.document.list](./documents/crm-document-generator-document-list.md) | Возвращает список документов ||
    || [crm.documentgenerator.document.delete](./documents/crm-document-generator-document-delete.md) | Удаляет документ ||
    || [crm.documentgenerator.document.enablepublicurl](./documents/crm-document-generator-document-enable-public-url.md) | Включает или выключает публичную ссылку ||
    || [crm.documentgenerator.document.upload](./documents/crm-document-generator-document-upload.md) | Загружает готовый документ и прикрепляет его к CRM-объекту ||
    || [crm.documentgenerator.document.getfields](./documents/crm-document-generator-document-get-fields.md) | Возвращает поля созданного документа ||
    |#

- События

    #|
    || **Событие** | **Вызывается** ||
    || [onCrmDocumentGeneratorDocumentAdd](./documents/events/on-crm-document-generator-document-add.md) | При генерации документа вручную или методом [crm.documentgenerator.document.add](./documents/crm-document-generator-document-add.md) ||
    || [onCrmDocumentGeneratorDocumentUpdate](./documents/events/on-crm-document-generator-document-update.md) | При изменении документа вручную или методом [crm.documentgenerator.document.update](./documents/crm-document-generator-document-update.md) ||
    || [onCrmDocumentGeneratorDocumentDelete](./documents/events/on-crm-document-generator-document-delete.md) | При удалении документа вручную или методом [crm.documentgenerator.document.delete](./documents/crm-document-generator-document-delete.md) ||
    |#

{% endlist %}
