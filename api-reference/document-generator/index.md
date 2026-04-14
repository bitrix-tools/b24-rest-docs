# Генератор документов: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

Генератор документов собирает готовые документы по шаблонам `.docx` и данным приложения. Он помогает загружать шаблоны, получать карту их полей, создавать по ним документы и управлять настройками генерации.

> Быстрый переход: [все методы](#all-methods)

## Как выбрать сценарий

В Битрикс24 есть две группы методов для работы с генератором документов: `documentgenerator.*` и `crm.documentgenerator.*`.

Шаблон, документ и входные данные, созданные через `documentgenerator.*`, не дают доступа к данным CRM. Для CRM-сценариев используйте раздел [Генератор документов в CRM](../crm/document-generator/index.md).

#|
||  | Методы `documentgenerator.*` | Методы `crm.documentgenerator.*` ||
|| Где использовать | В REST-сценариях приложения, когда шаблоны и документы находятся в scope `documentgenerator` | В CRM-сценариях, когда документ связан с объектом CRM ||
|| Что передавать при генерации | 
- `value` — внешний ID объекта, для которого создается документ
- `providerClassName` — класс провайдера данных | 
- `entityId` — идентификатор объекта CRM
- `entityTypeId` — тип объекта CRM ||
|| Методы работы с шаблонами | [documentgenerator.template.*](./templates/index.md) | [crm.documentgenerator.template.*](../crm/document-generator/templates/index.md) ||
|| Где виден результат | На уровне REST и в логике приложения | В сценариях и интерфейсе CRM ||
|#

## Как начать работу

Чтобы работать с документами в REST-сценарии генератора документов:

1. Подготовьте файл шаблона `.docx` с плейсхолдерами полей
2. Создайте или выберите [нумератор](./numerators/index.md) и [регион](./region/index.md), если они нужны шаблону
3. Загрузите шаблон методами [documentgenerator.template.add](./templates/document-generator-template-add.md) или [documentgenerator.template.update](./templates/document-generator-template-update.md)
4. Получите карту полей шаблона методом [documentgenerator.template.getfields](./templates/document-generator-template-get-fields.md)
5. Создайте документ методом [documentgenerator.document.add](./document-generator-document-add.md)
6. Получите документ методом [documentgenerator.document.get](./document-generator-document-get.md), если нужно проверить его состояние и получить ссылки на файлы
7. Используйте [documentgenerator.document.list](./document-generator-document-list.md), если нужно найти документы по шаблону, внешнему идентификатору или другим полям
8. Включите публичную ссылку методом [documentgenerator.document.enablepublicurl](./document-generator-document-enable-public-url.md), если документ нужно открывать за пределами вашего Битрикс24
9. Обновите документ методом [documentgenerator.document.update](./document-generator-document-update.md) или удалите его методом [documentgenerator.document.delete](./document-generator-document-delete.md), если это требуется по сценарию
10. Настройте права через раздел [Роли и права](./role/index.md), если приложению нужно управлять доступом к шаблонам и документам

{% note tip "Частые кейсы и сценарии" %}

- [Частые кейсы и сценарии генератора документов: обзор кейсов](./examples/index.md)

{% endnote %}

## Связь с другими объектами

**Шаблоны документов.** Шаблон задает файл `.docx`, регион, нумератор и набор настроек, которые затем используются при создании документа. Для работы с шаблонами используйте группу методов [documentgenerator.template.*](./templates/index.md).

**Нумераторы.** Нумератор задает правило формирования номера документа, которое шаблон использует через поле `numeratorId`. Работать с нумераторами можно группой методов [documentgenerator.numerator.*](./numerators/index.md).

**Регионы.** Регион задает локальные настройки шаблона через поле `region`. Для предустановленного региона используйте `code`, для пользовательского — `id`. Управление регионами выполняется группой методов [documentgenerator.region.*](./region/index.md).

**Роли и права.** Права доступа определяют, кто может изменять шаблоны, документы и настройки генератора документов. Для настройки ролей используйте группу методов [documentgenerator.role.*](./role/index.md).

## Особенность конвертации документа в PDF

Конвертация файла в PDF выполняется асинхронно. Если поле `pdfUrl` не заполнено сразу после создания документа, вызовите метод [documentgenerator.document.get](./document-generator-document-get.md), чтобы проверить результат конвертации повторно.

## Обзор методов {#all-methods}

> Scope: [`documentgenerator`](../scopes/permissions.md)
>
> Кто может выполнять методы: в зависимости от метода

### Документы

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.document.add](./document-generator-document-add.md) | Создает новый документ на основании шаблона ||
|| [documentgenerator.document.update](./document-generator-document-update.md) | Изменяет существующий документ ||
|| [documentgenerator.document.get](./document-generator-document-get.md) | Получает документ по идентификатору ||
|| [documentgenerator.document.list](./document-generator-document-list.md) | Получает список документов ||
|| [documentgenerator.document.delete](./document-generator-document-delete.md) | Удаляет документ ||
|| [documentgenerator.document.enablepublicurl](./document-generator-document-enable-public-url.md) | Включает или выключает публичную ссылку на документ ||
|| [documentgenerator.document.getfields](./document-generator-document-get-fields.md) | Получает список полей документа ||
|#

### Шаблоны

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.template.add](./templates/document-generator-template-add.md) | Загружает новый шаблон документа ||
|| [documentgenerator.template.update](./templates/document-generator-template-update.md) | Обновляет существующий шаблон документа ||
|| [documentgenerator.template.get](./templates/document-generator-template-get.md) | Возвращает шаблон документа по идентификатору ||
|| [documentgenerator.template.list](./templates/document-generator-template-list.md) | Возвращает список шаблонов документов по фильтру ||
|| [documentgenerator.template.delete](./templates/document-generator-template-delete.md) | Удаляет шаблон документа ||
|| [documentgenerator.template.getfields](./templates/document-generator-template-get-fields.md) | Возвращает карту полей шаблона ||
|#

### Нумераторы

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.numerator.add](./numerators/document-generator-numerator-add.md) | Добавляет нумератор ||
|| [documentgenerator.numerator.update](./numerators/document-generator-numerator-update.md) | Изменяет нумератор ||
|| [documentgenerator.numerator.get](./numerators/document-generator-numerator-get.md) | Получает нумератор по идентификатору ||
|| [documentgenerator.numerator.list](./numerators/document-generator-numerator-list.md) | Получает список нумераторов ||
|| [documentgenerator.numerator.delete](./numerators/document-generator-numerator-delete.md) | Удаляет нумератор ||
|#

### Регионы

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.region.add](./region/document-generator-region-add.md) | Добавляет пользовательский регион ||
|| [documentgenerator.region.update](./region/document-generator-region-update.md) | Обновляет пользовательский регион ||
|| [documentgenerator.region.get](./region/document-generator-region-get.md) | Возвращает данные региона по идентификатору или коду ||
|| [documentgenerator.region.list](./region/document-generator-region-list.md) | Возвращает список предустановленных и пользовательских регионов ||
|| [documentgenerator.region.delete](./region/document-generator-region-delete.md) | Удаляет пользовательский регион ||
|#

### Роли и права

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.role.add](./role/document-generator-role-add.md) | Добавляет роль и возвращает ее данные с правами ||
|| [documentgenerator.role.update](./role/document-generator-role-update.md) | Обновляет роль и возвращает актуальные данные роли ||
|| [documentgenerator.role.get](./role/document-generator-role-get.md) | Возвращает роль по идентификатору вместе с правами ||
|| [documentgenerator.role.list](./role/document-generator-role-list.md) | Возвращает список ролей без детального состава прав ||
|| [documentgenerator.role.delete](./role/document-generator-role-delete.md) | Удаляет роль по идентификатору ||
|| [documentgenerator.role.fillaccesses](./role/document-generator-role-fill-accesses.md) | Полностью перезаписывает привязки ролей к кодам доступа ||
|#
