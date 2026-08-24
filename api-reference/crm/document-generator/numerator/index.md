# Нумераторы: обзор методов

Нумератор задает шаблон номера и настройки счетчика для документов CRM. Например, нумератор с шаблоном `INV-{NUMBER}` присваивает документам номера вида `INV-1`, `INV-2`.

Нумератор — предварительный шаг: его создают один раз и привязывают к шаблону документа через `numeratorId`. Несколько шаблонов могут использовать один нумератор — тогда они разделяют один счетчик.

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как создать и настроить нумератор документов в CRM](https://helpdesk.bitrix24.ru/open/26643774/)

## Как начать работу

1. Создайте нумератор методом [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md) — передайте название и шаблон номера. Если нумератор уже есть, найдите его `id` методом [crm.documentgenerator.numerator.list](./crm-document-generator-numerator-list.md)
2. Передайте полученный `id` как `numeratorId` в [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md) при загрузке шаблона или в [crm.documentgenerator.template.update](../templates/crm-document-generator-template-update.md) для уже загруженного шаблона
3. Создайте документ по этому шаблону методом [crm.documentgenerator.document.add](../documents/crm-document-generator-document-add.md) — номер подставится автоматически

## Из чего состоит нумератор

- **Шаблон номера.** Строка с плейсхолдерами, например `INV-{NUMBER}`. Плейсхолдер `{NUMBER}` заменяется на значение счетчика
- **Настройки счетчика.** Задают начальное значение и шаг счетчика, минимальную длину номера и период сброса — день, месяц, год или без сброса

Точный список плейсхолдеров и настроек описан в параметрах метода [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md).

## Что важно учитывать

- Методы [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md) и [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md) работают только с нумераторами, созданными методом [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md). Нумераторы, созданные в интерфейсе Битрикс24, изменить или удалить через REST нельзя
- Нумераторы генератора документов в CRM и нумераторы раздела [Генератор документов](../../../document-generator/numerators/index.md) — разные группы методов. Для CRM-документов используйте `crm.documentgenerator.numerator.*`

## Связь с другими объектами

**Шаблоны документов.** Нумератор привязывают к шаблону через параметр `numeratorId` в методах [crm.documentgenerator.template.add](../templates/crm-document-generator-template-add.md) и [crm.documentgenerator.template.update](../templates/crm-document-generator-template-update.md).

**Документы.** Номер документа формирует метод [crm.documentgenerator.document.add](../documents/crm-document-generator-document-add.md) при создании документа по шаблону. Если нумератор не возвращает следующий номер при генерации, метод вернет ошибку.

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с правом на изменение шаблонов генератора документов

#|
|| **Метод** | **Описание** ||
|| [crm.documentgenerator.numerator.add](./crm-document-generator-numerator-add.md) | Добавляет новый нумератор ||
|| [crm.documentgenerator.numerator.update](./crm-document-generator-numerator-update.md) | Обновляет существующий нумератор ||
|| [crm.documentgenerator.numerator.get](./crm-document-generator-numerator-get.md) | Возвращает информацию о нумераторе по идентификатору ||
|| [crm.documentgenerator.numerator.list](./crm-document-generator-numerator-list.md) | Возвращает список нумераторов ||
|| [crm.documentgenerator.numerator.delete](./crm-document-generator-numerator-delete.md) | Удаляет нумератор ||
|#
