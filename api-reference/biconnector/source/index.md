# Источники: обзор методов

Источник — это отдельное подключение к внешней системе в модуле BIconnector. Источник определяет, какие именно данные внешней системы будут доступны для использования в отчетах и аналитике Битрикс24.

> Быстрый переход: [все методы](#all-methods) 

{% note info "" %}

Методы работают только в контексте [приложения](../../../settings/app-installation/index.md)

{% endnote %}

## Связь источника с коннектором и датасетами

Источник регистрируется через коннектор. В иерархии модуля BIconnector источники занимают промежуточный уровень:
- **Коннектор** устанавливает связь с внешним источником данных.
- **Источник** определяет параметры доступа к данным.
- **Датасет** формирует итоговый набор данных, который можно использовать в отчетах и аналитике.

## Описание полей источника {#fields}

#|
|| **Название**
`тип` | **Описание** | Чтение | Запись ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор источника | ✅ | ❌ ||
|| **title**
[`string`](../../data-types.md) | Название источника | ✅ | ✅ ||
|| **type**
[`string`](../../data-types.md) | Тип источника, значение всегда равно `rest` | ✅ | ❌ ||
|| **code**
[`string`](../../data-types.md) | Код источника, служебное поле | ✅ | ❌ ||
|| **description**
[`string`](../../data-types.md) | Описание источника | ✅ | ✅ ||
|| **active**
[`boolean`](../../data-types.md) | Статус активности источника | ✅ | ✅ ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания источника | ✅ | ❌ ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления источника | ✅ | ❌ ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего источник | ✅ | ❌ ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего источник | ✅ | ❌ ||
|| **connectorId**
[`integer`](../../data-types.md) | Идентификатор коннектора, к которому привязан источник | ✅ | ✅ ||
|| **settings**
[`array`](../../data-types.md) | [Список параметров авторизации](#settings) | ✅ | ✅ ||
|#

### Поле settings {#settings}

Поле `settings` содержит список параметров для авторизации через коннектор. Параметры передаются в формате объекта, где ключ это идентификатор параметра — `code`. Значения `code` можно получить с помощью методов [biconnector.connector.list](../connector/biconnector-connector-list.md) или [biconnector.connector.get](../connector/biconnector-connector-get.md).

## Обзор методов {#all-methods}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с доступом к разделу «Рабочее место аналитика»

#|
|| **Метод** | **Описание** ||
|| [biconnector.source.add](./biconnector-source-add.md) | Добавляет новый источник ||
|| [biconnector.source.update](./biconnector-source-update.md) | Обновляет существующий источник ||
|| [biconnector.source.get](./biconnector-source-get.md) | Возвращает информацию об источнике ||
|| [biconnector.source.list](./biconnector-source-list.md) | Возвращает список доступных источников ||
|| [biconnector.source.delete](./biconnector-source-delete.md) | Удаляет источник ||
|| [biconnector.source.fields](./biconnector-source-fields.md) | Возвращает описание полей источника ||
|#