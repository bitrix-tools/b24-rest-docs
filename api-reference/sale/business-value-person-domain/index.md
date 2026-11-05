# Статусы типов плательщиков в Интернет-магазине: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Название [типа плательщика](../person-type/index.md) может быть любым, поэтому по нему не понять, кто платит — человек или компания. Кто платит, задает соответствие типа плательщика физическому или юридическому лицу. В REST API это объект `businessValuePersonDomain`. Каждому типу плательщика можно задать одно соответствие. Его значение называют доменом:

- `I` — физическое лицо
- `E` — юридическое лицо

Домен нужен для выгрузки заказов в 1С и для настроек бизнес-смыслов. Бизнес-смыслы сопоставляют данные заказа с полями, которые нужны платежным системам и кассам. Тип плательщика без соответствия в настройках бизнес-смыслов не участвует.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Как покупателю оформить заказ в интернет-магазине](https://helpdesk.bitrix24.ru/open/8238203/)

## Связь статусов типов плательщиков с другими объектами

**Типы плательщиков.** Соответствие задают для типа плательщика: его идентификатор передают в поле `personTypeId`. Идентификаторы типов плательщиков вернет метод [sale.persontype.list](../person-type/sale-person-type-list.md).

## Как начать работу

1. Получите список типов плательщиков методом [sale.persontype.list](../person-type/sale-person-type-list.md)
2. Проверьте, какие поля нужны для соответствия, методом [sale.businessValuePersonDomain.getFields](./sale-business-value-person-domain-get-fields.md)
3. Проверьте, задано ли соответствие типу плательщика, методом [sale.businessValuePersonDomain.list](./sale-business-value-person-domain-list.md)
4. Создайте соответствие методом [sale.businessValuePersonDomain.add](./sale-business-value-person-domain-add.md): `I` для физического лица или `E` для юридического лица
5. Чтобы сменить домен, удалите соответствие методом [sale.businessValuePersonDomain.deleteByFilter](./sale-business-value-person-domain-delete-by-filter.md) и создайте заново: метода изменения нет

## Обзор методов {#all-methods}

> Scope: [`sale`](../../scopes/permissions.md)
>
> Кто может выполнять метод: зависит от метода

#|
|| **Метод** | **Описание** ||
|| [sale.businessValuePersonDomain.add](./sale-business-value-person-domain-add.md) | Добавляет соответствие физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.list](./sale-business-value-person-domain-list.md) | Возвращает список соответствий физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.deleteByFilter](./sale-business-value-person-domain-delete-by-filter.md) | Удаляет соответствие физическому или юридическому лицу ||
|| [sale.businessValuePersonDomain.getFields](./sale-business-value-person-domain-get-fields.md) | Возвращает поля соответствия физическому или юридическому лицу ||
|#
