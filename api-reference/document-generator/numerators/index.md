# Нумераторы: обзор методов

Методы раздела позволяют создавать, изменять, получать и удалять нумераторы документов.

Нумератор определяет правило формирования номера документа:
- шаблон номера, например `DG-{NUMBER}` или `INV-{NUMBER}`
- параметры генерации числа в плейсхолдере `{NUMBER}`: стартовое значение, шаг и дополнительные настройки генератора

Созданный нумератор используется в шаблонах документов через поле `numeratorId` метода [documentgenerator.template.add](../templates/document-generator-template-add.md).

Особенности REST-методов documentgenerator.numerator.*:
- метод [documentgenerator.numerator.list](./document-generator-numerator-list.md) возвращает все нумераторы типа генератора документов, доступные в текущем Битрикс24
- методы [documentgenerator.numerator.update](./document-generator-numerator-update.md) и [documentgenerator.numerator.delete](./document-generator-numerator-delete.md) работают только для нумераторов, созданных через [documentgenerator.numerator.add](./document-generator-numerator-add.md)

> Scope: [`documentgenerator`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правом на изменение шаблонов генератора документов

#|
|| [documentgenerator.numerator.add](./document-generator-numerator-add.md) | Добавляет нумератор ||
|| [documentgenerator.numerator.update](./document-generator-numerator-update.md) | Изменяет нумератор ||
|| [documentgenerator.numerator.get](./document-generator-numerator-get.md) | Получает нумератор по идентификатору ||
|| [documentgenerator.numerator.list](./document-generator-numerator-list.md) | Получает список нумераторов ||
|| [documentgenerator.numerator.delete](./document-generator-numerator-delete.md) | Удаляет нумератор ||
|#
