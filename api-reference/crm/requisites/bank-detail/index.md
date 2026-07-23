# Банковские реквизиты CRM: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Банковские реквизиты — это строгая последовательность цифр, необходимых для осуществления операций с расчетным счетом. По реквизитам можно отправить безналичный платеж или внести деньги на счет через кассу.

К обязательным банковским реквизитам относятся:
- номер расчетного счета
- номер корреспондентского счета
- банковский идентификационный код (БИК) и полное наименование банка

В CRM банковские реквизиты связываются с объектом универсальных реквизитов. Несколько банковских реквизитов могут быть привязаны к одному реквизиту.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Умные реквизиты: заполнение по ИНН и БИК](https://helpdesk.bitrix24.ru/open/20510916/)

## Как начать работу

1. Получите идентификатор реквизита `ENTITY_ID` методом [crm.requisite.list](../universal/crm-requisite-list.md)
2. Создайте банковский реквизит методом [crm.requisite.bankdetail.add](./crm-requisite-bank-detail-add.md)
3. Измените данные счета методом [crm.requisite.bankdetail.update](./crm-requisite-bank-detail-update.md)
4. Получите банковский реквизит по ID методом [crm.requisite.bankdetail.get](./crm-requisite-bank-detail-get.md)
5. Найдите реквизиты по фильтру методом [crm.requisite.bankdetail.list](./crm-requisite-bank-detail-list.md)
6. Удалите банковский реквизит методом [crm.requisite.bankdetail.delete](./crm-requisite-bank-detail-delete.md)

## Идентификаторы банковского реквизита

- `ID` — идентификатор банковского реквизита. Его возвращают методы [crm.requisite.bankdetail.add](./crm-requisite-bank-detail-add.md), [crm.requisite.bankdetail.get](./crm-requisite-bank-detail-get.md) и [crm.requisite.bankdetail.list](./crm-requisite-bank-detail-list.md)
- `ENTITY_ID` — идентификатор реквизита, к которому привязан банковский реквизит. Его можно получить методом [crm.requisite.list](../universal/crm-requisite-list.md)
- `COUNTRY_ID` — идентификатор страны для набора банковских полей. Доступные значения возвращает метод [crm.requisite.preset.countries](../presets/crm-requisite-preset-countries.md)

## Поля банковских реквизитов

Обязательные поля отмечены `*`.

#|
|| **Название**
`тип` | **Описание** ||
|| **ID**
[`integer`](../../../data-types.md) | Идентификатор банковского реквизита. Создается автоматически и уникален в рамках портала ||
|| **ENTITY_ID***
[`integer`](../../../data-types.md) | Идентификатор родительского объекта. Сейчас может быть только идентификатор реквизита.

Идентификаторы реквизитов можно получить с помощью метода [`crm.requisite.list`](../universal/crm-requisite-list.md) ||
|| **COUNTRY_ID**
[`integer`](../../../data-types.md) | Идентификатор страны, которой соответствует набор полей банковского реквизита (смотрите метод [crm.requisite.preset.countries](../presets/crm-requisite-preset-countries.md) для получения доступных значений).

Код страны банковского реквизита совпадает с кодом страны в привязанном шаблоне реквизитов, идентификатор которого указан в поле `ENTITY_ID`
||
|| **DATE_CREATE**
[`datetime`](../../../data-types.md) | Дата создания ||
|| **DATE_MODIFY**
[`datetime`](../../../data-types.md) | Дата изменения ||
|| **CREATED_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, создавшего реквизит ||
|| **MODIFY_BY_ID**
[`user`](../../../data-types.md) | Идентификатор пользователя, изменившего реквизит ||
|| **NAME***
[`string`](../../../data-types.md) | Название банковского реквизита ||
|| **CODE**
[`string`](../../../data-types.md) | Символьный код реквизита ||
|| **XML_ID**
[`string`](../../../data-types.md) | Внешний ключ. Используется для операций обмена. Идентификатор объекта внешней информационной базы.

Назначение поля может меняться конечным разработчиком. Каждое приложение обеспечивает уникальность значений в этом поле.

Рекомендуется использовать уникальный префикс для избежания коллизий с другими приложениями ||
|| **ACTIVE**
[`char`](../../../data-types.md) | Признак активности. Используются значения `Y` или `N`.

Сейчас поле фактически ни на что не влияет ||
|| **SORT**
[`integer`](../../../data-types.md) | Сортировка ||
|| **RQ_BANK_NAME**
[`string`](../../../data-types.md) | Наименование банка ||
|| **RQ_BANK_ADDR**
[`string`](../../../data-types.md) | Адрес банка ||
|| **RQ_BANK_CODE**
[`string`](../../../data-types.md) | Código do banco (для страны BR) ||
|| **RQ_BANK_ROUTE_NUM**
[`string`](../../../data-types.md) | Bank Routing Number ||
|| **RQ_BIK**
[`string`](../../../data-types.md) | БИК ||
|| **RQ_CODEB**
[`string`](../../../data-types.md) | Code Banque (для страны FR) ||
|| **RQ_CODEG**
[`string`](../../../data-types.md) | Code Guichet (для страны FR) ||
|| **RQ_RIB**
[`string`](../../../data-types.md) | Clé RIB (для страны FR) ||
|| **RQ_MFO**
[`string`](../../../data-types.md) | МФО ||
|| **RQ_ACC_NAME**
[`string`](../../../data-types.md) | Bank Account Holder Name ||
|| **RQ_ACC_NUM**
[`string`](../../../data-types.md) | Bank Account Number ||
|| **RQ_ACC_TYPE**
[`string`](../../../data-types.md) | Tipo da conta (для страны BR) ||
|| **RQ_AGENCY_NAME**
[`string`](../../../data-types.md) | Agência (для страны BR) ||
|| **RQ_IIK**
[`string`](../../../data-types.md) | ИИК ||
|| **RQ_ACC_CURRENCY**
[`string`](../../../data-types.md) | Валюта счета ||
|| **RQ_COR_ACC_NUM**
[`string`](../../../data-types.md) | Корреспондентский счет ||
|| **RQ_IBAN**
[`string`](../../../data-types.md) | IBAN ||
|| **RQ_SWIFT**
[`string`](../../../data-types.md) | SWIFT ||
|| **RQ_BIC**
[`string`](../../../data-types.md) | BIC ||
|| **COMMENTS**
[`string`](../../../data-types.md) | Комментарий ||
|| **ORIGINATOR_ID**
[`string`](../../../data-types.md) | Идентификатор внешней информационной базы. Назначение поля может меняться конечным разработчиком ||
|#

## Обзор методов {#all-methods}

> Scope: [`crm`](../../../scopes/permissions.md)
>
> Кто может выполнять методы: любой пользователь

#|
|| **Метод** | **Описание** ||
|| [crm.requisite.bankdetail.add](./crm-requisite-bank-detail-add.md) | Создает новый банковский реквизит ||
|| [crm.requisite.bankdetail.update](./crm-requisite-bank-detail-update.md) | Изменяет существующий банковский реквизит ||
|| [crm.requisite.bankdetail.get](./crm-requisite-bank-detail-get.md) | Возвращает банковский реквизит по идентификатору ||
|| [crm.requisite.bankdetail.list](./crm-requisite-bank-detail-list.md) | Возвращает список банковских реквизитов по фильтру ||
|| [crm.requisite.bankdetail.delete](./crm-requisite-bank-detail-delete.md) | Удаляет банковский реквизит ||
|| [crm.requisite.bankdetail.fields](./crm-requisite-bank-detail-fields.md) | Возвращает формальное описание полей банковских реквизитов ||
|#



