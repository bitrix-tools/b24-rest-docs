# О генераторе документов

{% note warning "Мы еще обновляем эту страницу" %}

Тут может не хватать некоторых данных — дополним в ближайшее время

{% endnote %}

> Быстрый переход: [все методы](#all-methods) 

На данный момент есть **два scope** для работы с генератором документов:
- Методы `crm.documentgenerator.*`. Результаты работы этих методов отображаются в интерфейсе CRM;
- Методы `documentgenerator.*`. Результат работы этих методов доступен только на уровне REST.

Из методов одного scope нельзя получить доступ к данным другого:
- Нельзя создать документ CRM с шаблоном для REST;
- Нельзя использовать данные CRM при работе с методами documentgenerator.*.

Поддерживаются следующие **типы полей** и их **модификаторы**:

- IMAGE - изображения;
- STAMP - печати и подписи;
- DATE - даты;
- NAME - имена.

Типы полей **Деньги** и **Адрес** реализованы внутри модуля *crm*, поэтому использовать их в REST этого модуля не получится. Если надо вывести такие данные - придётся передавать их в уже сформированном виде.

Есть возможность использовать массивы для вставки в таблицы и повторяющиеся блоки.

## Отличие параметров методов разных scope

“Изнутри” методы идентичны. По факту методы `crm.documentgenerator.*` после пред-обработки параметров вызывают методы `documentgenerator.*`. Но есть ряд отличий:
- На вход методов `crm.documentgenerator.*` необходимо вместо имен провайдеров передавать **ID** типа сущности CRM (параметр `entityTypeId`);
- На вход методов `crm.documentgenerator.*` необходимо вместо параметра **value** передавать параметр `entityId` - **ID** сущности CRM

## Шаблоны

Все создаваемые этим api шаблоны и документы привязаны к модулю REST. Через scope `documentgenerator` нельзя обращаться к шаблонам и документам других модулей. Поэтому `moduleId` в данных о шаблоне всегда будет `rest`. Даже если в `add` или `update` указать другой модуль, он не будет изменён.

Для работы REST доступны только два провайдера:

- `Bitrix\DocumentGenerator\DataProvider\Rest` - всегда должен быть указан в качестве провайдера для шаблона
- `Bitrix\DocumentGenerator\DataProvider\HashDataProvider` - используется для передачи данных в таблицы / повторяющиеся блоки

Привязка шаблона к пользователю самими REST-методами никак не учитывается. Но её можно использовать на стороне приложения.

## Нумераторы

Для работы с нумераторами есть методы `documentgenerator.numerator.*`, описанные [тут](./numerators/index.md). Следует учесть, что через данный скоуп есть возможность получить доступ ко всем нумераторам для документов. В том числе к тем, которые работают в CRM. Но через REST обновить / удалить можно только тот нумератор, который был создан через REST.

## Список регионов

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

Начиная с версии documentgenerator 18.6.1 появилась возможность добавлять свои регионы. Для управления ими появился [отдельный раздел](./region/index.md).

## Итоги

**Что сделать можно?**

- Создать документы на основе шаблонов в формате .docx файлов;
- В шаблон можно вставить списки с произвольным количеством элементов через таблицы или повторяющиеся блоки;
- В шаблон можно вставить изображения, в том числе из списков;
- Вставить поля в виде html с частичным сохранением форматирования;
- Создать документы, отправить их и отследить просмотр без участия пользователя (через роботов).

**Что сделать нельзя?**

- Вставить множественное значение поля типа «файл»;
- Вставить таблицы и изображения из html;
- Вставить векторные изображения;
- Передача форматирование выполняется не полностью.

## Обзор методов и событий {#all-methods}

### Документы

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.document.add](./document-generator-document-add.md) | Создает новый документ на основании шаблона ||
|| [documentgenerator.document.delete](./document-generator-document-delete.md) | Удаляет документ ||
|| [documentgenerator.document.enablepublicurl](./document-generator-document-enable-public-url.md) | Включает/выключает публичную ссылку на документ ||
|| [documentgenerator.document.getfields](./document-generator-document-get-fields.md) | Получает список полей документов ||
|| [documentgenerator.document.get](./document-generator-document-get.md) | Получает документ по идентификатору ||
|| [documentgenerator.document.list](./document-generator-document-list.md) | Получает список документов ||
|| [documentgenerator.document.update](./document-generator-document-update.md) | Изменяет существующий документ ||
|#

### Нумератор

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.numerator.add](./numerators/document-generator-numerator-add.md) | Добавляет нумератор ||
|| [documentgenerator.numerator.delete](./numerators/document-generator-numerator-delete.md) | Удаляет нумератор ||
|| [documentgenerator.numerator.get](./numerators/document-generator-numerator-get.md) | Получает нумератор по идентификатору ||
|| [documentgenerator.numerator.list](./numerators/document-generator-numerator-list.md) | Получает список нумераторов ||
|| [documentgenerator.numerator.update](./numerators/document-generator-numerator-update.md) | Изменяет нумератор ||
|#

### Регионы

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.region.get](./region/document-generator-region-get.md) | Возвращает информацию о регионе по его идентификатору ||
|| [documentgenerator.region.list](./region/document-generator-region-list.md) | Возвращает список регионов, как установленных по умолчанию, так и пользовательских ||
|| [documentgenerator.region.delete](./region/document-generator-region-delete.md) | Удаляет регион ||
|| [documentgenerator.region.add](./region/document-generator-region-add.md) | Добавляет новый регион ||
|| [documentgenerator.region.update](./region/document-generator-region-update.md) | Обновляет существующую страну ||
|#

### Роли

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.role.get](./role/document-generator-role-get.md) | Отдает информацию о роли и её правах доступа ||
|| [documentgenerator.role.list](./role/document-generator-role-list.md) | Возвращает список ролей без их прав доступа ||
|| [documentgenerator.role.delete](./role/document-generator-role-delete.md) | Удаляет роль ||
|| [documentgenerator.role.add](./role/document-generator-role-add.md) | Добавляет новую роль ||
|| [documentgenerator.role.update](./role/document-generator-role-update.md) | Обновляет роли ||
|| [documentgenerator.role.fillaccesses](./role/document-generator-role-fill-accesses.md) | Устанавливает набор ролей и их привязок ||
|#

### Шаблоны

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.template.add](./templates/document-generator-template-add.md) | Загружает новый шаблон документа ||
|| [documentgenerator.template.update](./templates/document-generator-template-update.md) | Обновляет существующий шаблон документа ||
|| [documentgenerator.template.get](./templates/document-generator-template-get.md) | Возвращает шаблон документа по идентификатору ||
|| [documentgenerator.template.list](./templates/document-generator-template-list.md) | Возвращает список шаблонов документов по фильтру ||
|| [documentgenerator.template.delete](./templates/document-generator-template-delete.md) | Удаляет шаблон документа ||
|| [documentgenerator.template.getfields](./templates/document-generator-template-get-fields.md) | Возвращает перечень полей шаблонов документов ||
|#