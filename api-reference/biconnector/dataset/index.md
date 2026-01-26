# Датасеты: обзор методов

Датасет — это объект модуля BIconnector. Датасеты используются для отображения и обработки в Битрикс24 информации, полученной из источников.

> Быстрый переход: [все методы](#all-methods) 

{% note info "" %}

Методы работают только в контексте [приложения](../../../settings/app-installation/index.md)

{% endnote %}

## Связь датасета с коннектором и источниками

Датасет это последний уровень в иерархии работы с данными в модуле BIconnector:
- **Коннектор** устанавливает связь с внешним источником данных.
- **Источник** определяет, какие именно данные доступны из подключенного сервиса.
- **Датасет** формирует итоговый набор данных, который можно использовать в отчетах и аналитике.

## Описание полей датасета {#dataset}

#|
|| **Название**
`тип` | **Описание** | Чтение | Запись ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор датасета | ✅ | ❌ ||
|| **type**
[`string`](../../data-types.md) | Тип датасета, значение всегда равно `rest` | ✅ | ❌ ||
|| **name**
[`string`](../../data-types.md) | Название датасета | ✅ | ✅ ||
|| **description**
[`string`](../../data-types.md) | Описание датасета | ✅ | ✅ ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код датасета | ✅ | ✅ ||
|| **externalName**
[`string`](../../data-types.md) | Внешнее имя датасета | ✅ | ✅ ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания датасета | ✅ | ❌ ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления датасета | ✅ | ❌ ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего датасет | ✅ | ❌ ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего датасет | ✅ | ❌ ||
|| **externalId**
[`integer`](../../data-types.md) | Внешний идентификатор датасета | ✅ | ❌ ||
|| **fields**
[`array`](../../data-types.md) | Список [полей](#fields), входящих в датасет | ✅ | ✅ ||
|#

### Описание поля fields {#fields}

#|
|| **Название**
`тип` | **Описание** | Чтение | Запись ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор поля | ✅ | ❌ ||
|| **datasetId**
[`integer`](../../data-types.md) | Идентификатор датасета, к которому относится поле | ✅ | ✅ ||
|| **type**
[`string`](../../data-types.md) | Тип данных. Доступные типы: 
`int` — число целое
`string` — строка
`double` — число дробное, разделитель точка
`date` — дата, формат `Y-m-d`
`datetime` — дата со временем, формат `Y-m-d H:i:s` | ✅ | ✅ ||
|| **name**
[`string`](../../data-types.md) | Название поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_`. Максимальная длина названия 32 символа | ✅ | ✅ ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код поля | ✅ | ✅ ||
|| **visible**
[`boolean`](../../data-types.md) | Флаг видимости поля | ✅ | ✅ ||
|#

## Обзор методов {#all-methods}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с доступом к разделу «Рабочее место аналитика»

#|
|| **Метод** | **Описание** ||
|| [biconnector.dataset.add](./biconnector-dataset-add.md) | Добавляет новый датасет ||
|| [biconnector.dataset.update](./biconnector-dataset-update.md) | Обновляет существующий датасет ||
|| [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md) | Обновляет поля датасета ||
|| [biconnector.dataset.get](./biconnector-dataset-get.md) | Возвращает информацию о датасете ||
|| [biconnector.dataset.list](./biconnector-dataset-list.md) | Возвращает список доступных датасетов ||
|| [biconnector.dataset.delete](./biconnector-dataset-delete.md) | Удаляет датасет ||
|| [biconnector.dataset.fields](./biconnector-dataset-fields.md) | Возвращает описание полей датасета ||
|#