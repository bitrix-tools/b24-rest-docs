# Как найти CRM-объект, созданный из диалога открытой линии

> Scope: [`imopenlines`](../../api-reference/scopes/permissions.md), [`crm`](../../api-reference/scopes/permissions.md)
>
> Кто может выполнять методы:
> - `imconnector.send.messages` — приложение с доступом к открытым линиям
> - `imopenlines.dialog.get` — пользователь с правом на доступ к диалогу
> - `crm.item.list` — пользователь с правом на чтение элементов CRM

{% note tip "" %}

Выберите инструмент для разработки с AI-агентом:

- используйте [Битрикс24 Вайбкод](../../ai-tools/vibecode.md), чтобы создать приложение для Битрикс24 по описанию задачи без знания языков программирования. Агент напишет код и разместит приложение на сервере без ручной настройки хостинга
- используйте [MCP-сервер](../../ai-tools/mcp.md), чтобы разрабатывать интеграцию через REST API в своем проекте. Агент будет обращаться к официальной REST-документации

{% endnote %}

Коннектор открытой линии передает в Битрикс24 сообщения клиента из внешнего канала: мессенджера, чата на сайте или сервиса поддержки. Если CRM-трекер создает лид, контакт или компанию по обращению, интеграции часто нужно получить идентификатор созданного CRM-объекта.

Не передавайте технические идентификаторы в поле `email` метода [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md). В CRM это поле используется как адрес электронной почты клиента. Невалидное значение может попасть в контакт или компанию и помешать сценариям, где нужен настоящий email, например отправке чека клиенту.

## Как получить идентификатор связанного CRM-объекта

Чтобы найти лид, контакт или компанию, которые CRM-трекер связал с диалогом открытой линии, последовательно выполним методы:

1. [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md) — отправим сообщение клиента в открытую линию и получим идентификатор чата

2. [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md) — получим данные диалога и код пользователя открытой линии

3. [crm.item.list](../../api-reference/crm/universal/crm-item-list.md) — найдем лид, контакт или компанию по точному значению поля мессенджера

## Что понадобится

- Приложение с доступом к открытым линиям и CRM
- Код коннектора из параметра `ID` метода [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md). В примерах используется `myconnector`
- Идентификатор открытой линии. В примерах используется `107`
- Внешний идентификатор чата или канала. В примерах используется `channel-123`
- Внешний идентификатор клиента. В примерах используется `ext-user-42`

## 1\. Отправим сообщение клиента

Передадим сообщение в открытую линию методом [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md). В блоке `user` укажем контактные данные клиента.

- `CONNECTOR` — код коннектора, который передали в параметре `ID` метода [imconnector.register](../../api-reference/imopenlines/imconnector/imconnector-register.md). Укажем `myconnector`

- `LINE` — идентификатор открытой линии. Укажем `107`

- `MESSAGES` — массив сообщений. Передадим данные клиента, сообщения и внешнего чата

{% include [Сноска о примерах](../../_includes/examples.md) %}

{% list tabs %}

- JS

   ```js
   BX24.callMethod(
       'imconnector.send.messages',
       {
           CONNECTOR: 'myconnector',
           LINE: 107,
           MESSAGES: [
               {
                   user: {
                       id: 'ext-user-42',
                       name: 'Иван',
                       phone: '+79990000000'
                   },
                   message: {
                       id: 'ext-msg-1001',
                       date: Math.floor(Date.now() / 1000),
                       text: 'Добрый день'
                   },
                   chat: {
                       id: 'channel-123',
                       name: 'Канал поддержки',
                       url: 'https://example.ru/chats/123'
                   }
               }
           ]
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               console.dir(result.data());
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   $result = CRest::call(
       'imconnector.send.messages',
       [
           'CONNECTOR' => 'myconnector',
           'LINE' => 107,
           'MESSAGES' => [
               [
                   'user' => [
                       'id' => 'ext-user-42',
                       'name' => 'Иван',
                       'phone' => '+79990000000',
                   ],
                   'message' => [
                       'id' => 'ext-msg-1001',
                       'date' => time(),
                       'text' => 'Добрый день',
                   ],
                   'chat' => [
                       'id' => 'channel-123',
                       'name' => 'Канал поддержки',
                       'url' => 'https://example.ru/chats/123',
                   ],
               ],
           ],
       ]
   );

   echo '<PRE>';
   print_r($result);
   echo '</PRE>';
   ```

{% endlist %}

Если сообщение передано успешно, метод вернет данные сессии открытой линии в блоке `session`.

```json
{
    "result": {
        "SUCCESS": true,
        "DATA": {
            "RESULT": [
                {
                    "SUCCESS": true,
                    "session": {
                        "ID": "323",
                        "CHAT_ID": "1767"
                    }
                }
            ]
        }
    }
}
```

Сохраните значения:

- `session.ID` — идентификатор сессии открытой линии

- `session.CHAT_ID` — идентификатор чата в Битрикс24. Он понадобится на следующем шаге

## 2\. Получим данные диалога

Получим данные чата методом [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md). В параметр `CHAT_ID` передадим значение `session.CHAT_ID` из ответа метода `imconnector.send.messages`.

{% list tabs %}

- JS

   ```js
   BX24.callMethod(
       'imopenlines.dialog.get',
       {
           CHAT_ID: 1767
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               console.dir(result.data());
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   $result = CRest::call(
       'imopenlines.dialog.get',
       [
           'CHAT_ID' => 1767,
       ]
   );

   echo '<PRE>';
   print_r($result);
   echo '</PRE>';
   ```

{% endlist %}

В ответе важны два поля:

- `entity_id` — код пользователя открытой линии. По нему можно сформировать значение поля Мессенджер в CRM

- `entity_data_2` — строка с привязками CRM, которые уже есть у диалога

```json
{
    "result": {
        "id": 1767,
        "entity_type": "LINES",
        "entity_id": "myconnector|107|channel-123|ext-user-42",
        "entity_data_2": "LEAD|0|COMPANY|0|CONTACT|42|DEAL|0",
        "dialog_id": "chat1767"
    }
}
```

Чтобы получить значение поля Мессенджер в CRM, добавьте к `entity_id` префикс `imol|`. В примере это:

```text
imol|myconnector|107|channel-123|ext-user-42
```

## 3\. Найдем CRM-объект по полю мессенджера

Выполните точный поиск по полю мессенджера методом [crm.item.list](../../api-reference/crm/universal/crm-item-list.md). Передавайте тип CRM-объекта в параметре `entityTypeId`:

- `1` — лид
- `3` — контакт
- `4` — компания

В универсальных методах CRM значение мессенджера IMOL доступно в поле `imol`. Поле `fm` с мультиполями нельзя явно запросить через `select`. Чтобы получить `fm` в ответе, передайте `select: ['*']`.

В примере найдем контакт, поэтому передадим `entityTypeId = 3`.

- `entityTypeId` — тип CRM-объекта. Для контакта укажите `3`

- `filter[=imol]` — значение поля Мессенджер: префикс `imol|` и `entity_id` из ответа метода `imopenlines.dialog.get`

- `select` — список полей, которые нужно вернуть. Для поиска идентификатора достаточно поля `id`

{% list tabs %}

- JS

   ```js
   BX24.callMethod(
       'crm.item.list',
       {
           entityTypeId: 3,
           select: [
               'id',
               'title',
               'imol'
           ],
           filter: {
               '=imol': 'imol|myconnector|107|channel-123|ext-user-42'
           }
       },
       function(result)
       {
           if(result.error())
           {
               console.error(result.error());
           }
           else
           {
               console.dir(result.data());
           }
       }
   );
   ```

- PHP

   ```php
   require_once('crest.php');

   $result = CRest::call(
       'crm.item.list',
       [
           'entityTypeId' => 3,
           'select' => [
               'id',
               'title',
               'imol',
           ],
           'filter' => [
               '=imol' => 'imol|myconnector|107|channel-123|ext-user-42',
           ],
       ]
   );

   echo '<PRE>';
   print_r($result);
   echo '</PRE>';
   ```

{% endlist %}

Если контакт найден, метод вернет его данные в массиве `items`.

```json
{
    "result": {
        "items": [
            {
                "id": 42,
                "title": "Иван",
                "imol": "imol|myconnector|107|channel-123|ext-user-42"
            }
        ]
    },
    "total": 1
}
```

Значение `items[0].id` — идентификатор найденного CRM-объекта. В примере найден контакт с идентификатором `42`.

Если контакт не найден, повторите запрос с `entityTypeId = 1` для лида и `entityTypeId = 4` для компании.

## Если CRM-объект не найден

Проверьте значения, которые связывают шаги сценария:

- в ответе `imconnector.send.messages` есть блок `session` с `CHAT_ID`
- в запрос `imopenlines.dialog.get` передан `CHAT_ID` из ответа `imconnector.send.messages`
- в ответе `imopenlines.dialog.get` есть непустое поле `entity_id`
- в фильтр `crm.item.list` передано значение с префиксом `imol|`, например `imol|myconnector|107|channel-123|ext-user-42`
- в `entityTypeId` указан тип CRM-объекта, который мог создать CRM-трекер: `1`, `3` или `4`
- пользователь, от имени которого выполняется `crm.item.list`, имеет право на чтение найденного CRM-объекта

Если метод `crm.item.list` возвращает ошибку `INVALID_ARG_VALUE`, проверьте поле в фильтре. Для поиска по мессенджеру используйте `=imol`.

## Что важно учитывать

- Не используйте поле `email` для технических маркеров. Передавайте в него только настоящий адрес электронной почты клиента
- Сохраняйте `session.CHAT_ID` и `session.ID` из ответа [imconnector.send.messages](../../api-reference/imopenlines/imconnector/imconnector-send-messages.md)
- Используйте `entity_id` из [imopenlines.dialog.get](../../api-reference/imopenlines/openlines/sessions/imopenlines-dialog-get.md) с префиксом `imol|` как точное значение для поиска по мессенджеру
- Проверяйте несколько типов CRM-объектов, если настройки CRM-трекера могут создавать лиды, контакты или компании
