# Нумераторы: обзор методов

Нумераторы задают правила формирования номеров документов:
- шаблон номера, например `DG-{NUMBER}` или `INV-{NUMBER}`
- параметры генерации числа в плейсхолдере `{NUMBER}`: стартовое значение, шаг и дополнительные настройки генератора

> Быстрый переход: [все методы](#all-methods)

## Как начать работу

1. Получите список доступных нумераторов методом [documentgenerator.numerator.list](./document-generator-numerator-list.md)
2. Если нужен собственный нумератор, создайте его методом [documentgenerator.numerator.add](./document-generator-numerator-add.md)
3. Получите настройки нумератора по идентификатору методом [documentgenerator.numerator.get](./document-generator-numerator-get.md)
4. Передайте идентификатор нумератора в поле `numeratorId` [при создании шаблона](../templates/document-generator-template-add.md) или [изменении шаблона](../templates/document-generator-template-update.md)
5. Измените параметры пользовательского нумератора методом [documentgenerator.numerator.update](./document-generator-numerator-update.md)
6. Удалите ненужный пользовательский нумератор методом [documentgenerator.numerator.delete](./document-generator-numerator-delete.md)

{% note info " " %}

Метод [documentgenerator.numerator.list](./document-generator-numerator-list.md) возвращает все нумераторы, доступные в текущем Битрикс24, в том числе [CRM нумераторы](../../crm/document-generator/numerator/index.md).

{% endnote %}

## Связь нумераторов с другими объектами

**Шаблоны документов.** Нумератор связан с шаблоном через поле `numeratorId`. Чтобы назначить шаблону нумератор, передайте идентификатор нумератора в методы [documentgenerator.template.add](../templates/document-generator-template-add.md) или [documentgenerator.template.update](../templates/document-generator-template-update.md).

Идентификатор нумератора можно получить после создания или через метод [documentgenerator.numerator.list](./document-generator-numerator-list.md).

## Что учитывать при изменении и удалении нумератора

Методы [documentgenerator.numerator.update](./document-generator-numerator-update.md) и [documentgenerator.numerator.delete](./document-generator-numerator-delete.md) работают только для нумераторов, созданных через [documentgenerator.numerator.add](./document-generator-numerator-add.md).

## Обзор методов {#all-methods}

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [documentgenerator.numerator.add](./document-generator-numerator-add.md) | Добавляет нумератор ||
|| [documentgenerator.numerator.update](./document-generator-numerator-update.md) | Изменяет нумератор ||
|| [documentgenerator.numerator.get](./document-generator-numerator-get.md) | Получает нумератор по идентификатору ||
|| [documentgenerator.numerator.list](./document-generator-numerator-list.md) | Получает список нумераторов ||
|| [documentgenerator.numerator.delete](./document-generator-numerator-delete.md) | Удаляет нумератор ||
|#
