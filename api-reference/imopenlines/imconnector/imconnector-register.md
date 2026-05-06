# Зарегистрировать коннектор imconnector.register

{% note tip "" %}

Если вы разрабатываете интеграции для Битрикс24 с помощью AI-инструментов (Codex, Claude Code, Cursor), подключите [MCP-сервер](../../../sdk/mcp.md), чтобы ассистент использовал официальную REST-документацию.

{% endnote %}

> Scope: [`imopenlines`](../../scopes/permissions.md)
>
> Кто может выполнять метод: любой пользователь

Метод `imconnector.register` регистрирует пользовательский коннектор для открытых линий.

{% note info "" %}

Метод работает только в контексте [приложения](../../../settings/app-installation/index.md).

{% endnote %} 

## Параметры метода

{% include [Сноска об обязательных параметрах](../../../_includes/required.md) %}

#|
|| **Название**
`тип` | **Описание** ||
|| **ID***
[`string`](../../data-types.md) | Уникальный идентификатор коннектора. Метод приводит значение к нижнему регистру. Рекомендуется добавлять в начало идентификатора уникальный префикс, чтобы избежать пересечения с текущими и будущими идентификаторами других коннекторов. Для формирования идентификатора используйте цифры, буквы в нижнем регистре и знак подчеркивания `_`. Символ `.` запрещен.

Это значение используйте во всех методах, где требуется идентификатор коннектора — обычно в параметре `CONNECTOR` ||
|| **NAME***
[`string`](../../data-types.md) | Название коннектора в интерфейсе ||
|| **ICON***
[`object`](../../data-types.md) | Параметры основной иконки. 

Структура объекта подробно описана [ниже](#icon) ||
|| **PLACEMENT_HANDLER***
[`string`](../../data-types.md) | URL обработчика встраивания для настроек коннектора. По этому адресу Битрикс24 открывает интерфейс настройки в слайдере для пользователя. Подробнее о встраивании интерфейсов читайте в статье [Механизм встройки виджетов](../../widgets/index.md) ||
|| **ICON_DISABLED**
[`object`](../../data-types.md) | Параметры иконки неактивного состояния. 

Структура объекта подробно описана [ниже](#icon-disabled) ||
|| **DEL_EXTERNAL_MESSAGES**
[`boolean`](../../data-types.md) | Разрешает удалять входящие сообщения. Значение по умолчанию `true` ||
|| **EDIT_INTERNAL_MESSAGES**
[`boolean`](../../data-types.md) | Разрешает редактировать сообщения операторов. Значение по умолчанию `true` ||
|| **DEL_INTERNAL_MESSAGES**
[`boolean`](../../data-types.md) | Разрешает удалять сообщения операторов. Значение по умолчанию `true` ||
|| **NEWSLETTER**
[`boolean`](../../data-types.md) | Разрешает использовать канал в CRM-рассылках. Значение по умолчанию `true` ||
|| **NEED_SYSTEM_MESSAGES**
[`boolean`](../../data-types.md) | Разрешает отправку системных сообщений в канал. Значение по умолчанию `true` ||
|| **NEED_SIGNATURE**
[`boolean`](../../data-types.md) | Добавляет подпись оператора в сообщения. Значение по умолчанию `true` ||
|| **CHAT_GROUP**
[`boolean`](../../data-types.md) | Признак режима обработки чатов коннектора: `true` — группировка по `chat.id` (групповой чат), `false` — по `user.id` (чат один на один). Значение по умолчанию `false` ||
|| **COMMENT**
[`string`](../../data-types.md) | Текстовое пояснение, которое отображается в блоке настроек коннектора в слайдере ||
|#

### Параметр ICON {#icon}

#|
|| **Название**
`тип` | **Описание** ||
|| **DATA_IMAGE***
[`string`](../../data-types.md) | SVG-иконка в формате Data URI: строка с префиксом `data:image/svg+xml,`, после которого передается содержимое SVG, обычно URL-кодированное ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет фона иконки. Пример: `#69acc0` ||
|| **SIZE**
[`string`](../../data-types.md) | Размер фона. Пример: `90%` ||
|| **POSITION**
[`string`](../../data-types.md) | Позиция фона. Пример: `center` ||
|#

### Параметр ICON_DISABLED {#icon-disabled}

#|
|| **Название**
`тип` | **Описание** ||
|| **DATA_IMAGE**
[`string`](../../data-types.md) | SVG-иконка неактивного состояния в формате Data URI: строка с префиксом `data:image/svg+xml,`, после которого передается содержимое SVG, обычно URL-кодированное ||
|| **COLOR**
[`string`](../../data-types.md) | Цвет фона неактивной иконки ||
|| **SIZE**
[`string`](../../data-types.md) | Размер фона неактивной иконки ||
|| **POSITION**
[`string`](../../data-types.md) | Позиция фона неактивной иконки ||
|#

## Примеры кода

{% include [Сноска о примерах](../../../_includes/examples.md) %}

{% list tabs %}

- cURL (OAuth)

    ```bash
    curl -X POST \
      -H "Content-Type: application/json" \
      -H "Accept: application/json" \
      -d '{
        "ID": "myconnector",
        "NAME": "Мой коннектор",
        "ICON": {
          "DATA_IMAGE": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E",
          "COLOR": "#69acc0",
          "SIZE": "90%",
          "POSITION": "center"
        },
        "PLACEMENT_HANDLER": "https://example.com/connector/settings",
        "ICON_DISABLED": {
          "DATA_IMAGE": "data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E",
          "COLOR": "#99adb3"
        },
        "DEL_EXTERNAL_MESSAGES": true,
        "EDIT_INTERNAL_MESSAGES": true,
        "DEL_INTERNAL_MESSAGES": true,
        "NEWSLETTER": true,
        "NEED_SYSTEM_MESSAGES": true,
        "NEED_SIGNATURE": true,
        "CHAT_GROUP": false,
        "COMMENT": "Настройка канала",
        "auth": "**put_access_token_here**"
      }' \
      https://**put_your_bitrix24_address**/rest/imconnector.register
    ```

- JS

    ```js
    const payload = {
      ID: 'myconnector',
      NAME: 'Мой коннектор',
      ICON: {
        DATA_IMAGE: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
        COLOR: '#69acc0',
        SIZE: '90%',
        POSITION: 'center',
      },
      PLACEMENT_HANDLER: 'https://example.com/connector/settings',
      ICON_DISABLED: {
        DATA_IMAGE: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
        COLOR: '#99adb3',
      },
      DEL_EXTERNAL_MESSAGES: true,
      EDIT_INTERNAL_MESSAGES: true,
      DEL_INTERNAL_MESSAGES: true,
      NEWSLETTER: true,
      NEED_SYSTEM_MESSAGES: true,
      NEED_SIGNATURE: true,
      CHAT_GROUP: false,
      COMMENT: 'Настройка канала',
    };

    const response = await $b24.callMethod('imconnector.register', payload);
    console.log(response.getData());
    ```

- PHP

    ```php
    $result = $b24Service->core->call(
        'imconnector.register',
        [
            'ID' => 'myconnector',
            'NAME' => 'Мой коннектор',
            'ICON' => [
                'DATA_IMAGE' => 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
                'COLOR' => '#69acc0',
                'SIZE' => '90%',
                'POSITION' => 'center',
            ],
            'PLACEMENT_HANDLER' => 'https://example.com/connector/settings',
            'ICON_DISABLED' => [
                'DATA_IMAGE' => 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
                'COLOR' => '#99adb3',
            ],
            'DEL_EXTERNAL_MESSAGES' => true,
            'EDIT_INTERNAL_MESSAGES' => true,
            'DEL_INTERNAL_MESSAGES' => true,
            'NEWSLETTER' => true,
            'NEED_SYSTEM_MESSAGES' => true,
            'NEED_SIGNATURE' => true,
            'CHAT_GROUP' => false,
            'COMMENT' => 'Настройка канала',
        ]
    );
    ```

- BX24.js

    ```js
    BX24.callMethod(
      'imconnector.register',
      {
        ID: 'myconnector',
        NAME: 'Мой коннектор',
        ICON: {
          DATA_IMAGE: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
          COLOR: '#69acc0',
          SIZE: '90%',
          POSITION: 'center',
        },
        PLACEMENT_HANDLER: 'https://example.com/connector/settings',
        ICON_DISABLED: {
          DATA_IMAGE: 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
          COLOR: '#99adb3',
        },
        DEL_EXTERNAL_MESSAGES: true,
        EDIT_INTERNAL_MESSAGES: true,
        DEL_INTERNAL_MESSAGES: true,
        NEWSLETTER: true,
        NEED_SYSTEM_MESSAGES: true,
        NEED_SIGNATURE: true,
        CHAT_GROUP: false,
        COMMENT: 'Настройка канала',
      },
      function(result) {
        console.log(result.data());
      }
    );
    ```

- PHP CRest

    ```php
    $result = CRest::call(
        'imconnector.register',
        [
            'ID' => 'myconnector',
            'NAME' => 'Мой коннектор',
            'ICON' => [
                'DATA_IMAGE' => 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
                'COLOR' => '#69acc0',
                'SIZE' => '90%',
                'POSITION' => 'center',
            ],
            'PLACEMENT_HANDLER' => 'https://example.com/connector/settings',
            'ICON_DISABLED' => [
                'DATA_IMAGE' => 'data:image/svg+xml,%3Csvg%20xmlns%3D%22http://www.w3.org/2000/svg%22/%3E',
                'COLOR' => '#99adb3',
            ],
            'DEL_EXTERNAL_MESSAGES' => true,
            'EDIT_INTERNAL_MESSAGES' => true,
            'DEL_INTERNAL_MESSAGES' => true,
            'NEWSLETTER' => true,
            'NEED_SYSTEM_MESSAGES' => true,
            'NEED_SIGNATURE' => true,
            'CHAT_GROUP' => false,
            'COMMENT' => 'Настройка канала',
        ]
    );
    ```
{% endlist %}

## Обработка ответа

HTTP-статус: **200**

```json
{
    "result": {
    "result": true
    },
    "time": {
    "start": 1738065600.11,
    "finish": 1738065600.38,
    "duration": 0.27,
    "processing": 0.10,
    "date_start": "2025-01-28T12:00:00+00:00",
    "date_finish": "2025-01-28T12:00:00+00:00"
    }
}
```

### Возвращаемые данные

#|
|| **Название**
`тип` | **Описание** ||
|| **result**
[`boolean`](../../data-types.md) | `true`, если коннектор успешно зарегистрирован ||
|| **time**
[`time`](../../data-types.md#time) | Информация о времени выполнения запроса ||
|#

## Обработка ошибок

В методе возможны два формата ошибок:

1. HTTP-статус: **200** с `result = false`

  ```json
  {
      "result": {
          "result": false,
          "error": "CONNECTOR_ID_REQUIRED",
          "error_description": "Не указан ID коннектора"
      }
  }
  ```

1. HTTP-статус: **403** для системной ошибки авторизации

  ```json
  {
      "error": "WRONG_AUTH_TYPE",
      "error_description": "Current authorization type is denied for this method Application context required"
  }
  ```

{% include notitle [обработка ошибок](../../../_includes/error-info.md) %}

### Возможные коды ошибок

#|
|| **Статус** | **Код** | **Описание** | **Значение** ||
|| `200` | `APPLICATION_REGISTRATION_ERROR_POINT` | Ошибка регистрации приложения. В идентификаторе коннектора недопустимо использовать точку | В `ID` передан символ `.` ||
|| `200` | `CONNECTOR_ID_REQUIRED` | Не указан ID коннектора | Пустой или нестроковый `ID` ||
|| `200` | `NAME_REQUIRED` | Не указано имя коннектора | Пустой или нестроковый `NAME` ||
|| `200` | `ICON_REQUIRED` | Не указана иконка коннектора | Не передан `ICON.DATA_IMAGE` или передан не как строка ||
|| `200` | `NO_APPLICATION_ID` | Не удалось получить ID приложения | В контексте запроса не найдено приложение ||
|| `200` | `NO_PLACEMENT_HANDLER` | Не удалось получить URL обработчика встраивания | Пустой или нестроковый `PLACEMENT_HANDLER` ||
|| `200` | `APPLICATION_REGISTRATION_ERROR` | Ошибка регистрации приложения | Не удалось завершить регистрацию: данные коннектора и параметры встраивания не были сохранены ||
|| `200` | `GENERAL_CONNECTOR_REGISTRATION_ERROR` | Общая ошибка регистрации коннектора | Прочие ошибки валидации входных данных ||
|| `403` | `WRONG_AUTH_TYPE` | Current authorization type is denied for this method Application context required | Метод вызван не в контексте приложения OAuth ||
|#

{% include [системные ошибки](../../../_includes/system-errors.md) %}

## Продолжите изучение

- [{#T}](./imconnector-activate.md)
- [{#T}](./imconnector-status.md)
- [{#T}](./imconnector-connector-data-set.md)
- [{#T}](./imconnector-list.md)
- [{#T}](./imconnector-unregister.md)
- [{#T}](./imconnector-send-messages.md)
- [{#T}](./imconnector-update-messages.md)
- [{#T}](./imconnector-delete-messages.md)
- [{#T}](./imconnector-send-status-delivery.md)
- [{#T}](./imconnector-chat-name-set.md)
- [{#T}](../../../tutorials/openlines/example-connector.md)