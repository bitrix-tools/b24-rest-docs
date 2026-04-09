# Шаблоны в генераторе документов: обзор методов

Шаблон задает основу для создания документа: файл в формате `.docx` с плейсхолдерами, регион, нумератор и настройки.

> Быстрый переход: [все методы](#all-methods)

## Каким должен быть файл шаблона

Файл шаблона должен быть в формате `.docx` и содержать плейсхолдеры полей, которые генератор документов заменит данными при создании документа.

Значения для подстановки оформляются в фигурных скобках, например `{DocumentNumber}` или `{MyField}`.

Поддерживаются типы полей `IMAGE`, `STAMP`, `DATE` и `NAME`. Поля типа Деньги и Адрес относятся к модулю CRM, поэтому в REST-шаблоне такие значения нужно передавать уже в подготовленном виде.

## Как начать работу

1. Подготовьте файл шаблона `.docx`
2. Получите или создайте нумератор в разделе [Нумераторы](../numerators/index.md)
3. Выберите предустановленный регион или создайте пользовательский в разделе [Регионы](../region/index.md)
4. Создайте шаблон методом [documentgenerator.template.add](./document-generator-template-add.md)
5. Измените шаблон методом [documentgenerator.template.update](./document-generator-template-update.md), если нужно обновить файл или настройки
6. Проверьте данные шаблона методом [documentgenerator.template.get](./document-generator-template-get.md) или найдите его в списке через [documentgenerator.template.list](./document-generator-template-list.md)
7. Получите карточку полей шаблона методом [documentgenerator.template.getfields](./document-generator-template-get-fields.md)
8. Используйте идентификатор шаблона при [создании нового документа](../document-generator-document-add.md)

## Связь шаблонов с другими объектами

**Документы.** Шаблон используется как основа для документа. Идентификатор шаблона `templateId` передается в методы работы с документами `documentgenerator.document.*`. Создать документ по шаблону можно методом [documentgenerator.document.add](../document-generator-document-add.md).

**Нумераторы.** Шаблон связан с нумератором через поле `numeratorId`. Получить доступные нумераторы можно методом [documentgenerator.numerator.list](../numerators/document-generator-numerator-list.md), а создать новый — методом [documentgenerator.numerator.add](../numerators/document-generator-numerator-add.md).

**Регионы.** Локальные настройки шаблона задаются полем `region`. Нужное значение для этого поля можно получить методом [documentgenerator.region.list](../region/document-generator-region-list.md).

**Роли и права.** Методы `documentgenerator.template.*` доступны пользователю с правом на изменение шаблонов генератора документов. Права на работу с шаблонами настраиваются через раздел [Роли](../role/index.md).

## Что учитывать при работе с шаблонами

Все шаблоны этого раздела создаются в scope `documentgenerator` и относятся к модулю `rest`. Поле `moduleId` для них всегда остается `rest`, поэтому через эти методы нельзя управлять шаблонами других модулей.

При создании шаблона провайдеры для REST-сценария заполняются автоматически. Базовый провайдер — `Bitrix\DocumentGenerator\DataProvider\Rest`. Для передачи массивов в таблицы и повторяющиеся блоки используется `Bitrix\DocumentGenerator\DataProvider\HashDataProvider`.

Поля `users`, `active` и `sort` относятся к настройкам самого приложения. Они помогают управлять видимостью и порядком шаблонов в собственном интерфейсе приложения, но не создают готовый пользовательский интерфейс на стороне Битрикс24.

## Особенности удаленных шаблонов

Если по шаблону уже созданы документы, метод [documentgenerator.template.delete](./document-generator-template-delete.md) не удаляет его полностью, а помечает как удаленный. Такие шаблоны можно получить через [documentgenerator.template.list](./document-generator-template-list.md) с фильтром `isDeleted = "Y"`. Это позволяет сохранить привязки документов.

Для удаленных шаблонов нельзя получить карточку полей методом [documentgenerator.template.getfields](./document-generator-template-get-fields.md), поэтому перед дальнейшей обработкой стоит проверить значение `isDeleted`.

## Обзор методов {#all-methods}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.template.add](./document-generator-template-add.md) | Загружает новый шаблон документа ||
|| [documentgenerator.template.update](./document-generator-template-update.md) | Обновляет существующий шаблон документа ||
|| [documentgenerator.template.get](./document-generator-template-get.md) | Возвращает шаблон документа по идентификатору ||
|| [documentgenerator.template.list](./document-generator-template-list.md) | Возвращает список шаблонов документов по фильтру ||
|| [documentgenerator.template.delete](./document-generator-template-delete.md) | Удаляет шаблон документа ||
|| [documentgenerator.template.getfields](./document-generator-template-get-fields.md) | Возвращает карточку полей шаблона ||
|#
