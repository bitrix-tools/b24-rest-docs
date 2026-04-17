# Нумераторы: обзор методов

Нумератор задает шаблон номера и настройки счетчика для документов CRM. Например, нумератор с шаблоном `INV-{NUMBER}` присваивает документам номера вида `INV-1`, `INV-2`.

Нумератор — предварительный шаг: его создают один раз и привязывают к шаблону документа через `numeratorId`. Несколько шаблонов могут использовать один нумератор — тогда они разделяют один счетчик.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить нумератор документов в CRM](https://helpdesk.bitrix24.ru/open/26643774/)

## Как начать работу

1. Создайте нумератор методом [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md)
2. Если используете уже созданный нумератор, получите список нумераторов и их идентификаторы методом [crm.documentgenerator.numerator.list](./crm-document-generator-numerator-list.md)
3. Если знаете `id` нумератора и хотите проверить его настройки, используйте метод [crm.documentgenerator.numerator.get](./crm-document-generator-numerator-get.md)
4. Передайте `numeratorId` в шаблон документа:
   - если создаете новый шаблон, используйте метод [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md)
   - если изменяете существующий шаблон, используйте метод [crm.documentgenerator.template.update](../templates/crm-document-generator-template-update.md)
5. Если нужно изменить настройки нумератора, используйте метод [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md)
6. Удалите ненужный нумератор методом [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md)

## Что важно учитывать

Методы [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md) и [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md) работают только с нумераторами, созданными методом [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md).

## Связь с другими объектами

**Шаблоны документов.** Нумератор привязывают к шаблону через параметр `numeratorId` в методах [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md) и [crm.documentgenerator.template.update](../templates/crm-document-generator-template-update.md).

**Документы.** Номер документа формирует метод [crm.documentgenerator.document.add](../documents/crm-document-generator-document-add.md) при создании документа по шаблону. Если нумератор не возвращает следующий номер при генерации, метод вернет ошибку.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом «изменения» шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md) | Добавляет новый нумератор ||
|| [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md) | Обновляет существующий нумератор ||
|| [crm.documentgenerator.numerator.get](./crm-document-generator-numerator-get.md) | Возвращает информацию о нумераторе по идентификатору ||
|| [crm.documentgenerator.numerator.list](./crm-document-generator-numerator-list.md) | Возвращает список нумераторов ||
|| [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md) | Удаляет нумератор ||
|#
