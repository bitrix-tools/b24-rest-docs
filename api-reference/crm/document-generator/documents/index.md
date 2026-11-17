# Документы: обзор методов

Документ в CRM можно создать по шаблону `.docx` и данным CRM-объекта или загрузить как готовый файл. Для документа также могут быть доступны PDF и изображение для предпросмотра.

Документ привязан к конкретному объекту CRM, например сделке, лиду, контакту, компании, счету, коммерческому предложению или элементу смарт-процесса. Привязку задают пары `entityTypeId` и `entityId`.

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

Чтобы создать документ по шаблону, получите `templateId` в разделе [Шаблоны документов](../templates/index.md), определите `entityTypeId` и `entityId` CRM-объекта и вызовите [crm.documentgenerator.document.add](./crm-document-generator-document-add.md).

Если файл уже готов, используйте [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) и передайте параметры загрузки в `fields`. Идентификатор созданного документа находится в `result.document.id`.

Чтобы подставить в документ собственные значения, передайте их в параметре `values` метода `crm.documentgenerator.document.add`. Список допустимых ключей для конкретного документа возвращает [crm.documentgenerator.document.getfields](./crm-document-generator-document-get-fields.md).

{% note tip "Частые кейсы и сценарии" %}

- [Как добавить шаблон и создать документ на его основе](../../../../tutorials/crm/how-to-add-crm-objects/how-to-generate-documents.md)

{% endnote %}

## Как поделиться документом

По умолчанию документ доступен только сотрудникам с правами на CRM-объект. Метод [crm.documentgenerator.document.enablepublicurl](./crm-document-generator-document-enable-public-url.md) включает публичную ссылку — по ней документ откроется без авторизации в Битрикс24. Этот же метод выключает ссылку обратно.

## Что важно учитывать

- Ссылки `pdfUrl` и `imageUrl` могут отсутствовать сразу после создания или обновления документа, так как конвертация выполняется асинхронно. Если ссылки нужны сразу, повторите запрос методом [crm.documentgenerator.document.get](./crm-document-generator-document-get.md) через 30-40 секунд
- Для методов документов нужно право на просмотр документов. Для `add` дополнительно проверяется право на создание документа по шаблону; для `update`, `delete`, `getfields` и `enablepublicurl` — право на изменение конкретного документа. Для методов, принимающих документ, также проверяется доступ к нему
- При загрузке готового файла метод `upload` возвращает ошибку, начинающуюся с `Empty required fields:`, если пропущены обязательные поля, или `Wrong "entityTypeId" field value`, если тип CRM-объекта некорректен. Подробнее — в [описании метода](./crm-document-generator-document-upload.md)
- Методы `crm.documentgenerator.document.*` работают с документами CRM. Если документ не связан с объектом CRM, используйте методы раздела [Генератор документов](../../../document-generator/index.md)

## Связь с другими объектами

**Шаблоны документов.** Получите идентификатор шаблона методом [crm.documentgenerator.template.list](../templates/crm-document-generator-template-list.md).

**CRM-объекты.** Для создания или загрузки документа передают `entityTypeId` и `entityId`. Значения `entityTypeId` для стандартных объектов приведены в таблице [Тип объекта CRM](../../data-types.md#object_type). Для смарт-процессов `entityTypeId` можно получить методом [crm.type.list](../../universal/user-defined-object-types/crm-type-list.md). Идентификатор нужного объекта `entityId` можно получить методом [crm.item.list](../../universal/crm-item-list.md) для поддерживаемых им типов объектов; для счетов старого типа используйте [crm.invoice.list](../../outdated/invoice/crm-invoice-list.md).

**Нумераторы.** Номер документа формируется с учетом нумератора, привязанного к шаблону. Подробнее о настройке — в разделе [Нумераторы](../numerator/index.md).

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
    || [onCrmDocumentGeneratorDocumentAdd](./events/on-crm-document-generator-document-add.md) | При создании документа вручную или методом [crm.documentgenerator.document.add](./crm-document-generator-document-add.md), а также при загрузке готового документа методом [crm.documentgenerator.document.upload](./crm-document-generator-document-upload.md) ||
    || [onCrmDocumentGeneratorDocumentUpdate](./events/on-crm-document-generator-document-update.md) | При изменении документа вручную или методом [crm.documentgenerator.document.update](./crm-document-generator-document-update.md) ||
    || [onCrmDocumentGeneratorDocumentDelete](./events/on-crm-document-generator-document-delete.md) | При попытке удаления документа вручную или методом [crm.documentgenerator.document.delete](./crm-document-generator-document-delete.md). Событие формируется до завершения удаления ||
    |#

{% endlist %}

Подписка и данные уведомлений описаны в [обзоре событий документов](./events/index.md).
