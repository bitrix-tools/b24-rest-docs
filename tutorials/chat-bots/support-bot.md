# Пример создания канала поддержки

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

С помощью модуля **Открытые линии** можно организовать техническую поддержку по любому приложению *Битрикс24*, в том числе по чат-ботам.

Подготовка в интерфейсе:

- Перейдите в раздел **Контакт-центр** и подключите канал коммуникации `Битрикс24.Network`
- Заполните `Название`, `Краткое описание` и установите `Аватар` — это поможет клиентам легче вас найти
- Создайте новую открытую линию технической поддержки или выберите действующую

{% note info "" %}

Методы `imopenlines.network.*` работают в контексте [приложения](../../settings/app-installation/index.md). Авторизацию (`access_token`, `domain`) приложение получает в теле запроса. Инициализацию SDK смотрите в [примере чат-бота](./index.md#инициализация-sdk-по-данным-события).

{% endnote %}

## Подключение открытой линии к порталу

Метод [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md) автоматически подключает вашу открытую линию к порталу пользователя. В параметр `CODE` передается код со страницы коннекторов.

{% list tabs %}

- JS

    ```js
    const response = await $b24.actions.v2.call.make({
        method: 'imopenlines.network.join',
        params: { CODE: 'a588e1a88baaf301b9d0b0b33b1eefc2b' },
        requestId: 'network-join',
    })

    if (!response.isSuccess) {
        throw new Error(response.getErrorMessages().join('; '))
    }
    ```

- PHP

    ```php
    // Типизированный аналог: $b24->getIMOpenLinesScope()->Network()->join(...)
    $b24->core->call('imopenlines.network.join', [
        'CODE' => 'a588e1a88baaf301b9d0b0b33b1eefc2b',
    ]);
    ```

- Python

    ```python
    client.imopenlines.network.join(
        code="a588e1a88baaf301b9d0b0b33b1eefc2b",
    ).response
    ```

{% endlist %}

## Приветственное сообщение

После подключения отправьте клиенту приветствие методом [imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md).

{% list tabs %}

- JS

    ```js
    await $b24.actions.v2.call.make({
        method: 'imopenlines.network.message.add',
        params: {
            CODE: 'a588e1a88baaf301b9d0b0b33b1eefc2b',
            MESSAGE: 'Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)',
            USER_ID: userId,
        },
        requestId: 'network-message',
    })
    ```

- PHP

    ```php
    $b24->core->call('imopenlines.network.message.add', [
        'CODE' => 'a588e1a88baaf301b9d0b0b33b1eefc2b',
        'MESSAGE' => 'Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)',
        'USER_ID' => $userId,
    ]);
    ```

- Python

    ```python
    client.imopenlines.network.message.add(
        code="a588e1a88baaf301b9d0b0b33b1eefc2b",
        message="Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)",
        user_id=user_id,
    ).response
    ```

{% endlist %}

{% note tip "" %}

Открыть канал поддержки можно и из фронтенда iframe-приложения через b24jssdk: `await $b24.parent.imOpenMessenger(dialogId)` — аналог метода `BX24.im.openMessenger`.

{% endnote %}
