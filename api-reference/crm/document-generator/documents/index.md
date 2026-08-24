# Документы: обзор методов

Документ — файл, который [генератор документов](../index.md) собрал по шаблону `.docx` и данным CRM-объекта. Готовый документ хранится в Битрикс24 в трех форматах: исходный DOCX, PDF и картинка для предпросмотра.

Документ всегда привязан к конкретному объекту CRM — сделке, лиду, контакту, компании, счету, коммерческому предложению или элементу смарт-процесса. Привязку задают пары `entityTypeId` и `entityId`.

Например, по шаблону счета можно сгенерировать документ для сделки № 1042 и включить для него публичную ссылку, чтобы отправить клиенту.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все методы и события](#all-methods)
>
> Пользовательская документация: [Документы в CRM: как создать и отправить за пару минут](https://helpdesk.bitrix24.ru/open/19098306/)

## Как создать документ

1. Получите `templateId` — идентификатор шаблона из раздела [Шаблоны документов](../templates/index.md)
2. Определите `entityTypeId` и `entityId` CRM-объекта, для которого нужен документ
3. Создайте документ методом [crm.documentgenerator.document.add](./crm-document-generator-document-add.md). Если файл уже готов вне Битрикс24, загрузите его методом [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md)
4. Заберите из ответа `id` документа и ссылки на файлы

Чтобы подставить в документ собственные значения, передайте их в параметре `values` метода `crm.documentgenerator.document.add`. Список допустимых ключей для конкретного документа возвращает [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить шаблон и создать документ на его основе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

{% endnote %}

## Как поделиться документом

По умолчанию документ доступен только сотрудникам с правами на CRM-объект. Метод [crm.documentgenerator.document.enablepublicurl](./crm-document-generator-document-enable-public-url.md) включает публичную ссылку — по ней документ откроется без авторизации в Битрикс24. Этот же метод выключает ссылку обратно.

## Что важно учитывать

- Ссылки `pdfUrl` и `imageUrl` могут отсутствовать сразу после создания или обновления документа, так как конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос методом [crm.documentgenerator.document.get](./crm-document-generator-document-get.md) через 30-40 секунд
- Права проверяются по действию: для чтения и списка нужен доступ на просмотр документов, для [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) — на создание, для изменения и удаления — на изменение. Дополнительно проверяется доступ к самому документу
- Методы `crm.documentgenerator.document.*` работают с документами CRM. Если документ не связан с объектом CRM, используйте методы раздела [Генератор документов](../../../document-generator/index.md)

## Связь с другими объектами

**Шаблоны документов.** Для создания документа по шаблону передают `templateId` в метод [crm.documentgenerator.document.add](./crm-document-generator-document-add.md). Возьмите `templateId` из ответа [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md) или получите из списка методом [crm.documentgenerator.template.list](../templates/crm-document-generator-template-list.md).

**CRM-объекты.** Для создания или загрузки документа передают `entityTypeId` и `entityId`. Значения `entityTypeId` для стандартных объектов приведены в таблице [Тип объекта CRM](../../data-types.md#object_type). Для смарт-процессов `entityTypeId` можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Идентификатор нужного объекта `entityId` получают универсальным методом [crm.item.list](../../universal/crm-item-list.md).

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
    || [onCrmDocumentGeneratorDocumentAdd](./events/on-crm-document-generator-document-add.md) | При генерации документа вручную или методами [crm.documentgenerator.document.add](./crm-document-generator-document-add.md) и [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) ||
    || [onCrmDocumentGeneratorDocumentUpdate](./events/on-crm-document-generator-document-update.md) | При изменении документа вручную или методом [crm.documentgenerator.document.update](./crm-document-generator-document-update.md) ||
    || [onCrmDocumentGeneratorDocumentDelete](./events/on-crm-document-generator-document-delete.md) | При удалении документа вручную или методом [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md) ||
    |#

{% endlist %}
