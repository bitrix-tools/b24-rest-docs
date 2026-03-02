# Изменить отправленное сообщение imbot.message.update

> Scope: [`imbot`](../../scopes/permissions.md)
>
> Кто может выполнять метод: авторизованный пользователь приложения, которое зарегистрировало чат-бота. Метод работает только с ботами этого приложения.

Метод `imbot.message.update` изменяет ранее отправленное сообщение чат-бота.

## Параметры метода

{% include [Сноска о параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`Тип` | **Описание** ||
|| **BOT_ID**
[`integer`](../../data-types.md) | Идентификатор чат-бота. Получить можно методом [imbot.bot.list](../imbot-bot-list.md).

Если параметр не передан, метод ищет первого бота, который зарегистрирован текущим приложением ||
|| **MESSAGE_ID***
[`integer`](../../data-types.md) | Идентификатор сообщения, которое нужно изменить. Значение должно быть больше `0`.

Для сообщений, которые отправлены ботом через REST, идентификатор возвращает метод [imbot.message.add](./imbot-message-add.md) ||
|| **MESSAGE**
[`string`](../../data-types.md) | Новый текст сообщения. Если передать пустое значение, сообщение будет удалено.

Если параметр не передан, текст сообщения не изменится ||
|| **ATTACH**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Вложение с блоками контента: изображения, ссылки, файлы. Можно передать:
- строку JSON
- объект с корневым ключом `BLOCKS`
- массив блоков без обертки 

Подробнее читайте в разделе [Вложения](../../chats/messages/attachments/index.md).

Пустое значение или `N` очищает вложение ||
|| **KEYBOARD**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Кнопки под сообщением, с которыми может взаимодействовать пользователь.

Подробнее читайте в статье [Работа с клавиатурами](../../chats/messages/keyboards.md).

Пустое значение или `N` отключает вывод кнопок ||
|| **MENU**
[`object`](../../data-types.md)
[`string`](../../data-types.md) | Дополнительные пункты в контекстном меню чата.

Подробнее читайте в статье [Контекстное меню](../../chats/messages/menu.md).

Пустое значение или `N` отключает показ дополнительных пунктов ||
|| **URL_PREVIEW**
[`string`](../../data-types.md) | Управляет отображением ссылок: при включении ссылка показывается как «богатая ссылка» с карточкой.

Допустимые значения:
- `Y` — включено, значение по умолчанию
- `N` — выключено ||
|| **SKIP_CONNECTOR**
[`string`](../../data-types.md) | Пропускает отправку сообщения во внешние коннекторы открытых линий при обновлении `MESSAGE`.

Допустимые значения:
- `Y` — пропустить
- `N` — не пропускать, значение по умолчанию ||
|| **CLIENT_ID**
[`string`](../../data-types.md) | Технический параметр для сценариев без `clientId` в авторизации.

Если передан, используется как `custom{CLIENT_ID}` для определения приложения ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (Webhook)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"MESSAGE_ID":19880117,"MESSAGE":"Обновленный текст","URL_PREVIEW":"Y"}' \
      https://**put_your_bitrix24_address**/rest/**put_your_user_id_here**/**put_your_webhook_here**/imbot.message.update
    ```

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{"BOT_ID":39,"MESSAGE_ID":19880117,"MESSAGE":"Обновленный текст","URL_PREVIEW":"Y","auth":"**put_access_token_here**"}' \
      https://**put_your_bitrix24_address**/rest/imbot.message.update
    ```

- JS

    ```js
    try {
      const response = await $b24.callMethod('imbot.message.update', {
        BOT_ID: 39,
        MESSAGE_ID: 19880117,
        MESSAGE: 'Обновленный текст',
        URL_PREVIEW: 'Y',
      });

      const { result } = response.getData();
      console.log('Updated:', result);
    } catch (error) {
      console.error('Error updating message:', error);
    }
    ```

- PHP

    ```php
    try {
        $response = $b24Service
            ->core
            ->call(
                'imbot.message.update',
                [
                    'BOT_ID' => 39,
                    'MESSAGE_ID' => 19880117,
                    'MESSAGE' => 'Обновленный текст',
                    'URL_PREVIEW' => 'Y',
                ]
            );

        $result = $response
            ->getResponseData()
            ->getResult();

        if ($result->error()) {
            echo 'Error: ' . $result->error();
        } else {
            echo 'Updated: ' . ($result->data() ? 'true' : 'false');
        }
    } catch (Throwable $exception) {
        error_log($exception->getMessage());
        echo 'Error updating message: ' . $exception->getMessage();
    }
    ```

- BX24.js

    ```js
    BX24.callMethod(
        'imbot.message.update',
        {
            BOT_ID: 39,
            MESSAGE_ID: 19880117,
            MESSAGE: 'Обновленный текст',
            URL_PREVIEW: 'Y',
        },
        function(result) {
            if (result.error()) {
                console.error(result.error().ex);
            } else {
                console.log(result.data());
            }
        }
    );
    ```

- PHP CRest

    ```php
    require_once('crest.php');

    $result = CRest::call(
        'imbot.message.update',
        [
            'BOT_ID' => 39,
            'MESSAGE_ID' => 19880117,
            'MESSAGE' => 'Обновленный текст',
            'URL_PREVIEW' => 'Y',
        ]
    );

    if (!empty($result['error'])) {
        echo 'Error: ' . $result['error_description'];
    } else {
        echo 'Updated: ' . ($result['result'] ? 'true' : 'false');
    }
    ```

{% endlist %}

## Обработка ответа

HTTP-код: **200**

```json
{
    "result": true,
    "time": {
        "start": 1728626400.123,
        "finish": 1728626400.234,
        "duration": 0.111,
        "processing": 0.045,
        "date_start": "2024-10-11T10:00:00+03:00",
        "date_finish": "2024-10-11T10:00:00+03:00",
        "operating_reset_at": 1762349466,
        "operating": 0
    }
}
```

## Возвращаемые данные

#|
|| **Название**
`Тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если запрос обработан без ошибки ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

HTTP-статус: **400**, **403**

```json
{
    "error": "MESSAGE_ID_ERROR",
    "error_description": "Message ID can't be empty"
}
```

{% include notitle [Обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Код** | **Описание** | **Значение** ||
|| `BOT_ID_ERROR` | Bot not found | Бот не найден или у приложения нет доступного бота для автоподстановки `BOT_ID` ||
|| `APP_ID_ERROR` | Bot was installed by another rest application | Переданный `BOT_ID` принадлежит другому приложению ||
|| `MESSAGE_ID_ERROR` | Message ID can't be empty | Не передан корректный `MESSAGE_ID` ||
|| `ATTACH_ERROR` | Incorrect attach params | Невалидная структура `ATTACH` ||
|| `ATTACH_OVERSIZE` | You have exceeded the maximum allowable size of attach | Превышен допустимый размер `ATTACH` — 30 Кб||
|| `KEYBOARD_ERROR` | Incorrect keyboard params | Невалидная структура `KEYBOARD` ||
|| `KEYBOARD_OVERSIZE` | You have exceeded the maximum allowable size of keyboard | Превышен допустимый размер `KEYBOARD` — 30 Кб||
|| `menu_ERROR` | Incorrect menu params | Невалидная структура `MENU` ||
|| `MENU_OVERSIZE` | You have exceeded the maximum allowable size of menu | Превышен допустимый размер `MENU` — 30 Кб||
|| `CANT_EDIT_MESSAGE` | Time has expired for modification or you don't have access | Нет доступа к изменению сообщения или истекло время редактирования — после публикации прошло более трех суток||
|#

{% include [Системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imbot-message-add.md)
- [{#T}](./imbot-message-delete.md)
- [{#T}](./imbot-message-like.md)
- [{#T}](./events/on-imbot-message-update.md)
