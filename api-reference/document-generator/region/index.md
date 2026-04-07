# Регионы в генераторе документов: обзор методов

Регионы задают локальные настройки шаблонов генератора документов. С их помощью можно настроить:
-  язык региона
-  форматы даты и даты со временем
-  шаблон полного имени
-  набор локализованных фраз для документа

В системе есть два типа регионов: предустановленные и пользовательские. Предустановленный регион содержит готовый набор настроек. Пользовательский регион позволяет задать собственные настройки.

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите список доступных регионов методом [documentgenerator.region.list](./document-generator-region-list.md)
2. Если подходит предустановленный регион, используйте его код при [создании шаблона](../templates/document-generator-template-add.md) или [изменении шаблона](../templates/document-generator-template-update.md) документов.
3. Если нужны свои локальные настройки, создайте пользовательский регион методом [documentgenerator.region.add](./document-generator-region-add.md)
4. Получите настройки нужного региона методом [documentgenerator.region.get](./document-generator-region-get.md)
5. Измените параметры пользовательского региона методом [documentgenerator.region.update](./document-generator-region-update.md)
6. Удалите ненужный пользовательский регион методом [documentgenerator.region.delete](./document-generator-region-delete.md)

## Какие регионы доступны

Метод [documentgenerator.region.list](./document-generator-region-list.md) возвращает два типа регионов:

1. Предустановленные регионы с символьным кодом, например `ru` или `en`. В ответе метода код указывается в поле `code`.

   ```json
   "fr": {
   	"code": "fr",
   	"title": "Франция",
   	"languageId": "fr"
   },
   ```

2. Пользовательские регионы с числовым идентификатором, например `5`. В ответе метода идентификатор указывается в поле `id`.

   ```json
   "1": {
   	"id": "1",
   	"title": "Россия (Пользовательский)",
   	"languageId": "ru",
   	"formatDate": "DD.MM.YYYY",
   	"formatDatetime": "DD.MM.YYYY HH:MI:SS",
   	"formatName": "#LAST_NAME# #NAME# #SECOND_NAME#",
   	"code": "1"
   }
   ```

## Связь регионов с другими объектами

**Шаблоны документов.** Значение региона хранится в данных шаблона и задает локальные настройки, которые будут использоваться при работе с этим шаблоном. Чтобы привязать регион к шаблону, нужно передать значение в поле `region` при создании шаблона методом [documentgenerator.template.add](../templates/document-generator-template-add.md). Для предустановленного региона используйте `code`, а для пользовательского региона `id`. Изменить регион шаблона можно методом [documentgenerator.template.update](../templates/document-generator-template-update.md).


## Что учитывать при изменении и удалении региона

Методы [documentgenerator.region.update](./document-generator-region-update.md) и [documentgenerator.region.delete](./document-generator-region-delete.md) работают только с пользовательскими регионами.

Удаление региона методом [documentgenerator.region.delete](./document-generator-region-delete.md) может завершиться ошибкой, если к нему привязаны шаблоны. Переназначьте шаблоны на другой регион или удалите ненужные шаблоны.

## Обзор методов  {#all-methods}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.region.add](./document-generator-region-add.md) | Добавляет пользовательский регион ||
|| [documentgenerator.region.update](./document-generator-region-update.md) | Обновляет пользовательский регион ||
|| [documentgenerator.region.get](./document-generator-region-get.md) | Возвращает данные региона по идентификатору или коду ||
|| [documentgenerator.region.list](./document-generator-region-list.md) | Возвращает список предустановленных и пользовательских регионов ||
|| [documentgenerator.region.delete](./document-generator-region-delete.md) | Удаляет пользовательский регион ||
|#
