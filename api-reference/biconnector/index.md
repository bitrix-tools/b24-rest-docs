# BIconnector: обзор методов

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

BIconnector — это модуль Битрикс24 с методами для подключения внешних источников данных и их адаптации для раздела «Рабочее место аналитика».

В разделе BIconnector доступны три группы методов: коннекторы, источники и датасеты. Они формируют единую цепочку работы с данными от настройки подключения внешнего сервиса до получения набора данных для отчетов.

> Быстрый переход: [все методы](#all-methods)
>
> Пользовательская документация: [BI Конструктор: рабочее место аналитика](https://helpdesk.bitrix24.ru/open/25710224/)

{% note info "" %}

Методы работают только в контексте [приложения](../../settings/app-installation/index.md)

{% endnote %}

## Коннекторы

Коннектор задает правила интеграции с внешней системой. Он определяет, какие эндпоинты использовать, чтобы проверить доступ, получить структуру таблиц и загрузить данные. Также коннектор указывает, какие параметры авторизации нужно запросить у источника.

Коннектор не хранит подключение к конкретной базе или API. Он работает как шаблон, который можно переиспользовать для нескольких источников одного типа. Например, через один коннектор типа MySQL можно подключить несколько разных баз MySQL.

Для работы с коннекторами используйте методы [biconnector.connector.*](./connector/index.md).

## Источники

Источник — это рабочее подключение, созданное на основе коннектора.

Источник связан с коннектором через `connectorId` и хранит конкретные значения параметров подключения: URL, логин, пароль и другие настройки, которые описаны в коннекторе. Благодаря этому один коннектор можно использовать для создания нескольких источников с разными параметрами, например для тестовой и рабочей баз данных.

Для работы с источниками используйте методы [biconnector.source.*](./source/index.md).

## Датасеты

Датасет — это описание набора данных, который передается из источника в «Рабочее место аналитика».

Датасет связан с источником через `sourceId` и определяет структуру данных для аналитики: какие поля доступны, какие у них типы и в каком виде данные можно запрашивать. Из одного источника можно создать отдельные датасеты, чтобы использовать их в разных отчетах.

Для работы с датасетами используйте методы [biconnector.dataset.*](./dataset/index.md).

{% note tip "Пользовательская документация" %}

- [BI Конструктор: наборы данных](https://helpdesk.bitrix24.ru/open/24355590/)

{% endnote %}

## Как начать работу

1. Создайте коннектор методом [biconnector.connector.add](./connector/biconnector-connector-add.md), чтобы задать параметры интеграции и URL внешних эндпоинтов.
2. Создайте источник методом [biconnector.source.add](./source/biconnector-source-add.md) и передайте `connectorId` нужного коннектора.
3. Создайте датасет методом [biconnector.dataset.add](./dataset/biconnector-dataset-add.md), затем настройте его поля через [biconnector.dataset.fields.update](./dataset/biconnector-dataset-fields-update.md).

## Проверка и отладка

Для проверки текущей структуры на каждом уровне используйте методы `*.fields`:

- [biconnector.connector.fields](./connector/biconnector-connector-fields.md) — какие поля можно передать в коннектор
- [biconnector.source.fields](./source/biconnector-source-fields.md) — какие поля ожидаются для источника
- [biconnector.dataset.fields](./dataset/biconnector-dataset-fields.md) — описание полей датасета

{% note tip "Пользовательская документация" %}

- [Отладка запросов в BI-коннекторе Битрикс24](https://helpdesk.bitrix24.ru/open/17463074/)
- [Частые вопросы о BI‑аналитике и BI Конструкторе](https://helpdesk.bitrix24.ru/open/24352300/)

{% endnote %}

## Обзор методов {#all-methods}

> Scope: [`biconnector`](../scopes/permissions.md)
>
> Кто может выполнять методы: пользователь с доступом к разделу «Рабочее место аналитика»

### Коннекторы

#|
|| **Метод** | **Описание** ||
|| [biconnector.connector.add](./connector/biconnector-connector-add.md) | Добавляет новый коннектор ||
|| [biconnector.connector.update](./connector/biconnector-connector-update.md) | Обновляет существующий коннектор ||
|| [biconnector.connector.get](./connector/biconnector-connector-get.md) | Получает информацию о коннекторе ||
|| [biconnector.connector.list](./connector/biconnector-connector-list.md) | Получает список доступных коннекторов ||
|| [biconnector.connector.delete](./connector/biconnector-connector-delete.md) | Удаляет коннектор ||
|| [biconnector.connector.fields](./connector/biconnector-connector-fields.md) | Получает описание полей коннектора ||
|#

### Источники

#|
|| **Метод** | **Описание** ||
|| [biconnector.source.add](./source/biconnector-source-add.md) | Добавляет новый источник ||
|| [biconnector.source.update](./source/biconnector-source-update.md) | Обновляет существующий источник ||
|| [biconnector.source.get](./source/biconnector-source-get.md) | Получает информацию об источнике ||
|| [biconnector.source.list](./source/biconnector-source-list.md) | Получает список доступных источников ||
|| [biconnector.source.delete](./source/biconnector-source-delete.md) | Удаляет источник ||
|| [biconnector.source.fields](./source/biconnector-source-fields.md) | Получает описание полей источника ||
|#

### Датасеты

#|
|| **Метод** | **Описание** ||
|| [biconnector.dataset.add](./dataset/biconnector-dataset-add.md) | Добавляет новый датасет ||
|| [biconnector.dataset.update](./dataset/biconnector-dataset-update.md) | Обновляет существующий датасет ||
|| [biconnector.dataset.get](./dataset/biconnector-dataset-get.md) | Получает информацию о датасете ||
|| [biconnector.dataset.list](./dataset/biconnector-dataset-list.md) | Получает список доступных датасетов ||
|| [biconnector.dataset.delete](./dataset/biconnector-dataset-delete.md) | Удаляет датасет ||
|| [biconnector.dataset.fields](./dataset/biconnector-dataset-fields.md) | Получает описание полей датасета ||
|| [biconnector.dataset.fields.update](./dataset/biconnector-dataset-fields-update.md) | Обновляет поля датасета ||
|#
