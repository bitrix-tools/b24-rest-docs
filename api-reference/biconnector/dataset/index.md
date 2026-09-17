# Устаревшие методы biconnector.dataset.*: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

{% note warning "DEPRECATED" %}

Развитие методов `biconnector.dataset.*` остановлено. Используйте [biconnector.table.*](../table/index.md).

{% endnote %}

Датасет — это описание набора данных, который приложение отдает в BI-Конструктор. В нем задан состав полей, а сами данные Битрикс24 запрашивает у приложения через эндпоинты коннектора. Тот же объект создают методы [biconnector.table.*](../table/index.md), и в интерфейсе он называется таблицей. Слово «датасет» на этой странице означает два разных объекта — [чем они различаются](#dataset-vs-dataset).

{% note warning "" %}

Методы работают только в контексте [приложения](../../../settings/app-installation/index.md) и только с теми датасетами, которые приложение создало само. При вызове вебхуком методы возвращают ошибку `ACCESS_DENIED`. Исключение — метод [biconnector.dataset.fields](./biconnector-dataset-fields.md): он возвращает описание полей и доступен вебхуку

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [BI Конструктор: наборы данных](https://helpdesk.bitrix24.ru/open/24355590/)

Общие для всего раздела правила — [формы ответа](../index.md#responses), [коды ошибок](../index.md#errors) и [постраничная навигация](../index.md#pagination) — описаны в обзоре модуля BIconnector.

## Датасет в REST и датасет в BI-Конструкторе — разные объекты {#dataset-vs-dataset}

Слово «датасет» на этой странице означает два разных объекта:

- **Датасет REST API** — объект, который создают методы этого раздела. В интерфейсе «Рабочее место аналитика» он называется таблицей, и с ним же работают методы [biconnector.table.*](../table/index.md).
- **Датасет BI-Конструктора** — объект, на котором строятся отчеты. Он создается поверх таблицы, его идентификатор лежит в поле `externalId`.

Метод [biconnector.dataset.add](./biconnector-dataset-add.md) создает оба объекта сразу, [biconnector.table.add](../table/biconnector-table-add.md) — только первый.

## Чем заменить методы {#replacement}

Срок удаления методов не объявлен. Шесть из семи продолжают работать, не работает только `biconnector.dataset.delete`.

#|
|| **Устаревший метод** | **Замена** ||
|| `biconnector.dataset.add` | [biconnector.table.add](../table/biconnector-table-add.md) ||
|| `biconnector.dataset.update` | [biconnector.table.update](../table/biconnector-table-update.md) ||
|| `biconnector.dataset.get` | [biconnector.table.get](../table/biconnector-table-get.md) ||
|| `biconnector.dataset.list` | [biconnector.table.list](../table/biconnector-table-list.md) ||
|| `biconnector.dataset.delete` | [biconnector.table.delete](../table/biconnector-table-delete.md) ||
|| `biconnector.dataset.fields.update` | [biconnector.table.fields.update](../table/biconnector-table-fields-update.md) ||
|| `biconnector.dataset.fields` | [biconnector.table.fields](../table/biconnector-table-fields.md) ||
|#

Набор параметров, состав ответа, правила валидации и коды ошибок у семейств совпадают. Расходятся только два метода:

- `biconnector.dataset.add` дополнительно создает в BI-Конструкторе датасет для отчетов, а `biconnector.table.add` создает только таблицу. Датасет строится поверх таблицы и создается в интерфейсе, в карточке таблицы, в блоке «Связанные датасеты».
- `biconnector.dataset.delete` не работает: в Битрикс24 с развернутым BI-Конструктором вызов завершается HTTP-статусом 500. Удалять таблицы нужно методом [biconnector.table.delete](../table/biconnector-table-delete.md).

Переносить данные не нужно: оба семейства работают с одним хранилищем, поэтому объекты, созданные через `biconnector.dataset.*`, видны методам `biconnector.table.*` и наоборот. Выборка ограничена только приложением, которое создало объект.

{% note warning "" %}

Если у объекта заполнено поле `externalId`, метод [biconnector.dataset.add](./biconnector-dataset-add.md) создал вместе с ним датасет BI-Конструктора. Метод [biconnector.table.delete](../table/biconnector-table-delete.md) удаляет только таблицу, поэтому такой датасет останется без нее. Удалить его можно в интерфейсе, в разделе «Рабочее место аналитика»

{% endnote %}

## Связь датасета с коннектором и источником

Датасет — это последний уровень в иерархии работы с данными в модуле BIconnector:

- **Коннектор** описывает эндпоинты приложения и коды параметров авторизации. Методы — [biconnector.connector.*](../connector/index.md)
- **Источник** хранит значения этих параметров. Связан с коннектором через `connectorId`. Методы — [biconnector.source.*](../source/index.md)
- **Датасет** задает состав полей, которые приложение отдает по этому подключению. Связан с источником через `sourceId`. Методы — [biconnector.dataset.*](#all-methods)

## Как начать работу

Порядок ниже описывает работу интеграции, которая уже построена на `biconnector.dataset.*`. Для новой интеграции порядок тот же, но с методами `biconnector.table.*`.

1. Создайте коннектор методом [biconnector.connector.add](../connector/biconnector-connector-add.md) или выберите существующий коннектор методом [biconnector.connector.list](../connector/biconnector-connector-list.md).
2. Создайте источник методом [biconnector.source.add](../source/biconnector-source-add.md) и передайте `connectorId` нужного коннектора.
3. Создайте датасет методом [biconnector.dataset.add](./biconnector-dataset-add.md). Обязательных полей пять: `sourceId` источника, `name`, `externalName`, `externalCode` и состав полей `fields`.
4. При необходимости измените состав полей методом [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md).

## Описание полей датасета {#dataset}

Ниже перечислен состав объекта, который методы `add` и `update` принимают в параметре `fields`. Идентификатор объекта в него не входит: методы `update`, `get`, `delete` и `fields.update` принимают его отдельным обязательным параметром `id`.

Колонка «Обязательное» показывает, когда поле нужно передавать в `fields`, «Чтение» — приходит ли оно в ответе, «Запись» — принимают ли его методы на входе. Галочка в колонке «Запись» не означает, что поле можно менять после создания: ограничения указаны в описании поля.

#|
|| **Название**
`тип` | **Описание** | **Обязательное** | **Чтение** | **Запись** ||
|| **id**
[`integer`](../../data-types.md) | Уникальный идентификатор датасета | Нет | ✅ | ❌ ||
|| **sourceId**
[`integer`](../../data-types.md) | Идентификатор источника, к которому привязан датасет. Задается один раз, изменить его нельзя. В ответе приходит только у метода [biconnector.dataset.list](./biconnector-dataset-list.md) | При создании | ✅ | ✅ ||
|| **type**
[`string`](../../data-types.md) | Тип датасета. У датасетов, созданных через REST API, значение всегда равно `rest` | Нет | ✅ | ❌ ||
|| **name**
[`string`](../../data-types.md) | Название датасета. Изменить его нельзя. Название должно начинаться с буквы, можно использовать только строчные латинские буквы `a-z`, цифры и знак `_`. Максимальная длина названия 230 символов | При создании | ✅ | ✅ ||
|| **description**
[`string`](../../data-types.md) | Описание датасета. Единственное поле, которое меняет метод [biconnector.dataset.update](./biconnector-dataset-update.md) | Нет | ✅ | ✅ ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код датасета — имя, под которым его знает приложение. Изменить его нельзя. Максимальная длина 512 символов | При создании | ✅ | ✅ ||
|| **externalName**
[`string`](../../data-types.md) | Внешнее имя датасета. Изменить его нельзя. Максимальная длина 512 символов | При создании | ✅ | ✅ ||
|| **dateCreate**
[`datetime`](../../data-types.md) | Дата создания датасета в формате `Y-m-d H:i:s` | Нет | ✅ | ❌ ||
|| **dateUpdate**
[`datetime`](../../data-types.md) | Дата обновления датасета в формате `Y-m-d H:i:s`. У датасета, который ни разу не обновляли, значение `null` | Нет | ✅ | ❌ ||
|| **createdById**
[`integer`](../../data-types.md) | Идентификатор пользователя, создавшего датасет | Нет | ✅ | ❌ ||
|| **updatedById**
[`integer`](../../data-types.md) | Идентификатор пользователя, обновившего датасет. У датасета, который ни разу не обновляли, значение `0` | Нет | ✅ | ❌ ||
|| **externalId**
[`integer`](../../data-types.md) | Идентификатор датасета BI-Конструктора, который метод [biconnector.dataset.add](./biconnector-dataset-add.md) создал вместе с этим объектом. У объектов, созданных методом [biconnector.table.add](../table/biconnector-table-add.md), значение всегда `0` | Нет | ✅ | ❌ ||
|| **csvDelimiter**
[`string`](../../data-types.md) | Разделитель колонок в CSV-файле | Нет | ✅ | ❌ ||
|| **csvEncoding**
[`string`](../../data-types.md) | Кодировка CSV-файла | Нет | ✅ | ❌ ||
|| **csvHasHeaders**
[`boolean`](../../data-types.md) | Признак того, что первая строка CSV-файла — заголовки колонок | Нет | ✅ | ❌ ||
|| **fields**
[`array`](../../data-types.md) | Список [полей](#fields), входящих в датасет. Дальше меняется методом [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md). В ответе приходит только у метода [biconnector.dataset.get](./biconnector-dataset-get.md) | При создании | ✅ | ✅ ||
|#

Поля `csvDelimiter`, `csvEncoding` и `csvHasHeaders` относятся к датасетам, загруженным из файла: у датасетов REST-источника они всегда пустые. В схему метода [biconnector.dataset.fields](./biconnector-dataset-fields.md) эти поля не входят, поэтому в `select`, `filter` и `order` их передавать нельзя.

{% note info "" %}

Состав ответа может пополняться: модуль отдает объект целиком, поэтому со временем в ответе появляются поля соседних сценариев. Неизвестные ключи следует игнорировать, а не считать ошибкой

{% endnote %}

### Описание поля fields {#fields}

#|
|| **Название**
`тип` | **Описание** | **Обязательное** | **Чтение** | **Запись** ||
|| **id**
[`integer`](../../data-types.md) | Идентификатор поля | Нет | ✅ | ❌ ||
|| **datasetId**
[`integer`](../../data-types.md) | Идентификатор датасета, к которому относится поле | Нет | ✅ | ❌ ||
|| **type**
[`string`](../../data-types.md) | Тип данных. Задается один раз при создании поля. Доступные типы:
`int` — число целое
`string` — строка
`double` — число дробное, разделитель точка
`date` — дата, формат `Y-m-d`
`datetime` — дата со временем, формат `Y-m-d H:i:s`
`money` — денежное значение, хранится как число, валюта не сохраняется
`timezone` — идентификатор часового пояса. К данным REST-источников сдвиг не применяется | При создании | ✅ | ✅ ||
|| **name**
[`string`](../../data-types.md) | Название поля. Задается один раз при создании поля. Название должно начинаться с буквы, можно использовать только заглавные латинские буквы `A-Z`, цифры и знак `_`. Максимальная длина названия 32 символа | При создании | ✅ | ✅ ||
|| **externalCode**
[`string`](../../data-types.md) | Внешний код поля — имя, под которым его знает приложение. Задается один раз при создании поля | При создании | ✅ | ✅ ||
|| **visible**
[`boolean`](../../data-types.md) | Флаг видимости поля. Значение по умолчанию — `true`. Поле с `visible = false` остается в датасете, но не попадает в схему, которая уходит в BI-Конструктор. Единственный признак поля, который меняет метод [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md) | Нет | ✅ | ✅ ||
|| **description**
[`string`](../../data-types.md) | Описание поля. Через REST API не заполняется, всегда приходит пустой строкой | Нет | ✅ | ❌ ||
|#

## Обзор методов {#all-methods}

> Scope: [`biconnector`](../../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с правами «Доступ к BI Конструктору» и «Доступ к рабочему месту аналитика» одновременно

#|
|| **Метод** | **Описание** ||
|| [biconnector.dataset.add](./biconnector-dataset-add.md) | Добавляет новый датасет ||
|| [biconnector.dataset.update](./biconnector-dataset-update.md) | Обновляет существующий датасет ||
|| [biconnector.dataset.get](./biconnector-dataset-get.md) | Возвращает информацию о датасете ||
|| [biconnector.dataset.list](./biconnector-dataset-list.md) | Возвращает список доступных датасетов ||
|| [biconnector.dataset.delete](./biconnector-dataset-delete.md) | Не работает: удаляйте датасет методом [biconnector.table.delete](../table/biconnector-table-delete.md) ||
|| [biconnector.dataset.fields.update](./biconnector-dataset-fields-update.md) | Обновляет поля датасета ||
|| [biconnector.dataset.fields](./biconnector-dataset-fields.md) | Возвращает описание полей датасета ||
|#

## Продолжите изучение

- [{#T}](../index.md)
- [{#T}](../connector/index.md)
- [{#T}](../source/index.md)
- [{#T}](../table/index.md)
- [Пример создания коннектора на базе B24PHPSDK](https://github.com/bitrix24/b24sdk-examples/tree/main/php/special/biconnector)
- [Митап про создание коннектора](../../../meetups.md#biconnector-meetup)
