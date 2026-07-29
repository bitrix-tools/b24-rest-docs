# Как создать канал поддержки через открытую линию Битрикс24 Network

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

С помощью открытой линии Битрикс24 Network можно организовать поддержку пользователей приложения. После выполнения сценария пользователь получит в мессенджере приветственное сообщение от имени открытой линии поддержки.

Сценарий связывает два Битрикс24:

- Битрикс24 поддержки — в нем подключен канал «Битрикс24 Network» и настроена открытая линия. Отсюда берется код коннектора
- Битрикс24 пользователя — в нем установлено приложение, которое выполняет оба REST-вызова и отправляет приветствие пользователю

Сценарий состоит из двух шагов.

1. Подключить открытую линию методом [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md)
2. Отправить пользователю приветствие методом [imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md)

Оба метода используют один код коннектора. Идентификатор network-бота из шага 1 для отправки сообщения не требуется.

> Scope: [`imopenlines`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнить методы: любой пользователь

## Подготовьте приложение и открытую линию

### Подготовьте приложение

В Битрикс24 пользователя подготовьте локальное приложение без интерфейса.

1. Подготовьте адрес обработчика, доступный из интернета, например `https://example.com/handler`
2. Создайте [локальное приложение с обработчиком установки](../../settings/app-installation/local-apps/installation-callback.md) и включите опцию «Использует только API»
3. В поле «Путь для первоначальной установки» укажите адрес обработчика и предоставьте приложению право [`imopenlines`](../../api-reference/scopes/permissions.md)
4. В обработчике получите данные авторизации `auth` и [инициализируйте SDK](./index.md#инициализация-sdk-по-данным-события)

### Настройте открытую линию

Следующие действия выполните в Битрикс24 поддержки.

1. Откройте раздел «Контакт-центр» и подключите канал коммуникации «Битрикс24 Network»
2. Укажите название и краткое описание, добавьте аватар — по ним пользователи смогут узнать канал поддержки
3. Создайте новую открытую линию поддержки или выберите существующую
4. Сохраните настройки и скопируйте значение поля «Код» на странице коннектора

### Подготовьте значения

- `connectorCode` — код коннектора из поля «Код». Это строка из 32 символов
- `userId` — идентификатор пользователя из `auth[user_id]` в данных установки приложения
- `message` — непустой текст приветствия

Параметр `CODE` содержит только код коннектора. В примерах ниже OAuth-токен подставляет клиент SDK. При прямом REST-запросе без SDK токен передается отдельным параметром `auth` или `access_token`, а не внутри параметров метода.

### Инициализируйте SDK

Подготовьте функции инициализации по [примеру обработки данных события](./index.md#инициализация-sdk-по-данным-события). В обработчике установки создайте клиент SDK из данных авторизации `auth`.

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

    ```js
    const $b24 = makeClient(auth)
    ```

- PHP

    ```php
    $b24 = makeServiceBuilder($request);
    ```

- Python

    ```python
    from b24pysdk.errors import BitrixAPIError

    client, token = make_client(auth)
    ```

{% endlist %}

В примере инициализации PHP-клиента указан scope `imbot,im,task`. Для сценария поддержки замените его на `imopenlines`.

## 1. Подключите открытую линию

Передайте код коннектора в параметр `CODE` метода [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md). В примерах замените демонстрационное значение `connectorCode` своим кодом. Если линия уже подключена, метод вернет идентификатор существующего network-бота.

{% list tabs %}

- JS

    ```js
    const connectorCode = 'a588e1a88baaf301b9d0b0b33b1eefc2'

    try {
        const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.network.join',
            params: { CODE: connectorCode },
            requestId: 'network-join',
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
    } catch (error) {
        // Ошибка API, транспорта или SDK
        console.error(error)
    }
    ```

- PHP

    ```php
    $connectorCode = 'a588e1a88baaf301b9d0b0b33b1eefc2';

    try {
        $response = $b24->core->call('imopenlines.network.join', [
            'CODE' => $connectorCode,
        ]);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- Python

    ```python
    connector_code = "a588e1a88baaf301b9d0b0b33b1eefc2"

    try:
        response = client.imopenlines.network.join(
            code=connector_code,
        ).response
    except BitrixAPIError as error:
        print(f"Ошибка подключения открытой линии: {error}")
    ```

{% endlist %}

Успешный ответ:

```json
{
    "result": 123
}
```

Значение `result` — идентификатор network-бота, который представляет открытую линию в чатах Битрикс24.

## 2. Отправьте приветственное сообщение

Передайте тот же код коннектора, ID пользователя и текст в метод [imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md). Метод не работает с сессионной авторизацией: в обработчике приложения используйте OAuth-токен из тела события.

{% list tabs %}

- JS

    ```js
    const connectorCode = 'a588e1a88baaf301b9d0b0b33b1eefc2'
    const userId = Number(auth.user_id)
    const message = 'Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)'

    try {
        const response = await $b24.actions.v2.call.make({
            method: 'imopenlines.network.message.add',
            params: {
                CODE: connectorCode,
                MESSAGE: message,
                USER_ID: userId,
            },
            requestId: 'network-message',
        })

        if (!response.isSuccess) {
            throw new Error(response.getErrorMessages().join('; '))
        }
    } catch (error) {
        // Ошибка API, транспорта или SDK
        console.error(error)
    }
    ```

- PHP

    ```php
    $connectorCode = 'a588e1a88baaf301b9d0b0b33b1eefc2';
    $userId = (int)$request->request->all('auth')['user_id'];
    $message = 'Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)';

    try {
        $response = $b24->core->call('imopenlines.network.message.add', [
            'CODE' => $connectorCode,
            'MESSAGE' => $message,
            'USER_ID' => $userId,
        ]);
    } catch (Throwable $e) {
        echo $e->getMessage();
    }
    ```

- Python

    ```python
    connector_code = "a588e1a88baaf301b9d0b0b33b1eefc2"
    user_id = int(auth["user_id"])
    message = "Спасибо за установку! Если будут вопросы — пишите в этот чат. Хорошего дня! :)"

    try:
        response = client.imopenlines.network.message.add(
            code=connector_code,
            message=message,
            user_id=user_id,
        ).response
    except BitrixAPIError as error:
        print(f"Ошибка отправки сообщения: {error}")
    ```

{% endlist %}

Успешный ответ:

```json
{
    "result": true
}
```

## Проверим результат

1. В ответе метода [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md) в поле `result` должен быть ID network-бота
2. В ответе метода [imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md) в поле `result` должно быть значение `true`
3. Пользователь, идентификатор которого передали, должен увидеть в мессенджере приветственное сообщение от имени линии

## Ошибки и диагностика

Если открытая линия не подключилась или сообщение не отправилось, определите, какой метод вернул ошибку, и найдите ее код в ответе API или сообщении SDK.

### Ошибки обоих методов

| Код ошибки | Что проверить и исправить |
|---|---|
| `CODE` | Скопируйте значение поля «Код» со страницы коннектора заново. Код должен содержать 32 символа |
| `IMBOT_ERROR` | Обратитесь к администратору: модуль `imbot` не установлен |

### Открытая линия не подключается

Проверьте код ошибки метода [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md).

| Код ошибки | Что проверить и исправить |
|---|---|
| `LINE_NOT_FOUND` | В Битрикс24 поддержки убедитесь, что коннектор «Битрикс24 Network» подключен к открытой линии |
| `INACTIVE` | В Битрикс24 поддержки убедитесь, что открытая линия активна |

После исправления повторно вызовите метод [imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md).

### Приветственное сообщение не отправляется

Проверьте код ошибки метода [imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md).

| Код ошибки | Что проверить и исправить |
|---|---|
| `WRONG_AUTH_TYPE` | Используйте OAuth-токен из данных установки приложения, а не сессионную авторизацию |
| `NOT_FOUND` | В Битрикс24 поддержки убедитесь, что открытая линия активна, а коннектор подключен |
| `USER_ID_EMPTY` | Передайте в параметре `USER_ID` идентификатор пользователя из `auth[user_id]` |
| `USER_MESSAGE_LIMIT` | Этому пользователю уже отправляли сообщение на текущей неделе. Повторите попытку позже или проверьте сценарий с другим пользователем |
| `MESSAGE_EMPTY` | Передайте непустой текст в параметре `MESSAGE` |
| `WRONG_REQUEST` | Проверьте значения параметров `CODE`, `USER_ID` и `MESSAGE` |

## Продолжите изучение

- [Подключить внешнюю открытую линию к порталу imopenlines.network.join](../../api-reference/imopenlines/openlines/imopenlines-network-join.md)
- [Отправить сообщение пользователю от имени открытой линии imopenlines.network.message.add](../../api-reference/imopenlines/openlines/imopenlines-network-message-add.md)
- [Открытые линии: обзор методов и событий](../../api-reference/imopenlines/openlines/index.md)
