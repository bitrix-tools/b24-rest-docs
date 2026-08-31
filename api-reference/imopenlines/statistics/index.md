# Статистика открытых линий: обзор методов

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Статистика открытых линий показывает, как команда обрабатывает обращения клиентов из онлайн-чата, мессенджеров, социальных сетей и других каналов Контакт-центра. По ней руководитель видит, сколько диалогов сейчас в работе, где появляются задержки, как быстро операторы отвечают и какие каналы дают больше обращений.

Оценки клиентов и руководителей помогают контролировать качество обслуживания. Клиент может поставить лайк или дизлайк в чате, а руководитель — оценить работу оператора по пятибалльной шкале и оставить комментарий.

Методы `imopenlines.v2.*` дают доступ к этим данным для внешних дашбордов, отчетов и мониторинга нагрузки. Методы только читают накопленную статистику: сессии, оценки, переводы, текущую нагрузку операторов и агрегированные показатели.

{% note info "" %}

В облаке методы доступны, если тариф позволяет использовать отчеты открытых линий. На коробке ограничение тарифа не применяется.

{% endnote %}

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [Контакт-центр в Битрикс24](https://helpdesk.bitrix24.ru/open/27978904/)

## Что можно анализировать

#|
|| **Показатель** | **Что показывает** ||
|| Объем обращений | Сколько сессий создано, закрыто или помечено как спам ||
|| Скорость ответа | Время до первого ответа оператора и выполнение KPI первого ответа ||
|| Качество общения | Клиентские лайки и дизлайки, оценки и комментарии руководителей ||
|| Каналы обращений | Из каких каналов приходят клиенты: онлайн-чат, мессенджеры, социальные сети и другие коннекторы ||
|| Нагрузка операторов | Статус операторов, активные сессии и свободные слоты ||
|| Переводы сессий | Кому и когда передавали диалог ||
|#

## Как начать работу

1. Получите сводные показатели методом [imopenlines.v2.Stat.get](./imopenlines-v2-stat-get.md)
2. Получите детализацию сессий методом [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md)
3. Для выбранных сессий запросите метрики методом [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md) или историю переводов методом [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md)
4. Для real-time виджета нагрузки получите операторов методом [imopenlines.v2.Operator.list](./imopenlines-v2-operator-list.md)
5. Для CSAT-отчета получите оцененные сессии методом [imopenlines.v2.Session.Rating.list](./imopenlines-v2-session-rating-list.md)

## Формат данных

Все параметры и поля ответа используют `camelCase`. Даты передаются строками в формате ISO 8601, например `2026-06-15T14:32:10+03:00`.

Структуры объектов ответа: `session`, `operatorLoad`, `sessionStat`, `rating`, `transfer` и `statResult` — описаны в разделе [Типы данных статистики открытых линий](./data-types.md).

Списочные методы используют пагинацию `offset` и `limit`. Значение `limit` должно быть от `1` до `200`, значение по умолчанию — `50`. Ответ содержит поле `hasNextPage`.

Пакетные методы [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md) и [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md) не используют пагинацию. Они принимают массив `sessionId` ограниченного размера.

Поля `voteHead` и `commentHead` в ответах методов [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md), [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md) и [imopenlines.v2.Session.Rating.list](./imopenlines-v2-session-rating-list.md) возвращаются как `null`, если тариф или права пользователя не позволяют видеть оценку руководителя.

## Связь с другими объектами

**Открытая линия.** Идентификатор линии передается в параметрах `configId` и `configIdList`. Получить его можно методами [imopenlines.config.get](../openlines/imopenlines-config-get.md) и [imopenlines.config.list.get](../openlines/imopenlines-config-list-get.md).

**Сессия.** Сессии открытых линий возвращает метод [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md). Идентификаторы сессий нужны для пакетных методов [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md) и [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md).

**Оператор.** Оператор определяется идентификатором пользователя Битрикс24. Используйте `operatorId`, `operatorIdList`, `userId` или `userIdList` в зависимости от метода. Получить ID пользователя можно методами [user.get](../../user/user-get.md) и [user.search](../../user/user-search.md).

**CRM.** Сессия может быть связана с лидом, сделкой, контактом или компанией. Поля `crmEntityType` и `crmEntityId` в элементах `session` ответа метода [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md) возвращаются только при наличии прав на чтение связанного объекта CRM.

## Обзор методов {#all-methods}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: пользователь с доступом к отчетам открытых линий

#|
|| **Метод** | **Описание** ||
|| [imopenlines.v2.Stat.get](./imopenlines-v2-stat-get.md) | Получает агрегированную статистику открытых линий за период ||
|| [imopenlines.v2.Operator.list](./imopenlines-v2-operator-list.md) | Получает список операторов с текущим статусом и нагрузкой ||
|| [imopenlines.v2.Session.list](./imopenlines-v2-session-list.md) | Получает список сессий с фильтрами и пагинацией ||
|| [imopenlines.v2.Session.Stat.get](./imopenlines-v2-session-stat-get.md) | Получает пакетные метрики по сессиям ||
|| [imopenlines.v2.Session.Rating.list](./imopenlines-v2-session-rating-list.md) | Получает список сессий с клиентской оценкой ||
|| [imopenlines.v2.Session.Transfer.list](./imopenlines-v2-session-transfer-list.md) | Получает историю переводов по сессиям ||
|#
